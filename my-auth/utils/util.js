export function wordArrayToUint8Array(wordArray) {
    const words = wordArray.words; // 32位整数组成的数组
    const sigBytes = wordArray.sigBytes; // 代表有效字节数
    const u8 = new Uint8Array(sigBytes); // 新的 Uint8Array，长度为字节数

    let i = 0;
    for (let j = 0; j < sigBytes; j++) {
        const byte = (words[j >>> 2] >>> (24 - (j % 4) * 8)) & 0xff;
        u8[i++] = byte;
    }

    return u8;
}
