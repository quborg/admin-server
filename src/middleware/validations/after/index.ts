import { IMiddleware } from 'graphql-middleware';

import { nodemailer } from 'src/services';

import * as lib from '../lib';

const ModelName = 'User';

const validations: IMiddleware = {
  Query: {
    // login: async (resolve, _, { args }) => {
    //   await RH.validateLogin(args);
    //   return resolve(_, { args });
    // },
    // getUser: async (resolve, _, { _id }) => {
    //   await RH.validateItemExistence(_id, Model);
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
      const user = await resolve(_, { inputs });
      lib.validateItem(user, ModelName, '_id', 'not registered. Try later!');
      nodemailer.sendEmailVerification(user);
      return user;
    },
    editUser: async (resolve, _, { inputs }) => {
      const user = await resolve(_, { inputs });
      lib.compareUpdatedItem(inputs, user, ModelName);
      return user;
    },
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
