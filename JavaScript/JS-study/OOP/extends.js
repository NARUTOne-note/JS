/**
 * @title: javascript 面向对象编程 （OOP）- 继承（extends）
 * 
 * @Date: 2017/07/27
 * @author: NARUTOne
 * 
 */

//1、原型创建介绍
// 全局命名空间
var MYAPP = MYAPP || {};

// 子命名空间
MYAPP.event = {};

// 给普通方法和属性创建一个叫做MYAPP.commonMethod的容器
MYAPP.commonMethod = {
  regExForName: "", // 定义名字的正则验证
  regExForPhone: "", // 定义电话的正则验证
  validateName: function(name){
    // 对名字name做些操作，你可以通过使用“this.regExForname”
    // 访问regExForName变量
  },
 
  validatePhoneNo: function(phoneNo){
    // 对电话号码做操作
  }
}

// 对象和方法一起申明
MYAPP.event = {
    addListener: function(el, type, fn) {
    //  代码
    },
   removeListener: function(el, type, fn) {
    // 代码
   },
   getEvent: function(e) {
   // 代码
   }
  
   // 还可以添加其他的属性和方法
}

//使用addListener方法的写法:
//MYAPP.event.addListener("yourel", "type", callback);



/**
 * 继承
 * 
 */

//简例 1.0
function Person(firstName) {
  this.firstName = firstName;
}

Person.prototype.sayHello = function() {
  alert("Hello, I'm " + this.firstName);
};

var person1 = new Person("Alice");
var person2 = new Person("Bob");
var helloFunction = person1.sayHello;

person1.sayHello();                                 // alerts "Hello, I'm Alice"
person2.sayHello();                                 // alerts "Hello, I'm Bob"
helloFunction();                                    // alerts "Hello, I'm undefined" (or fails
                                                    // with a TypeError in strict mode)
console.log(helloFunction === person1.sayHello);          // logs true
console.log(helloFunction === Person.prototype.sayHello); // logs true
helloFunction.call(person1);                        // logs "Hello, I'm Alice"


//简例2.0

// 定义Person构造器
function Person(firstName) {
  this.firstName = firstName;
}

// 在Person.prototype中加入方法
Person.prototype.walk = function(){
  alert("I am walking!");
};
Person.prototype.sayHello = function(){
  alert("Hello, I'm " + this.firstName);
};

// 定义Student构造器
function Student(firstName, subject) {
  // 调用父类构造器, 确保(使用Function#call)"this" 在调用过程中设置正确
  Person.call(this, firstName);

  // 初始化Student类特有属性
  this.subject = subject;
};

// 建立一个由Person.prototype继承而来的Student.prototype对象.
// 注意: 常见的错误是使用 "new Person()"来建立Student.prototype.
// 这样做的错误之处有很多, 最重要的一点是我们在实例化时
// 不能赋予Person类任何的FirstName参数
// 调用Person的正确位置如下，我们从Student中来调用它
Student.prototype = Object.create(Person.prototype); // See note below

// 设置"constructor" 属性指向Student
Student.prototype.constructor = Student;

// 更换"sayHello" 方法
Student.prototype.sayHello = function(){
  console.log("Hello, I'm " + this.firstName + ". I'm studying " + this.subject + ".");
};

// 加入"sayGoodBye" 方法
Student.prototype.sayGoodBye = function(){
  console.log("Goodbye!");
};

// 测试实例:
var student1 = new Student("Janet", "Applied Physics");
student1.sayHello();   // "Hello, I'm Janet. I'm studying Applied Physics."
student1.walk();       // "I am walking!"
student1.sayGoodBye(); // "Goodbye!"

// Check that instanceof works correctly
console.log(student1 instanceof Person);  // true 
console.log(student1 instanceof Student); // true


/**
 *封装
 * 
 * 在上一个例子中，Student类虽然不需要知道Person类的walk()方法是如何实现的，但是仍然可以使用这个方法；
 * Student类不需要明确地定义这个方法，除非我们想改变它，这就叫做封装。
 * 对于所有继承自父类的方法，只需要在子类中定义那些你想改变的即可。
 */

/**
 *抽象
 * 
 * 抽象是允许模拟工作问题中通用部分的一种机制。这可以通过继承（具体化）或组合来实现。
 * JavaScript通过继承实现具体化，通过让类的实例是其他对象的属性值来实现组合。
 *
 */

//JavaScript Function 类继承自Object类（这是典型的具体化） 。Function.prototype的属性是一个Object实例（这是典型的组合）。

var foo = function(){};
console.log( 'foo is a Function: ' + (foo instanceof Function) );                  // logs "foo is a Function: true"
console.log( 'foo.prototype is an Object: ' + (foo.prototype instanceof Object) ); // logs "foo.prototype is an Object: true"   

/**
 *多态
 * 就像所有定义在原型属性内部的方法和属性一样，不同的类可以定义具有相同名称的方法;方法是作用于所在的类中。
 * 并且这仅在两个类不是父子关系时成立（继承链中，一个类不是继承自其他类）。
 */



//实例3.0，
//在 ClassB 构造函数中，用对象冒充继承 ClassA 类的 sColor 属性。

function ClassA(sColor) {
    this.color = sColor;
}

ClassA.prototype.sayColor = function () {
    alert(this.color);
};

function ClassB(sColor, sName) {
    ClassA.call(this, sColor);
    this.name = sName;
}

ClassB.prototype = new ClassA();

ClassB.prototype.sayName = function () {
    alert(this.name);
};

var objA = new ClassA("blue");
var objB = new ClassB("red", "John");
objA.sayColor();	//输出 "blue"
objB.sayColor();	//输出 "red"
objB.sayName();	//输出 "John"

//YUI式继承

function Animal() {}
Animal.prototype.feeling = 'happy';
 
function extend(Child, Parent) {
    var F = function(){};
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
}
 
extend(Dog, Animal);
 
var dog = new Dog('二狗', '哈士奇');
print(dog.feeling); // happy