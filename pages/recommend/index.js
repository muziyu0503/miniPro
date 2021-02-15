// pages/recommend/index.js
import { Main } from "../../model/main.js";
let main = new Main()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    form: {
      name: '',
      car: '',
      phone: ''
    },
    recommendList: []
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
  // 绑定姓名的值
  bindnamevalue (e) {
    this.setData({
      'form.name': e.detail.value
    })
  },
   // 绑定手机号的值
   bindphonevalue (e) {
    this.setData({
      'form.phone': e.detail.value
    })
  },
   // 绑定意向车型的值
   bindcarvalue (e) {
    this.setData({
      'form.car': e.detail.value
    })
  },
  // 推荐列表
  async recommendList () {
    let params = {
      pageNum: this.pageNum,
      pageSize: this.pageSize
    }
    let res = await main.recommendlist(params)
    if (res.status === 200) {
      console.log('推荐列表', res)
      this.setData({
        recommendList: res.data.list
      })
    }
  },
  // 提交推荐
  async submitOrder () {
    console.log('this.data.form.phone', this.data.form.phone)
    if (this.data.form.phone.length !== 11) {
      wx.showToast({
        title: '手机号格式错误',
        icon: 'none'
      })
      return
    }
    let params = {
      ...this.data.form
    }
    let res = await main.reportRecommend(params)
    if (res.status === 200) {
      wx.showToast({
        title: '提交成功！',
      })
      this.recommendList()
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