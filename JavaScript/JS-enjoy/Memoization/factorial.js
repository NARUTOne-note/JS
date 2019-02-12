/*
 * @File: factorial.js
 * @Project: Memoization
 * @File Created: Thursday, 20th December 2018 10:37:53 am
 * @Author: NARUTOne (wznaruto326@163.com/wznarutone326@gamil.com)
 * -----
 * @Last Modified: Thursday, 20th December 2018 10:37:59 am
 * @Modified By: NARUTOne (wznaruto326@163.com/wznarutone326@gamil.com>)
 * -----
 * @Copyright <<projectCreationYear>> - 2018 bairong, bairong
 * @fighting: code is far away from bug with the animal protecting
 *  ┏┓      ┏┓
 *  ┏┛┻━━━┛┻┓
 *  |           |
 *  |     ━    |
 *  |  ┳┛ ┗┳ |
 *  |          |
 *  |     ┻   |
 *  |           |
 *  ┗━┓     ┏━┛
 *     |      | 神兽保佑 🚀🚀🚀
 *     |      | 代码无BUG！！！
 *     |      ┗━━━┓
 *     |            ┣┓
 *     |            ┏┛
 *     ┗┓┓ ┏━┳┓┏┛
 *      |┫┫   |┫┫
 *      ┗┻┛   ┗┻┛
 */

/**
 * 阶乘 记忆
 * ? Memoization 的主要应用场景是那些耗时的纯计算函数，并且必须满足一个条件，那就是传入相同的参数永远返回相同的结果
 */

// ! 在 JavaScript 中，我们称这种方式为 Memoization（记忆化），原理很好理解，就是拿（内存）空间换（计算）时间。
function factorial (n) {
  if (!factorial.cache) {
    factorial.cache = {}
  }

  if (!factorial.cache[n]) {
    if (n === 1) {
      factorial.cache[n] = 1
    } else {
      factorial.cache[n] = factorial(n - 1) * n
    }
  }
  return factorial.cache[n]
}

// ! 提取momoize 高阶函数
function memoize(fn) {
  return function () {
    fn.cache = fn.cache || {}
    let key = arguments[0]
    if (!(key in fn.cache)) {
      fn.cache[key] = fn.apply(this, arguments)
    }
    return fn.cache[key]
  }
}

// * 扩展
function memoize(fn) {
  return function () {
    fn.cache = fn.cache || {}
    let key = [].slice.call(arguments).toString() // => array => string
    if (!(key in fn.cache)) {
      fn.cache[key] = fn.apply(this, arguments)
    }
    return fn.cache[key]
  }
}