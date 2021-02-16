// pages/userlogin/userlogin.js
const app = getApp()
Page({
  data: {
    loginInfo: null,
    // showTelTips: false // 是否展示授权手机号的相关信息
  },
  onLoad: function (options) {
    this.setData({
      loginInfo: app.globalData.loginInfo
    })
  },
  async bindGetUserInfo (e) {
    wx.removeStorageSync('VIP-openinfo')
    let res = await app.bindGetUserInfo(e)
    this.setData({
      loginInfo: app.globalData.loginInfo
    })
    if (this.data.loginInfo && this.data.loginInfo.id) {
      if (this.data.loginInfo.phoneNumber) {
        // 有手机号,直接返回上一个页面
        this.backPrePage()
      } else {
        // this.setData({
        //   showTelTips: true
        // })
      }
    }
   
  },
  // 授权手机号
  async getPhoneNumber (e) {
    let res = await app.getTel(e)
    if (res) {
      this.backPrePage()
    }
  },
  // 返回上一个页面要做的操作
  backPrePage () {
    var pages = getCurrentPages();
    let getLoginParams = wx.getStorageSync('setLoginParams') // 需要传给上一页的参数，可通用
    if (pages.length >= 1) {
      var prePage = pages[pages.length - 2];
      prePage.onLoad(getLoginParams)
    }
    wx.navigateBack({
      delta: 1
    })
  }
})
