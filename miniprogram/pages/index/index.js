// index.js
Page({
  data: {
    motto: 'Hello World',
    userInfo: {
      avatarUrl: '',
      nickName: ''
    },
    hasUserInfo: false,
    canIUseGetUserProfile: false,
    canIUseNicknameComp: true,
    calendarConfig: {
      hideHeader: true,
      weekMode:false,
    },
    targetDate: 1735660800000  // 2025-01-01 00:00:00
  },
  
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
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

  onChooseAvatar(e) {
    const { avatarUrl } = e.detail
    this.setData({
      "userInfo.avatarUrl": avatarUrl
    })
  },

  onInputChange(e) {
    const nickName = e.detail.value
    this.setData({
      "userInfo.nickName": nickName
    })
  },

  onShow() {
    // ... existing code ...
  }
}) 