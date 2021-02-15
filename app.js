//app.js
import wxPromisify from "./utils/wxPromisify";
wx.$wxPromisify = wxPromisify
let sessionkeyErrNum = 0 // 获取token sessionkey 失效次数
let loadUser = false // 用户信息是否加载完成-
let loadTel = false // 注册流程中一个接口是否成功返回
let loginTips = false // 是否需要登录提示
let wxUserData = null // 微信授权的信息
import { Main } from "./model/main.js";
let main = new Main()
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
      console.log('result', result)
      loadUser = true
      return res.code
    }
  },
  async _getToken(code) {
    loadUser = false
    let that = this
    let params = {
      code: code
    }
    loginTips && wx.showLoading({
      title: '正在登录验证',
      icon: 'none'
    })
    let sessionResult = await wx.$wxPromisify(wx.checkSession)
    console.log('sessionResult', sessionResult)
    try {
      // session_key 未过期，并且在本生命周期一直有效
      const tokenInfo = await main.login(params)
      console.log('tokenInfo', tokenInfo)
      if (tokenInfo.status === 200) {
        wx.setStorageSync('VIP-openinfo', tokenInfo.data)
        loadUser = true
        that.globalData.openIdInfo = tokenInfo.data
      }
      else {
        wx.showToast({
          title: '获取token失败',
          icon: 'none'
        })
      }
    }
    catch {
      // session_key 已经失效，需要重新执行登录流程
      wx.showToast({
        title: '获取token失败。',
        icon: 'none'
      })
      sessionkeyErrNum = sessionkeyErrNum + 1
      if (sessionkeyErrNum > 1) return
      wx.removeStorageSync('VIP-openinfo')
      await that._loginAll()
    }
  },
   /**
   * 添加用户
   */
  async _addUser() {
    let that = this
    let params = {
      encryptedData: wxUserData.encryptedData,
      iv: wxUserData.iv,
      rawData: JSON.parse(wxUserData.rawData),
      sessionKey: this.globalData.openIdInfo.sessionKey,
      signature: wxUserData.signature
    }
    loginTips && wx.showLoading({
      title: '正在添加用户',
      icon: 'none'
    })
    try {
      let res = await main.adduser(params)
      if (res.success === true) {
        loadUser = true
        return true
      } else {
        wx.showToast({
          title: '小程序添加用户失败',
          icon: 'none'
        })
      }
    } catch (e) {
      wx.showToast({
        title: '小程序添加用户失败。',
        icon: 'none'
      })
    }

  },
  async _getLoginInfo() {
    let that = this
    loadUser = false
    loginTips && wx.showLoading({
      title: '获取登录信息',
      icon: 'none'
    })
    let res =  await main.getUserInfo()
    console.log('_getLoginInfores', res)
    if (res.status === 200 && res.data.id) {
      this.globalData.loginInfo = res.data
      loadUser = true
      return false
    }
    return true
  },
  async _loginAll(ifshowLoading = true, refresh=false) {
    // if (this.globalData.loginInfo.id && !refresh) return true
    this.globalData.openIdInfo = wx.getStorageSync('VIP-openinfo')
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
      loadUser && await this._getToken(code)
      loadUser && await this._getLoginInfo() && await this._addUser() && await this._getLoginInfo()
    } else {
      // DMP埋点记录用户信息
      await this._getLoginInfo()
    }
    wx.hideLoading()
    loginTips = false
    return loadUser // loadUser == true ==> 登陆成功， 反之，登陆流程出了差错
  },
  async bindGetUserInfo(e) {
    console.log('e', e)
    sessionkeyErrNum = 0
    loginTips = true
    if (e.detail.errMsg === 'getUserInfo:ok') {
      let res = await wx.$wxPromisify(wx.getSetting)
      console.log('bindGetUserInfo', res)
      if (res.authSetting['scope.userInfo']) {
        wxUserData = e.detail
        let res = await this._loginAll(true)
        return res
      }
    } else {
      wx.showModal({
        title: '提示',
        content: '该功能需要现授权信息才可使用哦！',
        confirmText: '去授权'
      })
    }
  },
  async resgisterTel(e) {
    let data = e.detail
    let params = {
      encryptedData: data.encryptedData,
      iv: data.iv,
      rawData	: data.rawData,
      sessionKey: this.globalData.openIdInfo.sessionKey,
      signature: data.signature
    }
    let res = await main.registerPhone(params)
    if (res.status === 200) {
      loadTel = true
      return res.data.phone
    }
  },
  /*
  获取手机号
  */
  async getTel(e) {
    if (e.detail.errMsg == 'getPhoneNumber:ok') {
      wx.showLoading({
        title: '正在注册.'
      })
      setTimeout(() => {
        wx.hideLoading()
      }, 5000)
      let phone = await this.resgisterTel(e)
      loadTel && await this._getLoginInfo()
      wx.hideLoading()
      return loadTel
    } else {
      wx.showModal({
        title: '提示',
        content: '请同意手机号授权,以便后续操作',
        success: function (res) {
        }
      })
    }

  },
  // 获取自己积分
  async getUserPoint () {
    let res = await main.userpoints()
    console.log('获取自己积分', res)
  },
  isLogin () {
    if (this.globalData.loginInfo && this.globalData.loginInfo.id) {
      return true
    } else {
      wx.navigateTo({
        url: '/pages/userlogin/userlogin',
      })
      return
    }
   
  },
  globalData: {
    loginInfo: null,
    openIdInfo: null
  }
})
