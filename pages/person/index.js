// pages/person/index.js
import { Main } from "../../model/main.js";
let main = new Main()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginInfo: {
      imgUrl: 'https://h5static.oss-cn-shenzhen.aliyuncs.com/lapp/vip/header-default1.png'
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '个人中心'
    })
    this.getUserInfo()
    // this.getUserPoint()
  },
  async getUserInfo () {
    let res = await app._loginAll()
    console.log('getUserInfo', res)
    if (res) {
      this.setData({
        loginInfo: app.globalData.loginInfo
      })
    }
  },
  getUserPoint () {
    app.getUserPoint()
  },
  /**
   * 跳转我的兑换
   */
  toExchange() {
    wx.navigateTo({
      url: '/pages/exchange/index'
    })
  },
  /**
   * 跳转积分明细
   */
  jumpPointDetail () {
    wx.navigateTo({
      url: '/pages/point-detail/point-detail'
    })
  },
  jumpLogin () {
    wx.navigateTo({
      url: '/pages/userlogin/userlogin'
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})