/**
 * 模拟 worker
 */
var upload = (data) => {
  let _self = this
  setTimeout(function () {
    // 模拟上传....
    _self.postMessage({
      status: 'ok',
      filename: 'demo.png'
    })
  }, 3000)
}

this.onmessage = e => {
  console.log('接到上传任务')
  upload(e.data)
}