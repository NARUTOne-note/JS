/*
 * @File: function-expression.js
 * @Project: Function
 * @File Created: Monday, 27th August 2018 10:45:21 pm
 * @Author: NARUTOne (wznaruto326@163.com/wznarutone326@gamil.com)
 * -----
 * @Last Modified: Monday, 27th August 2018 10:45:26 pm
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

 /**
  * ! 闭包  Function
  */

// ? 作用域链： 执行变量对象的指针列表
// * 执行环境 => 作用域链 => 1、全局变量对象； 2、活动对象
// * 就近原则查找变量， 一般局部变量用完释放销毁，但闭包除外
function compareFun (key) {
  var compareKey = key || '';
  return function (o1, o2) {
    var v1 = o1[compareKey];
    var v2 = o2[compareKey];
    if (v1 < v2) {
      return -1;
    } else if (v1 > v2) {
      return 1;
    } else {
      return 0;
    }
  }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
}

var compare = compareFun('age');
var result = compare({age: 12}, {age: 10});
compare = null; // 释放内存

// ? 闭包匿名，保持变量不变
// * 作用域链: scope-chain.png

function outer(){
  var result = new Array();
  for(var i = 0; i < 2; i++){
     //定义一个带参函数
     result[i] = function(num){
        function innerarg(){
           return num;
        }
        return innerarg;
     }(i);//预先执行函数写法
     //把i当成参数传进去
  }
  return result;
}

// 闭包 this

this.name = "Leilei";
 
var user = {
    name: "Shishi",
    sayHey1: () => {
        console.log(`Hi, I am ${this.name}`);
        console.log(`Hi, I am ${user.name}`);
    },
    sayHey2 () {
        console.log(`Hi, I am ${this.name}`);
        console.log(`Hi, I am ${user.name}`);
    }
};
 
var CallMe = {
    call () {
        this.name = "Yaoyao";
        user.sayHey1(); // 函数本身
        user.sayHey2();
        console.log(`Hi, I am ${this.name}`);
    }
}
 
CallMe.call();

// Leilei
// Shishi
// Shishi
// Shishi
// Yaoyao

// ? 内存泄露
// 闭包会引用包含函数的整个活动对象

function getEleId () {
  var ele = document.getElementById('app');
  var id = ele.id;
  ele.onclick = function () {
    console.log(id);
  }

  // 回收 元素
  ele = null;
}
