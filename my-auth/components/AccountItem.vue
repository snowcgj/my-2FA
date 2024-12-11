<template>
  <view class="account-item">
    <!-- 上部分 -->
    <view class="account-header">
      <view class="account-left">
		<image :src= icon   class="account-icon" />
		<!-- <image src="https://favicon.im/hey.com" alt="hey.com favicon" /> -->
        <view class="account-info">
          <text class="account-app">{{ app }} </text>
          <!-- <text class="account-app">{{ app }}</text> -->
          <text class="account-name">{{ name }}</text>
        </view>
      </view>

      <button @click="onMoreOptions" class="more-options-button">...</button>
    
    </view>

    <!-- 下部分 -->
    <view class="account-body">

      <view class="account-code-container">
        <text class="account-code">{{ code }}</text>
      </view>

      <view class="account-right">
        <text class="countdown">{{ countdown }} sec</text>
      </view>

    </view>
    
  </view>
</template>

<script>
// import { authenticator } from 'otplib';
// 手动设置配置项

// authenticator.options = {
//   step: 30, // 30秒间隔
//   window: 1 // 容错窗口
// };
import sha1 from 'js-sha1';

if (typeof globalThis.TextEncoder === 'undefined') {
  class TextEncoder {
    encode(str) {
      const utf8 = unescape(encodeURIComponent(str));
      const result = new Uint8Array(utf8.length);
      for (let i = 0; i < utf8.length; i++) {
        result[i] = utf8.charCodeAt(i);
      }
      return result;
    }
  }
  globalThis.TextEncoder = TextEncoder; // 确保在所有环境中生效
}



export default {
  props: {
    icon: String,      // 图标
    app: String,       // 应用名称
    name: String,      // 用户名
    secret: String     // TOTP 密钥
  },
  data() {
    return {
      code: '',         // 动态验证码
      countdown: 30     // 倒计时
    };
  },
  created() {
    this.startTOTP(); // 初始化 TOTP 逻辑
    console.log("!!!!!")
    console.log(this.code)
  },
  beforeDestroy() {
    clearInterval(this.timer); // 清理定时器
  },
  computed: {
      formattedIcon() {
        // 例如：在 icon 变量的前面加上路径前缀
        return `https://favicon.im/${this.name}.com`;
        // 也可以做更多的字符串操作，例如去除空格、转小写等
        // return `https://example.com/images/${this.icon.trim().toLowerCase()}.png`;
      }
  },
  methods: {
    onMoreOptions() {
      // 触发父组件提供的事件
      this.$emit('more-options');
    },
    startTOTP() {
      // 设置定时器每秒更新
      this.timer = setInterval(() => {
        // 计算剩余时间
        const remainingTime = 30 - (Math.floor(Date.now() / 1000) % 30);
        this.countdown = remainingTime;

        // 每次倒计时为 30 时重新生成验证码
        if (remainingTime === 30) {
          this.generateCode();
        }
      }, 1000);

      this.generateCode(); // 初始化生成验证码
    },

    generateCode() {
      // this.generateTOTP(this.secret).then((resolvedCode) => {
      //   this.code = resolvedCode; // 将解析后的验证码赋值给 this.code
      // });
      this.code=this.generateTOTP(this.secret);
    },

    // generateTOTP(secret, timeStep = 30, digits = 6) {
    //   console.log('Secret:', secret);

    //   // 1️⃣ 计算时间步长（Counter）
    //   const currentTime = Math.floor(Date.now() / 1000);
    //   const counter = Math.floor(currentTime / timeStep);

    //   // 2️⃣ 将 Counter 转为 8 字节的 ArrayBuffer
    //   const counterBuffer = new ArrayBuffer(8);
    //   const counterView = new DataView(counterBuffer);
    //   counterView.setUint32(4, counter, false); // 写入低32位（大端序）

    //   // 3️⃣ 确保 key 是 Uint8Array 类型
    //   const key = new TextEncoder().encode(secret); // 确保 key 是 Uint8Array
    //   const counterBytes = new Uint8Array(counterBuffer); // 确保 counter 是 Uint8Array

    //   // 4️⃣ HMAC-SHA1 计算
    //   const hmac = sha1.hmac(key, counterBytes);

    //   // 5️⃣ 计算动态验证码
    //   const offset = hmac[hmac.length - 1] & 0x0f; // 偏移量
    //   const binaryCode =
    //     ((hmac[offset] & 0x7f) << 24) |
    //     ((hmac[offset + 1] & 0xff) << 16) |
    //     ((hmac[offset + 2] & 0xff) << 8) |
    //     (hmac[offset + 3] & 0xff);

    //   // 6️⃣ 返回 6 位动态验证码
    //   return (binaryCode % 10 ** digits).toString().padStart(digits, '0');
    // }
    generateTOTP(secret, timeStep = 30, digits = 6) {
        console.log('Secret:', secret);

        // 1️⃣ Base32 解码
        const base32Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
        const base32Decode = (input) => {
          const bytes = [];
          let buffer = 0, bits = 0;
          for (const char of input) {
            const value = base32Chars.indexOf(char.toUpperCase());
            if (value === -1) continue;
            buffer = (buffer << 5) | value;
            bits += 5;
            if (bits >= 8) {
              bytes.push((buffer >> (bits - 8)) & 255);
              bits -= 8;
            }
          }
          return new Uint8Array(bytes);
        };

        const decodedSecret = base32Decode(secret);

        // 2️⃣ 获取时间步长 Counter
        const currentTime = Math.floor(Date.now() / 1000);
        const counter = Math.floor(currentTime / timeStep);

        // 3️⃣ 将 Counter 转为 8 字节 ArrayBuffer
        const counterBuffer = new ArrayBuffer(8);
        const counterView = new DataView(counterBuffer);
        counterView.setUint32(4, counter, false); // 写入低32位（大端序）

        // 4️⃣ HMAC-SHA1 计算（手动 HMAC 计算）
        const key = decodedSecret; // HMAC 的密钥
        const message = new Uint8Array(counterBuffer); // 8 字节的 counter
        const hmac = sha1.hmac(key, message); // 使用 js-sha1 计算 HMAC-SHA1

        // 5️⃣ 解析 HMAC 结果，计算动态验证码
        const hmacBytes = Array.from(hmac).map((char) => char.charCodeAt(0)); // 将 HMAC 转换为 Uint8Array
        const offset = hmacBytes[hmacBytes.length - 1] & 0x0f; // 取最后字节的低4位
        const binaryCode =
          ((hmacBytes[offset] & 0x7f) << 24) |
          ((hmacBytes[offset + 1] & 0xff) << 16) |
          ((hmacBytes[offset + 2] & 0xff) << 8) |
          (hmacBytes[offset + 3] & 0xff);

        // 6️⃣ 返回 6 位动态验证码
        return (binaryCode % 10 ** digits).toString().padStart(digits, '0');
      }


  }



};
</script>

