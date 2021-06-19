import { ApolloError } from 'apollo-server';

import * as TYPES from 'types';
import * as lib from 'src/middleware/validations/lib';

import ServerMail from './server';
import Controller from './controller';

const ModelName = 'Email Verification';

const sendEmailVerification: TYPES.EmailVerificationSend = async (user) => {
  let emailVerification = <TYPES.EmailVerification>{};
  try {
    emailVerification = <TYPES.EmailVerification>await Controller.create(user._id);
    lib.validateItem(emailVerification, ModelName, 'userId', 'not sent. Try later!');
    const { hash } = emailVerification;
    ServerMail.sendEmailVerification(user, hash);
  } catch (error) {
    throw new ApolloError(error);
  }
  return emailVerification;
};

export default { sendEmailVerification };
