/*
* 封装小程序原生API
* 调用时，success进入try, fail进入catch语句
* */
const wxPromisify = (fn, options) => {
  let obj = {}
  return new Promise((resolve, reject) => {
    fn({
      ...options,
      success: (res) => { resolve(res) },
      fail: (err) => { reject(err) }
    })
  })
}
export default wxPromisify