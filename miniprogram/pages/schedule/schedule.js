Page({
  data: {
    scheduleList: [],
    calendarConfig: {
      highlightToday: true,
    }
  },

  onLoad: function() {
    // 页面加载时初始化数据
    this.initScheduleData()
  },
  onShow: function() {
  },
  onReady: function() {
    const calendar = this.selectComponent('#calendar').calendar;
    console.log('-- calendar --', calendar);
    
    calendar.setTodos({
      pos: 'bottom', // 待办点标记位置 ['top', 'bottom']
      dates: [
        {
          showTodoLabel: true,
          year: 2025,
          month: 1,
          date: 23,
          todoText: '待办',
          color: '#F6945D',
        },

        {
          showTodoLabel: true,
          year: 2025,
          month: 1,
          date: 25,
          todoText: '待办',
          color: '#77E1CD',
        },

        {
          showTodoLabel: true,
          year: 2025,
          month: 1,
          date: 28,
          todoText: '待办',
          color: '#CA87E7',
        },
      ]
    })
    const todos = calendar.getTodos();
    console.log('-- todos --', todos);
  },

  initScheduleData: function() {
    // mock数据使用时间戳
    const mockData = [
      { 
        id: 1,
        time: 1705026000000,  // 2024-01-12 09:00:00
        content: '这是一个日程提醒标题',
        styleClass: 'schedule-coral'
      },
      { 
        id: 2,
        time: 1705047000000,  // 2024-01-12 14:30:00
        content: '这是一个日程提醒标题',
        styleClass: 'schedule-blue'
      },
      { 
        id: 3,
        time: 1705047000000,
        content: '项目评审',
        styleClass: 'schedule-purple'
      }
    ]
    

    this.setData({
      scheduleList:mockData
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