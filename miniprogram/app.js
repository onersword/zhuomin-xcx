const { request } = require("./utils/request");

App({
  globalData: {
    userInfo: null
  },
  
  onLaunch() {
    // wx.showLoading({
    //   title: '加载中',
    //   mask: true
    // });
    // 初始化云开发
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'prod-8gvh8k8d1aeb0797',
        traceUser: true,
      })
    }
    

    // 执行微信登录
    wx.login({
      success: res => {
        if (res.code) {
          console.log('登录成功，获取到code：', res.code);
          // 调用云托管登录接口
          request({
            path: '/api/login',
            method: 'POST',
            data: {
              code: res.code
            }
          }).then(data=> {
            console.log('jwt'.data);
            if (data) {
              wx.setStorageSync('token', data.token);
              // TODO
            }
          })
        }
      },
      fail: () => {
        console.log('登录失败');
        wx.redirectTo({
          url: '/pages/login/login'
        });
      }
    });

    // // 检查登录状态
    // const token = wx.getStorageSync('token');
    // const isRegistered = wx.getStorageSync('isRegistered');
    
    // if (!token) {
    //   wx.redirectTo({
    //     url: '/pages/login/login'
    //   });
    // } else if (!isRegistered) {
    //   wx.redirectTo({
    //     url: '/pages/register/register'
    //   });
    // }
  }
}); 