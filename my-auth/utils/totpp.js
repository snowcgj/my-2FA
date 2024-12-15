function sha1(message) {
    // 辅助函数：左旋
    function rotateLeft(n, s) {
        return (n << s) | (n >>> (32 - s));
    }

    // 辅助函数：将 Uint8Array 转为 WordArray
    function uint8ArrayToWordArray(u8Array) {
        const words = [];
        for (let i = 0; i < u8Array.length; i++) {
            words[i >>> 2] |= u8Array[i] << (24 - (i % 4) * 8);
        }
        return { words: words, sigBytes: u8Array.length };
    }

    // 辅助函数：将 WordArray 转为 Uint8Array
    function wordArrayToUint8Array(wordArray) {
        const u8Array = [];
        for (let i = 0; i < wordArray.sigBytes; i++) {
            const byte = (wordArray.words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
            u8Array.push(byte);
        }
        return new Uint8Array(u8Array);
    }

    // 1. 将消息转换为 WordArray
    const wordArray = uint8ArrayToWordArray(message);

    // 2. 填充消息
    const l = wordArray.sigBytes * 8; // 原始消息的长度（以位为单位）
    wordArray.words[l >>> 5] |= 0x80 << (24 - (l % 32)); // 填充 1
    wordArray.words[((l + 64 >>> 9) << 4) + 15] = l; // 填充长度
    wordArray.sigBytes = wordArray.words.length * 4;

    // 3. 初始化哈希值
    let H0 = 0x67452301;
    let H1 = 0xefcdab89;
    let H2 = 0x98badcfe;
    let H3 = 0x10325476;
    let H4 = 0xc3d2e1f0;

    // 4. 处理每个 512 位块
    for (let i = 0; i < wordArray.words.length; i += 16) {
        const W = [];
        for (let t = 0; t < 80; t++) {
            if (t < 16) {
                W[t] = wordArray.words[i + t] || 0;
            } else {
                W[t] = rotateLeft(W[t - 3] ^ W[t - 8] ^ W[t - 14] ^ W[t - 16], 1);
            }
        }

        // 初始变量
        let a = H0;
        let b = H1;
        let c = H2;
        let d = H3;
        let e = H4;

        // 主循环
        for (let t = 0; t < 80; t++) {
            const temp =
                (rotateLeft(a, 5) +
                    ((t < 20
                        ? ((b & c) | (~b & d)) + 0x5a827999
                        : t < 40
                        ? (b ^ c ^ d) + 0x6ed9eba1
                        : t < 60
                        ? ((b & c) | (b & d) | (c & d)) - 0x70e44324
                        : (b ^ c ^ d) - 0x359d3e2a)) +
                    e +
                    W[t]) |
                0;

            e = d;
            d = c;
            c = rotateLeft(b, 30);
            b = a;
            a = temp;
        }

        // 更新哈希值
        H0 = (H0 + a) | 0;
        H1 = (H1 + b) | 0;
        H2 = (H2 + c) | 0;
        H3 = (H3 + d) | 0;
        H4 = (H4 + e) | 0;
    }

    // 5. 输出哈希值
    return wordArrayToUint8Array({ words: [H0, H1, H2, H3, H4], sigBytes: 20 });
}




// Base32 解码函数
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


// HMAC-SHA1 函数
// HMAC-SHA1 函数
function hmacSha1(key, message) {
    const blockSize = 64;
    if (key.length > blockSize) {
        key = sha1(key); // 压缩密钥
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
export function generateTOTP(secret, interval = 30, digits = 6) {
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
