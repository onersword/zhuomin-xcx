Component({
  properties: {
    name: {
      type: String,
      observer: function (newVal) {
        this.setData({
          name: newVal
        })
      }
    },
    description: {
      type: String,
      observer: function (newVal) {
        console.log('new value description', newVal)
        this.setData({
          description: newVal
        })
      }
    },
  },
  data: {
    name: '',
    description: ''
  },

  methods: {
    onTap() {
      this.triggerEvent('cardtap', {
      })
    }
  }
})
