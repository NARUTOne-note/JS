/*
 this
 * */

 // ? 全局this === window
 // * 任何情况下，创建变量时没有使用var或者let(ECMAScript 6)，也是在操作全局this。
 // * node :命令行： global === this； js文件下，this其实是个空对象，有别于global。
console.log(this === window); //true
var color = 'red';
var o = {color: 'blue'};

function getColor() {
	console.log(this.color);
}

getColor(); // red

o.getColor = getColor;
o.getColor() // blue

// ? apply 、 call

getColor.call(this); // red
getColor.call(o); // blue


// ? 函数正常被调用（不带new）时，里面的this指向的是全局作用域。
// * 就是使用了"use strict";。此时this是undefined。
// * 使用了new关键字，此刻this指代一个新的上下文，不再指向全局this。
// ! 避免在构造函数中返回(object)，因为返回的东西可能覆盖本来该返回的实例。

str = 'asda';

function foo() {
	age = 12;
	this.name = 'wz'
}

function Thing() {
	this.name = 'wz'
}

// ? 原型中this, 共享
Thing.prototype.foo = "bar";
Thing.prototype.logFoo = function () {
    console.log(this.foo);
}
Thing.prototype.setFoo = function (newFoo) {
    this.foo = newFoo;
}
Thing.prototype.deleteFoo = function () {
    delete this.foo;
}

var thing = new Thing();
thing.setFoo("foo");
thing.logFoo(); // "foo";
thing.deleteFoo();
thing.logFoo(); // "bar";
thing.foo = "foobar";
thing.logFoo(); // "foobar";
delete thing.foo;
thing.logFoo(); // "bar";

// ? 实例的方法作为参数传递时，实例是不会跟着过去的。也就是说，此时方法中的this在调用时指向的是全局this或者是undefined在声明了"use strict"时。

function doIt(method) {
    method();
}

thing.logFoo(); //logs "bar"
doIt(thing.logFoo); //logs undefined

// ? bind, this绑定

doIt(thing.logFoo.bind(thing)); //logs bar

// ? 对象中的this
// * 可以在对象的任何方法中使用this来访问该对象的属性

var obj = {
    foo: "bar",
    logFoo: function () {
        console.log(this.foo);
    }
};

obj.logFoo(); //logs "bar"

// ? DOM 事件回调中的this
// * 在DOM事件的处理函数中，this指代的是被绑定该事件的DOM元素。

function Listener() {
    document.getElementById("foo").addEventListener("click",
       this.handleClick);
}
Listener.prototype.handleClick = function (event) {
    console.log(this); //logs "<div id="foo"></div>"
}

var listener = new Listener();
document.getElementById("foo").click();

// ? HTML this

{/* <div id="foo" onclick="console.log(this);"></div> */}
document.getElementById("foo").click(); // logs <div id="foo"...

