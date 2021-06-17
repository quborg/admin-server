import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import * as TYPES from 'types';
import ENV from 'config/env';

export const generateToken: TYPES.GenerateTokenFn = ({
  payload,
  expiresIn = ENV.expiresIn,
  secretCode = ENV.secretCode,
}) => jwt.sign(payload, secretCode, { expiresIn });

export const verifyToken = (token: string, secretCode: string): TYPES.Payload =>
  <TYPES.Payload>jwt.verify(token, secretCode);

export const encryptKeyword: TYPES.EncryptKeyword = async (keyword) =>
  await bcrypt.hash(keyword, 10);

export const compareEncrypted: TYPES.CompareEncrypted = async (keyword, encrypted) =>
  encrypted ? await bcrypt.compare(keyword, encrypted) : false;
