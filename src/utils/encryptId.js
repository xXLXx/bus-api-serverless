import RC4Drop from 'crypto-js/rc4';

import config from '../config';

/**
 * Encrypts IDs
 */
export default function encryptId(idAsString) {
  return RC4Drop.encrypt(idAsString.toString(), config.app.key).toString();
}