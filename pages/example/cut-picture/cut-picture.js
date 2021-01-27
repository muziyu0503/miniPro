// pages/example/cut-picture/cut-picture.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cutSize: {
      w: 200,
      h: 312
    },
    cutShow: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  chooseimgs: function () {
    if (this.canNotSelect) {
      return
    }
    let that = this;
    this.canNotSelect = true
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      sourceType: ['album', 'camera'],
      success(res) {
        that.setData({
          upImg: res.tempFilePaths[0],
          cutShow: true
        })
      },
      complete() {
        that.canNotSelect = false
      }
    })

  },
  fnCutOk(e) {
    console.log(e)
  }
})