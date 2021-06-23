import * as TYPES from 'types';

type RewriteHtml = (args: {
  user: TYPES.User;
  hash: string;
  domain: string;
  template: string;
}) => string;

export const rewriteHtml: RewriteHtml = ({ user, hash, domain, template }) =>
  template
    .replace('${name}', user.name)
    .replace('${domain}', domain)
    .replace('${hash}', hash)
    .replace('${userId}', user._id);

export default {};
