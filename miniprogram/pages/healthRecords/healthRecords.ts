Page({
  
  onLoad() {
    // 页面加载时的逻辑
  },
  onShow() {
        if (typeof this.getTabBar === 'function' &&
          this.getTabBar()) {
          this.getTabBar().setData({
            selected: 1
          })
        }
  }
  
}); 