import * as TYPES from 'types';

import { Color } from '../models';

const colors: { Query: TYPES.Query; Mutation: TYPES.Mutation } = {
  Query: {
    getColor: async (_, _id) => {
      try {
        const color = await Color.findById(_id);
        return color;
      } catch (err) {
        throw new Error(err);
      }
    },
    getColors: async (_, { args }) => {
      try {
        let colors;
        if (!args?.keyword) {
          colors = await Color.find().skip(args?.start).limit(args?.limit).lean();
        } else {
          const query = args.keyword.toString();
          colors = await Color.find({
            name: { $regex: query, $options: 'i' },
          })
            .skip(args?.start)
            .limit(args?.limit)
            .lean();
        }
        return colors;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    editColor: async (_, { inputs }) => {
      try {
        const { _id, ...changes } = inputs;
        const color = await Color.findByIdAndUpdate(_id, changes, { lean: true });
        return color;
      } catch (err) {
        throw new Error(err);
      }
    },
    deleteColor: async (_, _id) => {
      try {
        const color = <TYPES.Color>await Color.findByIdAndDelete(_id, { lean: true });
        return !!color;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};

export default colors;
