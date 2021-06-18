import * as TYPES from 'types';

import { Tag } from '../models';

const tags: { Query: TYPES.Query; Mutation: TYPES.Mutation } = {
  Query: {
    getTag: async (_, _id) => {
      try {
        const tag = await Tag.findById(_id);
        return tag;
      } catch (err) {
        throw new Error(err);
      }
    },
    getTags: async (_, { args }) => {
      try {
        let tags;
        if (!args?.keyword) {
          tags = await Tag.find().skip(args?.start).limit(args?.limit).lean();
        } else {
          const query = args.keyword.toString();
          tags = await Tag.find({
            name: { $regex: query, $options: 'i' },
          })
            .skip(args?.start)
            .limit(args?.limit)
            .lean();
        }
        return tags;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    editTag: async (_, { inputs }) => {
      try {
        const { _id, ...changes } = inputs;
        const tag = await Tag.findByIdAndUpdate(_id, changes, { lean: true });
        return tag;
      } catch (err) {
        throw new Error(err);
      }
    },
    deleteTag: async (_, _id) => {
      try {
        const tag = <TYPES.Tag>await Tag.findByIdAndDelete(_id, { lean: true });
        return !!tag;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};

export default tags;
