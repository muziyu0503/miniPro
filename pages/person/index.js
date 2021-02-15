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
    manager: '',
    staffList:[]
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
  async fnSearch(){
    let res = await main.staffList({
      name: this.data.manager,
      pageSize: 100,
      pageNum: 1
    })
    res = res.data
    debugger
    this.setData({
      staffList: res.list
    })
  },
  /**
   * 跳转我的兑换
   */
  toExchange(e) {
    wx.navigateTo({
      url: '/pages/exchange/index?type=' + e.currentTarget.id
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
  bindManagerValue (e) {
    this.setData({
      manager: e.detail.value
    })
  },
  // 绑定销售经理
   bindManager (event) {
    let params = {
      account: event.currentTarget.id
    }
    this.bindRequest(params)
  },
  async bindRequest(params){
   let res = await main.bindManager(params)
    if (res.status == 200) {
      console.log('绑定销售经理', res)
      wx.showToast({
        title:'绑定成功'
      })
    }
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