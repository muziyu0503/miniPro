//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    background: [
      {url:'https://www.mercedes-benz.com.cn/content/dam/mb-cn/s-class-assets/highlights-page/desktop/highlight-herobanner.jpg'},
      {url:'https://modao.cc/uploads4/images/6055/60557627/v2_qnjhz4.jpg'},
      {url:'https://www.mercedes-benz.com.cn/content/dam/mb-cn/s-class-assets/highlights-page/desktop/highlight-herobanner.jpg'},
    ],
    rankList:[
      {},{},{},{},{},{},{}
    ]
  },
  toDetail(e){
    console.log(e)
    wx.navigateTo({
      url: '/pages/detail/index'
    })
  },
  /**
   * 跳转推荐页面
   */
  toRecommend(){
    wx.navigateTo({
      url: '/pages/recommend/index'
    })
  },
  toH5(){
    wx.navigateTo({
      url: '/pages/H5/index'
    })
  },
  toRank(){
    wx.navigateTo({
      url: '/pages/rank/index'
    })
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
