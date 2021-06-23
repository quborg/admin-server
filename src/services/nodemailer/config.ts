import { TransportOptions, SendMailOptions } from 'nodemailer';

import * as TYPES from 'types';
import ENV from 'config/env';

import template from './templates/emailVerification.html';
import * as lib from './lib';
import * as helper from './helper';
import { getAccessToken } from './oAuth2';

const domain = lib.domainAsExternal();

export const getConfig = async (): Promise<TransportOptions> =>
  <TransportOptions>{
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: ENV.serverMail.email,
      clientId: ENV.serverMail.clientId,
      clientSecret: ENV.serverMail.clientSecret,
      refreshToken: ENV.serverMail.refreshToken,
      accessToken: await getAccessToken(),
    },
  };

export const options = (user: TYPES.User, hash: string): SendMailOptions => ({
  from: `"E-com App Now" <${ENV.serverMail.noReplay}>`,
  to: user.email,
  subject: 'Email Verification ✔',
  html: helper.rewriteHtml({ user, template, hash, domain }),
});
