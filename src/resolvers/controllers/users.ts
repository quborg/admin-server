import * as TYPES from 'types';
import * as Helpers from 'src/helpers';

import { User } from '../models';

const users: { Query: TYPES.Query; Mutation: TYPES.Mutation } = {
  Query: {
    login: async (_, { args: { email } }) => {
      try {
        const user = <TYPES.User>await User.findOne({ email }).lean();
        user.token = Helpers.generateToken({ payload: { email, ID: user._id } });
        return user;
      } catch (err) {
        throw new Error(err);
      }
    },
    getUser: async (_, _id) => {
      try {
        const user = await User.findById(_id, null, { lean: true });
        return user;
      } catch (err) {
        throw new Error(err);
      }
    },
    getUsers: async (_, { args }) => {
      try {
        let users;
        if (!args?.keyword) {
          users = await User.find().skip(args?.start).limit(args?.limit).lean();
        } else {
          const query = args.keyword.toString();
          users = await User.find({
            username: { $regex: query, $options: 'i' },
          })
            .skip(args?.start)
            .limit(args?.limit)
            .lean();
        }
        return users;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    signUp: async (_, { inputs }) => {
      try {
        inputs.password = await Helpers.encryptKeyword(inputs.password);
        const user = await User.create(inputs);
        return user;
      } catch (err) {
        throw new Error(err);
      }
    },
    editUser: async (_, { inputs }) => {
      try {
        const { _id, ...changes } = inputs;
        const user = <TYPES.User>await User.findByIdAndUpdate(_id, changes, { lean: true });
        return user;
      } catch (err) {
        throw new Error(err);
      }
    },
    deleteUser: async (_, _id) => {
      try {
        const user = <TYPES.User>await User.findByIdAndDelete(_id, { lean: true });
        return !!user;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};

export default users;
