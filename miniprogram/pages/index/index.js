const { request } = require('../../utils/request.js')
// index.js
Page({
  data: {
    needShowLogin: false,
    calendarConfig: {
      hideHeader: true,
      weekMode: false,
    },
    targetDate: 1735660800000,  // 2025-01-01 00:00:00
    healthManageList: {
      note: null,
      file: null
    },
    purchasedServices: [
   
    ]
  },

  onLoad() {
    const app = getApp();
    
    // 保存回调函数的引用，以便之后可以移除
    this.loginCallback = (isLoggedIn) => {
      if (isLoggedIn) {
        this.fetchPageData();
      }
    };
    
    // 添加监听器
    app.watchLoginStatus(this.loginCallback);
    
    if (app.globalData.isLoggedIn) {
      this.fetchPageData();
    }
  },

  onUnload() {
    // 页面卸载时移除监听器
    const app = getApp();
    if (this.loginCallback) {
      app.unwatchLoginStatus(this.loginCallback);
    }
  },

  fetchPageData() {
    console.log('fetchPageData')
    this.getProducts();
    this.getRecords();
  },

  async getRecords() {
    const data = await request({
      path: '/api/records',
      method: 'GET',
    })
    console.log('records', data);
    if (data.userInfo.status === 0) {
      // this.setData({
      //   needShowLogin: true
      // })
      return;
    }
    if (data.userInfo.status === 1) {
      wx.redirectTo({
        url: '/pages/healthRecord/healthRecord'
      })
    }
    const healthManageList = {note: null, file: null};
    if (data.latestFile) {
      healthManageList.file = data.latestFile;
    }
    if (data.latestNote) {
      healthManageList.note = data.latestNote;
    }
    this.setData({
      healthManageList: healthManageList
    })
  },

  goToSchedule() {
    console.log('goToSchedule')
    wx.navigateTo({
      url: '../schedule/schedule'
    })
  },

  getUserProfile(e) {
    wx.getUserProfile({
      desc: '展示用户信息',
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },


  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }

  
  },

  async getReminders() {
    const data = await request({
      path: '/api/reminders',
      method: 'GET'
    })
    console.log('reminders', data)
  },

  async getProducts() {
    const data = await request({
      path: '/api/users/xxx/products',
      method: 'GET'
    })
    this.setData({
      purchasedServices: data ?? [],
    })
    console.log('products', data)
    },

}) 