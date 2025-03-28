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
    // Add download logic here
    const file = e.currentTarget.dataset.file
    console.log('Downloading file:', file)
    // Implement file download functionality
  }
})
