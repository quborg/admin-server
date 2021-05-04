import { createTransport } from 'nodemailer';

import * as TYPES from 'types';

import { config, options } from './config';

const transport = createTransport(config);

const sendEmailVerification: TYPES.NodemailerSend = async (user, hash) =>
  await transport.sendMail(options(user, hash));

export default { sendEmailVerification };
