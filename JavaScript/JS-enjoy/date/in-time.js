// 第二种 升级版
function inTimes(beginTime, endTime){
  const bDate = beginTime.split(':')
  const eDate = endTime.split(':')
  
  const o = {}
  const s = ['nDate', 'bDate', 'eDate']

  for (let i of s) {
      o[i] = new Date()
      let hours, minute;
      if (i == 'nDate') {
          hours = o[i].getHours()
          minute = o[i].getMinutes()
      } else {
          const arr = i == 'bDate' ? bDate : eDate
          hours = arr[0]
          minute = arr[1] || 0
      }
      o[i].setHours(hours)
      o[i].setMinutes(minute)
  }
  // 当前、开始、结束，三者的时间戳进行对比，答案就很清晰明了
  return o.nDate.getTime() - o.bDate.getTime() > 0 && o.nDate.getTime() - o.eDate.getTime() < 0
}
// 两种都支持
console.log(inTimes('8', '22'))
console.log(inTimes('8:30', '22:54'))