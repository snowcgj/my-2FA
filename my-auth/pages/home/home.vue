<template>
  <view class="home-container">
    <!-- 最顶部的 -->
      <view class="header">
          <view class="logo-container">
            <image src="/static/logo.png" class="logo"></image>
            <text class="app-name">Auth</text>
          </view>
          <view class="icons">
            <button @click="onHelp" class="icon-button">❓</button>
            <button @click="onImport" class="icon-button">📥</button>
            <button @click="onSearch" class="icon-button">🔍</button>
            <button @click="onExport" class="icon-button">📤</button>
          </view>    
        </view>
       <!-- <button @click="saveAccounts">dd</button> -->
    <!-- 账号列表 -->
    <view class="account-list" >
      <AccountItem
        v-for="account in accounts"
        :key="account.id"
        :id="account.id"
        :icon="account.icon"
        :app="account.app"
        :name="account.name"
        :code="account.code"
        :countdown="account.countdown"
        :secret="account.secret"
        @delete-account="onDeleteAccount"
        @edit-account="onEditAccount"
        @more-options="onMoreOptions(account)"
      />
    </view>

    <!-- 浮动添加按钮 -->
    <button @click="onAddAccount" class="floating-button">＋</button>
  </view>
</template>

<script>
import AccountItem from '@/components/AccountItem.vue';


