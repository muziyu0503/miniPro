import { HTTP } from '../utils/http';  //request方法
import { config } from '../config'; //提供接口地址

class Main extends HTTP {
  recommendlist(data) { // 推荐列表
    return this.request({
      url: config.domain + `attract/list/${config.appid}`,
      data,
      method: 'get'
    })
  }
  goodslist(data) { // 商品明细列表
    return this.request({
      url: config.domain + `goods/list/${config.appid}`,
      data,
      method: 'get'
    })
  }
  reportRecommend(data) { // 推荐用户上报用户信息
    return this.request({
      url: config.domain + `attract/${config.appid}`,
      data,
      method: 'post'
    })
  }
  pointslist(data) { // 积分明细列表
    return this.request({
      url: config.domain + `points/list/${config.appid}`,
      data,
      method: 'get'
    })
  }
  userpoints(data) { // 获取用户积分
    return this.request({
      url: config.domain + `points/${config.appid}`,
      data,
      method: 'get'
    })
  }
  orderlist(data) { // 订单信息列表
    return this.request({
      url: config.domain + `order/list/${config.appid}`,
      data,
      method: 'get'
    })
  }
  exchangeOrder(data) { // 确认兑换商品
    return this.request({
      url: config.domain + `order/exchange/${config.appid}`,
      data,
      method: 'post'
    })
  }
  pointOrder(data) { // 下单积分商品
    return this.request({
      url: config.domain + `order/${config.appid}`,
      data,
      method: 'post'
    })
  }
  login(data) { // 用户登录
    return this.request({
      url: config.domain + `user/login/${config.appid}`,
      data,
      method: 'get'
    })
  }
  registerPhone(data) { // 注册手机号
    return this.request({
      url: config.domain + `user/phone/${config.appid}`,
      data,
      method: 'post'
    })
  }
  stafflist(data) { // 员工信息列表
    return this.request({
      url: config.domain + `user/staff/list/${config.appid}`,
      data,
      method: 'get'
    })
  }
  bindManager(data) { // 用户绑定销售经理
    return this.request({
      url: config.domain + `user/staff/user/${config.appid}`,
      data,
      method: 'post'
    })
  }
  bindStaff(data) { // 员工绑定员工信息
    return this.request({
      url: config.domain + `user/staff/${config.appid}`,
      data,
      method: 'post'
    })
  }
  getUserInfo(data) { // 获取用户信息
    return this.request({
      url: config.domain + `user/${config.appid}`,
      data,
      method: 'get'
    })
  }
  adduser(data) { // 注册用户信息
    return this.request({
      url: config.domain + `user/${config.appid}`,
      data,
      method: 'post'
    })
  }
}
export { Main }

