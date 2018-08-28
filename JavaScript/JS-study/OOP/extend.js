/*
 * @File: extends.js
 * @Project: OOP
 * @File Created: Monday, 20th August 2018 12:41:57 am
 * @Author: NARUTOne (wznaruto326@163.com/wznarutone326@gamil.com)
 * -----
 * @Last Modified: Monday, 20th August 2018 12:42:04 am
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
  * ! oop - 继承
  */
 /**
 * ! 不使用 Object.create()
 */
  // ! 基于原型链继承
 // ? 原型链继承: 把子类的prototype设置为父类的实例， 父类属性方法复用
// * 缺点：属性方法被多个子类共享、覆盖, 子类不能传参父类
 // 父类
 function Person(name, age) {
  this.name = name || 'person';
  this.age = age || 100;
};
 Person.prototype.say = function() {         // 方法继承
  console.log('I am a person')
}
 // 子类
function Student(name, score){
  this.name = name || 'student';
  this.score = score || 80;
};
 // 继承 注意,继承必须要写在子类方法定义的前面
Student.prototype = new Person()
 // 所有涉及到原型链继承的继承方式都要修改子类构造函数的指向，否则子类实例的构造函数会指向SuperType。
 Student.prototype.constructor = Student;
 // 为子类新增一个方法(在继承之后,否则会被覆盖)
Student.prototype.study = function () {     // 方法继承
    console.log('I am studing')
}
 var stu = new Student('lucy')
 stu.say();
stu.study();
console.log(stu.name)  // student    --子类覆盖父类的属性
console.log(stu.age)   // 100       --父类的属性
console.log(stu.score) // 80      --子类自己的属性
 // ! 构造函数继承
// ? 父类的引用属性不会被共享
// ? 子类构建实例时可以向父类传递参数
// * 父类的方法不能复用，子类实例的方法每次都是单独创建的
 // 父类
function Person(name) {
  this.name = name || 'person';
  this.hobbies = ['music','reading'];
  this.say = function() {} // 方法，不共享
}
 // 子类
function Student(name){
  Person.call(this, name)        // 父类执行
}
 /**
 * 注意,这里跟 原型链继承 有个比较明显的区别是并没有使用prototype继承,而是在子类里面执行父类的构造函数, 
 * 相当于把父类的代码复制到子类里面执行一遍,这样做的另一个好处就是可以给父类传参
 */
 var stu1 = new Student()
var stu2 = new Student('lili')
stu1.hobbies.push('basketball')
console.log(stu1.hobbies)   // music,reading,basketball
console.log(stu2.hobbies)   // music,reading
console.log(stu2.name); // lili
console.log(stu1.say === stu2.say)   // false
 // ! 组合继承 = 原型链继承 + 构造函数继承; 常用继承
// ? 调用两次父类，第二次会覆盖第一次子类原型属性、方法，性能浪费
 // 父类
function Person() {
  this.hobbies = ['music','reading'] 
 }
 // 父类函数
Person.prototype.say = function() {console.log('I am a person')}
 // 子类
function Student(){
    Person.call(this)             // 构造函数继承(继承属性)
}
// 继承
Student.prototype = new Person()  // 原型链继承(继承方法)
Student.prototype.constructor = Student;
 // 实例化
var stu1 = new Student()
var stu2 = new Student()
 stu1.hobbies.push('basketball')
console.log(stu1.hobbies)           // music,reading,basketball
console.log(stu2.hobbies)           // music,reading
 console.log(stu1.say == stu2.say)   // true
 /**
 * ! Object.create()
 * ECMAScript 5 通过新增 Object.create()方法规范化了原型式继承。
 * 这个方法接收两个参数:一 个用作新对象原型的对象和(可选的)一个为新对象定义额外属性的对象。
 * 在传入一个参数的情况下， Object.create()与 objectExtends()方法的行为相同。
 */
  // !原型式继承
 // ? 原型式继承的objectExtends方法本质上是对参数对象的一个浅复制。父类方法属性 复用共享，不能传参
 function objectExtends (o) {
  function F () {}
  F.prototype = o;
  return new F();
}
 var person = {
  name: 'person',
  friends: ['0', '1', '2']
};
 var newPerson = objectExtends(person);
newPerson.name = 'person1';
newPerson.friends.push('3');
 var newPerson1 = objectExtends(person);
newPerson1.name = 'person2';
newPerson1.friends.push('4');
 console.log(person.name); // person
console.log(person.friends); // ['0', "1", "2", "3", "4"]
 // ! 寄生式继承
// ?使用原型式继承获得一个目标对象的浅复制，然后增强这个浅复制的能力。
 function createAnother(o) {
  var clone = object(o);
  clone.sayHi = function () {
    alert('hi');
  };
  return clone;
}
 // ! 寄生组合继承
// 核心：因为是对父类原型的复制，所以不包含父类的构造函数，也就不会调用两次父类的构造函数造成浪费
 function inheritPrototype(subType, superTyper) {
  var newprototype = object(superTyper.prototype); // 父类原型浅复制
  newprototype.constructor = subType; // 修正原型构造函数
  subType.prototype = newprototype;
}
 function SuperType(name) {
  this.name = name || 'super';
  this.colors = ['red', 'green', 'blue'];
}
 SuperType.prototype.sayName = function () {
  alert(this.name);
}
 function SubType(name, age) {
  SuperType.call(this, name);
  this.age = age || 0;
}
 inheritPrototype(SubType, SuperType);
 SubType.prototype.sayAge = function () {
  alert(this.age); 
}
 // ! ES6 class 继承, 语法糖
// ? 而ES6先将父类实例对象的属性和方法，加到this上面（所以必须先调用super方法），然后再用子类的构造函数修改this
 class A {}
 class B {}
 Object.setPrototypeOf = (obj, proto) => {
  obj.__proto__ = proto;
  return obj;
}
 // B 的实例 继承 A的 方法
Object.setPrototypeOf(B.prototype, A.prototype);
 // B 继承 A的静态属性 
Object.setPrototypeOf(B, A);
 // ? B.__proto__ === A;  //继承属性
// ? B.prototype.__proto__ === A.prototype;  //继承方法
 /**
 * ES5中A.__proto__是指向Function.prototype的，因为每一个构造函数其实都是Function这个对象构造的，
 * ES6中子类的__proto__指向父类可以实现属性的继承，
 * 在ES5中在没有用借用继承的时候由于父类属性被子类原型继承，所有的子类实例实际上都是同一个属性引用
 * 
 * 在ES5继承和构造实例，ES6构造实例的时候可以理解__proto__原型指针是用来指向构造函数的原型的，
 * 但是在ES6继承中，__proto__指继承自哪个类或原型，在A继承B之后，构造一个实例 var obj = new A; 
 * 会发现它所有的属性指向都是和ES5一致的
 */
  /**
  * ES6继承是在父类创建this对象，在子类constructor中来修饰父类的this，ES5是在子类创建this，将父类的属性方法绑定到子类，
  * 由于原生的构造函数（Function，Array等）没有this，
  * 子类无法通过call/apply(this)获得其内部属性，所以在ES5无法继承，ES6实现后可以为原生构造函数封装一些有趣的接口
  */ 