<style scoped>
.account-item {
  display: flex;
  flex-direction: column; /* 垂直分布，上下两部分 */
  padding: 20px;
  margin: 15px;
  background-color: #ffffff; /* 白色背景 */
  border-radius: 20px; /* 圆角设计，让卡片更柔和 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 增加卡片阴影，使其有立体效果 */
  position: relative; /* 用于内部元素（如按钮）定位 */
}
.account-header {
  display: flex; /* 水平方向排列 */
  justify-content: space-between; /* 两端对齐，图标在左，按钮在右 */
  align-items: center; /* 垂直方向居中 */
  margin-bottom: 10px; /* 下部分留一些空间 */
}

.account-left {
  display: flex; /* 图标和文字部分水平排列 */
  align-items: center; /* 垂直居中对齐 */
}

.account-icon {
  width: 50px; /* 图标的宽度和高度 */
  height: 50px;
  margin-right: 15px; /* 图标与右侧信息之间的间距 */
}

.account-info {
  display: flex;
  flex-direction: column; /* 应用名和账号名上下排列 */
}

.account-app {
  font-size: 18px;
  font-weight: bold; /* 应用名称加粗 */
}

.account-name {
  font-size: 14px;
  color: #666; /* 使用灰色以区分重要程度 */
}

.more-options-button {
  background: none; /* 没有背景 */
  border: none; /* 没有边框 */
  margin: 0%;
  font-size: 20px;
  cursor: pointer; /* 鼠标移上去显示手型，表示可点击 */
  color: #999; /* 使用淡灰色，使得按钮不会过于显眼 */
  /* padding: 5px; */
  /* border-radius: 50%; */
  border: 1px solid #ddd;
}

.account-body {
  display: flex; /* 水平排列，验证码和倒计时 */
  justify-content: space-between; /* 左右两部分 */
  align-items: center; /* 垂直居中 */
  margin-top: 10px; /* 与上部分留出空间 */
}

.account-code-container {
  background-color: #f0f0f5; /* 灰色背景让验证码部分突出 */
  padding: 10px 20px; /* 内边距让验证码周围有足够的空间 */
  border-radius: 15px; /* 圆角设计，使得区域看起来更加现代 */
  text-align: center; /* 居中显示验证码 */
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1); /* 内部阴影增加视觉层次感 */
}

.account-code {
  font-size: 32px; /* 较大的字体显示验证码 */
  font-weight: bold; /* 加粗 */
  color: #333; /* 深色字体以增强可读性 */
}

.account-right {
  display: flex;
  align-items: flex-end; /* 使倒计时和单位对齐 */
  flex-direction: column;
}

.countdown {
  font-size: 20px;
  color: #007aff; /* 使用蓝色强调倒计时 */
  font-weight: bold; /* 加粗使其更显眼 */
}

.countdown-unit {
  font-size: 14px;
  color: #007aff;
}
</style>
