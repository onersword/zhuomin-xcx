Page({
  data: {
    // ... existing code ...
  },

  getPhoneNumber(e) {
    console.log(e);
    if (!e.detail.code) {
      wx.showToast({
        title: '获取手机号失败',
        icon: 'none'
      })
    }
  },

  // 处理微信登录
  handleLogin() {
    // 调用云托管服务
    wx.cloud.callContainer({
      "path": "/api/login",
      "header": {
        "X-WX-SERVICE": "mr-lao",
        "content-type": "application/json"
      },
      "method": "POST",
      "data": "",
      success: (res) => {
        if (res.data.token) {
          wx.setStorageSync('token', res.data.token);
          wx.redirectTo({
            url: '/pages/register/register'
          });
        } else {
          wx.showToast({
            title: '登录失败',
            icon: 'none'
          });
        }
      },
      fail: (err) => {
        console.error('请求失败：', err);
      }
    });

  }
}); 