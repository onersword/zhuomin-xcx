Page({
  data: {
    scheduleList: []
  },

  onLoad: function() {
    // 页面加载时初始化数据
    this.initScheduleData()
  },

  initScheduleData: function() {
    // mock数据使用时间戳
    const mockData = [
      { 
        id: 1,
        time: 1705026000000,  // 2024-01-12 09:00:00
        content: '晨会',
        styleClass: 'schedule-coral'
      },
      { 
        id: 2,
        time: 1705047000000,  // 2024-01-12 14:30:00
        content: '项目评审',
        styleClass: 'schedule-blue'
      },
      { 
        id: 3,
        time: 1705047000000,
        content: '团队会议',
        styleClass: 'schedule-purple'
      }
    ]
    
    // 格式化时间
    const formattedData = mockData.map(item => ({
      ...item,
      formattedTime: this.formatTimestamp(item.time)
    }))

    this.setData({
      scheduleList: formattedData
    })
  },

  formatTimestamp: function(timestamp) {
    const date = new Date(timestamp)
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    const hour = date.getHours().toString().padStart(2, '0')
    const minute = date.getMinutes().toString().padStart(2, '0')
    return `${year}-${month}-${day} ${hour}:${minute}`
  }
}) 