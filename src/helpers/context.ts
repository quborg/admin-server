import * as TYPES from 'types';
import { User } from 'src/resolvers/models';
import ENV from 'config/env';
import CONST from 'config/const';

import { verifyToken } from './lib';

const { secretCode } = ENV;
const { PAYLOAD } = CONST;

const getContextToken: TYPES.GetContextToken = (expressContext) => {
  const { req, connection } = expressContext;
  if (req) return req.headers.authorization?.split('Bearer ')[1];
  if (connection) return connection.context.Authorization?.split('Bearer ')[1];
};

export const context: TYPES.ContextFn = async (expressContext) => {
  const token = getContextToken(expressContext);
  let context: TYPES.Context = PAYLOAD;
  if (token)
    try {
      const { email, ID } = <TYPES.Payload>verifyToken(token, secretCode);
      const user = <TYPES.User>await User.findOne({ email }).lean();
      if (user) {
        const { verified, role } = user;
        context = { ID, email, token, verified, role };
      }
    } catch (err) {
      throw new Error(err);
    }
  return context;
};
