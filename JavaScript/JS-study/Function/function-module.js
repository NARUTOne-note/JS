/*
 * @File: function-module.js
 * @Project: Function
 * @File Created: Tuesday, 4th September 2018 10:28:16 pm
 * @Author: NARUTOne (wznaruto326@163.com/wznarutone326@gamil.com)
 * -----
 * @Last Modified: Tuesday, 4th September 2018 10:28:20 pm
 * @Modified By: NARUTOne (wznaruto326@163.com/wznarutone326@gamil.com>)
 * -----
 * @Copyright <<projectCreationYear>> - 2018 bairong, bairong
 * @fighting: code is far away from bug with the animal protecting
 *  ┏┓　 ┏┓
 * ┏┛┻━━━┛┻┓
 * ┃　　　　　　┃   
 * ┃　 ━　 ━　  ┃     
 * ┃　┳┛　┗┳　 ┃      
 * ┃　　　　　　　┃   
 * ┃　　　┻　　　┃    
 * ┃　　　　　　　┃   
 * ┗━┓　　　 ┏━┛       
 * 　　┃　　　┃ 护码神兽
 * 　　┃　　　┃ 代码零BUG！
 * 　　┃　　　┗━━━┓   
 * 　　┃　　　　　　　┣┓
 * 　　┃　　　　　　　┏┛━ ━ 🚀🚀🚀
 * 　　┗┓┓┏━┳┓┏┛  ━    
 * 　　　┃┫┫　┃┫┫     
 * 　　　┗┻┛　┗┻┛     
 */

// ! 块级作用域

// ? 匿名函数——私有作用域——闭包
// * 局部私有变量，命名冲突
// * 减少闭包引来的内存问题，即用即毁

(function () {})();

function exam () {
  (
    function () {
      for (var i = 0; i < count; i ++) {
        console.log(i);
      }
    }
  )();
  console.log(i); // error
}

// ? 私有

// * 构造函数式
function myObject () {
  // 私有变量
  var age = 10;
  // 私有函数
  function getSex () {
    return 1;
  }

  // 特权方法——去访问私有成员
  this.publicMethod = function () {
    age ++;
    return getSex();
  }
}

// * 静态私有变量—— 私有作用域

(function() {
  // 私有
  var age = 10;
  function getSex () {
    return 1;
  }

  // 全局变量
  myObject  = function () {}
  myObject.prototype.publicMethod = function () {
    age ++;
    return getSex();
  }
})();

// ? 模块模式

var singleton = function () {
  // 私有
  var age = 10;
  function getSex () {
    return 1;
  }
  var obj = new Object();
  obj.publicProp = true;
  obj.publicMethod = function () {
    age ++;
    return getSex();
  }

  return obj;
}();
