const { request } = require('../../utils/request')
Page({
  data: {
    hasRecords: false,
    recordInfo: [{
      label: '档案编号',
      value: 'ZMCX2025001'
    }, {
      label: '建档日期',
      value: '2025-01-02'
    }]
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
  downloadPDF: function () {
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
    if (data.userInfo.status === 2) {
      const list = [];
      for (const key of Object.keys(data.records)) {
        list.push({
          label: key,
          value: data.records[key]
        })

      }

      this.setData({
        hasRecords: true,
        recordInfo: list
      })
    } else {
      this.setData({
        hasRecords: false,
      })
    }
  },

  createRecord() {
    console.log('createRecord')
    wx.openEmbeddedMiniProgram({
      appId: 'wxebadf544ddae62cb',
      path: 'pages/webview/index?sid=17551916&hash=d24d&navigateBackMiniProgram=true'
    })
  }
}); 