Page({
  data: {
    isAuthorized: false,
    phoneNumber: '',
    nickName: ''
  },

  onLoad() {
    // 检查是否已授权
    this.checkAuthStatus()
  },

  checkAuthStatus() {
    try {
      const userInfo = wx.getStorageSync('userInfo')
      if (userInfo && userInfo.phoneNumber && userInfo.nickName) {
        this.setData({ isAuthorized: true })
      }
    } catch (e) {
      console.error('检查授权状态失败', e)
    }
  },

  async getPhoneNumber(e) {
    if (!e.detail.code) {
      wx.showToast({
        title: '获取手机号失败',
        icon: 'none'
      })
      return
    }

    try {
      wx.showLoading({ title: '获取中...' })
      
      // 发送 code 到后端解密获取手机号
      const res = await wx.request({
        url: 'YOUR_API_URL/getPhoneNumber',
        method: 'POST',
        data: {
          code: e.detail.code
        }
      })

      if (res.data.phoneNumber) {
        this.setData({ phoneNumber: res.data.phoneNumber })
        this.checkAllAuth()
      }

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

  onInputNickname(e) {
    const nickName = e.detail.value
    this.setData({ nickName })
    this.checkAllAuth()
  },

  checkAllAuth() {
    if (this.data.phoneNumber && this.data.nickName) {
      // 保存用户信息
      wx.setStorageSync('userInfo', {
        phoneNumber: this.data.phoneNumber,
        nickName: this.data.nickName
      })
      
      this.setData({ isAuthorized: true })
      
      wx.showToast({
        title: '授权成功',
        icon: 'success'
      })
    }
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