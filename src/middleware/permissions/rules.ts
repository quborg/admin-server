import * as TYPES from 'types';
import { Regex } from 'src/helpers/const';

export const isAuthenticated = (token: string): boolean => (Regex.token as RegExp).test(token);

export const isAdmin = (role: string): boolean => role === TYPES.Role.ADMIN;

export const isModerator = (role: string): boolean => role === TYPES.Role.MODERATOR;

export const isRegular = (role: string): boolean => role === TYPES.Role.REGULAR;

export const isAnonym = ({ token, role }: TYPES.Context): boolean =>
  !token || !role || role === TYPES.Role.ANONYM;

export const isOwner = (itemID: string, context: TYPES.Context): boolean =>
  itemID === context?.ID;
