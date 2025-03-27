Component({
  methods: {
    doLogin(e) {
      // Get user info and login
      wx.getUserProfile({
        desc: '用于完善用户资料',
        success: (res) => {
          // Trigger login event
          this.triggerEvent('login', res.userInfo);
        },
        fail: (err) => {
          wx.showToast({
            title: '登录失败',
            icon: 'none'
          });
        }
      });
    }
  }
})