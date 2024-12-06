<template>
  <view class="home-container">
    <!-- 顶部导航栏 -->
    <view class="header">
      <view class="logo-container">
        <image src="/static/logo.png" class="logo"></image>
        <text class="app-name">SafeAuth</text>
      </view>
      <view class="icons">
        <button @click="onHelp" class="icon-button">❓</button>
        <button @click="onImport" class="icon-button">📥</button>
        <button @click="onSearch" class="icon-button">🔍</button>
        <button @click="onExport" class="icon-button">📤</button>
      </view>
    </view>

    <!-- 账号列表 -->
    <view class="account-list">
      <view v-for="account in accounts" :key="account.id" class="account-item">
        <view class="account-header">
          <view class="account-left">
            <image :src="account.icon" class="account-icon"></image>
            <view class="account-info">
              <text class="account-app">{{ account.app }}</text>
              <text class="account-name">{{ account.name }}</text>
            </view>
          </view>
          <button @click="onMoreOptions(account)" class="more-options-button">⋮</button>
        </view>
        <view class="account-body">
          <view class="account-code-container">
            <text class="account-code">{{ account.code }}</text>
          </view>
          <view class="account-right">
            <text class="countdown">{{ account.countdown }} sec</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 浮动添加按钮 -->
    <button @click="onAddAccount" class="floating-button">＋</button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      accounts: [
        {
          id: 1,
          icon: '/static/github.png',
          app: 'GitHub',
          name: 'snowcgj',
          code: '585 316',
          countdown: 29
        },
        {
          id: 2,
          icon: '/static/default.png', // 没有图标时使用默认图标
          app: 'MyApp',
          name: 'user@example.com',
          code: '855 954',
          countdown: 29
        }
      ]
    };
  },
  methods: {
    onSearch() {
      console.log('搜索功能被点击');
    },
    onHelp() {
      console.log('帮助功能被点击');
    },
    onImport() {
      console.log('导入账户被点击');
    },
    onExport() {
      console.log('导出账户被点击');
    },
    onEditAccount(account) {
      console.log('编辑账户', account);
    },
    onMoreOptions(account) {
      console.log('更多选项被点击', account);
    },
    onAddAccount() {
      console.log('添加账户按钮被点击');
    }
  }
};
</script>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #f0f0f5;
}

.header {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #007aff;
  color: white;
  align-items: center;
}

.logo-container {
  display: flex;
  align-items: center;
}

.logo {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}

.app-name {
  font-size: 22px;
  font-weight: bold;
  color: white;
}

.icons {
  display: flex;
}

.icon-button {
  margin-left: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: white;
}

.account-list {
  flex: 1;
  padding: 20px;
}

.account-item {
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin-bottom: 15px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
}

.account-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.account-left {
  display: flex;
  align-items: center;
}

.account-icon {
  width: 50px;
  height: 50px;
  margin-right: 15px;
}

.account-info {
  display: flex;
  flex-direction: column;
}

.account-app {
  font-size: 18px;
  font-weight: bold;
}

.account-name {
  font-size: 14px;
  color: #666;
}

.more-options-button {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #999;
}

.account-body {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}

.account-code-container {
  background-color: #f0f0f5;
  padding: 10px 20px;
  border-radius: 10px;
  text-align: center;
}

.account-code {
  font-size: 32px;
  font-weight: bold;
  color: #333;
}

.account-right {
  display: flex;
  align-items: center;
}

.countdown {
  font-size: 16px;
  color: #007aff;
  font-weight: bold;
}

.floating-button {
  position: fixed;
  right: 20px;
  bottom: 80px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #007aff;
  color: white;
  font-size: 36px;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>
