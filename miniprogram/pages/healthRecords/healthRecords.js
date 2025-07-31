const { request } = require('../../utils/request')
Page({
  data: {
    status: 0,
    recordPDFUrl: '',
    recordInfo: [],
    loading: true
  },

  // 脱敏处理方法
  desensitizeData(records) {
    return records.map(item => {
      if (!item.value) return item
      
      const value = item.value.toString()
      
      // 手机号脱敏：前三后三
      if (item.label === '手机号' && value.length >= 6) {
        const prefix = value.substring(0, 3)
        const suffix = value.substring(value.length - 3)
        const stars = '*'.repeat(value.length - 6)
        item.value = prefix + stars + suffix
      }
      
      // 身份证号/护照号脱敏：前三后三
      if (item.label === '身份证号/护照号' && value.length >= 6) {
        const prefix = value.substring(0, 3)
        const suffix = value.substring(value.length - 3)
        const stars = '*'.repeat(value.length - 6)
        item.value = prefix + stars + suffix
      }
      
      // 紧急联系人电话脱敏：前三后三
      if (item.label === '紧急联系人电话' && value.length >= 6) {
        const prefix = value.substring(0, 3)
        const suffix = value.substring(value.length - 3)
        const stars = '*'.repeat(value.length - 6)
        item.value = prefix + stars + suffix
      }
      
      return item
    })
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
      // 对敏感信息进行脱敏处理
      const processedRecords = this.desensitizeData(data.records)

      this.setData({
        status: data.userInfo.status,
        recordInfo: processedRecords,
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