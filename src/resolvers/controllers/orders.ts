import * as TYPES from 'types';

import { Order } from '../models';

const orders: { Query: TYPES.Query; Mutation: TYPES.Mutation } = {
  Query: {
    getOrder: async (_, _id) => {
      try {
        const order = await Order.findById(_id);
        return order;
      } catch (err) {
        throw new Error(err);
      }
    },
    getOrders: async (_, { args }) => {
      try {
        let orders: TYPES.Maybe<TYPES.Order[]>;
        if (!args?.userId) {
          orders = await Order.find({ userId: args.userId })
            .skip(args?.start)
            .limit(args?.limit)
            .lean();
        } else if (!args?.keyword) {
          orders = await Order.find().skip(args?.start).limit(args?.limit).lean();
        } else {
          const query = args.keyword.toString();
          orders = await Order.find({
            name: { $regex: query, $options: 'i' },
          })
            .skip(args?.start)
            .limit(args?.limit)
            .lean();
        }
        return orders;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    editOrder: async (_, { inputs }) => {
      try {
        const { _id, ...changes } = inputs;
        const order = await Order.findByIdAndUpdate(_id, changes, { lean: true });
        return order;
      } catch (err) {
        throw new Error(err);
      }
    },
    deleteOrder: async (_, _id) => {
      try {
        const order = <TYPES.Order>await Order.findByIdAndDelete(_id, { lean: true });
        return !!order;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};

export default orders;
