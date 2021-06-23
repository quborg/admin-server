import { google } from 'googleapis';

import ENV from 'config/env';

const OAuth2 = google.auth.OAuth2;

const OAuth2Client = new OAuth2(
  ENV.serverMail.clientId,
  ENV.serverMail.clientSecret,
  'https://developers.google.com/oauthplayground'
);

OAuth2Client.setCredentials({
  refresh_token: ENV.serverMail.refreshToken,
});

export const getAccessToken = async (): Promise<string | null | undefined> =>
  await new Promise((resolve, reject) => {
    OAuth2Client.getAccessToken((err, token) => {
      if (err) {
        console.log(err);
        reject('OAuth2 failed create new accessToken!');
      }
      resolve(token);
    });
  });

export default {};
