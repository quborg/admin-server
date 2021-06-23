import * as TYPES from 'types';
import * as lib from 'src/middleware/validations/lib';

import * as ServerMail from './server';
import Controller from './controller';

const ModelName = 'Email Verification';

const sendEmailVerification: TYPES.EmailVerificationSend = async (user) => {
  const emailVerification = <TYPES.EmailVerification>await Controller.create(user._id);
  lib.validateItem(emailVerification, ModelName, 'userId', 'not sent. Try later!');
  const { hash } = emailVerification;
  ServerMail.sendEmailVerification(user, hash);
  return emailVerification;
};

export default { sendEmailVerification };
