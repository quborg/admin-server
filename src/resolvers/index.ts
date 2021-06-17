import * as TYPES from 'types';

import {
  Users,
  Products,
  Categories,
  Colors,
  Tags,
  Orders,
  Promotions,
  Pickups,
} from './controllers';

const Resolvers: TYPES.IResolvers = {
  Query: {
    ...Users.Query,
    ...Products.Query,
    ...Categories.Query,
    ...Tags.Query,
    ...Colors.Query,
    ...Orders.Query,
    ...Promotions.Query,
    ...Pickups.Query,
  },
  Mutation: {
    ...Users.Mutation,
    ...Products.Mutation,
    ...Categories.Mutation,
    ...Tags.Mutation,
    ...Colors.Mutation,
    ...Orders.Mutation,
    ...Promotions.Mutation,
    ...Pickups.Mutation,
  },
};

export default Resolvers;
