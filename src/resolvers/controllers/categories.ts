import * as TYPES from 'types';

import { Category } from '../models';

const categories: { Query: TYPES.Query; Mutation: TYPES.Mutation } = {
  Query: {
    getCategory: async (_, _id) => {
      try {
        const category = await Category.findById(_id);
        return category;
      } catch (err) {
        throw new Error(err);
      }
    },
    getCategories: async (_, { args }) => {
      try {
        let categories;
        if (!args?.keyword) {
          categories = await Category.find().skip(args?.start).limit(args?.limit).lean();
        } else {
          const query = args.keyword.toString();
          categories = await Category.find({
            name: { $regex: query, $options: 'i' },
          })
            .skip(args?.start)
            .limit(args?.limit)
            .lean();
        }
        return categories;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    editCategory: async (_, { inputs }) => {
      try {
        const { _id, ...changes } = inputs;
        const category = await Category.findByIdAndUpdate(_id, changes, { lean: true });
        return category;
      } catch (err) {
        throw new Error(err);
      }
    },
    deleteCategory: async (_, _id) => {
      try {
        const category = <TYPES.Category>await Category.findByIdAndDelete(_id, { lean: true });
        return !!category;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};

export default categories;
