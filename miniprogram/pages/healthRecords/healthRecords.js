const { request } = require('../../utils/request')
Page({
  data: {
    userInfo: {
      recordId: 'ZMCX2025001',
      createDate: '2025-01-02',
      name: '饶宇',
      gender: '男',
      nationality: '中国',
      birthDate: '1976-11-06',
      idNumber: '3623***001X',
      address: '-----',
      phone: '-----'
    },
    medicalInfo: {
      insurance: '医保',
      medicalCare: '医保',
      occupation: '退休',
      emergencyContact: 'Sasa',
      relationship: '配偶',
      emergencyPhone: '-----',
      emergencyBirthDate: '1976-11-06',
      emergencyIdNumber: '3623***001X',
      emergencyAddress: '-----',
      emergencyContactPhone: '-----'
    }
  },

  onShow: function () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }

    this.getUserRecords()
  },

  // 下载PDF功能
  downloadPDF: function() {
    wx.showToast({
      title: 'PDF下载中...',
      icon: 'loading'
    });
  },

  async getUserRecords() {
    const data = await request({
      path: '/api/records',
      method: 'GET'
    })
    console.log('userRecords', data)
  }
}); 