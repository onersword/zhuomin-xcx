const { request } = require('../../utils/request.js')

Page({
  data: {
    // ... existing code ...
  },
  async getPhoneNumber(e) {
    if (!e.detail.code) {
      wx.showToast({
        title: '获取手机号失败',
        icon: 'none'
      })
      return
    }
    console.log('e.detail.code', e.detail.code)

    try {
      wx.showLoading({ title: '获取中...' })


      // Use the new request utility
      const res = await request({
        path: '/api/register',
        method: 'POST',
        data: {
          code: e.detail.code
        }
      })
      console.log('res', res)
      console.log('jump to index')
      wx.redirectTo({
        url: '/pages/index/index'
      })


    } catch (error) {
      console.error('获取手机号失败', error)
      wx.showToast({
        title: '获取手机号失败',
        icon: 'error'
      })
    } finally {
      wx.hideLoading()
    }
  },

  register(phoneNumber) {

  },


});