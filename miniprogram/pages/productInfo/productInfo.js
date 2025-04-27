const { formatPrice } = require('../../utils/util')
const { request } = require('../../utils/request')
Page({
  data: {
    hasBuyed: false,
    productInfo: {},
    loading: true
  },

  onLoad(options) {
    console.log('Received options:', options); // 调试日志
    this.getProductInfo(options.id)

    let hasBuyed = options.hasBuyed === '1' ? true : false;
    console.log('xxx hasBuyed', hasBuyed)


    this.setData({
      hasBuyed,
    });
  },

  async getProductInfo(id) {
    console.log('getProductInfo', id)
    const data = await request({
      path: '/api/products/' + id,
      method: 'GET',
    })
    console.log('getProductInfo res', data)
    data.formatPrice =formatPrice(data.price)
    this.setData({
      productInfo: data,
      loading: false
    })
  },

  // Contact button handler
  handleContact(options) {
    wx.openCustomerServiceChat({
      corpId: 'ww62badfd0b511d2ad',
      extInfo: {
        url: 'https://work.weixin.qq.com/kfid/kfccbe26094fa4bca51',
      },
      sendMessageTitle: '购买套餐: ' + this.data.productInfo.name,
      sendMessagePath: '/pages/productInfo/productInfo?id=' + this.data.productInfo.id,
      showMessageCard: true,
      success: () => {
        console.log('打开客服聊天界面成功, success')
      },
      fail: () => {
        console.log('打开客服聊天界面失败')
      }
    })
  }
})
