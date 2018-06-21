# Welcome to prototype

![](http://i.imgur.com/ouw4M3j.jpg)

## 学习篇
- [Javascript 继承机制的设计思想](http://www.ruanyifeng.com/blog/2011/06/designing_ideas_of_inheritance_mechanism_in_javascript.html)
- Javascript 面向对象编程（一）：[js封装](http://www.ruanyifeng.com/blog/2010/05/object-oriented_javascript_encapsulation.html)
- Javascript 面向对象编程（二）：[构造函数的继承](http://www.ruanyifeng.com/blog/2010/05/object-oriented_javascript_inheritance.html)
- Javascript 面向对象编程（三）：[非构造函数的继承](http://www.ruanyifeng.com/blog/2010/05/object-oriented_javascript_inheritance_continued.html)

```js
function Foo() {
    this.value = 42;
}
Foo.prototype = {
    method: function() {}
};

function Bar() {}

// 设置Bar的prototype属性为Foo的实例对象
Bar.prototype = new Foo();
Bar.prototype.foo = 'Hello World';

// 修正Bar.prototype.constructor为Bar本身
Bar.prototype.constructor = Bar;

var test = new Bar() // 创建Bar的一个新实例

// 原型链
test [Bar的实例]
    Bar.prototype [Foo的实例] 
        { foo: 'Hello World' }
        Foo.prototype
            {method: ...};
            Object.prototype
                {toString: ... /* etc. */};
```

上面的例子中，test 对象从 Bar.prototype 和 Foo.prototype 继承下来；
因此， 它能访问 Foo 的原型方法 method。同时，它也能够访问那个定义在原型上的 Foo 实例属性 value。 
需要注意的是 new Bar() 不会创造出一个新的 Foo 实例，而是 重复使用它原型上的那个实例；
因此，所有的 Bar 实例都会共享相同的 value 属性。

**JS引擎如何查找属性**
```js
function getProperty(obj, prop) {
    if (obj.hasOwnProperty(prop))
        return obj[prop]

    else if (obj.__proto__ !== null)
        return getProperty(obj.__proto__, prop)

    else
        return undefined
}
```

**new**

new 运算符接受一个函数 F 及其参数：new F(arguments...)。这一过程分为三步：

创建类的实例。这步是把一个空的对象的 __proto__ 属性设置为 F.prototype 。
初始化实例。函数 F 被传入参数并调用，关键字 this 被设定为该实例。
返回实例。

```js
function New (f) {
    var n = { '__proto__': f.prototype }; /*第一步*/
    return function () {
        f.apply(n, arguments);            /*第二步*/
        return n;                         /*第三步*/
    };
}
```

**getPrototypeOf**

```js
	function Foo() {
		this.someProp = 'prop'
	}
	var o = new Foo();
	JavaScript 实际上执行的是：
	
	var o = new Object();
	o.__proto__ = Foo.prototype;
	Foo.call(o);
	（或者类似上面这样的），然后当你执行：
	
	o.someProp;
```
它会检查是否存在 someProp 属性。如果没有，它会查找 Object.getPrototypeOf(o).someProp ,如果仍旧没有，
它会继续查找 Object.getPrototypeOf(Object.getPrototypeOf(o)).someProp ，
一直查找下去，直到它找到这个属性 或者 Object.getPrototypeOf() 返回 null 。


**示例** 

```js
function A(a){
  this.varA = a;
}

// 以上函数 A 的定义中，既然 A.prototype.varA 总是会被 this.varA 遮蔽，
// 那么将 varA 加入到原型（prototype）中的目的是什么？
A.prototype = {
  varA : null,  
/*
既然它没有任何作用，干嘛不将 varA 从原型（prototype）去掉 ? 
也许作为一种在隐藏类中优化分配空间的考虑 ?
https://developers.google.com/speed/articles/optimizing-javascript 
如果varA并不是在每个实例中都被初始化，那这样做将是有效果的。
*/
  doSomething : function(){
    // ...
    consoole.log(1)
  }
}

function B(a, b){
  A.call(this, a);
  this.varB = b;
}
B.prototype = Object.create(A.prototype, {
  varB : {
    value: null, 
    enumerable: true, 
    configurable: true, 
    writable: true 
  },
  doSomething : { 
    value: function(){ // override
      A.prototype.doSomething.apply(this, arguments); 
      // call super
      // ...
      console.log(2)
      
    },
    enumerable: true,
    configurable: true, 
    writable: true
  }
});
B.prototype.constructor = B;

var b = new B();
b.doSomething();
//1
//2
```
![](http://i.imgur.com/xmuAAaN.png)

## 运用篇

- [原型使用](http://www.cnblogs.com/TomXu/archive/2012/01/05/2305453.html)

- [原型重要性](https://segmentfault.com/a/1190000002596600)

- [原型继承方式简介](https://segmentfault.com/a/1190000000766541)


**new 与 apply**

```js
Function.prototype.new = function () {
    function functor() { return constructor.apply(this, args); }
    var args = Array.prototype.slice.call(arguments);
    functor.prototype = this.prototype;
    var constructor = this;
    return new functor;
};

function Person(firstname,lastname){
    this.firstname = firstname ;
    this.lastname = lastname ;
}

var author = Person.new.apply(Person,['Aadit','Shah']) ;
```

## 总结大法

>完全继承复制，独成一系

```js
var deepClone = function(source,target){
    source = source || {} ;
    target = target || {};
    var toStr = Object.prototype.toString ,
        arrStr = '[object array]' ;
    for(var i in source){
        if(source.hasOwnProperty(i)){
            var item = source[i] ;
            if(typeof item === 'object'){
                target[i] = (toStr.apply(item).toLowerCase() === arrStr) ? [] : {} ;
                deepClone(item,target[i]) ;    
            }else{
                target[i] = item;
            }
        }
    }
    return target ;
} ;
var Parent = function(name){
    this.name = name || 'parent' ;
} ;
Parent.prototype.getName = function(){
    return this.name ;
} ;
Parent.prototype.obj = {a : '1'} ;

var Child = function(name){
    Parent.apply(this,arguments) ;
} ;
Child.prototype = deepClone(Parent.prototype) ;

var child = new Child('child') ;
var parent = new Parent('parent') ;

console.log(child.obj.a) ; //1
console.log(parent.obj.a) ; //1
child.obj.a = '2' ;
console.log(child.obj.a) ; //2
console.log(parent.obj.a) ; //1
```

合

```js
var deepClone = function(source,target){
    source = source || {} ;
    target = target || {};
    var toStr = Object.prototype.toString ,
        arrStr = '[object array]' ;
    for(var i in source){
        if(source.hasOwnProperty(i)){
            var item = source[i] ;
            if(typeof item === 'object'){
                target[i] = (toStr.apply(item).toLowerCase() === arrStr) ? [] : {} ;
                deepClone(item,target[i]) ;    
            }else{
                target[i] = item;
            }
        }
    }
    return target ;
} ;

var extend = function(Parent,Child){
    Child = Child || function(){} ;
    if(Parent === undefined)
        return Child ;
    //借用父类构造函数
    Child = function(){
        Parent.apply(this,argument) ;
    } ;
    //通过深拷贝继承父类原型    
    Child.prototype = deepClone(Parent.prototype) ;
    //重置constructor属性
    Child.prototype.constructor = Child ;
} ;

var Parent = function(name){
    this.name = name || 'parent' ;
} ;
Parent.prototype.getName = function(){
    return this.name ;
} ;
Parent.prototype.obj = {a : '1'} ;

var Child = function(name){
    Parent.apply(this,arguments) ;
} ;

extend(Child, Parent);
var child = new Child('child') ;
var parent = new Parent('parent') ;

console.log(child.obj.a) ; //1
console.log(parent.obj.a) ; //1
child.obj.a = '2' ;
console.log(child.obj.a) ; //2
console.log(parent.obj.a) ; //1
```