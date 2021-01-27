// components/my-switch/my-switch.js
Component({
  // options: {
  //   styleIsolation: 'isolated'
  // },
  externalClasses: ['out-switch-on', 'out-switch-off'],
  /**
   * 组件的属性列表
   */
  properties: {
    on: {
      type: Boolean
    }
  },
  pageLifetimes: {
    show() {
    },
    hide() {
      // 页面被隐藏
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
   * 打开提醒
   */
    openRemind() {
      this.setData({
        on: !this.data.on
      })
      this.triggerEvent('change', this.data.on)
    }
  }
})
