// pages/rank/index.js
import { Main } from "../../model/main.js";
let main = new Main()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    rankList: [],
    pull_loading: false,
    pull_over: false
  },
  pageNo: 1,
  pageSize: 10,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '积分排行榜'
    })
    this.getRankList()
  },
  async getRankList () {
    if (!this.data.pull_over) {
      this.setData({
        pull_loading: true
      })
    }
    let params = {
      pageNo:this.pageNo,
      pageSize: this.pageSize
    }
    let res = await main.pointslist(params)
    wx.stopPullDownRefresh()
    console.log('res', res)
    if (res.status == 200) {
      let tempData = res.data.list
      this.setData({
        [`rankList[${this.pageNo - 1}]`]: tempData,
        pull_loading: false,
        pull_over: this.pageNo * this.pageSize > parseInt(res.data.total)
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
    this.pageNo = 1
    this.getRankList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('到达底部')
    if (!this.data.pull_over && !this.data.pull_loading) {
      this.pageNo = this.pageNo + 1
      this.getRankList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})