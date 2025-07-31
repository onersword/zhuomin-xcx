const { request } = require('../../utils/request')
Page({
  data: {
    status: 0,
    recordPDFUrl: '',
    recordInfo: [],
    loading: true,
    activeTab: 0,  // 当前激活的tab，默认为0
    files: [],
    notes: [],
  },

  // 切换tab方法
  switchTab(e) {
    const index = parseInt(e.currentTarget.dataset.index)
    this.setData({
      activeTab: index
    })
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
    this.getUserNotes();
    this.getUserFiles();
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

  async getUserNotes() {
    const data = await request({
      path: '/api/notes',
      method: 'GET'
    })
    console.log('userNotes', data)
    this.setData({
      notes: data
    })
  },

  async getUserFiles() {
    const data = await request({
      path: '/api/files',
      method: 'GET'
    })
    console.log('userFiles', data)
    this.setData({
      files: data
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
  },
  downloadFile(e) {
    // Get file info from dataset
    const file = e.currentTarget.dataset.file
    console.log('Downloading file:', file)
    
    // Show loading toast
    wx.showLoading({
      title: '文件下载中...',
      mask: true
    })

    // Download file
    wx.downloadFile({
      url: file.url,
      success: (res) => {
        if (res.statusCode === 200) {
          // Open document after successful download
          wx.openDocument({
            filePath: res.tempFilePath,
            showMenu: true,
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