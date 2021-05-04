import * as TYPES from 'types';

import {
  Users,
  // Products,
  // Categories,
  // Colors,
  // Tags,
  // Orders,
  // Promotions,
  // Pickups,
} from './controllers';

const Resolvers: TYPES.IResolvers = {
  Query: {
    ...Users.Query,
    // ...Products.Query,
    // ...Colors.Query,
    // ...Categories.Query,
    // ...Tags.Query,
    // ...Orders.Query,
    // ...Promotions.Query,
    // ...Pickups.Query,
  },
  Mutation: {
    ...Users.Mutation,
    // ...Products.Mutation,
    // ...Colors.Mutation,
    // ...Categories.Mutation,
    // ...Tags.Mutation,
    // ...Orders.Mutation,
    // ...Promotions.Mutation,
    // ...Pickups.Mutation,
  },
};

export default Resolvers;
