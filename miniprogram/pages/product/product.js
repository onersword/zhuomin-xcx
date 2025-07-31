const { request } = require('../../utils/request')

Page({
  data: {
    loading: false
  },

  onLoad() {
    // 页面加载完成
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
    }
  },

  // 购买按钮点击事件
  onPurchase() {
    wx.showModal({
      title: '购买确认',
      content: '您确定要购买卓敏家庭医生充值卡吗？',
      success: (res) => {
        if (res.confirm) {
          // 这里可以添加实际的购买逻辑
          wx.showToast({
            title: '购买成功',
            icon: 'success',
            duration: 2000
          })
          
          // 可以跳转到支付页面或联系客服
          setTimeout(() => {
            wx.showModal({
              title: '联系客服',
              content: '如需购买，请联系客服：400-xxx-xxxx',
              showCancel: false,
              confirmText: '确定'
            })
          }, 2000)
        }
      }
    })
  },
  connectUs() {
    wx.openCustomerServiceChat({
      corpId: 'ww62badfd0b511d2ad',
      extInfo: {
        url: 'https://work.weixin.qq.com/kfid/kfccbe26094fa4bca51',
      },
      showMessageCard: false,
      success: () => {
        console.log('打开客服聊天界面成功, success')
      },
      fail: () => {
        console.log('打开客服聊天界面失败')
      }
    })
  }
})