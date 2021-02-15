//http.js
class HTTP {
  request ({
    url,
    data,
    method,
    notNeedAuthor, // 是否需要token
    notVerification // 是否需要统一处理错误信息
  }) {
    return new Promise((resolve, reject) => {
      this._request(url, resolve, reject, data, method, notNeedAuthor, notVerification)
    })
  }
  //封装wx.request
  /**
   *
   * @param {请求地址的后缀} url
   * @param {默认为空，请求的数据} data
   * @param {默认为GET} method
   * @param {默认为false, 是否需要token} notNeedAuthor
   * @param {默认为false, 是否统一的错误处理} notVerification
   */
  _request(url, resolve, reject, data = {}, method = "GET", notNeedAuthor = false, notVerification = false) {
    let obj = {
      url: url,
      data: data,
      header: {
        'content-type': 'application/json'
      },
      method: method,
      success (res) {
        const code = res.statusCode.toString() // 请求状态码
        if (code.startsWith('2')) {
          if (res.data.status !== 200 && !notVerification) {
            // 需要统一的错误处理
            const errorMsg = res.data.msg || res.data.errorMsg || '抱歉！服务器有点忙'
            wx.showToast({
              title: errorMsg,
              icon: 'none',
              duration: 2000,
            });
          }
          resolve(res.data)
        } else {
          console.log('处理异常res', res)
          //处理异常
          const errorMsg = res.data.msg || res.data.errorMsg || '抱歉！服务器有点忙'
          if(!notVerification){
            wx.showToast({
              title: errorMsg,
              icon: 'none',
              duration: 2000,
            });
          }
          if (res.data.status == '401' || res.data.status == '403') {
            wx.navigateTo({
              url: '/pages/userlogin/userlogin',
            })
          }
          reject(res.data)
       }
      },
      fail: (err) => {
        wx.showToast({
          title: '抱歉！服务器有点忙',
          icon: 'none',
          duration: 2000
        });
        reject(err)
      },
      complete: () => {
      }
    }
    !notNeedAuthor && (obj.header.Authorization = wx.getStorageSync('VIP-openinfo').token || '') // 不需要token
    wx.request(obj)
  }
}
export {
  HTTP
}
