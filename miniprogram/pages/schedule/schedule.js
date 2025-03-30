const { request } = require('../../utils/request')
Page({
  data: {
    scheduleList: [],
    calendarConfig: {
      highlightToday: true,
    }
  },

  onLoad: function () {
    // 页面加载时初始化数据
    this.initScheduleData()
  },
  onShow: function () {
  },

  onReady: function () {
    const calendar = this.selectComponent('#calendar').calendar;
    console.log('-- calendar --', calendar);
    console.log('-- scheduleList --', this.data.scheduleList);
    request({
      path: '/api/reminders',
      method: 'GET'
    }).then(res => {
      console.log('-- res --', res)
      this.setData({
        scheduleList: res.map(item => {
          item.styleClass = ['schedule-coral', 'schedule-blue', 'schedule-purple'][Math.floor(Math.random() * 3)]
          return item;
        })
      })
      calendar.setTodos({
        pos: 'bottom', // 待办点标记位置 ['top', 'bottom']
        dates: res.map(item => {
          return {
            showTodoLabel: true,
            year: new Date(item.remindAt).getFullYear(),
            month: new Date(item.remindAt).getMonth() + 1,
            date: new Date(item.remindAt).getDate(),
            todoText: item.description,
            color: '#F6945D',
          }

          // {
          //   showTodoLabel: true,
          //   year: 2025,
          //   month: 1,
          //   date: 28,
          //   todoText: '待办',
          //   color: '#CA87E7',
          // },
        })
      })
    })
  },

  initScheduleData: function () {

    // mock数据使用时间戳
    // const mockData = [
    //   { 
    //     id: 1,
    //     time: new Date(2025, 0, 23).getTime(),  // 2025-01-23
    //     content: '这是一个日程提醒标题',
    //     styleClass: 'schedule-coral'
    //   },
    //   { 
    //     id: 2,
    //     time: new Date(2025, 0, 25).getTime(),  // 2025-01-25
    //     content: '这是一个日程提醒标题',
    //     styleClass: 'schedule-blue'
    //   },
    //   { 
    //     id: 3,
    //     time: new Date(2025, 0, 28).getTime(),  // 2025-01-28
    //     content: '项目评审',
    //     styleClass: 'schedule-purple'
    //   }
    // ]


    // this.setData({
    //   scheduleList:mockData
    // })
  },
}) 