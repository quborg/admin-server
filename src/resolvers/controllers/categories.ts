import * as TYPES from 'types';
import { Category } from '../models';
import Helper, { errorsHandler } from 'src/helpers';

const categories: { Query: TYPES.Query; Mutation: TYPES.Mutation } = {
  Query: {
    getCategory: async (_, _id, context) => {
      try {
        errorsHandler.authentication(context);
        const category = await Category.findById(_id);
        return category;
      } catch (err) {
        throw new Error(err);
      }
    },
    getCategories: async (_, { args }, context) => {
      try {
        errorsHandler.authentication(context);
        errorsHandler.authorization(context);
        let categories;
        if (!args?.keyword) {
          categories = await Category.find().skip(args?.start).limit(args?.limit).lean();
        } else {
          const query = args.keyword.toString();
          categories = await Category.find({
            $or: [
              { _englishName: { $regex: query, $options: 'i' } },
              { _dutchName: { $regex: query, $options: 'i' } },
            ],
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
    editCategory: async (_, { inputs }, context) => {
      try {
        const { _id, ...changes } = inputs;
        if (Object.keys(changes).length > 0) {
          errorsHandler.authentication(context);
          const _category = await Category.findById(_id);
          errorsHandler.noItem('Category');
          if (_category) {
            await _category.updateOne(changes);
            const category = await Category.findById(_id, null, { lean: true });
            return category;
          }
        }
        return null;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};

export default categories;
