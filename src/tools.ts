import ecModule from 'elliptic';

const EC = ecModule.ec;
export const ecInstance = new EC('secp256k1');