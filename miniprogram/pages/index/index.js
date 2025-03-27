const { request } = require('../../utils/request.js')
// index.js
Page({
  data: {
    userInfo: {
      avatarUrl: '',
      nickName: ''
    },
    hasUserInfo: false,
    canIUseGetUserProfile: false,
    canIUseNicknameComp: true,
    calendarConfig: {
      hideHeader: true,
      weekMode: false,
    },
    targetDate: 1735660800000,  // 2025-01-01 00:00:00
    healthManageList: [
 
    ],
    purchasedServices: [
   
    ]
  },

  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })

    }
    // 查看是否授权
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: (res) => {
              console.log(res.userInfo)
              this.setData({
                userInfo: res.userInfo,
                hasUserInfo: true
              })
            }
          })
        }
      }
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

    this.getReminders()
    this.getProducts();
    this.getFiles();
  },

  async getReminders() {
    const data = request({
      path: '/api/reminders',
      method: 'GET'
    })
    console.log('reminders', data)
  },

  async getProducts() {
    const data = request({
      path: '/api/products',
      method: 'GET'
    })
    console.log('products', data)
  },
  async getFiles() {
    const data = request({
      path: '/api/files',
      method: 'GET'
    })
    console.log('files', data)
  }
}) 