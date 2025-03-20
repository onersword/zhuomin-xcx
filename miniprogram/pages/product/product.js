Page({
  data: {
    products: [
      {
        id: 1,
        name: "家庭医生套餐 基础版",
        description: "家庭微压氧舱体验不限次数，缓解疲劳，改善睡眠，提升脏器功能。",
        price: 4999,
        duration: "1年",
        type: 1,
      },
      {
        id: 2,
        name: "家庭医生套餐 升级版",
        description: "家庭微压氧舱体验不限次数，缓解疲劳，改善睡眠，提升脏器功能。",
        price: 8999,
        duration: "1年",
        type: 2
      },
      {
        id: 3,
        name: "家庭医生套餐 企业版",
        description: "家庭微压氧舱体验不限次数，缓解疲劳，改善睡眠，提升脏器功能。",
        price: 5000,
        duration: "1年",
        type: 3
      }
    ]
  },

  onLoad() {
    // 后续接入 API 时使用此代码
    // wx.cloud.callContainer({
    //   path: '/api/products',
    //   header: {
    //     'X-WX-SERVICE': 'mr-lao',
    //     'content-type': 'application/json',
    //     'Authorization': 'Bearer ' + wx.getStorageSync('token')
    //   },
    //   method: 'GET',
    //   success: (res) => {
    //     this.setData({
    //       products: res.data.products
    //     })
    //   }
    // })
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
    }
  }
}) 