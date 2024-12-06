<template>
  <view class="backup-container">
    <text class="backup-title">Backup and Sync</text>
    <button @click="onBackup" class="backup-button">Sync Now</button>
  </view>
</template>

<script>
export default {
  methods: {
    onBackup() {
      // 备份功能的实现
      console.log('备份功能被点击');
    }
  }
};
</script>

<style scoped>
.backup-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #f8f8f8;
}
.backup-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}
.backup-button {
  background-color: #007aff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}
</style>
