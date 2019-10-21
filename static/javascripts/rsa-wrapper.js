(function() {
    'use strict';
    var crypto = window.crypto.subtle;
    var rsaParams = { name: 'RSA-OAEP', hash: { name: 'SHA-1' } };
    // Open key import. For it, pem line should be cleaned from any comments
    // and converted from base64 to ArrayBuffer type
    function importPublicKey(keyInPemFormat) {
        return new Promise(function(resolve, reject) {
            var key = converterWrapper.convertPemToBinary2(keyInPemFormat);
            key = converterWrapper.base64StringToArrayBuffer(key);
            crypto.importKey('spki', key, rsaParams, false, ['encrypt']).then(function(cryptokey) {
                resolve(cryptokey);
            });
        });
    }
    // encrypt with public key. Key must be pem string
    function publicEncrypt(keyInPemFormat, message) {
        return new Promise(function(resolve, reject) {
            importPublicKey(keyInPemFormat).then(function(key) {
                crypto.encrypt(rsaParams, key, converterWrapper.str2abUtf8(message)).then(function(encrypted) {
                    resolve(converterWrapper.arrayBufferToBase64String(encrypted));
                });
            });
        });
    }
    window.rsaWrapper.importPublicKey = importPublicKey;
    window.rsaWrapper.publicEncrypt = publicEncrypt;
})();
