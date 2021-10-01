import { AES, enc } from 'crypto-js';
import { CryptoKey } from '../../Configration/Secret';

const { encrypt, decrypt } = AES;

export const encryptData = (data) => {
	return encrypt(data, CryptoKey).toString();
};

export const decryptData = (data) => {
	return decrypt(data, CryptoKey).toString(enc.Utf8);
};
