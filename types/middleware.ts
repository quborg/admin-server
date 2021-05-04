import { OneOfItems, EmailVerification } from './entities';
import { Payload } from './helpers';
import { Maybe } from './resolvers';

export type ErrorsPropertyType = { [k: string]: string };

export type SendEmailV = (userId: string, email: string) => Promise<EmailVerification>;

export type CreateEmailV = (userId: string) => Promise<EmailVerification>;

export type ValidateToken = (args: {
  payload: Payload;
  payloadArgs: [keyof Payload];
  token: string;
  secretCode: string;
}) => void;

export type validateName = (name: string, errors: ErrorsPropertyType) => void;

export type validateUsername = (username: string, errors: ErrorsPropertyType) => void;

export type validateEmail = (email: string, errors: ErrorsPropertyType) => void;

export type validatePassword = (password: string, errors: ErrorsPropertyType) => void;

export type validateItem = (
  item: Maybe<OneOfItems>,
  itemName: string,
  argumentName: string,
  msg?: string
) => void;

export type validateField = (argumentName: string, flag: boolean) => void;

export type throwErrors = (errors: ErrorsPropertyType, handlerName: string) => void;

export type compareUpdatedItem = (
  inputs: OneOfItems,
  savedItem: OneOfItems,
  modelName: 'Item' | string
) => void;
