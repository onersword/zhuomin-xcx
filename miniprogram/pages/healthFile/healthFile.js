const {request}= require('../../utils/request')

Page({
  data: {
    title: '体检报告',
    statusBarHeight: 0,
    files: []
  },
  onLoad() {
    const systemInfo = wx.getSystemInfoSync()
    this.setData({
      statusBarHeight: systemInfo.statusBarHeight
    })

    // Get files from server
    this.getFiles()
  },

  async getFiles() {
    const data = await request({
      path: '/api/files',
      method: 'GET',
    })
    console.log('files', data)
    this.setData({
      files: data ?? []
    })
  },

  handleBack() {
    wx.navigateBack({
      delta: 1
    })
  },

  handleDownload(e) {
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
})
