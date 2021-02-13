// pages/recommend/index.js
import { Main } from "../../model/main.js";
let main = new Main()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  pageNum: 1,
  pageSize: 10,
  formSubmit(){
    console.log('提交表单')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.recommendList()
  },
  // 推荐列表
  async recommendList () {
    let params = {
      pageNum: this.pageNum,
      pageSize: this.pageSize
    }
    let res = await main.goodslist(params)
    if (res.code === '200') {
      console.log('推荐列表', res)
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
    wx.setNavigationBarTitle({
      title: '推荐有礼'
    })
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