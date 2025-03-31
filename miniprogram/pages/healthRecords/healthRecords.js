const { request } = require('../../utils/request')
Page({
  data: {
    hasRecords: false,
    recordPDFUrl: '',
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
        recordInfo: list,
        recordPDFUrl: data.pdfUrl
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
  },
  downloadPDF() {
    const file = this.data.recordPDFUrl
    console.log('Downloading file:', file)
    if (!file) {
      wx.showToast({
        title: '暂无档案',
        icon: 'none'
      })
      return
    }

    // Show loading toast
    wx.showLoading({
      title: '文件下载中...',
      mask: true
    })

    // Download file
    wx.downloadFile({
      url: file,
      success: (res) => {
        if (res.statusCode === 200) {
          // Open document after successful download
          wx.openDocument({
            filePath: res.tempFilePath,
            success: () => {
              console.log('File opened successfully')
            },
            fail: (error) => {
              console.error('Failed to open file:', error)
              wx.showToast({
                title: '打开文件失败',
                icon: 'none'
              })
            }
          })
        }
      },
      fail: (error) => {
        console.error('Download failed:', error)
        wx.showToast({
          title: '下载失败',
          icon: 'none'
        })
      },
      complete: () => {
        wx.hideLoading()
      }
    })
  }

}); 