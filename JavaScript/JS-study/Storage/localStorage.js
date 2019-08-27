/**
 * 要过期就必须要记录时间，我们的思路是:
 * ? 设置值的时候就将当前时间记录进去，然后获取值的时候判断一下当前时间和之前的时间差是否在某个范围之内，如果超出范围，则清空当前项，并返回 null。
 */

function Storage () {

}

Storage.prototype.setExpire = (key, value, expire) => {
  let obj = {
    data: value,
    time: Date.now(),
    expire: expire // 过期时间
  }
  localStorage.setItem(key, JSON.stringify(obj))
};

Storage.prototype.getExpire = key => {
  let val = localStorage.getItem(key)
  if (!val) {
    return val
  }
  val = JSON.parse(val)
  if (Date.now() - val.time > val.expire) {
    localStorage.removeItem(key)
    return null
  }
  return val.data
}