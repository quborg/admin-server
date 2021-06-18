import { UserInputError, ApolloError } from 'apollo-server';
import mongoose from 'mongoose';

import * as TYPES from 'types';
import { Regex, validationConfig as VC } from 'src/helpers/const';
import * as helpersLib from 'src/helpers/lib';

const capitalize = (word: string): string => word.charAt(0).toUpperCase() + word.slice(1);
const notBeEmpty = (field: string): string => `${capitalize(field)} must not be empty!`;
const notValid = (field: string): string => `${capitalize(field)} is not valid!`;
const mustContainOne = (desc: string): string => `Must contain at least one ${desc}!`;
const userInputErrorText = 'User Input Error';

const usernameErrorDescription = `Username can only contain [letters, numbers, -, _] \
and length between ${VC.user.username.min} and ${VC.user.username.max}`;

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
    if (!decoded.exp || decoded.exp < now) throw new UserInputError('Token expired!');
    payloadArgs.map((arg) => {
      if (payload[arg] !== decoded[arg]) throw new UserInputError('Wrong token signature!');
    });
  } catch (error) {
    throw new UserInputError('Token error', error);
  }
};

export const validateName: TYPES.validateName = (name, errors) => {
  const isEmpty = !name || !name.trim();
  if (isEmpty) errors.name = notBeEmpty('name');
  const isInvalid = !(Regex.name as RegExp).test(name);
  if (isInvalid) errors.name = notValid('name');
};

export const validateUsername: TYPES.validateUsername = (username, errors) => {
  const isEmpty = !username || !username.trim();
  if (isEmpty) errors.username = notBeEmpty('username');
  const isInvalid = !(Regex.username as RegExp).test(username);
  if (isInvalid) errors.username = usernameErrorDescription;
};

export const validateEmail: TYPES.validateEmail = (email, errors) => {
  const isEmpty = !email || !email.trim();
  if (isEmpty) errors.email = notBeEmpty('email');
  const isInvalid = !(Regex.email as RegExp).test(email);
  if (isInvalid) errors.email = notValid('email');
};

export const validatePassword: TYPES.validatePassword = (password, errors) => {
  const errorsDescriptions = [];
  const isEmpty = !password || !password.trim();
  if (isEmpty) errorsDescriptions.push(notBeEmpty('password'));

  const wrongLength = !(Regex.password as Record<string, any>).length.test(password);
  if (wrongLength) errorsDescriptions.push('Length must be between 8-256 characters');

  const noLower = !(Regex.password as Record<string, any>).oneLower.test(password);
  if (noLower) errorsDescriptions.push(mustContainOne('lowercase'));

  const noUpper = !(Regex.password as Record<string, any>).oneUpper.test(password);
  if (noUpper) errorsDescriptions.push(mustContainOne('uppercase'));

  const noDigit = !(Regex.password as Record<string, any>).oneDigit.test(password);
  if (noDigit) errorsDescriptions.push(mustContainOne('number'));

  const noSpecial = !(Regex.password as Record<string, any>).oneSpecialChar.test(password);
  if (noSpecial) errorsDescriptions.push(mustContainOne('special character'));

  if (errorsDescriptions.length)
    errors.password = ['Password is invalid', ...errorsDescriptions].join(', ');
};

export const validateItem: TYPES.validateItem = (
  item,
  itemName,
  argumentName,
  msg = 'not valid!'
): void => {
  let errorFlag = false;
  if (item) {
    const notValid = !mongoose.Types.ObjectId.isValid(item._id);
    if (notValid) errorFlag = true;
  } else errorFlag = true;
  if (errorFlag)
    throw new UserInputError(`${userInputErrorText}: ${itemName} ${msg}`, {
      argumentName,
    });
};

export const validateField: TYPES.validateField = (argumentName, flag): void => {
  if (!flag) {
    const msg = `${capitalize(argumentName)} is incorrect!`;
    const errors: TYPES.ErrorsPropertyType = { [argumentName]: msg };
    throw new UserInputError(`${userInputErrorText}: ${msg}`, { errors });
  }
};

export const throwErrors: TYPES.throwErrors = (
  errors: TYPES.ErrorsPropertyType,
  handlerName = 'Validation'
) => {
  const errorsKeys = Object.keys(errors);
  if (errorsKeys.length) {
    const errorMessage = errorsKeys.map((key) => errors[key]).join('. ');
    throw new UserInputError(`${handlerName} ${userInputErrorText}: ${errorMessage}`, {
      errors,
    });
  }
};

export const compareUpdatedItem: TYPES.compareUpdatedItem = (
  { _id, ...changes },
  savedItem,
  modelName = 'Item'
): void => {
  validateItem(savedItem, modelName, '_id', 'not saved, try later!');
  Object.keys(changes).map((key) => {
    const failed = (changes as any)[key] !== (savedItem as any)[key];
    if (failed) throw new ApolloError('Server fail to save. Try later!');
  });
};
