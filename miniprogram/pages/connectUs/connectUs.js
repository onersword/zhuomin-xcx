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

  connectUs() {
    wx.openCustomerServiceChat({
      corpId: 'ww62badfd0b511d2ad',
      extInfo: {
        url: 'https://work.weixin.qq.com/kfid/kfccbe26094fa4bca51',
      },
      sendMessageTitle: '联系客服',
      sendMessagePath: '/pages/connectUs/connectUs',
      showMessageCard: true,
      success: () => {
        console.log('打开客服聊天界面成功, success')
      },
      fail: () => {
        console.log('打开客服聊天界面失败')
      }
    })
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