Component({
  properties: {
    // 时间
    time: {
      type: String,
      value: ''
    },
    // 内容
    content: {
      type: String,
      value: ''
    },
    // 样式类名：schedule-coral/schedule-blue/schedule-purple
    styleClass: {
      type: String,
      value: ''
    }
  },

  data: {},

  methods: {
    // 点击日程项
    onTapSchedule() {
      const { time, content, styleClass } = this.properties
      this.triggerEvent('tap', {
        time,
        content,
        styleClass
      })
    }
  }
}) 