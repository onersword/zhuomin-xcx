Page({
  data: {
    isAuthorized: false,
    phoneNumber: '',
    nickName: '',
    openid: ''
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 3  // 设置选中的 tab，因为是第四个标签页
      })
    }
  },

  // 复制联系方式
  copyContact(e) {
    const text = e.currentTarget.dataset.text
    wx.setClipboardData({
      data: text,
      success() {
        wx.showToast({
          title: '复制成功',
          icon: 'success'
        })
      }
    })
  }
}) 