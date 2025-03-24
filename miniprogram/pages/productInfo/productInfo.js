Page({
  data: {
    // Product information data
    productInfo: {
      title: '家庭医生套餐 基础版',
      price: 4999,
      duration: '1年'
    }
  },

  // Contact button handler
  handleContact() {
    wx.showToast({
      title: '正在连接客服...',
      icon: 'loading'
    });
  }
})
