import { IMiddleware } from 'graphql-middleware';

import * as TYPES from 'types';
import { Order } from 'src/resolvers/models';

import * as rules from './rules';
import * as lib from './lib';

const permissions: IMiddleware = {
  Query: {
    getUser: async (resolve, parent, args, context, info) => {
      if (rules.isModerator(context.role)) {
        lib.atLeastAuthenticatedModerator(context.token, context.role);
      } else {
        lib.atLeastAuthenticatedRegular(context.token, context.role);
        lib.toBeOwner(args._id, context);
      }
      return resolve(parent, args, context, info);
    },
    getOrder: async (resolve, parent, args, context, info) => {
      if (rules.isModerator(context.role)) {
        lib.atLeastAuthenticatedModerator(context.token, context.role);
      } else {
        lib.atLeastAuthenticatedRegular(context.token, context.role);
        const secureOrder = <TYPES.Order>await Order.findById(args._id);
        lib.toBeOwner(secureOrder.userId, context);
      }
      return resolve(parent, args, context, info);
    },
    getUsers: async (resolve, parent, args, context, info) => {
      lib.atLeastAuthenticatedModerator(context.token, context.role);
      return resolve(parent, args, context, info);
    },
    getOrders: async (resolve, parent, args, context, info) => {
      if (rules.isModerator(context.role)) {
        lib.atLeastAuthenticatedModerator(context.token, context.role);
      } else {
        lib.atLeastAuthenticatedRegular(context.token, context.role);
        lib.toBeOwner(args.userId, context);
      }
      return resolve(parent, args, context, info);
    },
  },
  Mutation: {
    editUser: async (resolve, parent, inputs, context, info) => {
      if (rules.isModerator(context.role)) {
        lib.atLeastAuthenticatedModerator(context.token, context.role);
      } else {
        lib.atLeastAuthenticatedRegular(context.token, context.role);
        lib.toBeOwner(inputs._id, context);
      }
      return resolve(parent, inputs, context, info);
    },
    editProduct: async (resolve, parent, inputs, context, info) => {
      lib.atLeastAuthenticatedModerator(context.token, context.role);
      return resolve(parent, inputs, context, info);
    },
    editCategory: async (resolve, parent, inputs, context, info) => {
      lib.atLeastAuthenticatedModerator(context.token, context.role);
      return resolve(parent, inputs, context, info);
    },
    editTag: async (resolve, parent, inputs, context, info) => {
      lib.atLeastAuthenticatedModerator(context.token, context.role);
      return resolve(parent, inputs, context, info);
    },
    editColor: async (resolve, parent, inputs, context, info) => {
      lib.atLeastAuthenticatedModerator(context.token, context.role);
      return resolve(parent, inputs, context, info);
    },
    editOrder: async (resolve, parent, inputs, context, info) => {
      if (rules.isModerator(context.role)) {
        lib.atLeastAuthenticatedModerator(context.token, context.role);
      } else {
        lib.atLeastAuthenticatedRegular(context.token, context.role);
        const secureOrder = <TYPES.Order>await Order.findById(inputs._id);
        lib.toBeOwner(secureOrder.userId, context);
      }
      return resolve(parent, inputs, context, info);
    },
    editPromotion: async (resolve, parent, inputs, context, info) => {
      lib.atLeastAuthenticatedModerator(context.token, context.role);
      return resolve(parent, inputs, context, info);
    },
    editPickup: async (resolve, parent, inputs, context, info) => {
      lib.atLeastAuthenticatedModerator(context.token, context.role);
      return resolve(parent, inputs, context, info);
    },
    deleteUser: async (resolve, parent, inputs, context, info) => {
      if (rules.isModerator(context.role)) {
        lib.atLeastAuthenticatedModerator(context.token, context.role);
      } else {
        lib.atLeastAuthenticatedRegular(context.token, context.role);
        lib.toBeOwner(inputs._id, context);
      }
      return resolve(parent, inputs, context, info);
    },
    deleteProduct: async (resolve, parent, inputs, context, info) => {
      lib.atLeastAuthenticatedModerator(context.token, context.role);
      return resolve(parent, inputs, context, info);
    },
    deleteCategory: async (resolve, parent, inputs, context, info) => {
      lib.atLeastAuthenticatedModerator(context.token, context.role);
      return resolve(parent, inputs, context, info);
    },
    deleteTag: async (resolve, parent, inputs, context, info) => {
      lib.atLeastAuthenticatedModerator(context.token, context.role);
      return resolve(parent, inputs, context, info);
    },
    deleteColor: async (resolve, parent, inputs, context, info) => {
      lib.atLeastAuthenticatedModerator(context.token, context.role);
      return resolve(parent, inputs, context, info);
    },
    deleteOrder: async (resolve, parent, inputs, context, info) => {
      if (rules.isModerator(context.role)) {
        lib.atLeastAuthenticatedModerator(context.token, context.role);
      } else {
        lib.atLeastAuthenticatedRegular(context.token, context.role);
        const secureOrder = <TYPES.Order>await Order.findById(inputs._id);
        lib.toBeOwner(secureOrder.userId, context);
      }
      return resolve(parent, inputs, context, info);
    },
    deletePromotion: async (resolve, parent, inputs, context, info) => {
      lib.atLeastAuthenticatedModerator(context.token, context.role);
      return resolve(parent, inputs, context, info);
    },
    deletePickup: async (resolve, parent, inputs, context, info) => {
      lib.atLeastAuthenticatedModerator(context.token, context.role);
      return resolve(parent, inputs, context, info);
    },
  },
};

export default permissions;
