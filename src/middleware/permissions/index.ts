import { IMiddleware } from 'graphql-middleware';

import * as rules from './rules';
import { authenticationError, forbiddenError } from './errors';

const permissions: IMiddleware = {
  Query: {
    getUser: async (resolve, parent, args, context, info) => {
      rules.isAuthenticated(context.token) || authenticationError();
      rules.atLeastRegular(context.role) || forbiddenError();
      return resolve(parent, args, context, info);
    },
    // getProduct:,
    // getCategory: isModerator,
    // getTag: isModerator,
    // getColor: isModerator,
    // getOrder: or(isModerator, isOwnerByArgId('usedId')),
    // getPromotion: allow,
    // getPickup: allow,
    getUsers: async (resolve, parent, args, context, info) => {
      rules.isAuthenticated(context.token) || authenticationError();
      rules.atLeastModerator(context.role) || forbiddenError();
      return resolve(parent, args, context, info);
    },
    // getProducts: allow,
    // getCategories: isModerator,
    // getTags: isModerator,
    // getColors: isModerator,
    // getOrders: or(isModerator, isOwnerByArgId('usedId')),
    // getPromotions: allow,
    // getPickups: allow,
  },
  Mutation: {
    editUser: async (resolve, parent, inputs, context, info) => {
      rules.isAuthenticated(context.token) || authenticationError();
      rules.atLeastModerator(context.role) ||
        rules.isOwner(inputs._id, context) ||
        forbiddenError();
      return resolve(parent, inputs, context, info);
    },
    // editProduct: isModerator,
    // editCategory: isModerator,
    // editTag: isModerator,
    // editColor: isModerator,
    // editOrder: or(isModerator, isOwnerByArgId('userId')),
    // editPromotion: isModerator,
    // editPickup: isModerator,
    // deleteUser: or(isModerator, isOwnerByArgId('_id')),
    // deleteProduct: isModerator,
    // deleteCategory: isModerator,
    // deleteTag: isModerator,
    // deleteColor: isModerator,
    // deleteOrder: or(isModerator, isOwnerByArgId('userId')),
    // deletePromotion: isModerator,
    // deletePickup: isModerator,
  },
};

export default permissions;
