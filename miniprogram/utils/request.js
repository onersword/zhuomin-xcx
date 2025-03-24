// Default config for requests
const DEFAULT_HEADER = {
  'X-WX-SERVICE': 'mr-lao',
  'content-type': 'application/json'
}

const BASE_URL = 'https://mr-lao-146870-5-1345362468.sh.run.tcloudbase.com'

// Request function wrapper
const request = async (options) => {
  // Get token from storage
  const token = wx.getStorageSync('token')

  // Merge headers
  const header = {
    ...DEFAULT_HEADER,
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.header
  }

  // Make request
  try {
    return new Promise((resolve, reject) => {
      // wx.cloud.callContainer({
      //   path: options.path,
      //   method: options.method || 'GET',
      //   data: options.data,
      //   header,
      //   success: (res) => {
      //     // Handle response
      //     if (res.statusCode === 401) {
      //       // Token expired or invalid, redirect to login
      //       wx.redirectTo({ url: '/pages/login/login' })
      //       reject(new Error('Unauthorized'))
      //       return
      //     }
      //     resolve(res.data)
      //   },
      //   fail: (error) => {
      //     console.error('Request failed:', error)
      //     reject(error)
      //   }
      // })
      wx.request({
        url: `${BASE_URL}${options.path}`,
        method: options.method || 'GET',
        data: options.data,
        header,
        success: (res) => {
          if (res.statusCode === 401) {
            // Token expired or invalid, redirect to login
            wx.redirectTo({ url: '/pages/login/login' })
            reject(new Error('Unauthorized'))
            return
          }
          resolve(res.data)
        },
        fail: (error) => {
          reject(error)
        }
      })

    })
  } catch (error) {
    console.error('Request failed:', error)
    throw error
  }
}

module.exports = {
  request
} 