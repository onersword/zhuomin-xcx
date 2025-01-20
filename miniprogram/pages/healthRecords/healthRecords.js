Page({
  data: {
    currentDate: '',
  },

  onLoad() {
    // 设置当前日期
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    this.setData({
      currentDate: `${year}-${month}-${day}`
    });
  },

  onShow: function() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }

},

  onPullDownRefresh() {
    // 下拉刷新逻辑
    wx.stopPullDownRefresh();
  }
}); 