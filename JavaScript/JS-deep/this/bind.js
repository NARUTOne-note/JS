/*
 * @File: bind.js
 * @Project: this
 * @File Created: Friday, 10th August 2018 11:28:11 am
 * @Author: NARUTOne (wznaruto326@163.com/wznarutone326@gamil.com)
 * -----
 * @Last Modified: Friday, 10th August 2018 11:28:16 am
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
 *     |      | 神兽保佑
 *     |      | 代码无BUG！！！
 *     |      ┗━━━┓
 *     |            ┣┓
 *     |            ┏┛
 *     ┗┓┓ ┏━┳┓┏┛
 *      |┫┫   |┫┫
 *      ┗┻┛   ┗┻┛
 */

 /**
  * ! bind模拟实现
  * ? this指向改变，传参不执行
  * * 原理：apply/call
  */

Function.prototype.bind = function (obj, arg) {
  var arg = Array.prototype.slice.call(arguments, 1);
  var context = this;
  var F =  function () {}  // 在new一个bind会生成新函数，必须的条件就是要继承原函数的原型，因此用到寄生继承来完成我们的过程
  var bound = function (newArg) {
    arg = arg.concat(Array.prototype.slice.call(newArg));
    return context.apply(this instanceof  F ?　this : obj || window, arg)
  }
  
  F.prototype = context.prototype;
  bound.prototype = new F();
  return bound;
}

var test = function(a,b){
  console.log('作用域绑定 '+ this.value)
  console.log('bind参数传递 '+ a.value2)
  console.log('调用参数传递 ' + b)
}
var obj = {
  value:'ok'
}
var fun_new = test.bind(obj,{value2:'also ok'})

fun_new ('hello bind')

var new_fun = new fun_new('hello bind'); // 构造函数

// ? 思考：https://segmentfault.com/a/1190000007342882
// ? https://mp.weixin.qq.com/s/TFKtHndJSnDYb-Oj4-VyXg

/**
 * bound.prototype.__proto__ = F.prototype = context.prototype
 * F.prototype.constructor = F
 */