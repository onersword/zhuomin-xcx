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
    reminders: [],
    cards: [],
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
      this.setData({
        needShowLogin: true
      })
      return;
    }
    console.log('records', data);
    if (!data.userInfo.phoneNumber) {
      this.setData({
        needShowLogin: true
      })
      return;
    } else {

      this.setData({
        needShowLogin: false,
      })
    }
    const healthManageList = { note: null, file: null };
    if (data.latestFile) {
      healthManageList.file = data.latestFile;
    }
    if (data.cards) {
      console.log('cards', data.cards);
      this.setData({
        cards: data.cards
      })
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
      const now = new Date();
      const currentWeekStart = new Date(now);
      currentWeekStart.setDate(now.getDate() - now.getDay()); // Set to start of current week (Sunday)
      const nextWeekStart = new Date(currentWeekStart);
      nextWeekStart.setDate(currentWeekStart.getDate() + 7); // Set to start of next week

      // Filter out expired reminders and get current week's reminders
      const currentWeekReminders = data.filter(reminder => {
        const reminderTime = new Date(reminder.remindAt);
        return reminderTime >= now && // Not expired
               reminderTime >= currentWeekStart && // After start of current week
               reminderTime < nextWeekStart; // Before start of next week
      });

      console.log('xxx index currentWeekReminders', currentWeekReminders)
      this.setData({
        reminders: currentWeekReminders
      });
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
    
    wx.switchTab({
      url: '/pages/product/product',
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    });
  }

}) 