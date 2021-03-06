/**
 * new
 * 
 * 1、新生成了一个对象
  2、链接到原型
  3、绑定 this
  4、返回新对象
  对于创建一个对象来说，更推荐使用字面量的方式创建对象（无论性能上还是可读性）。
  因为你使用 new Object() 的方式创建对象需要通过作用域链一层层找到 Object，但是你使用字面量的方式就没这个问题。
 */

function create() {
  // 创建一个空的对象
  let obj = new Object()
  // 获得构造函数
  let Con = [].shift.call(arguments)
  // 链接到原型
  obj.__proto__ = Con.prototype
  // 绑定 this，执行构造函数，获取所有属性绑定到obj
  let result = Con.apply(obj, arguments)
  // 确保 new 出来的是个对象
  return typeof result === 'object' ? result : obj
}

// 运算符优先级
function Foo() {
  return this;
}
Foo.getName = function () {
  console.log('1');
};
Foo.prototype.getName = function () {
  console.log('2');
};

new Foo.getName();   // -> 1
new Foo().getName(); // -> 2

// 更优解
/**首先创建一个空的对象，空对象的__proto__属性指向构造函数的原型对象
把上面创建的空对象赋值构造函数内部的this，用构造函数内部的方法修改空对象
如果构造函数返回一个非基本类型的值，则返回这个值，否则上面创建的对象
*/

function _new(fn, ...arg) {
    var obj = Object.create(fn.prototype);
    const result = fn.apply(obj, ...arg);
    return Object.prototype.toString.call(result) == '[object Object]' ? result : obj;
}