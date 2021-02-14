//app.js
import wxPromisify from "./utils/wxPromisify";
wx.$wxPromisify = wxPromisify
let loadUser = false // 用户信息是否加载完成-
let loadTel = false // 注册流程中一个接口是否成功返回
let loginTips = false // 是否需要登录提示
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  async _wxlogin() {
    let that = this
    let res = await wx.$wxPromisify(wx.login) // 跟下面一个不要换位置
    let _res = await wx.$wxPromisify(wx.getSetting)
    if (_res.authSetting['scope.userInfo']) {
      // 已经授权
      let result = await wx.$wxPromisify(wx.getUserInfo, { lang: 'zh_CN', withCredentials: true })
      that.globalData.userInfo = result
      wx.setStorageSync('VIP-userInfo', result)
      loadUser = true
      return res.code
    }
  },
  async _loginAll(ifshowLoading = true, refresh=false) {
    // if (this.globalData.loginInfo.id && !refresh) return true
    this.globalData.openIdInfo = wx.getStorageSync('VIP-openinfo')
    this.globalData.userInfo = wx.getStorageSync('VIP-userInfo')
    if (ifshowLoading) { // 暂时屏蔽loading
      wx.showLoading({
        title: '加载中.',
        mask: true
      })
      setTimeout(() => {
        wx.hideLoading()
      }, 5000)
    }
    if (!this.globalData.openIdInfo) {
      // 未获取用户信息token
      // loadUser判断上个接口是否调用成功，成功=>下一个流程(感觉这样写不美观，不晓得怎么链式调用，要是有更好的方法，可以改)
      let code = await this._wxlogin()
      console.log('code', code)
      // loadUser && await this._getToken(code)
      // loadUser && await this._getLoginInfo(simpleUser) && await this._addUser() && await this._getLoginInfo(simpleUser)
    } else {
      // DMP埋点记录用户信息
      // await this._getLoginInfo(simpleUser)
    }
    wx.hideLoading()
    loginTips = false
    return loadUser // loadUser == true ==> 登陆成功， 反之，登陆流程出了差错
  },
  globalData: {
    loginInfo: null
  }
})