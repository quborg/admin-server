import * as TYPES from 'types';

import * as rules from './rules';
import { authenticationError, forbiddenError } from './errors';

export const atLeastAuthenticatedRegular = (token: string, role: string): void => {
  rules.isAuthenticated(token) || authenticationError();
  rules.isRegular(role) || rules.isModerator(role) || rules.isAdmin(role) || forbiddenError();
};

export const toBeOwner = (itemID: string, context: TYPES.Context): void => {
  rules.isOwner(itemID, context) || forbiddenError();
};

export const atLeastAuthenticatedModerator = (token: string, role: string): void => {
  rules.isAuthenticated(token) || authenticationError();
  rules.isModerator(role) || rules.isAdmin(role) || forbiddenError();
};
