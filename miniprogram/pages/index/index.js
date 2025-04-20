const { request } = require('../../utils/request.js')
// index.js
Page({
  data: {
    needShowLogin: false,
    loading: false,
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

    ],
    reminders: []
  },

  onLoad() {
    const app = getApp();

    // 保存回调函数的引用，以便之后可以移除
    this.loginCallback = (isLoggedIn) => {
      if (isLoggedIn) {
        this.fetchPageData();
      }
    };
    this.bindPhoneCallback = (isBindPhone) => {
      if (isBindPhone) {
        console.log('xxx isBindPhone', isBindPhone)
        this.fetchPageData();
      }
    }

    // 添加监听器
    app.watchLoginStatus(this.loginCallback);
    app.watchBindPhoneStatus(this.bindPhoneCallback);
    this.setData({
      loading: true
    })
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

  // 添加下拉刷新处理函数
  onPullDownRefresh() {
    this.fetchPageData(false).then(() => {
      wx.stopPullDownRefresh()
    })
  },

  async fetchPageData(showLoading = true) {
    this.setData({
      loading: true
    })
    await this.getProducts();
    await this.getReminders();
    await this.getRecords();
    this.setData({
      loading: false
    })
  },

  async getRecords() {
    const app = getApp();
    const data = await request({
      path: '/api/records',
      method: 'GET',
    })
    console.log('xxx index getRecords', data)
    if (data && data.error) {
      return;
    }
    console.log('records', data);
    if (data.userInfo.status === 0) {
      this.setData({
        needShowLogin: true
      })
      return;
    }
    if (data.userInfo.status >= 1) {
      this.setData({
        needShowLogin: false,
      })
    }
    if (data.userInfo.status === 1 && !app.globalData.isRedirectToHealthRecord) {
      wx.redirectTo({
        url: '/pages/healthRecord/healthRecord'
      })
      app.globalData.isRedirectToHealthRecord = true;
    }
    const healthManageList = { note: null, file: null };
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
    if (data && data.error) {
      return;
    }
    if (Array.isArray(data)) {
      // Filter out expired reminders first
      const now = new Date();
      const validReminders = data.filter(reminder => {
        return new Date(reminder.remindAt) >= now;
      });

      // Filter reminders for today
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      console.log('xxx index getReminders', validReminders)
      const todayReminders = validReminders.filter(reminder => {
        const reminderTime = new Date(reminder.remindAt);
        return reminderTime >= today && reminderTime < tomorrow;
      });
      console.log('xxx index todayReminders', todayReminders)

      this.setData({
        reminders: todayReminders
      });
      console.log('today reminders', todayReminders);
    }

  },

  async getProducts() {
    const data = await request({
      path: '/api/users/xxx/products',
      method: 'GET'
    })
    if (data && data.error) {
      return;
    }
    if (Array.isArray(data)) {
      this.setData({
        purchasedServices: data ?? [],
      })
    }
    console.log('products', data)
  },

  navigateToProductInfo(e) {
    console.log('navigateToProductInfo', e.currentTarget.dataset)
    const { id, type, name, description, price, unit } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/productInfo/productInfo?id=${id}&type=${type}&name=${name}&description=${description}&price=${price}&unit=${unit}&hasBuyed=1`
    });
  }

}) 