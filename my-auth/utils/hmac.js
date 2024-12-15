import { wordArrayToUint8Array } from './util.js'; // 这里假设你把wordArrayToUint8Array放在utils.js中

export function HMAC(hashFunction, key, message) {
    const blockSize = 64; // 块大小为64字节

    if (key.length > blockSize) {
        key = wordArrayToUint8Array(hashFunction(key)); // 关键部分
    }

    const paddedKey = new Uint8Array(blockSize);
    paddedKey.set(key); 

    const oKeyPad = new Uint8Array(blockSize);
    const iKeyPad = new Uint8Array(blockSize);

    for (let i = 0; i < blockSize; i++) {
        oKeyPad[i] = paddedKey[i] ^ 0x5c;
        iKeyPad[i] = paddedKey[i] ^ 0x36;
    }

    const innerHash = wordArrayToUint8Array(hashFunction(Uint8Array.from([...iKeyPad, ...message]))); 
    const hmacResult = wordArrayToUint8Array(hashFunction(Uint8Array.from([...oKeyPad, ...innerHash]))); 

    return hmacResult;
}
