import { createTransport } from 'nodemailer';

import * as TYPES from 'types';

import { getConfig, options } from './config';

export const sendEmailVerification: TYPES.NodemailerSend = async (user, hash) => {
  const config = await getConfig();
  const transport = await createTransport(config);
  await transport.sendMail(options(user, hash));
};

export default {};
