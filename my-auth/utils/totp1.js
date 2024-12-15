function base32Decode(secret) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    let bits = '';
    for (let char of secret.toUpperCase()) {
        const val = alphabet.indexOf(char);
        if (val === -1) continue; // 跳过无效字符
        bits += val.toString(2).padStart(5, '0');
    }
    const bytes = [];
    for (let i = 0; i + 8 <= bits.length; i += 8) {
        bytes.push(parseInt(bits.substring(i, i + 8), 2));
    }
    return new Uint8Array(bytes);
}

// SHA-1 哈希函数（实现自定义版本，兼容 UniApp）
function sha1(message) {
    // 转换 Uint8Array 到 WordArray 格式
    function uint8ArrayToWordArray(u8Array) {
        const words = [];
        for (let i = 0; i < u8Array.length; i++) {
            words[i >>> 2] |= u8Array[i] << (24 - (i % 4) * 8);
        }
        return { words: words, sigBytes: u8Array.length };
    }

    // 计算 SHA-1 哈希
    const wordArray = uint8ArrayToWordArray(message);
    const CryptoJS = require('crypto-js'); // 确保 CryptoJS 可用
    const hash = CryptoJS.SHA1(wordArray);
    return new Uint8Array(hash.words.flatMap(word =>
        [(word >> 24) & 0xff, (word >> 16) & 0xff, (word >> 8) & 0xff, word & 0xff]
    ));
}

// HMAC-SHA1 函数
function hmacSha1(key, message) {
    const blockSize = 64;
    if (key.length > blockSize) {
        key = sha1(key);
    }
    const paddedKey = new Uint8Array(blockSize).fill(0);
    paddedKey.set(key);

    const oKeyPad = new Uint8Array(blockSize);
    const iKeyPad = new Uint8Array(blockSize);
    for (let i = 0; i < blockSize; i++) {
        oKeyPad[i] = paddedKey[i] ^ 0x5c;
        iKeyPad[i] = paddedKey[i] ^ 0x36;
    }

    const innerHash = sha1(new Uint8Array([...iKeyPad, ...message]));
    return sha1(new Uint8Array([...oKeyPad, ...innerHash]));
}

// 时间步计算函数
function getTimeStep(interval = 30) {
    let time = Math.floor(Date.now() / 1000 / interval);
    const buffer = new Uint8Array(8);
    for (let i = 7; i >= 0; i--) {
        buffer[i] = time & 0xff;
        time >>= 8;
    }
    return buffer;
}

// 生成 TOTP 动态验证码
function generateTOTP(secret, interval = 30, digits = 6) {
    // 1. Base32 解码密钥
    const key = base32Decode(secret);

    // 2. 生成时间步
    const timeStep = getTimeStep(interval);

    // 3. HMAC-SHA1 计算
    const hmac = hmacSha1(key, timeStep);

    // 4. 动态截断
    const offset = hmac[hmac.length - 1] & 0x0f;
    const binary =
        ((hmac[offset] & 0x7f) << 24) |
        ((hmac[offset + 1] & 0xff) << 16) |
        ((hmac[offset + 2] & 0xff) << 8) |
        (hmac[offset + 3] & 0xff);

    // 5. 取模生成6位验证码
    const otp = binary % 10 ** digits;
    return otp.toString().padStart(digits, '0');
}

const secret = 'JBSWY3DPEHPK3PXP'; // Base32 编码的密钥
const otp = generateTOTP(secret);
console.log("TOTP 动态验证码:", otp);
