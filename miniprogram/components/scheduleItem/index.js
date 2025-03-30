import { formatTime } from '../../utils/util'

Component({
  properties: {
    // 修改 time 属性为时间戳
    time: {
      type: String,
      value: 0,
      observer: function(newVal) {
        if (newVal) {
          // 将时间戳转换为格式化的时间字符串
          const formattedTime = formatTime(new Date(newVal))
          this.setData({
            formattedTime: formattedTime
          })
        }
      }
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

  data: {
    formattedTime: ''  // 添加新的数据属性存储格式化后的时间
  },

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