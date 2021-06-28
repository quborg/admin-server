import { IMiddleware } from 'graphql-middleware';

import * as RH from './resolversHandler';
import * as lib from '../lib';

const ModelName = 'User';

const validations: IMiddleware = {
  Query: {
    signIn: async (resolve, _, { args }) => {
      await RH.validateSignIn(args);
      return resolve(_, { args });
    },
    // getUser: async (resolve, _, { _id }) => {
    //   await RH.validateItemExistence(_id, ModelName);
    //   return resolve(_, _id);
    // },
    // getProduct,
    // getCategory,
    // getTag,
    // getColor,
    // getOrder,
    // getPromotion,
    // getPickup,
    // getUsers,
    // getProducts,
    // getCategories,
    // getTags,
    // getColors,
    // getOrders,
    // getPromotions,
    // getPickups,
  },
  Mutation: {
    signUp: async (resolve, _, { inputs }) => {
      RH.validateSignUp(inputs);
      return resolve(_, { inputs });
    },
    // editUser: async (resolve, _, { inputs }) => {
    //   RH.validateEditingItem(inputs, ModelName);
    //   return resolve(_, { inputs });
    // },
    // editProduct: isModerator,
    // editCategory: isModerator,
    // editTag: isModerator,
    // editColor: isModerator,
    // editOrder: or(isModerator, isOwnerByArgId('userId')),
    // editPromotion: isModerator,
    // editPickup: isModerator,
    // deleteUser: async (resolve, _, { _id }) => {
    //   lib.validateID(_id);
    //   return resolve(_, _id);
    // },
    // deleteProduct: isModerator,
    // deleteCategory: isModerator,
    // deleteTag: isModerator,
    // deleteColor: isModerator,
    // deleteOrder: or(isModerator, isOwnerByArgId('userId')),
    // deletePromotion: isModerator,
    // deletePickup: isModerator,
  },
};

export default validations;
