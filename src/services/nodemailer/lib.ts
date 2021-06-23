import { networkInterfaces, NetworkInterfaceInfoIPv4 } from 'os';

import ENV from 'config/env';

const { port, hostname, heroku } = ENV;

export const osNetIP4 = (): NetworkInterfaceInfoIPv4 =>
  <NetworkInterfaceInfoIPv4>Object.values(networkInterfaces())
    .flat()
    .find((i) => i?.family == 'IPv4' && !i.internal);

export const domainAsExternal = (): string =>
  heroku ? hostname : `${osNetIP4().address}:${port}`;

export default {};
