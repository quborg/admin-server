import { UserInputError, ApolloError } from 'apollo-server';
import mongoose from 'mongoose';

import * as TYPES from 'types';
import { Regex, validationConfig as VC } from 'src/helpers/const';
import * as helpersLib from 'src/helpers/lib';

const capitalize = (word?: string): string =>
  word ? word.charAt(0).toUpperCase() + word.slice(1) : '';
const notBeEmpty = (field: string): string => `${capitalize(field)} must not be empty !`;
const notValid = (field?: string): string => `${capitalize(field)} is not valid !`;
const mustContainOne = (desc: string): string => `Must contain at least one ${desc} !`;
const lengthBetween = ({ min, max }: { min: number; max: number }): string =>
  `Length must be between ${min} and ${max} !`;

export const validateID = (ID: string): void => {
  const isNotValid = !mongoose.Types.ObjectId.isValid(ID);
  if (isNotValid)
    throw new UserInputError(notValid('Id'), {
      argumentName: '_id',
      errors: { _id: notValid('_id') },
    });
};

export const validateToken: TYPES.ValidateToken = ({
  payload,
  payloadArgs,
  token,
  secretCode,
}) => {
  try {
    const decoded = <TYPES.Payload>helpersLib.verifyToken(token, secretCode);
    const now = new Date().getTime() / 1000;
    if (!decoded.exp || decoded.exp < now) throw new UserInputError('Token expired !');
    payloadArgs.map((arg) => {
      if (payload[arg] !== decoded[arg]) throw new UserInputError('Wrong token signature !');
    });
  } catch (error) {
    throw new UserInputError('Token error !', error);
  }
};

export const validateName: TYPES.validateName = (name, errors) => {
  const isEmpty = !name || !name.trim();
  if (isEmpty) errors.name = notBeEmpty('name');
  else {
    const wrongLength = !(Regex.name as Record<string, any>).length.test(name);
    if (wrongLength) errors.name = lengthBetween(VC.user.name);

    const wrongContent = !(Regex.name as Record<string, any>).content.test(name);
    if (wrongContent) errors.name = [errors.name, notValid('name')].join(' ');
  }
};

export const validateUsername: TYPES.validateUsername = (username, errors) => {
  const lengthError = lengthBetween(VC.user.username);
  const contentError = 'Username can only contain [letters, numbers, -, _] !';

  const isEmpty = !username || !username.trim();
  if (isEmpty) errors.username = notBeEmpty('username');
  else {
    const wrongLength = !(Regex.username as Record<string, any>).length.test(username);
    if (wrongLength) errors.username = [errors.username, lengthError].join(' ');

    const wrongContent = !(Regex.username as Record<string, any>).content.test(username);
    if (wrongContent) errors.username = [errors.username, contentError].join(' ');
  }
};

export const validateEmail: TYPES.validateEmail = (email, errors) => {
  const isEmpty = !email || !email.trim();
  if (isEmpty) errors.email = notBeEmpty('email');
  else {
    const isInvalid = !(Regex.email as RegExp).test(email);
    if (isInvalid) errors.email = notValid('email');
  }
};

export const validatePassword: TYPES.validatePassword = (password, errors) => {
  const isEmpty = !password || !password.trim();
  if (isEmpty) errors.password = notBeEmpty('password');
  else {
    const errorsDescriptions = [];
    const wrongLength = !(Regex.password as Record<string, any>).length.test(password);
    if (wrongLength) errorsDescriptions.push(lengthBetween({ min: 8, max: 256 }));

    const noLower = !(Regex.password as Record<string, any>).oneLower.test(password);
    if (noLower) errorsDescriptions.push(mustContainOne('lowercase'));

    const noUpper = !(Regex.password as Record<string, any>).oneUpper.test(password);
    if (noUpper) errorsDescriptions.push(mustContainOne('uppercase'));

    const noDigit = !(Regex.password as Record<string, any>).oneDigit.test(password);
    if (noDigit) errorsDescriptions.push(mustContainOne('number'));

    const noSpecial = !(Regex.password as Record<string, any>).oneSpecialChar.test(password);
    if (noSpecial) errorsDescriptions.push(mustContainOne('special character'));

    if (errorsDescriptions.length) errors.password = errorsDescriptions.join(' ');
  }
};

export const validateItem: TYPES.validateItem = (
  item,
  itemName,
  argumentName,
  msg = notValid()
): void => {
  let errorFlag = false;
  if (item) {
    const notValid = !mongoose.Types.ObjectId.isValid(item._id);
    if (notValid) errorFlag = true;
  } else errorFlag = true;
  if (errorFlag)
    throw new UserInputError(`User Input Error: ${itemName} ${msg} !`, {
      argumentName,
    });
};

export const validateField: TYPES.validateField = (argumentName, flag): void => {
  if (!flag) {
    const msg = `${capitalize(argumentName)} is incorrect !`;
    throw new UserInputError(`${argumentName}: ${msg}`);
  }
};

export const throwInputsErrors: TYPES.throwErrors = (
  errors: TYPES.ErrorsPropertyType,
  handlerName = 'Validation'
) => {
  const errorsKeys = Object.keys(errors);
  if (errorsKeys.length) {
    throw new UserInputError(`${handlerName} error !`, { errors: { ...errors, flag: true } });
  }
};

export const compareUpdatedItem: TYPES.compareUpdatedItem = (
  { _id, ...changes },
  savedItem,
  modelName = 'Item'
): void => {
  validateItem(savedItem, modelName, '_id', 'not saved, try later !');
  Object.keys(changes).map((key) => {
    const failed = (changes as any)[key] !== (savedItem as any)[key];
    if (failed) throw new ApolloError('Server fail to save, try later !');
  });
};
