const {request}= require('../../utils/request')

Page({
  data: {
    title: '健康小结',
    statusBarHeight: 0,
    tips: [
    ]
  },
  onLoad() {
    const systemInfo = wx.getSystemInfoSync()
    this.setData({
      statusBarHeight: systemInfo.statusBarHeight
    })

    // 如果需要从服务器获取数据，可以取消注释下面这行
    this.getTips()
  },

  async getTips () {
    const data = await request({
      path: '/api/notes',
      method: 'GET',
    })
    console.log('tips', data)
    this.setData({
      tips: data ?? []
    })

  },
  handleBack() {
    wx.navigateBack({
      delta: 1
    })
  }
})  