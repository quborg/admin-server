import * as TYPES from 'types';

import { Product } from '../models';

const products: { Query: TYPES.Query; Mutation: TYPES.Mutation } = {
  Query: {
    getProduct: async (_, _id) => {
      try {
        const product = await Product.findById(_id);
        return product;
      } catch (err) {
        throw new Error(err);
      }
    },
    getProducts: async (_, { args }) => {
      try {
        let products: TYPES.Maybe<TYPES.Product[]>;
        if (!args?.keyword) {
          products = await Product.find().skip(args?.start).limit(args?.limit).lean();
        } else {
          const query = args.keyword.toString();
          products = await Product.find({
            name: { $regex: query, $options: 'i' },
          })
            .skip(args?.start)
            .limit(args?.limit)
            .lean();
        }
        return products;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    editProduct: async (_, { inputs }) => {
      try {
        const { _id, ...changes } = inputs;
        const product = await Product.findByIdAndUpdate(_id, changes, { lean: true });
        return product;
      } catch (err) {
        throw new Error(err);
      }
    },
    deleteProduct: async (_, _id) => {
      try {
        const product = <TYPES.Product>await Product.findByIdAndDelete(_id, { lean: true });
        return !!product;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};

export default products;
