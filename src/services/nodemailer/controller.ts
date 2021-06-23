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
      expiresIn: '7d',
    }),
  };
  const emailVerification = <TYPES.EmailVerification>(
    await Models.EmailVerification.create(emailInputs)
  );
  return emailVerification;
};

export default { create: createEmailVerification };
