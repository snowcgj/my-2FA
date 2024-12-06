<!-- <template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style> -->
// 我们可以开始构建 uniapp 应用的主页面模块，主要包含您描述的主页视图。以下是一些步骤以及代码示例，帮助您实现这个过程。

// 第一步：修改 pages/index/index.vue 来创建主页面。
// 首先，我们将主页面分为顶部导航和账户列表两个部分。

<template>
  <view class="container">
    <!-- 顶部导航栏 -->
    <view class="header">
      <view class="logo-container">
        <image src="/static/logo.png" class="logo"></image>
        <text class="app-name">SafeAuth</text>
      </view>
      <view class="icons">
        <button @click="onSearch" class="icon-button">🔍</button>
        <button @click="onHelp" class="icon-button">❓</button>
        <button @click="onImport" class="icon-button">📥</button>
        <button @click="onExport" class="icon-button">📤</button>
      </view>
    </view>

    <!-- 账号列表 -->
    <view class="account-list">
      <view v-for="account in accounts" :key="account.id" class="account-item">
        <image :src="account.icon" class="account-icon"></image>
        <view class="account-info">
          <text class="account-app">{{ account.app }}</text>
          <text class="account-name">{{ account.name }}</text>
          <text class="account-code">{{ account.code }}</text>
        </view>
        <view class="account-right">
          <text class="countdown">{{ account.countdown }}</text>
          <button @click="onEditAccount(account)" class="icon-button">⚙️</button>
        </view>
      </view>
    </view>
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
          name: 'user@example.com',
          code: '123 456',
          countdown: 30
        },
        {
          id: 2,
          icon: '/static/default.png', // 没有图标时使用默认图标
          app: 'MyApp',
          name: 'another@example.com',
          code: '654 321',
          countdown: 25
        }
      ]
    };
  },
  methods: {
    onSearch() {
      // 搜索功能实现
      console.log('搜索功能被点击');
    },
    onHelp() {
      // 帮助功能实现
      console.log('帮助功能被点击');
    },
    onImport() {
      // 导入账户实现
      console.log('导入账户被点击');
    },
    onExport() {
      // 导出账户实现
      console.log('导出账户被点击');
    },
    onEditAccount(account) {
      // 编辑账户信息实现
      console.log('编辑账户', account);
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.header {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #f5f5f5;
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
  font-size: 20px;
  font-weight: bold;
}
.icons {
  display: flex;
}
.icon-button {
  margin-left: 10px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
}
.account-list {
  flex: 1;
  padding: 10px;
  background-color: #ffffff;
}
.account-item {
  display: flex;
  justify-content: space-between;
  padding: 15px;
  margin-bottom: 10px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}
.account-icon {
  width: 40px;
  height: 40px;
  margin-right: 15px;
}
.account-info {
  flex: 1;
}
.account-app {
  font-size: 16px;
  font-weight: bold;
}
.account-name {
  font-size: 14px;
  color: #666;
}
.account-code {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}
.account-right {
  display: flex;
  align-items: center;
}
.countdown {
  margin-right: 10px;
  font-size: 14px;
  color: #999;
}
</style>
