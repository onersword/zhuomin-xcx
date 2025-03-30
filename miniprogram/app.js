const { request } = require("./utils/request");

App({
  globalData: {
    userInfo: null,
    isRedirectToHealthRecord: false,
    isLoggedIn: false,
    isBindPhone: false,
    eventChannel: null,
    userId: null,
    _loginCallbacks: [],  // Login callbacks
    _bindPhoneCallbacks: []  // Add phone binding callbacks
  },
  
  // 添加监听相关方法
  setLoginStatus(status) {
    this.globalData.isLoggedIn = status;
    // 触发所有注册的回调
    this.globalData._loginCallbacks.forEach(callback => {
      callback(status);
    });
  },
  
  watchLoginStatus(callback) {
    if (typeof callback === 'function') {
      this.globalData._loginCallbacks.push(callback);
    }
  },

  unwatchLoginStatus(callback) {
    const index = this.globalData._loginCallbacks.indexOf(callback);
    if (index > -1) {
      this.globalData._loginCallbacks.splice(index, 1);
    }
  },
  
  // Add phone binding status methods
  setBindPhoneStatus(status) {
    this.globalData.isBindPhone = status;
    // Trigger all registered callbacks
    this.globalData._bindPhoneCallbacks.forEach(callback => {
      callback(status);
    });
  },
  
  watchBindPhoneStatus(callback) {
    if (typeof callback === 'function') {
      this.globalData._bindPhoneCallbacks.push(callback);
    }
  },

  unwatchBindPhoneStatus(callback) {
    const index = this.globalData._bindPhoneCallbacks.indexOf(callback);
    if (index > -1) {
      this.globalData._bindPhoneCallbacks.splice(index, 1);
    }
  },
  
  onLaunch() {
    // 初始化云开发
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'prod-8gvh8k8d1aeb0797',
        traceUser: true,
      })
    }
    
    // 执行微信登录
    wx.login({
      success: async (res) => {
        if (res.code) {
          console.log('登录成功，获取到code：', res.code);
          // 调用云托管登录接口
          const data = await request({
            path: '/api/login',
            method: 'POST',
            data: {
              code: res.code
            }
          });
          if (data) {
            wx.setStorageSync('token', data.token);
            // 使用新的 setLoginStatus 方法
            this.setLoginStatus(true);
          }
        }
      },
      fail: () => {
        wx.showToast({
          title: '登录失败',
          icon: 'none'
        });
      }
    });
  }
}); 