Page({
  data: {
    // ... existing code ...
  },

  // 获取手机号
  getPhoneNumber(e) {
    if (e.detail.errMsg === "getPhoneNumber:ok") {
      const token = wx.getStorageSync('token');
      wx.request({
        url: 'https://mr-lao-146870-5-1345362468.sh.run.tcloudbase.com/api/register',
        method: 'POST',
        header: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        data: {
          code: e.detail.code
        },
        success: (res) => {
          if (res.data.phoneNumber) {
            wx.setStorageSync('isRegistered', true);
            wx.redirectTo({
              url: '/pages/index/index'
            });
          }
        },
        fail: () => {
          wx.showToast({
            title: '注册失败',
            icon: 'none'
          });
        }
      });
    }
  }
}); 