function base32Decode(base32) {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
    let bits = "";
    let result = [];

    for (let i = 0; i < base32.length; i++) {
        const val = alphabet.indexOf(base32[i].toUpperCase());
        if (val === -1) throw new Error("Invalid Base32 character");
        bits += val.toString(2).padStart(5, '0');
    }

    for (let i = 0; i + 8 <= bits.length; i += 8) {
        result.push(parseInt(bits.substr(i, 8), 2));
    }
    console.log(bits)
    return new Uint8Array(result);
}

// 测试 Base32 解码

// 在线网站 和 python  都检验了， 这个生成的数字结果是正确的
const secret = "JBSWY3DPEHPK3PXP";
const decodedKey = base32Decode(secret);
console.log("Base32 解码结果:", decodedKey);
