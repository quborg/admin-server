import * as TYPES from 'types';

import { Pickup } from '../models';

const pickups: { Query: TYPES.Query; Mutation: TYPES.Mutation } = {
  Query: {
    getPickup: async (_, _id) => {
      try {
        const pickup = await Pickup.findById(_id);
        return pickup;
      } catch (err) {
        throw new Error(err);
      }
    },
    getPickups: async (_, { args }) => {
      try {
        let pickups: TYPES.Maybe<TYPES.Pickup[]>;
        if (!args?.keyword) {
          pickups = await Pickup.find().skip(args?.start).limit(args?.limit).lean();
        } else {
          const query = args.keyword.toString();
          pickups = await Pickup.find({
            name: { $regex: query, $options: 'i' },
          })
            .skip(args?.start)
            .limit(args?.limit)
            .lean();
        }
        return pickups;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    editPickup: async (_, { inputs }) => {
      try {
        const { _id, ...changes } = inputs;
        const pickup = await Pickup.findByIdAndUpdate(_id, changes, { lean: true });
        return pickup;
      } catch (err) {
        throw new Error(err);
      }
    },
    deletePickup: async (_, _id) => {
      try {
        const pickup = <TYPES.Pickup>await Pickup.findByIdAndDelete(_id, { lean: true });
        return !!pickup;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};

export default pickups;
