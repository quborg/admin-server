import { UserInputError, ForbiddenError } from 'apollo-server';

import * as TYPES from 'types';
import * as Models from 'src/resolvers/models';
import { compareEncrypted } from 'src/helpers';

import * as lib from '../lib';

export const validateSignUp = (inputs: TYPES.SignUpInputs): void => {
  const errors: TYPES.ErrorsPropertyType = {};
  const { name, username, email, password } = inputs;
  lib.validateName(name, errors);
  lib.validateUsername(username, errors);
  lib.validateEmail(email, errors);
  lib.validatePassword(password, errors);
  lib.throwErrors(errors, 'Sign up');
};

export const validateLogin = async (args: TYPES.LoginArgs): Promise<void> => {
  const errors: TYPES.ErrorsPropertyType = {};
  const { email, password } = args;
  lib.validateEmail(email, errors);
  lib.validatePassword(password, errors);
  lib.throwErrors(errors, 'Login');

  const user = <TYPES.User>await Models.User.findOne({ email }).lean();
  lib.validateItem(user, 'User', 'email', 'not found');
  const isPassword = await compareEncrypted(password, user?.password);
  lib.validateField('password', isPassword);
};

export const validateItemExistence = async (
  _id: string,
  ModelName: string
): Promise<TYPES.OneOfItems> => {
  lib.validateID(_id);
  const item = await (Models as any)[ModelName].findById(_id);
  lib.validateItem(item, ModelName, '_id', 'not found');
  return item;
};

export const validateEditingItem = async (
  inputs: TYPES.OneOfItems,
  ModelName: string
): Promise<void> => {
  const { _id, ...changes } = inputs;
  if (!Object.keys(changes).length) throw new UserInputError('No changes received!');
  const item = await validateItemExistence(_id, ModelName);
  if (ModelName === 'User') {
    const wantChangeOwnRole = (changes as TYPES.User).role !== (item as TYPES.User).role;
    const underModerator = ![TYPES.Role.ADMIN, TYPES.Role.MODERATOR].includes(
      (item as TYPES.User).role
    );
    if (wantChangeOwnRole && underModerator) throw new ForbiddenError('Not Authorized!');
  }
};
