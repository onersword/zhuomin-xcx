const { request } = require('../../utils/request')

Page({
  data: {
    products: [

    ],
    otherProducts: [

    ]
  },

  // 添加价格格式化方法
  formatPrice: function (price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  },

  onLoad() {
    this.getProducts()
    // 在数据加载后打印检查
    console.log('Products:', this.data.products)
    console.log('Other Products:', this.data.otherProducts)
  },

  async getProducts() {
    const data = await request({
      path: '/api/products',
      method: 'GET',
    })

    const p = [];
    const op = [];
    for (const item of data) {
      if (item.type === 0) {
        op.push(item)

      } else {
        p.push(item)
      }

    }

    this.setData({
      products: p.sort((a, b) => a.type - b.type),
      otherProducts: op
    })

  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
    }
  },

  // 跳转至产品详情页
  navigateToProductInfo(e) {
    console.log('navigateToProductInfo', e.currentTarget.dataset)
    const { id, type, name, description, price, unit } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/productInfo/productInfo?id=${id}&type=${type}&name=${name}&description=${description}&price=${price}&unit=${unit}`
    });
  }
})