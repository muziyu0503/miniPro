//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
   
  },
  
  onLoad: function () {
   
  },
  jump(e) {
    console.log(e.currentTarget.dataset.url)
    let url = e.currentTarget.dataset.url
    wx.navigateTo({
      url: `/pages/example/${url}/${url}`,
    })
  },
  // 从本地获取图片
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
        that.upImg = res.tempFilePaths[0]
        console.log(that.upImg)
      },
      complete() {
        that.canNotSelect = false
      }
    })

  },
})
