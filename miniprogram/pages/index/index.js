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
    targetDate: 1735660800000,  // 2025-01-01 00:00:00
    healthManageList: [
          {
            title: '健康小结',
            time: 1705385100000, // 2025.1.16 14:25
            url: '/pages/health/summary/index'
          },
          {
            title: '您也需要一个家庭医生',
            time: 1705385100000,
            url: '/pages/health/doctor/index'
          },
          {
            title: '多维度全面健康评估服务包',
            time: 1705385100000,
            url: '/pages/health/assessment/index'
          },
          {
            title: '慢性病管理 报告',
            time: 1705385100000,
            url: '/pages/health/chronic/index'
          },
          {
            title: '2025年一月健康小结',
            time: 1705385100000,
            url: '/pages/health/monthly/index'
          }
        ],
    purchasedServices: [
      {
        id: 1,
        name: '2025年度体检计划',
        description: '在科学管理的决策中走一步来参与课题主手作用组织学习服管理理论的新方法和新理论',
        icon: '../../images/service1.png' // 这里使用一个占位图片
      },
      {
        id: 2,
        name: '2025年度体检计划',
        description: '在科学管理的决策中走一步来参与课题主手作用组织学习服管理理论的新方法和新理论',
        icon:  '../../images/service2.png'// 这里使用一个占位图片
      }
    ]
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