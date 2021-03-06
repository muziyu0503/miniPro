// pages/staffForm/staffForm.js
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
      position: '',
      mobile: ''
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
      'form.mobile': e.detail.value
    })
  },
   // 绑定意向车型的值
   bindposvalue (e) {
    this.setData({
      'form.position': e.detail.value
    })
  },
  // 提交订单
  async submitOrder () {
    if (this.data.form.mobile.length !== 11) {
      wx.showToast({
        title: '手机号格式错误',
        icon: 'none'
      })
      return
    }
    let params = {
      ...this.data.form
    }
    let res = await main.bindStaff(params)
    if (res.status === 200) {
      wx.showToast({
        title: '提交成功！',
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