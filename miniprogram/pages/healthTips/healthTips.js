const {request}= require('../../utils/request')

Page({
  data: {
    title: '健康小结',
    statusBarHeight: 0,
    tips: []
  },
  onLoad() {
    console.log('healthTips onLoad')
    this.setData({
      title: this.options.title
    })
    
    const systemInfo = wx.getSystemInfoSync()
    this.setData({
      statusBarHeight: systemInfo.statusBarHeight
    })

    this.getTips()
  },

  async getTips () {
    const data = await request({
      path: '/api/notes',
      method: 'GET',
    })
    console.log('tips', data)
    this.setData({
      tips: data.data
    })

  },
  handleBack() {
    wx.navigateBack({
      delta: 1
    })
  }
})  