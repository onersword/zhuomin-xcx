const { request } = require('../../utils/request')
Page({
  data: {
    status: 0,
    recordPDFUrl: '',
    recordInfo: [],
    loading: true
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
    this.setData({
      loading: true
    })
    const data = await request({
      path: '/api/records',
      method: 'GET'
    })
    console.log('userRecords', data)
    if (data.userInfo.status === 2) {

      this.setData({
        status: data.userInfo.status,
        recordInfo:data.records,
        recordPDFUrl: data.pdfUrl
      })
    } else {
      this.setData({
        status: data.userInfo.status,
      })
    }
    this.setData({
      loading: false
    })
  },

  createRecord() {
    console.log('createRecord')
    wx.navigateTo({
      url: '/pages/addRecord/addRecord'
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

    wx.downloadFile({
      url: this.data.recordPDFUrl, // 文件的URL
      success: (res) => {
        const filePath = res.tempFilePath; // 下载后的临时文件路径
        wx.hideLoading();
        wx.openDocument({
          filePath: filePath,
          fileType: 'pdf', // 根据文件类型设置
          showMenu: true,
          success: () => {
            console.log('打开文档成功');
          }
        });
      },
      fail: function (err) {
        console.error('下载失败', err);
      }
    });
  }

}); 