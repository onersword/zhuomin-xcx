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

  onShow() {
    // 页面显示时的逻辑
  },

  onPullDownRefresh() {
    // 下拉刷新逻辑
    wx.stopPullDownRefresh();
  }
}); 