# 对象创建

>首先明确JavaScript中的方法分为3类 —— **类方法，对象方法，原型方法**，创建对象关键在定义方法
JavaScript中的函数就是一个对象Function，函数名就是对象引用

## 基于已有对象扩充其属性和方法

```js
var object = new Object();
object.name = "张三";//添加属性
alert(object.name);
// 给对象添加方法,用来修改成员属性
object.sayHello = function(name)
{
    this.name = name;
    alert(this.name);
}
object.sayHello("王五");
```

> 对象不可复制，单一

## 利用设计模式中的工厂方式

**经典工厂**：

```js
function createPerson(name, age, job){ 
 var o = new Object();
   o.name = name; 
   o.age = age; 
   o.job = job;
   o.sayName = function(){  
   alert(this.name); 
 }
 return o;
}
var person1 = createPerson("wei",25,"software");
var person2 = createPerson("bu",25,"software");

```

**寄生工厂构造函数**：

```js
//工厂方式创建对象  无参
function CreatObject()
{
    var object = new Object();
    object.name = "zhangsan";
    object.age = 20;

    object.get =  function()
    {
        alert( this.name + ":" +  this.age);
    }
    return object;
}

var object1 = new CreatObject();
object1.get();

//工厂方式创建有参构造
function CreatObject(name, age)
{
    var object = new Object();

    object.name = name;
    object.age = age;

    object.get = function()
    {
        alert(this.name + ":" + this.age)
    }
    return object;

}
var object2 = new CreatObject("zhangsan", 20);
object2.get();
```

关于寄生构造函数模式，有一点需要声明：首先，返回的对象与构造函数或者构造函数的原型没有任何关系；也就是说，**构造函数返回的对象与在构造函数外部创建的对象没有什么不同**。为此，不能依赖instanceof操作符来确定对象的类型。由于存在这一的问题，我们建议在可以使用其他模式的情况下不要使用这种模式。

```js
function CreatObject(name, age)
{

    var object = new Object();

    object.name = name;
    object.age = age;
    //函数名其实是指向对象的引用
    //会调用外面的方法
    object.get = get;
    return object;
}
//定义对象方法：在构建对象时传入参数
function get()
{
    alert(this.name + ":" + this.age)
}

var object = new CreatObject("旺财", "10");
object.get();
```

**稳妥模式**：
只有方法，不含属性，不使用new创建
```js
function Person(name, age, job){
 //创建要返回的新对象
 var o = new Object();
 //可以在这里定义私有变量和函数
 //添加方法
 o.sayName = function(){
  alert(this.name);
 };
 //返回对象
 return o;
}
var person = Person("weiqi",22,"banzhuan");
person.sayName(); //weiqi
```

> 工厂模式，每个对象都有一份单独的成员属性和方法，需要分配大量内存让一个函数对象被多个对象所共享，而不是每一个对象拥有一个函数对象可以把共享的方法定义在外面

## 构造函数方式

```js
function CreatObject()
{
//在执行第一行代码前，js引擎会为我们生成一个对象
    this.name = "张三";
    this.age = 20;

    this.get = function()
    {
        alert(this.name + ": " + this.age);
    }
//此处有一个隐藏的return语句，用于将之前生成的对象返回
}

var object = new CreatObject();
object.get();

//可以在构造对象时传递参数
function CreatObject(name, age)
{
    this.name = name;
    this.age = age;

    this.get = function ()
    {
        alert(this.name + ": " + this.age);
    }
}

var object = new CreatObject("李四", 30);
var object2 = new CreatObject("李四", 30);
object.get();
alert(object.get == object2.get);  //false

```

```js
function Person(name, age, job){
 this.name = name;
 this.age = age;
 this.job = job;
 this.sayName = sayName;
}
function sayName(){ //解决函数定义实例不一致
 alert(this.name);
}
```

> 可能需要定义多个全局对象方法，缺乏封装

**构造函数执行**：

- 创建一个新对象

- 将构造函数的作用域赋给新对象（因此this指向这个新对象）

- 执行构造函数中的代码

- 返回新对象

## 原型（“prototype”）方式

JavaScript中的每个对象都有prototype属性，prototype属性返回对象类型原型的引用

```js
//原型方法
function  Person(){}

Person.prototype.name = "张三";
Person.prototype.age = 20;

Person.prototype.get = function()
{
    alert(this.name + ": " + this.age);
}

var person = new Person();
person.name = "李四";
person.get();


function Person(){}

Person.prototype.name = new Array();
Person.prototype.age = 20;

Person.prototype.get = function()
{
    alert(this.name + ": " + this.age);
}

var object = new Person();
var object2 = new Person();

object.name.push("张三");
object2.name.push("李四");
//如果使用原型方式对象，那么生成的所有对象会共享原型中的属性，
//一个对象改变了该属性也会反应到其他对象当中
object.get();
object2.get();
```

> 原型模式的很好的共享性，也导致实例修改属性会反映到其他实例中，对象不够纯净独立。

## 原型+构造函数方式

>单纯使用原型方式定义对象无法在构造函数中为属性赋初值，只能在
对象生成后再去改变属性值。 使用原型+构造函数方式来定义对象，对象之间的属性互不干扰，各 个对象间共享同一个方法

```js
function Person()
{//把不同的对象的成员属性放在对象定义中
    this.name = new Array();
    this.age = 20;
}

Person.prototype.get = function()
{
    alert(this.name + ": " + this.age);
}

var object = new Person();
var object2 = new Person();

object.name.push("张三");
object2.name.push("李四");
object.age = 30;

object.get();//张三:30
object2.get();//李四：20
```

## 动态原型方式：

>在构造函数中通过标志量让所有对象共享一个方法，而每个对象拥有自己的属性

```js
function Person(name, age)
{
    this.name = name;
    this.age = age;

    // 初次创建对象则进去
    if (typeof Person.flag == "undefined")
    {
        alert("初次创建");
        Person.prototype.get = function()
        {
            alert(this.name + ": " + this.age);
        }
        Person.flag = true;
    }
}

var object = new Person("张三", 20);
var object2 = new Person("李四", 30);

object.get();
object2.get();
```

>使用动态原型模式时，不能使用对象字面量重写原型。如果在已经创建了实例的情况下重写原型，那么就会切断现有的实例与新原型之间的联系
