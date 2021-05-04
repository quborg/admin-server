import CONST from './const';

interface Environment {
  apollo: {
    introspection: boolean;
    playground: boolean;
  };
  hostname: string;
  port: number | string;
  mode: string;
  mongoConnect: string;
  expiresIn: string;
  secretCode: string;
  secretCode2: string;
  serverMail: {
    email: string;
    clientId: string;
    clientSecret: string;
    refreshToken: string;
    noReplay: string;
  };
}

const Env: Environment = {
  apollo: {
    introspection: CONST.INTROSPECTION,
    playground: CONST.PLAYGROUND,
  },
  hostname: <string>CONST.HOST,
  port: <string>CONST.PORT,
  mode: CONST.MODE,
  mongoConnect: <string>CONST.MONGO_CONNECT,
  expiresIn: '24h',
  secretCode: <string>CONST.SECRET_CODE,
  secretCode2: <string>CONST.SECRET_CODE2,
  serverMail: {
    email: CONST.GOOGLE.EMAIL,
    clientId: CONST.GOOGLE.CLIENT_ID,
    clientSecret: CONST.GOOGLE.CLIENT_SECRET,
    refreshToken: CONST.GOOGLE.OAUTH2_REFRESH_TOKEN,
    noReplay: CONST.GOOGLE.NO_REPLAY,
  },
};

export default Env;