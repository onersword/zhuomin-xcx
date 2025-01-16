Page({
  data: {
    selected: 2  // 表示当前选中的是第三个 tab
  },

  onLoad() {
    // 页面加载时的逻辑
  },

  onShow() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
    }
  }
}); 