/*
 * @File: function-recursion.js
 * @Project: Function
 * @File Created: Monday, 27th August 2018 10:57:18 pm
 * @Author: NARUTOne (wznaruto326@163.com/wznarutone326@gamil.com)
 * -----
 * @Last Modified: Monday, 27th August 2018 10:58:06 pm
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

 // ! 递归 函数

 function factorial (num) {
   if (num <= 1) {
     return 1;
   } else {
     return num * factorial(num - 1);
   }
 }

 var foo = factorial;
 factorial = null;
 console.log(foo(3)); // error

 // ? 解决方案  argument.callee() : 指向正在执行函数的指针

function factorial (num) {
  if (num <= 1) {
    return 1;
  } else {
    return num * arguments.callee(num - 1);
  }
}

// ? use strict , 不能使用 argument.callee(); 命名函数表达式解决, f()

var factorial = (function f (num)  {
  if (num <= 1) {
    return 1;
  } else {
    return num * f(num - 1);
  }
});
