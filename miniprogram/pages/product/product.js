Page({
  data: {
    products: []
  },

  onLoad() {
    // 初始化产品数据
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2  // 设置选中的 tab
      })
    }
  }
}) 