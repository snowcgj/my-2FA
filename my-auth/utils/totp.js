import { HMAC } from './hmac.js';
import SHA1 from './sha1.js';

// Base32 解码函数
function base32Decode(base32) {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
    let bits = "";
    let result = [];

    for (let i = 0; i < base32.length; i++) {
        const val = alphabet.indexOf(base32[i].toUpperCase());
        if (val === -1) continue; // 跳过非法字符
        bits += val.toString(2).padStart(5, '0');
    }

    for (let i = 0; i + 8 <= bits.length; i += 8) {
        result.push(parseInt(bits.substr(i, 8), 2));
    }
    return new Uint8Array(result);
}

function generateTOTP(secret) {
    // ok Step 1: Base32 解码密钥
    const key = base32Decode(secret);

    // ok Step 2: 计算当前时间步
    let time = Math.floor(Date.now() / 1000 / 30); // 修改这里，使用 let
    const timeBuffer = new Uint8Array(8);
    for (let i = 7; i >= 0; i--) {
        timeBuffer[i] = time & 0xff;
        time >>= 8;
    }

    // Step 3: 使用 HMAC-SHA1 计算哈希
    const hmac = HMAC(SHA1, key, timeBuffer);

    console.log('hmac的结果是:', hmac);

    // Step 4: 提取偏移量
    const offset = hmac[hmac.length - 1] & 0x0f;

    // Step 5: 截断并取 4 字节
    const binary = 
        ((hmac[offset] & 0x7f) << 24) |
        ((hmac[offset + 1] & 0xff) << 16) |
        ((hmac[offset + 2] & 0xff) << 8) |
        (hmac[offset + 3] & 0xff);

    // Step 6: 生成 6 位 TOTP
    const otp = binary % 1000000;

    return otp.toString().padStart(6, '0');
}





// 测试生成 TOTP
console.log('TOTP动态验证码:', generateTOTP("JBSWY3DPEHPK3PXP"));
