import * as TYPES from 'types';
import { Product } from '../models';
import { errorsHandler } from 'src/helpers';

const products: { Query: TYPES.Query; Mutation: TYPES.Mutation } = {
  Query: {
    getProduct: async (_, _id, context) => {
      try {
        const product = await Product.findById(_id, null, { lean: true });
        return product;
      } catch (err) {
        throw new Error(err);
      }
    },
    getProducts: async (_, { args }, context) => {
      try {
        const products: TYPES.Maybe<TYPES.Product[]>;
        // if (args?.filter) {
        //   products = await Product.find()
        //     .skip(args?.start)
        //     .limit(args?.limit)
        //     .sort({ createdAt: -1 })
        //     .lean();
        // }
        // if (args?.keyword) {
        //   const query = args.keyword.toString();
        //   products = await Product.find({
        //     title: { $regex: query, $options: 'i' },
        //   })
        //     .skip(args?.start)
        //     .limit(args?.limit)
        //     .sort({ createdAt: -1 })
        //     .lean();
        // }
        products = await Product.find()
          .skip(args?.start)
          .limit(args?.limit)
          .sort({ createdAt: -1 })
          .lean();
        return products;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    editProduct: async (_, { inputs }, context) => {
      try {
        const { _id, ...changes } = inputs;
        if (Object.keys(changes).length > 0) {
          errorsHandler.authentication(context);
          const _product = await Product.findById(_id);
          errorsHandler.noItem(_product, 'Product');
          if (_product) {
            await _product.updateOne(changes);
            const product = await Product.findById(_id, null, { lean: true });
            return product;
          }
        }
        return null;
      } catch (err) {
        throw new Error(err);
      }
    },
    deleteProduct: async (_, _id, context) => {
      try {
        errorsHandler.authentication(context);
        errorsHandler.authorization(context);
        await Product.findByIdAndDelete(_id);
        await Answer.deleteOne({ questionId: _id });
        await Vote.deleteOne({ questionId: _id });
        return true;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};

export default products;
