Component({
  properties: {
    year: {
      type: Number,
      value: 0,
      observer: function(newVal) {
        if (!newVal) {
          // 如果没有传值，设置为当前年份
          this.setData({
            currentYear: new Date().getFullYear()
          })
        } else {
          this.setData({
            currentYear: newVal
          })
        }
      }
    },
    month: {
      type: Number,
      value: 0,
      observer: function(newVal) {
        if (!newVal) {
          // 如果没有传值，设置为当前月份
          this.setData({
            currentMonth: new Date().getMonth() + 1
          })
        } else {
          this.setData({
            currentMonth: newVal
          })
        }
      }
    }
  },

  data: {
    currentYear: 0,
    currentMonth: 0
  },

  lifetimes: {
    attached() {
      // 组件初始化时，如果属性为默认值，则设置当前年月
      const { year, month } = this.properties
      if (!year) {
        this.setData({
          currentYear: new Date().getFullYear()
        })
      }
      if (!month) {
        this.setData({
          currentMonth: new Date().getMonth() + 1
        })
      }
    }
  }
}) 