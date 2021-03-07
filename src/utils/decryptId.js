import RC4Drop from 'crypto-js/rc4';
import encUtf8 from 'crypto-js/enc-utf8';

import config from '../config';

/**
 * Decrypts IDs
 */
export default function decryptId(encodedId) {
  return RC4Drop.decrypt(encodedId, config.app.key).toString(encUtf8);
}