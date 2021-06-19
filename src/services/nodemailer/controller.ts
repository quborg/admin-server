import { ApolloError } from 'apollo-server';

import * as TYPES from 'types';
import * as Models from 'src/resolvers/models';
import * as Helpers from 'src/helpers';

import ENV from 'config/env';

const createEmailVerification: TYPES.EmailVerificationCreate = async (userId) => {
  const emailInputs: TYPES.EmailVerificationInputs = {
    userId,
    hash: Helpers.generateToken({
      payload: { userId },
      secretCode: ENV.secretCode2,
      expiresIn: '10',
    }),
  };
  let emailVerification = <TYPES.EmailVerification>{};
  try {
    emailVerification = <TYPES.EmailVerification>(
      await Models.EmailVerification.create(emailInputs)
    );
  } catch (error) {
    throw new ApolloError(error);
  }
  return emailVerification;
};

export default { create: createEmailVerification };
