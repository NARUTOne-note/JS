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
constructor总结：

constructor它是构造函数原型对象中的一个属性，正常情况下它指向的是原型对象。
它并不会影响任何JS内部属性，只是用来标示一下某个实例是由哪个构造函数产生的而已。
如果我们使用了原型链继承或者组合继承无意间修改了constructor的指向，那么出于编程习惯，我们最好将它修改为正确的构造函数。

  */
 /**
 * ! 不使用 Object.create()
 */
  // ! 基于原型链继承
 // ? 原型链继承: 把子类的prototype设置为父类的实例， 父类属性方法复用
// * 缺点：属性方法被多个子类共享、覆盖; 子类不能传参父类; 无法实现多继承
 // 父类
 function Person(name, age) {
  this.name = name || 'person';
  this.age = age || 100;
};
 Person.prototype.say = function() { // 方法继承
  console.log('I am a person')
}
 // 子类
function Student(name, score){
  this.name = name || 'student';
  this.score = score || 80;
};
 // 继承 注意,继承必须要写在子类方法定义的前面
Student.prototype = new Person()
 // 所有涉及到原型链继承的继承方式都要修改子类构造函数的指向，否则子类实例的构造函数会指向父实例。
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
// * 父类的方法不能复用，子类实例的方法每次都是单独创建的；构造继承只能继承父类的实例属性和方法，不能继承父类原型的属性和方法
// * 实例并不是父类的实例，只是子类的实例
 // 父类
function Person(name) {
  this.name = name || 'person';
  this.hobbies = ['music','reading'];
  this.say = function() {} // 方法，不共享
}
Person.prototype.getName = function () {
  console.log(this.name)
}
 // 子类
function Student(name){
  Person.call(this, name)  // 父类执行
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
console.log(stu1.getName()) // getName is not a function, 不能继承父类原型方法
// 实例并不是父类的实例，只是子类的实例
console.log(stu1 instanceof Student) // true
console.log(stu1 instanceof Person) // false

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
Student.prototype.constructor = Student; // 修复实例创建标识
 // 实例化
var stu1 = new Student()
var stu2 = new Student()
 stu1.hobbies.push('basketball')
console.log(stu1.hobbies)           // music,reading,basketball
console.log(stu2.hobbies)           // music,reading
 console.log(stu1.say == stu2.say)   // true

// ! 升级：寄生组合继承 Object.creat
// Child不仅复制了Parent属性和方法 , Child的原型还指向了一个干净的对象，对象的__proto__指向Parent原型
function Parent (name) {
  this.name = name
}
Parent.prototype.getName = function () {
  console.log(this.name)
}
function Child (name) {
  this.sex = 'boy'
  Parent.call(this, name)
}
// ! 与组合继承的区别
Child.prototype = Object.create(Parent.prototype)

var child1 = new Child('child1')

console.log(child1)
child1.getName()

console.log(child1.__proto__)
console.log(Object.create(null))
console.log(new Object())


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
  F.prototype.constructor = F;
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
  var clone = objectExtends(o);
  clone.sayHi = function () {
    alert('hi');
  };
  return clone;
}

 // ! 寄生组合继承
// 核心：因为是对父类原型的复制，所以不包含父类的构造函数，也就不会调用两次父类的构造函数造成浪费
 function inheritPrototype(subType, superTyper) {
  var newprototype = objectExtends(superTyper.prototype); // 父类原型浅复制
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

// ! 混入继承 Object.assign

function Parent (sex) {
  this.sex = sex
}
Parent.prototype.getSex = function () {
  console.log(this.sex)
}
function OtherParent (colors) {
  this.colors = colors
}
OtherParent.prototype.getColors = function () {
  console.log(this.colors)
}
function Child (sex, colors) {
  Parent.call(this, sex)
  OtherParent.call(this, colors) // 新增的父类
  this.name = 'child'
}
Child.prototype = Object.create(Parent.prototype)
Object.assign(Child.prototype, OtherParent.prototype) // 新增的父类原型对象
Child.prototype.constructor = Child

var child1 = new Child('boy', ['white'])
child1.getSex()
child1.getColors()
console.log(child1)


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

 class Parent {
  constructor (name) {
    this.name = name
  }
  getName () {
    console.log(this.name)
  }
}
Parent.prototype.getSex = function () {
	console.log('boy')
}
Parent.getColors = function () {
  console.log(['white'])
}
class Child extends Parent {
  constructor (name) {
    super(name) // 必须调用，不能省； 继承父类的this对象
    super.getName()
    // console.log(super) // 这里会报错, 必须指定是函数还是对象使用
  }
  instanceFn () {
    super.getSex() // Parent.prototype.getSex.call(this)
  }
  static staticFn () {
    super.getColors()
  }
}
var child1 = new Child('child1') // child1
child1.instanceFn() // boy
Child.staticFn() // ['white']
console.log(child1) // Child{ name: 'child1' }

/**
 * extends后面接着的目标不一定是class，只要是个有prototype属性的函数就可以了
 * super当成函数调用时，代表父类的构造函数，且返回的是子类的实例，也就是此时super内部的this指向子类。
 * super当成函数调用时只能在子类的construtor中使用
 * 在子类的普通函数中super对象指向父类的原型对象
 * 在子类的静态方法中super对象指向父类
 * 在子类的constructor中super()就相当于是Parent.constructor.call(this)
 */