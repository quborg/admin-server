import { ExpressContext } from 'apollo-server-express';

import { Role } from './common';

export type Payload = {
  ID?: string;
  email?: string;
  userId?: string;
  exp?: string | number;
};

type generateTokenFnArgs = {
  payload: Payload;
  expiresIn?: string | number;
  secretCode?: string;
};
export type GenerateTokenFn = (args: generateTokenFnArgs) => string;
export type CompareEncrypted = (password: string, hash?: string) => Promise<boolean>;
export type EncryptKeyword = (password: string) => Promise<string>;

export interface Context extends Payload {
  token?: string;
  role?: Role;
  verified?: boolean;
}
export type ContextFn = (expressContext: ExpressContext) => Promise<Context>;
export type GetContextToken = (expressContext: ExpressContext) => string;
