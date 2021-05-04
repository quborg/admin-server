import { networkInterfaces, NetworkInterfaceInfoIPv4 } from 'os';

export const osNetIP4 = (): NetworkInterfaceInfoIPv4 =>
  <NetworkInterfaceInfoIPv4>Object.values(networkInterfaces())
    .flat()
    .find((i) => i?.family == 'IPv4' && !i.internal);

export default {};
