/// <reference path="types/modules/html.d.ts" />

import PATHS from 'config/paths';
import { config } from 'dotenv';
const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';
config({ path: PATHS.envFiles[mode] });

import { ApolloServer, makeExecutableSchema } from 'apollo-server-express';
import mongoose from 'mongoose';
import { applyMiddleware } from 'graphql-middleware';

import resolvers from 'src/resolvers';
import typeDefs from 'src/typeDefs';
import { context } from 'src/helpers';
import { permissions, afterValidations, beforeValidations } from 'src/middleware';
import ENV from 'config/env';
import { expressApi as app } from 'src/services';

const schema = applyMiddleware(
  makeExecutableSchema({ typeDefs, resolvers }),
  permissions,
  beforeValidations,
  afterValidations
);

async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    schema,
    context,
    ...ENV.apollo,
  });

  await server.start();
  server.applyMiddleware({ app });

  app.listen({ port: ENV.port }, () => {
    const { graphqlPath, subscriptionsPath } = server;
    const url = [ENV.hostname, ENV.port].join(':');
    console.log('🚀 Server ready at http://%s%s', url, graphqlPath);
    console.log('🚀 Subscriptions ready at ws://%s%s', url, subscriptionsPath);
    mongoose.Schema.Types.String.set('trim', true);
    mongoose.set('returnOriginal', false);
    mongoose
      .connect(ENV.mongoConnect, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      })
      .then(() => console.log('🚀 MongoDB Connected Successfully !'))
      .catch((err) => {
        throw new Error(err);
      });
  });

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => server.stop());
  }
}

startApolloServer();
