<template>
    <view class="container">
      <!-- 顶部栏区域 -->
      <view class="top-bar">
        <view class="left-section">
          <image class="app-logo" src="/static/logo.png"></image>
          <text class="app-title">MyAuthApp</text>
        </view>
        <view class="right-section">
          <image class="icon" src="/static/icons/search.png" @tap="onSearch"></image>
          <image class="icon" src="/static/icons/help.png" @tap="onHelp"></image>
          <image class="icon" src="/static/icons/import.png" @tap="onImport"></image>
          <image class="icon" src="/static/icons/export.png" @tap="onExport"></image>
        </view>
      </view>
  
      <!-- 账户列表 -->
      <scroll-view class="account-list" scroll-y>
        <view class="account-item" v-for="(account,index) in accountList" :key="account.id" @longpress="onAccountLongPress(index)">
          <view class="account-item-left">
            <image class="app-icon" :src="account.icon"></image>
            <view class="account-info">
              <text class="account-app">{{account.appName}}</text>
              <text class="account-user">{{account.accountName}}</text>
            </view>
          </view>
          <view class="account-item-right">
            <text class="account-totp">{{account.currentTOTP}}</text>
            <text class="count-down">{{account.countDown}}</text>
            <image class="edit-icon" src="/static/icons/edit.png" @tap="onEditAccount(index)"></image>
          </view>
        </view>
      </scroll-view>
  
      <!-- 右下角加号按钮 -->
      <view class="add-button" @tap="onAddAccount">
        <text class="add-icon">+</text>
      </view>
    </view>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  
  const accountList = ref([
    // 假数据示例
    {
      id: 1,
      appName: "GitHub",
      accountName: "user@example.com",
      icon: "/static/icons/github.png",
      currentTOTP: "123456",
      countDown: 30
    }
  ])
  
  function onSearch() {
    // TODO: 实现搜索功能
  }
  function onHelp() {
    // TODO: 显示帮助信息
  }
  function onImport() {
    // TODO: 导入功能逻辑
  }
  function onExport() {
    // TODO: 导出功能逻辑
  }
  function onAddAccount() {
    // TODO: 调用uni.scanCode或打开二维码扫描页面
    // 获取secretKey后将新账号push进accountList
  }
  function onAccountLongPress(index) {
    // TODO: 弹出菜单(置顶/隐藏/删除)
  }
  function onEditAccount(index) {
    // TODO: 进入编辑页面修改账号信息
  }
  
  onMounted(() => {
    // TODO: 启动定时器，每隔一段时间更新TOTP与countDown
  })
  </script>
  
  <style scoped>
  .container {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .top-bar {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10rpx;
    background: #fff;
    border-bottom: 1px solid #ccc;
  }
  .left-section {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .app-logo {
    width: 40rpx;
    height: 40rpx;
    margin-right: 10rpx;
  }
  .app-title {
    font-size: 32rpx;
    font-weight: bold;
  }
  .right-section {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .icon {
    width: 40rpx;
    height: 40rpx;
    margin-left: 20rpx;
  }
  .account-list {
    flex: 1;
    background: #f7f7f7;
  }
  .account-item {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background: #fff;
    padding: 20rpx;
    margin-bottom: 10rpx;
  }
  .account-item-left {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .app-icon {
    width: 60rpx;
    height: 60rpx;
    margin-right: 20rpx;
  }
  .account-info {
    display: flex;
    flex-direction: column;
  }
  .account-app {
    font-size: 28rpx;
    font-weight: bold;
  }
  .account-user {
    font-size: 24rpx;
    color: #666;
  }
  .account-item-right {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .account-totp {
    font-size: 28rpx;
    font-weight: bold;
    margin-right: 20rpx;
  }
  .count-down {
    font-size: 24rpx;
    color: #007AFF;
    margin-right: 20rpx;
  }
  .edit-icon {
    width: 40rpx;
    height: 40rpx;
  }
  .add-button {
    position: fixed;
    right: 30rpx;
    bottom: 120rpx;
    width: 80rpx;
    height: 80rpx;
    border-radius: 50%;
    background: #007AFF;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .add-icon {
    font-size: 40rpx;
    color: #fff;
  }
  </style>
