<template>
  <view class="settings-container">
    <text class="settings-title">Settings</text>
    <view class="setting-item" v-for="setting in settings" :key="setting.id">
      <text>{{ setting.name }}</text>
      <switch :value="setting.value" @change="toggleSetting(setting)"></switch>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      settings: [
        { id: 1, name: 'Allow Notifications', value: true },
        { id: 2, name: 'Dark Mode', value: false }
      ]
    };
  },
  methods: {
    toggleSetting(setting) {
      // 切换设置选项
      setting.value = !setting.value;
      console.log('设置选项被切换', setting);
      uni.showToast({
        title: '功能暂未开发，敬请期待',
        //将值设置为 success 或者直接不用写icon这个参数
        icon: 'error',
        //显示持续时间为 2秒
        duration: 2000
      })  
    }
  }
};
</script>

<style scoped>
.settings-container {
  padding: 20px;
  background-color: #ffffff;
}
.settings-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}
.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #e0e0e0;
}
</style>
