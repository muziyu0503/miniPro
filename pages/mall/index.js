// pages/mall/index.js
import { Main } from "../../model/main.js";
let main = new Main()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodList: [],
    pull_loading: false,
    pull_over: false,
    isScroll: false, // 页面已经滑动过
    keyWord: ''
  },
  pageNo: 1,
  pageSize: 10,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGoodList()
  },
  toDetail(e){
    const index = e.currentTarget.dataset.id.split(',')

    wx.navigateTo({
      url: '/pages/detail/index'
    })
    wx.setStorageSync('details', this.data.goodList[index[0]][index[1]])
  },
  async getGoodList () {
    if (!this.data.pull_over) {
      this.setData({
        pull_loading: true
      })
    }
    let params = {
      pageNo:this.pageNo,
      pageSize: this.pageSize
    }
    if (this.data.keyWord) {
      params.name = this.data.keyWord
    }
    let res = await main.goodslist(params)
    wx.stopPullDownRefresh()
    console.log('res', res)
    if (res.status == 200) {
      let tempData = res.data.list
      this.setData({
        [`goodList[${this.pageNo - 1}]`]: tempData,
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
  // 页面滑动函数
  onPageScroll: function (e) {
    let scrollTop = e.scrollTop
    if (scrollTop > 0 && !this.data.isScroll) {
      this.setData({
        isScroll: true
      })
    } else if (scrollTop <= 0 && this.data.isScroll) {
      this.setData({
        isScroll: false
      })
    }
  },
  bindinputValue (e) {
    console.log(e.detail.value)
    this.setData({
      keyWord: e.detail.value
    })
  },
  // 搜索
  searchGood () {
    this.pageNo = 1
    this.getGoodList()
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
    this.getGoodList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('到达底部')
    if (!this.data.pull_over && !this.data.pull_loading) {
      this.pageNo = this.pageNo + 1
      this.getGoodList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})