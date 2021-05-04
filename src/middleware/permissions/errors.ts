import { ForbiddenError, AuthenticationError } from 'apollo-server';

export const authenticationError = (): void => {
  throw new AuthenticationError('Error Authentication!');
};

export const forbiddenError = (): void => {
  throw new ForbiddenError('Not Authorized!');
};
