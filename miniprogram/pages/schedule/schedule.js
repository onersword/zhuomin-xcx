const { request } = require('../../utils/request')
Page({
  data: {
    scheduleList: [],
    calendarConfig: {
      highlightToday: true,
    },
    currentList: [],
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
      const now = new Date().getTime();
      const validReminders = res.filter(item => new Date(item.remindAt).getTime() >= now);
      
      this.setData({
        scheduleList: validReminders.map(item => {
          item.styleClass = ['schedule-coral', 'schedule-blue', 'schedule-purple'][Math.floor(Math.random() * 3)]
          return item;
        })
      })
      calendar.setTodos({
        pos: 'bottom', // 待办点标记位置 ['top', 'bottom']
        dates: validReminders.map(item => {
          return {
            showTodoLabel: true,
            year: new Date(item.remindAt).getFullYear(),
            month: new Date(item.remindAt).getMonth() + 1,
            date: new Date(item.remindAt).getDate(),
            todoText: item.description,
            color: '#F6945D',
          }
        })
      })
      this.getCurrentDateReminds(new Date().toLocaleDateString())
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
  handleAfterTapDate: function (e) {
    console.log('-- e --', e.detail)
    const date = `${e.detail.year}/${e.detail.month}/${e.detail.date}`;
    console.log('date', date, new Date(date))
    this.getCurrentDateReminds (date)

  },

  handleChangeMonth: function (e) {
    console.log('-- e --', e.detail)
    const date = `${e.detail.next.year}/${e.detail.next.month}/01`;
    console.log('date', date, new Date(date))
    this.getCurrentDateReminds (date)
  },

  getCurrentDateReminds(date) {
    const currentDate = new Date(date);
    const startTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getTime();
    const endTime = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0, 23, 59, 59).getTime();
    const now = new Date().getTime();
    console.log('range ', startTime, endTime, new Date(startTime), new Date(endTime))

    const list = [];
    this.data.scheduleList.forEach(item => {
      const time = new Date(item.remindAt).getTime();
      if (time <= endTime && time >= startTime && time >= now) {
        list.push(item);
      }
    })

    this.setData({
      currentList: list,
    })
  }
}) 