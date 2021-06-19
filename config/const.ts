const {
  HOST,
  NODE_ENV,
  PORT,
  MONGO_CONNECT,
  SECRET_CODE,
  SECRET_CODE2,
  GOOGLE_EMAIL_ADDRESS = '',
  GOOGLE_CLIENT_ID = '',
  GOOGLE_CLIENT_SECRET = '',
  GOOGLE_OAUTH2_REFRESH_TOKEN = '',
  GOOGLE_OAUTH2_ACCESS_TOKEN = '',
  NO_REPLAY_EMAIL_ADDRESS = '',
  CLIENT_HOSTNAME = '',
  VERCEL,
} = process.env;

const IS_DEV = NODE_ENV === 'development';
const IS_PROD = NODE_ENV === 'production';
const MODE = IS_PROD ? 'production' : 'development';
const IS_VERCEL = !!VERCEL;

const CONST = {
  HOST,
  PORT,
  CLIENT_HOSTNAME,
  MONGO_CONNECT,
  INTROSPECTION: IS_DEV || IS_VERCEL,
  PLAYGROUND: IS_DEV || IS_VERCEL,
  MODE,
  SECRET_CODE,
  SECRET_CODE2,
  PAYLOAD: {
    ID: '',
    email: '',
  },
  GOOGLE: {
    EMAIL: GOOGLE_EMAIL_ADDRESS,
    CLIENT_ID: GOOGLE_CLIENT_ID,
    CLIENT_SECRET: GOOGLE_CLIENT_SECRET,
    OAUTH2_REFRESH_TOKEN: GOOGLE_OAUTH2_REFRESH_TOKEN,
    OAUTH2_ACCESS_TOKEN: GOOGLE_OAUTH2_ACCESS_TOKEN,
    NO_REPLAY: NO_REPLAY_EMAIL_ADDRESS,
  },
};

export default CONST;
