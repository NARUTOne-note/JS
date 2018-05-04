/*
 * ES6 新特性简介（2015）
 * 
 * createDate: 2017/07/12
 * author: NARUTOne
 * 
 * */

/*1、ES6中的默认参数
 * 
 */

//ES5
function log(x, y) {
  if (typeof y === 'undefined') {
	  y = 'World';
	}
  y = y || 'World';
  console.log(x, y);
}

log('Hello') // Hello World
log('Hello', 'China') // Hello China
log('Hello', '') // Hello World

//ES6
function log(x, y = 'World') {
  console.log(x, y);
}

log('Hello') // Hello World
log('Hello', 'China') // Hello China
log('Hello', '') // Hello

/*1、 ES6中的模版表达式
 * 模板表达式还能运用在多行表达式中，保留编写时的换行缩进。
 */

// ES5
var name = 'Your name is ' + first + ' ' + last + '.';
var url = 'http://localhost:3000/api/messages/' + id ;

//ES6
var name = `Your name is ${first} ${last}`;
var url = `http://localhost:3000/api/messages/${id}`;
var roadPoem = `Then took the other, as just as fair,
    And having perhaps the better claim
    Because it was grassy and wanted wear,
    Though as for that the passing there
    Had worn them really about the same,`

/*
 ES6中的拆包表达式，糖衣炮弹
 * */

//ES5
var data = $('body').data(), // 假设data中有mouse和house的值
  house = data.house,
  mouse = data.mouse
  
//ES6
var { house, mouse} = $('body').data() // 我们会拿到house和mouse的值的
var [col1, col2]  = $('.column'),
  [line1, line2, line3, , line5] = file.split('n');

/*
 *__proto__属性，对象表达式
 * 
 * */

// es6的写法
var obj = {
  method: function() { ... }
};
obj.__proto__ = someOtherObj;

// es5的写法
var obj = Object.create(someOtherObj);
obj.method = function() { ... };

//__proto__无论从语义的角度，还是从兼容性的角度，都不要使用这个属性，
//而是使用下面的Object.setPrototypeOf()（写操作）、Object.getPrototypeOf()（读操作）、Object.create()（生成操作）代替。

// 格式
Object.setPrototypeOf(object, prototype)

// 用法
var o = Object.setPrototypeOf({}, null);
//=> 等效
function (obj, proto) {
  obj.__proto__ = proto;
  return obj;
}

//例
let proto = {};
let obj = { x: 10 };
Object.setPrototypeOf(obj, proto);

proto.y = 20;
proto.z = 40;

obj.x // 10
obj.y // 20
obj.z // 40

/*
 *箭头函数
 * this在上下文和函数中的值应当是相同的，它不会变化，通常变化的原因都是因为你创建了闭包。
 * 当箭头函数所在语句只有一行时，它就会变成一个表达式，它会直接返回这个语句的值。但是如果你有多行语句，你就要明确的使用return。
 * */

//ES5
var _this = this
$('.btn').click(function(event){
  _this.sendData()
})

//ES6
$('.btn').click((event) =>{
  this.sendData()
})

var ids = ['5632953c4e345e145fdf2df8','563295464e345e145fdf2df9']
var messages = ids.map(value => `ID is ${value}`) // 隐式返回

/**
 *ES6中的Promise 
 * Promise有一个不错的失败-捕捉回调机制
 */

//ES5
setTimeout(function(){
  console.log('Yay!')
}, 1000)

//ES6
var wait1000 =  new Promise(function(resolve, reject) {
  setTimeout(resolve, 1000)
}).then(function() {
  console.log('Yay!')
})

var wait1000 =  new Promise((resolve, reject)=> {
  setTimeout(resolve, 1000)
}).then(()=> {
  console.log('Yay!')
})

//升级
//ES5
setTimeout(function(){
  console.log('Yay!')
  setTimeout(function(){
    console.log('Wheeyee!')
  }, 1000)
}, 1000)

//ES6
var wait1000 =  ()=> new Promise((resolve, reject)=> {setTimeout(resolve, 1000)})
 
wait1000()
.then(function() {
    console.log('Yay!')
    return wait1000()
})
.then(function() {
    console.log('Wheeyee!')
});

/**
 *块级作用域的let和const
 * let是一个更新的var，可以让你把变量作用域限制在当前块里。我们用{}来定义块，但是在ES5中这些花括号起不到任何作用。
 */

//ES5
function calculateTotalAmount (vip) {
  var amount = 0
  if (vip) {
    var amount = 1
  }
  { // 让块来的更疯狂
    var amount = 100
    {
      var amount = 1000
      }
  }  
  return amount
}
 
console.log(calculateTotalAmount(true)) //1000

//ES6
function calculateTotalAmount (vip) {
  var amount = 0 // 或许应该用let, 但你可以混用
  if (vip) {
    let amount = 1 // 第一个数量为 0
  } 
  { // 更多的块
    let amount = 100 // 第一个数量为 0
    {
      let amount = 1000 // 第一个数量为 0
      }
  }  
  return amount
}
 
console.log(calculateTotalAmount(true)) //0

JavaScript

function calculateTotalAmount (vip) {
  const amount = 0  
  if (vip) {
    const amount = 1 
  } 
  { // 更多的块
    const amount = 100 
    {
      const amount = 1000
      }
  }  
  return amount
}

console.log(calculateTotalAmount(true))

//const
function calculateTotalAmount (vip) {
  const amount = 0  
  if (vip) {
    const amount = 1 
  } 
  { // 更多的块
    const amount = 100 
    {
      const amount = 1000
      }
  }  
  return amount
}
 
console.log(calculateTotalAmount(true)) // 0

/**
 *ES6中的类  class
 * 调用父类构造函数时，只需带上参数轻松的调用super()方法。
 */

class baseModel {
  constructor(options = {}, data = []) { // class constructor
        this.name = 'Base'
    this.url = 'http://azat.co/api'
        this.data = data
    this.options = options
    }
 
    getName() { // class method
        console.log(`Class name: ${this.name}`)
    }
}

/**
 * ES6中的模块化
 */

// MyClass.js
export default class { ... }

// main.js
import MyClass from 'MyClass';
let o = new MyClass();

export { foo, bar } from 'my_module';

// 等同于
import { foo, bar } from 'my_module';
export { foo, bar };