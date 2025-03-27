const {request}= require('../../utils/request')

Page({
  data: {
    title: '体检报告',
    statusBarHeight: 0,
    reports: [
      {
        createTime: '2025.1.16 14:25',
        content: '体检报告20250125.PDF',
        file: 'https://636c-cloud1-2g3w0puta97f2130-1345362468.tcb.qcloud.la/bg.jpeg?sign=d3381bf0a834bc64aa829e734be04a5b&t=1740662788',
      },

      {
        createTime: '2025.1.16 14:25',
        content: '体检报告20250125.PDF',
        file: 'https://636c-cloud1-2g3w0puta97f2130-1345362468.tcb.qcloud.la/bg.jpeg?sign=d3381bf0a834bc64aa829e734be04a5b&t=1740662788',
      },
      {
        createTime: '2025.1.16 14:25',
        content: '体检报告20250125.PDF',
        file: 'https://636c-cloud1-2g3w0puta97f2130-1345362468.tcb.qcloud.la/bg.jpeg?sign=d3381bf0a834bc64aa829e734be04a5b&t=1740662788',
      },
      {
        createTime: '2025.1.16 14:25',
        content: '体检报告20250125.PDF',
        file: 'https://636c-cloud1-2g3w0puta97f2130-1345362468.tcb.qcloud.la/bg.jpeg?sign=d3381bf0a834bc64aa829e734be04a5b&t=1740662788',
      },
      {
        createTime: '2025.1.16 14:25',
        content: '体检报告20250125.PDF',
        file: 'https://636c-cloud1-2g3w0puta97f2130-1345362468.tcb.qcloud.la/bg.jpeg?sign=d3381bf0a834bc64aa829e734be04a5b&t=1740662788',
      },

    ]
  },
  onLoad() {
    
    const systemInfo = wx.getSystemInfoSync()
    this.setData({
      statusBarHeight: systemInfo.statusBarHeight
    })

    // 如果需要从服务器获取数据，可以取消注释下面这行
    // this.getTips()
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