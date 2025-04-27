const { request } = require('../../utils/request')

Page({
  data: {
    products: [

    ],
    otherProducts: [

    ],
    loading: true
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
    this.setData({
      loading: true
    })
    const data = await request({
      path: '/api/products',
      method: 'GET',
    })

    const p = [];
    const op = [];
    for (const item of data) {
      if (item.status !== 1) {
        continue;
      }
      if (item.type === 0) {
        op.push(item)

      } else {
        p.push(item)
      }

    }
    
    this.setData({
      loading: false,
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
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/productInfo/productInfo?id=${id}`
    });
  }
})