export default {
  components: {
    AccountItem,
  },
  data() {
    return {
      accounts: [
        {
          id: 1,
          icon: '/static/logo.png',
          app: 'qq',
          name: 'snowcgj',
          code: '585 316',
          countdown: 29,
          secret: 'JBSWY3DPEHPK3PXP',
        },
        // {
        //   id: 2,
        //   icon: '/static/logo.png', // 没有图标时使用默认图标
        //   app: 'hey',
        //   name: 'user@example.com',
        //   code: '855 954',
        //   countdown: 29,
        //   secret: 'JBSWY3DPEHPK3PXP'
        // },
        // {
        //   id: 3,
        //   icon: '/static/logo.png', // 没有图标时使用默认图标
        //   app: 'intagram',
        //   name: 'user@example.com',
        //   code: '855 954',
        //   countdown: 29,
        //   secret: 'RX5N7QPUYI6BOT7UDQPN54AFSF2QQMJV'
        // },
      ]
    };
  },
  mounted() {
    // 读取本地存储的 accounts 数据
    uni.getStorage({
      key: 'accounts',
      success: (res) => {
        this.accounts = res.data || []; // 如果数据不存在，则初始化为空数组
        console.log('Accounts loaded:', this.accounts);
      },
      fail: (err) => {
        console.error('Failed to load accounts:', err);
      },
    });
  },
  watch: {
      accounts: {
        handler(newAccounts) {
          this.saveAccounts(); // 数据变化时自动保存
        },
        deep: true, // 深度监听，确保内部属性的变化也被捕获
      },
  },
  methods: {
    // 删除账户
    onDeleteAccount(accountId) {
      console.log("acconutId:")
      console.log(accountId)

      console.log("之前的")
      console.log(this.accounts)

      this.accounts = this.accounts.filter(account => account.id !== accountId);

      console.log("删除之后的")
      console.log(this.accounts)

      this.saveAccounts();
    },

    // 修改账户，跳转到编辑页面
    onEditAccount(accountId) {
      uni.showToast({
        title: '功能暂未开发，敬请期待',
        //将值设置为 success 或者直接不用写icon这个参数
        icon: 'error',
        //显示持续时间为 2秒
        duration: 2000
      })  
      // const account = this.accounts.find(account => account.id === accountId);
      // console.log("修改账户的：")
      // console.log(this.accounts)
      // uni.navigateTo({
      //   url: `/pages/other/edit-account?id=${accountId}`
      //   // url: `/pages/other/edit-account`
      // });
    },

    saveAccountsToStorage() {
      const accountsStr = JSON.stringify(this.accounts);

      // 针对不同平台的存储
      if (process.env.VUE_APP_PLATFORM === 'h5') {
        // H5 平台：使用 localStorage
        localStorage.setItem('accounts', accountsStr);
        console.log('Accounts saved to localStorage successfully!');
      } else {
        // APP 和小程序：使用 FileSystemManager
        const filePath = `${uni.env.USER_DATA_PATH}/accounts.json`;
        uni.getFileSystemManager().writeFile({
          filePath,
          data: accountsStr,
          encoding: 'utf8',
          success: () => {
            console.log('Accounts saved to file successfully!');
          },
          fail: (err) => {
            console.error('Failed to save accounts:', err);
          },
        });
      }
    },
    loadAccountsFromStorage() {
      // 针对不同平台的读取逻辑
      if (process.env.VUE_APP_PLATFORM === 'h5') {
        // H5 平台：使用 localStorage
        const accountsStr = localStorage.getItem('accounts');
        if (accountsStr) {
          this.accounts = JSON.parse(accountsStr);
          console.log('Accounts loaded from localStorage:', this.accounts);
        }
      } else {
        // APP 和小程序：使用 FileSystemManager
        const filePath = `${uni.env.USER_DATA_PATH}/accounts.json`;
        uni.getFileSystemManager().readFile({
          filePath,
          encoding: 'utf8',
          success: (res) => {
            this.accounts = JSON.parse(res.data);
            console.log('Accounts loaded from file:', this.accounts);
          },
          fail: (err) => {
            console.error('Failed to load accounts:', err);
          },
        });
      }
    },
    myfunc(){
      console.log(process.env.VUE_APP_PLATFORM);
    },
    onExport(){
      uni.showToast({
        title: '功能暂未开发，敬请期待',
        //将值设置为 success 或者直接不用写icon这个参数
        icon: 'error',
        //显示持续时间为 2秒
        duration: 2000
      })  
    },
    onSearch() {
      uni.showToast({
        title: '功能暂未开发，敬请期待',
        //将值设置为 success 或者直接不用写icon这个参数
        icon: 'error',
        //显示持续时间为 2秒
        duration: 2000
      })  
      console.log('搜索功能被点击');
    },
    onHelp() {
      uni.showToast({
        title: '功能暂未开发，敬请期待',
        //将值设置为 success 或者直接不用写icon这个参数
        icon: 'error',
        //显示持续时间为 2秒
        duration: 2000
      })  
      console.log('帮助功能被点击');
    },
    onImport() {
      uni.showToast({
        title: '功能暂未开发，敬请期待',
        //将值设置为 success 或者直接不用写icon这个参数
        icon: 'error',
        //显示持续时间为 2秒
        duration: 2000
      })  
    },
    // onEditAccount(account) {
    //   console.log('编辑账户', account);
    // },
    onMoreOptions(account) {
      console.log('更多选项被点击', account);
    },

    onAddAccount() {
      console.log('添加账户按钮被点击');
      uni.showActionSheet({
      itemList: ['扫描二维码'], // 提示选项
      success: (res) => {
          this.scanQRCode(); // 调用扫描二维码功能
      },
      fail: (err) => {
        console.error('操作取消：', err);
      }
      // uni.showActionSheet({
      // itemList: ['扫描二维码', '选择图片'], // 提示选项
      // success: (res) => {
      //   if (res.tapIndex === 0) {
      //     this.scanQRCode(); // 调用扫描二维码功能
      //   } else if (res.tapIndex === 1) {
      //     this.selectImage(); // 调用选择图片功能
      //   }
      // },
      // fail: (err) => {
      //   console.error('操作取消：', err);
      // }
    });
    },
    scanQRCode() {
      uni.scanCode({
        success: (res) => {
          console.log('扫描成功：', res.result);
          this.parseQRCode(res.result); // 调用解析方法
        },
        fail: (err) => {
          console.error('扫描失败：', err);
          uni.showToast({ title: '扫描失败，请重试', icon: 'none' });
        }
      });
    },

    selectImage() {
      uni.chooseImage({
        count: 1,
        success: (res) => {
          const filePath = res.tempFilePaths[0];
          this.decodeQRCode(filePath); // 调用解析图片二维码方法
        },
        fail: (err) => {
          console.error('选择图片失败：', err);
          uni.showToast({ title: '选择图片失败', icon: 'none' });
        }
      });
    },
    parseQRCode(data ) {    // data删了
      if (!data.startsWith('otpauth://')) {
        uni.showToast({ title: '无法识别的二维码', icon: 'none' });
        return;
      }
      // let data="otpauth://totp/MyApp:user%40example.com?secret=AAJBI6STPH2XTQ3HSAU2BLUCMPIFN47G&issuer=MyApp"
      try {
        // 1️⃣ 拆分协议和查询参数
      const [protocolAndPath, queryString] = data.split('?');
      // otpauth     :   //totp/MyApp    :     user%40example.com
      // secret=AAJBI6STPH2XTQ3HSAU2BLUCMPIFN47G&issuer=MyApp
      const secret=queryString.split('=')[1].split('&')[0]
      const name=queryString.split('=').pop();
      const user=protocolAndPath.split(':').pop()
      const username=user.split('%')[0]
      //const username = decodeURIComponent(accountInfo); // 用户名
      if (!secret) {
          uni.showToast({ title: '无效的二维码内容', icon: 'none' });
          return;
      }
      console.log(secret)
      console.log(name)
      console.log(user)
      console.log(username)
      // console.log(appInfo)
       //  添加解析后的账户信息
        this.addAccount({
          id: Date.now(),
          icon: '/static/logo.png',    // 默认图标
          app: name || 'Unknown App',
          name: username|| 'Unknown Account',
          code: '',       // 动态验证码稍后生成
          countdown: 30,
          secret: secret
        });

        } catch (error) {

          console.error('二维码解析失败：', error);
          uni.showToast({ title: '二维码解析失败', icon: 'none' });
        }
    },
    addAccount(account) {
      this.accounts.push(account);
      this.saveAccounts();
      uni.showToast({ title: '账户添加成功', icon: 'success' });
    },
    // saveAccounts() {
    //     // 将 accounts 数组存储到本地
    //     uni.setStorage({
    //       key: 'accounts', // 存储的键名
    //       data: this.accounts, // 存储的数据
    //       success: () => {
    //         console.log('账户数据已成功保存到本地');
    //       },
    //       fail: (err) => {
    //         console.error('保存账户数据失败：', err);
    //       }
    //     });
    // },
    saveAccounts() {
      try {
        uni.setStorageSync('accounts', this.accounts); 
        console.log('数据已保存:', this.accounts);
      } catch (error) {
        console.error('数据存储失败:', error);
      }
    },
    getIcon(appName) {
      // 将应用名称转为小写并拼接为 Iconify 的图标名称
      const iconName = `mdi:${appName.toLowerCase()}`;
      return iconName; // 动态生成图标名称
    },

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


.app-name{
align-self: center;

}

.logo {
  width: 50px; /* 图标的宽度和高度 */
  height: 50px;
  margin: 15px; /* 图标与右侧信息之间的间距 */
}

.header{
display: flex;
flex-direction: row;
justify-content: space-between; 
background-color: aquamarine;
}
.logo-container{
display: flex;
flex-direction: row;
}

.icons{
margin: 15px;
display: flex;
flex-direction: row;
justify-content: center;

}

.icon-button{
  margin:5px
}

.floating-button{
  border-radius: 20%;
  position: fixed;
  right: 20px;
  bottom: 60px;
  transition: width 0.5s, height 0.5s;
}

/* 其余的样式保持不变 */

/* 在页面或组件的 style 中 */
.account-list {
  height: 600px;            /*根据需要设置固定高度 */
  flex-grow: 1; /* 占满剩余空间 */
  overflow-y: auto; /* 垂直滚动 */
  -webkit-overflow-scrolling: touch; /* 增加滚动的平滑效果 */
  scrollbar-width: none; /* 隐藏滚动条（针对 Firefox） */
}

.account-list::-webkit-scrollbar {
  display: none; /* 隐藏滚动条（针对 WebKit 浏览器） */
}
</style>
