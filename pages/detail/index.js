const app = getApp()
import { Main } from "../../model/main.js";
let main = new Main()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgList:[],
    details:{}
  },
  async fnExchange(){
    let res = app.isLogin()
    console.log('res', res)
    if (res) {
      let params = {
        goodsCode: this.data.details.code
      }
      try {
        wx.showLoading({
          title: '正在兑换...',
          mask: true
        })
        let res = await main.pointOrder(params)
        console.log('兑换', res)
        if (res.status == 200) {
          wx.showToast({
            title:'兑换成功',
            duration: 4000
          })
        }
        wx.hideLoading()
      } catch (e) {
        console.log('兑换e', e)
        wx.showToast({
          title: e.message,
          icon: 'none',
          duration: 5000
        })
        // wx.hideLoading()
      }
     
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.setData({
     details:wx.getStorageSync('details')
   }) 
   wx.setNavigationBarTitle({
     title: '商品详情'
   })
   console.log('details', this.data.details)
  
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
    
    wx.removeStorageSync('details')
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
