Component({
  data: {
    selected: 0,
    list: [{
      pagePath: "/pages/index/index",
      text: "首页"
    }]
  },
  
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({
        url
      })
      this.setData({
        selected: data.index
      })
    }
  }
}) 