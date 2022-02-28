function format(fmt, timestamp) {
  const date = timestamp ? new Date(timestamp) : new Date() // 处理时间戳
  const o = {
      "Y+": date.getFullYear(),
      "M+": date.getMonth() + 1,     // 月
      "D+": date.getDate(),          // 日
      "h+": date.getHours(),         // 时
      "m+": date.getMinutes(),       // 分
      "s+": date.getSeconds(),       // 秒
      "W": date.getDay()             // 周
  }
  for (var k in o) {
     if (new RegExp("("+ k +")").test(fmt)) {
          fmt = fmt.replace(RegExp.$1, () => {
              if (k === 'W') {                                    // 星期几
                  const week = ['日', '一', '二', '三', '四', '五', '六']
                  return week[o[k]]
              } else if (k === 'Y+' || RegExp.$1.length == 1) {    // 年份 or 小于10不加0
                  return o[k]
              } else {
                  return ("00"+ o[k]).substr(("" + o[k]).length)  // 小于10补位0
              }
          })
      }
  }
  return fmt
}
format('星期W')                  // 星期日
format("YYYY-MM-DD hh:mm:ss")   // 2021-03-21 20:24:32
format("MM/DD/YYYY hh:mm")      // 03-21-2021 20:24
format("MM/DD/YYYY hh:mm")      // 03-21-2021 20:24 
format("YYYY年MM月DD日 hh:mm:ss 星期W") // 2021年03月21日 20:30:14 星期日
format("YYYY年MM月DD日 hh:mm:ss 周W", 1616330071538) // 2021年03月21日 20:34:31 周日


/**
 * @param {String} tcimestamp => '2020-05-08 19:46'
 */
 function dateFormat(timestamp) {
    const w = new Date(timestamp).getDay()  // 获取周

    // 解析时间为数组
    timestamp = timestamp.toString().replace(/-|\:|\/|\ /g, ',').split(',')
    
    const week = ['日', '一', '二', '三', '四', '五', '六']
    const month = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二']
    const weekEn = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const monthEn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    const opt = ['Y', 'M', 'D', 'h', 'm', 'W'].reduce((t, v, i) => {
        t[v] = v === 'W' ? w : timestamp[i]
        return t
    }, {})

    // 日
    let st = 'st',
        nd = 'nd',
        rd = 'rd',
        th = 'th',
        obj = {
            1: st,
            2: nd,
            3: rd,
            21: st,
            22: nd,
            23: rd,
            31: st
        };

    let day = opt.D + (obj[opt.D] ? obj[opt.D] : th)
    day = day.startsWith(0) ? day.slice(1) : day    // 去除前面的0

    const time = {
        date: `${opt.Y}/${opt.M}/${opt.D} ${opt.h}:${opt.m}`,
        time: `${opt.h}:${opt.m}`,
        year: opt.Y,
        month: {
            on: opt.M,
            cn: month[Number(opt.M) - 1],
            en: monthEn[Number(opt.M) - 1]
        },
        day: {
            on: opt.D,
            en: day
        },
        week: {
            on: week[opt.W],
            en: weekEn[opt.W]
        }
    }
    return time
}
console.log(dateFormat('2020-05-08 19:46'))

/**
 * {
    date: '2020/05/30 19:46',
    time: '19:46',
    year: '2020',
    month: { on: '05', cn: '五', en: 'May' },
    day: { on: '08', en: '8th' },
    week: { on: '五', en: 'Friday' }
   }
 */