const { request } = require('../../utils/request.js')

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
        if (res) {
          const record = await request({
            path: '/api/records',
            method: 'GET',
          })
          console.log('record', record)
          if (record.userInfo.status === 1) {
            wx.redirectTo({
              url: '/pages/healthRecord/healthRecord'
            })
          }
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
  }
})