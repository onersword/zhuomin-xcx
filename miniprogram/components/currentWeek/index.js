Component({
  properties: {
    // 添加时间戳属性
    timestamp: {
      type: Number,
      value: Date.now(), // 默认使用当前时间
      observer: function(newVal) {
        this.getCurrentWeek(newVal)
      }
    }
  },

  data: {
    weekDays: [],
    weekDayNames: ['日', '一', '二', '三', '四', '五', '六'],
    currentMonth: 1,  // 添加当前月份记录
    currentYear: 2024,  // 添加当前年份
    targetDate: null  // 改为目标日期
  },

  lifetimes: {
    attached() {
      this.getCurrentWeek(this.data.timestamp)
    }
  },

  methods: {
    getCurrentWeek(timestamp) {
      const targetDate = new Date(timestamp)
      const today = new Date() // 用于判断是否是今天
      const currentDay = targetDate.getDay() // 获取目标日期是周几 (0-6)
      const weekDays = []
      
      // 记录目标日期的年份和月份
      const targetMonth = targetDate.getMonth() + 1
      const targetYear = targetDate.getFullYear()
      
      // 计算目标日期所在周的起始日期（周日）
      const firstDay = new Date(targetDate)
      firstDay.setDate(targetDate.getDate() - currentDay)
      
      // 生成这一周的日期数组
      for (let i = 0; i < 7; i++) {
        const date = new Date(firstDay)
        date.setDate(firstDay.getDate() + i)
        
        weekDays.push({
          date: date.getDate(),
          month: date.getMonth() + 1,
          isToday: this.isSameDay(date, today),
          fullDate: date,
          isCurrentMonth: (date.getMonth() + 1) === targetMonth,
          isTarget: this.isSameDay(date, targetDate)  // 判断是否是目标日期
        })
      }
      
      this.setData({ 
        weekDays,
        currentMonth: targetMonth,
        currentYear: targetYear,  // 设置年份
        targetDate: targetDate
      })
    },

    isSameDay(date1, date2) {
      return date1.getDate() === date2.getDate() &&
             date1.getMonth() === date2.getMonth() &&
             date1.getFullYear() === date2.getFullYear()
    }
  }
}) 