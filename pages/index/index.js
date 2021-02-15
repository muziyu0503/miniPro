//index.js
//获取应用实例
const app = getApp()
import { Main } from "../../model/main.js";
let main = new Main()
Page({
  data: {
    background: new Array(3),
    rankList:[],
    loginInfo: null
  },
  pageNum: 1,
  pageSize: 10,
  onLoad: function () {
    this.goodList()
    this.getUserInfo()
  },
  async getUserInfo () {
    let res = await app._loginAll()
    console.log('getUserInfo', res)
    if (res) {
      this.setData({
        loginInfo: app.globalData.loginInfo
      })
    }
  },
  // 获取商城列表
  async goodList () {
    let params = {
      pageNum: 1,
      pageSize: 6
    }
    let res = await main.goodslist(params)
    if (res.status == 200) {
      this.setData({
        rankList: res.data.list
      })

    }
  },
  toDetail(e){
    const index = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/detail/index'
    })
    
    wx.setStorageSync('details', this.data.rankList[index])
  },
  /**
   * 跳转推荐页面
   */
  toRecommend(){
    let res = app.isLogin()
    console.log('res', res)
    if (res) {
      wx.navigateTo({
        url: '/pages/recommend/index'
      })
    }
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
