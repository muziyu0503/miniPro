// component/cut-picture/cut-picture.js
import WeCropper from './utils/we-cropper.js'
const device = wx.getSystemInfoSync()
const width = device.windowWidth
const height = device.windowHeight - 100;
Component({
  observers: {
    'upImg': function (upImg) {
      console.log('upImg变化了', upImg)
      upImg && this.wecropper && this.wecropper.pushOrign(upImg);
    }
  },
  /**
   * 组件的属性列表
   */
  properties: {
    cutSize: { // 裁剪框大小
      type: Object,
      value: {
        w: 300,
        h: 300
      }
    },
    cutShow: {
      type: Boolean,
      value: false
    },
    upImg: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    cropperOpt: { //裁剪基础设置 
      id: 'cropper',
      scale: 2.5,
      zoom: 8,
      width,
      height,
      src: 'https://h5static.oss-cn-shenzhen.aliyuncs.com/lapp/dingzhi/demo.jpg',
      cut: {}
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 初始化传图插件
    initWeCropper() {
      const { //裁剪
        cropperOpt
      } = this.data.cropperOpt.cut
      new WeCropper({
        cut: this.data.cropperOpt.cut,
        target: this
      }).on('ready', (ctx) => {
          this.wecropper = ctx
        }).on('beforeImageLoad', (ctx) => {
          console.log('beforeImageLoad', ctx)
          wx.showToast({
            title: '上传中',
            icon: 'loading',
            duration: 20000
          })
        }).on('imageLoad', (ctx) => {
          wx.hideToast()
        }).on('beforeDraw', (ctx, instance) => {
        }).updateCanvas();
    },
    // 重新选择图片
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
          that.wecropper.pushOrign(res.tempFilePaths[0]);
        },
        complete() {
          that.canNotSelect = false
        }
      })
    },
    // 裁剪后的用户上传图
    getCropperImage() {
      var _self = this;
      wx.showLoading({
        title: '正在处理...',
        mask: true
      })
      _self.wecropper.getCropperImage(async (src) => {
        wx.hideLoading()
        _self.triggerEvent('cutOk', src)
      })
    },
    touchStart(e) {
      console.log('touchStart')
      this.wecropper.touchStart(e)
    },
    touchMove(e) {
      this.wecropper.touchMove(e)
    },
    touchEnd(e) {
      this.wecropper.touchEnd(e)
    },
  },
  ready() {
    let cutSize = this.data.cutSize
    this.setData({
      'cropperOpt.cut.x': (width - cutSize.w) / 2,
      'cropperOpt.cut.y': (height - cutSize.h) / 2,
      'cropperOpt.cut.width': cutSize.w,
      'cropperOpt.cut.height': cutSize.h
    })
    this.initWeCropper()
  }
})
