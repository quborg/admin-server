import { UserInputError } from 'apollo-server';

import * as TYPES from 'types';
import * as Models from 'src/resolvers/models';
import { compareEncrypted } from 'src/helpers';

import * as lib from '../lib';

export const validateSignUp = (inputs: TYPES.SignUpInputs): void => {
  const errors: TYPES.ErrorsPropertyType = {};
  const { username, email } = inputs;
  lib.validateUsername(username, errors);
  lib.validateEmail(email, errors);

  lib.throwErrors(errors, 'Sign up');
};

export const validateLogin = async (args: TYPES.LoginArgs): Promise<void> => {
  const errors: TYPES.ErrorsPropertyType = {};
  const { email, password } = args;
  lib.validateEmail(email, errors);
  lib.validatePassword(password, errors);
  lib.throwErrors(errors, 'Login');

  const user = <TYPES.User>await Models.User.findOne({ email }).lean();
  lib.validateItem(user, 'User', 'email');
  const isPassword = await compareEncrypted(password, user?.password);
  lib.validateField('password', isPassword);
};

export const validateItemExistence = async (_id: string, Model: string): Promise<void> => {
  lib.validateID(_id);
  const item = await (Models as any)[Model].findById(_id);
  lib.validateItem(item, Model, '_id');
};

export const validateEditingItem = async (
  inputs: TYPES.OneOfItems,
  Model: string
): Promise<void> => {
  const { _id, ...changes } = inputs;
  validateItemExistence(_id, Model);
  if (!Object.keys(changes).length) throw new UserInputError('No changes received!');
};
