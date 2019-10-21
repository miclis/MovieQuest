import path from 'path';
import fs from 'fs';
import NodeRSA from 'node-rsa';
import crypto from 'crypto';

export default class rsaWrapper {
    constructor() {
        this.key = new NodeRSA();
        this.key.generateKeyPair(2048, 65537); // 2048 — key length, 65537 open exponent
    }

    generate = () => {
        // Save keys as pem line in pkcs8
        fs.writeFileSync(path.resolve(__dirname, 'keys', 'private.pem'), this.key.exportKey('pkcs8-private-pem'));
        fs.writeFileSync(path.resolve(__dirname, 'keys', 'public.pem'), this.key.exportKey('pkcs8-public-pem'));
    };

    decrypt = message => {
        let enc = crypto.privateDecrypt(
            {
                key: this.privateKey,
                padding: crypto.constants.RSA_PKCS1_OAEP_PADDING
            },
            Buffer.from(message, 'base64')
        );
        return enc.toString();
    };

    loadPrivateKey = keyPath => {
        try {
            this.privateKey = fs.readFileSync(path.resolve(keyPath, 'private.pem'));
        } catch (error) {
            console.log(error);
        }
        return true;
    };
}
