// pages/exchange/index.js
import { getDataSet } from '../../utils/util.js'
import { Main } from "../../model/main.js";
let main = new Main()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabsList: ['全部', '待兑换', '已兑换'],
    active: '全部',
    cur: 0,
    goodList: [],
    pull_loading: false,
    pull_over: false,
  },
  pageNum: 1,
  pageSize: 10,
  fnChangeTab(event) {
    this.setData({
      active: event.currentTarget.id,
      cur: getDataSet(event, 'index')
    })
    this.pageNum = 1
    this.setData({
      pull_loading: false,
      pull_over: false,
      goodList: []
    })
    this.getGoodList()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的兑换'
    })
    this.setData({
      active: options.type
    })
    this.getGoodList()
  },
  async getGoodList () {
    if (!this.data.pull_over) {
      this.setData({
        pull_loading: true
      })
    }
    console.log('this.data.cur', this.data.cur)
    let params = {
      exchangeStatus: this.data.cur == 1 ? 0 : this.data.cur == 2 ? 1 : '',// 订单状态 0 待兑换 1 已兑换
      pageNum:this.pageNum,
      pageSize: this.pageSize
    }
    let res = await main.orderlist(params)
    wx.stopPullDownRefresh()
    console.log('res', res)
    if (res.status == 200) {
      let tempData = res.data.list
      this.setData({
        [`goodList[${this.pageNum - 1}]`]: tempData,
        pull_loading: false,
        pull_over: this.pageNum * this.pageSize > parseInt(res.data.total)
      })
    }
  },
  // 确认兑换
  async exchangeOrder (event) {
    let code = getDataSet(event, 'code')
    let params = {
      code: code
    }
    let res = await main.exchangeOrder(params)
    console.log('确认兑换', res)
    if (res.status == 200) {
      wx.showToast({
        title: '兑换成功',
      })
      this.getGoodList()
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
  toupper () {
    this.pageNum = 1
    this.getGoodList()
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },
  tolower () {
    console.log('到达底部')
    if (!this.data.pull_over && !this.data.pull_loading) {
      this.pageNum = this.pageNum + 1
      this.getGoodList()
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
