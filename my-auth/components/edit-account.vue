<template>
  <view class="edit-container">
    <input v-model="account.name" placeholder="请输入名称" />
    <input v-model="account.app" placeholder="请输入应用名称" />
    <input v-model="account.icon" placeholder="请输入图标路径" />
    <button @click="saveAccount">保存</button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      account: {}
    };
  },
  onLoad(options) {
    const { id } = options;
    const storedAccounts = uni.getStorageSync('accounts');
    const account = storedAccounts.find(account => account.id === Number(id));
    if (account) {
      this.account = { ...account };
    }
  },
  methods: {
    saveAccount() {
      const pages = getCurrentPages();
      const previousPage = pages[pages.length - 2];
      previousPage.$vm.updateAccount(this.account);
      uni.navigateBack();
    }
  }
};
</script>
