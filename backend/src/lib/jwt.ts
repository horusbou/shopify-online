import jwt from 'jsonwebtoken';
import path from 'path';
import fs from "node:fs"

const privateKeyPath = path.join(__dirname, 'keys', 'private_key.pem');
const publicKeyPath = path.join(__dirname, 'keys', 'public_key.pem');

const privateKey = fs.readFileSync(privateKeyPath, 'utf8');
const publicKey = fs.readFileSync(publicKeyPath, 'utf8');

export function sign(object: Object, options?: jwt.SignOptions | undefined) {
  console.log("object to sign =>", object, typeof object)
  return jwt.sign({ ...object }, privateKey, {
    ...options,
    algorithm: 'RS256'
  });
}

export function decode(token: string) {
  try {
    const decoded = jwt.verify(token, publicKey, { algorithms: ['RS256'] }); // Use the public key for verification
    console.log("decoded object=>", decoded)

    return { valid: true, expired: false, decoded };
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return {
        valid: false,
        expired: error.message.includes('jwt expired'),
        decoded: null,
      };
    }
    return {
      valid: false,
      expired: error,
      decoded: null,
    };

  }
}
