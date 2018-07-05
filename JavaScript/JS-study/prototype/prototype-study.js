/*
 * javascript 原型及原型链
 * prototype: 在函数身上，指向原型对象
 * __proto__: 在对象身上（包括函数创建的对象, 函数本身和原型对象），指向自身的原型
 * constructor: 在原型对象上，指向构造函数, 在多级继承的时候，指明构造函数方便在对象上扩展原型属性
 * Object.__protp__为null: 原型的顶端
 * 
 * 真正形成原型链的是每个对象的__proto__属性，而不是函数的prototype属性，这是很重要的。
 * hasOwnProperty 是 JavaScript 中唯一一个只涉及对象自身属性而不会遍历原型链的方法
 * */

var o = {a: 1};

// o这个对象继承了Object.prototype上面的所有属性
// 所以可以这样使用 o.hasOwnProperty('a').
// hasOwnProperty 是Object.prototype的自身属性。
// Object.prototype的原型为null。
// 原型链如下:
// o ---> Object.prototype ---> null

var a = ["yo", "whadup", "?"];

// 数组都继承于Array.prototype 
// (indexOf, forEach等方法都是从它继承而来).
// 原型链如下:
// a ---> Array.prototype ---> Object.prototype ---> null

function f(){
  return 2;
}

// 函数都继承于Function.prototype
// (call, bind等方法都是从它继承而来):
// f ---> Function.prototype ---> Object.prototype ---> null


// 第一种
//通过给Calculator对象的prototype属性赋值对象字面量来设定Calculator对象的原型。

var Calculator = function (decimalDigits, tax) {
    this.decimalDigits = decimalDigits;
    this.tax = tax;
};
Calculator.prototype = {
    add: function (x, y) {
    return x + y;
},

subtract: function (x, y) {
    return x - y;
    }
};
console.log((new Calculator()).add(1, 3));

//第二种
//赋值原型prototype的时候使用function立即执行的表达式来赋值，即如下格式:Calculator.prototype = function () { } ();, 
//可以封装私有的function，通过return的形式暴露出简单的使用名称，以达到public/private的效果。

Calculator.prototype = function () {
    add = function (x, y) {
        return x + y;
    },

    subtract = function (x, y) {
        return x - y;
    }
    return {
        add: add,
        subtract: subtract
    }
} ();

console.log((new Calculator()).add(1, 3));


// 第三种，分别设置添加
var Calculator = function (decimalDigits, tax) {
    this.decimalDigits = decimalDigits;
    this.tax = tax;
};
Calculator.prototype.add = function (x, y) {
    return x + y;
};

Calculator.prototype.subtract = function (x, y) {
    return x - y;
};


//例

function Point(x, y) {
    this.x = x;
    this.y = y;
}
Point.prototype = {
    print: function () { console.log(this.x, this.y); }
};

var p1 = new Point(10, 20);
p1.print(); // 10 20
console.log(p1 instanceof Point); // true

var p2 = new (Point)(20, 20);
p2.print(); // 20 20
console.log(p2 instanceof Point); // true

var a=function(){
this.value = 43;
//empty
}
a.prototype.var1=[1,2,3];
var b=new a();
b.var1.push(4);
b.value = 42
var c=new a();
console.log(c.var1.join(","))
console.log(c.value)
console.log(b.value)
//1,2,3,4
// 43
// 42

//继承
//uber属性，这个属性直接指向父对象的prototype属性。（uber是一个德语词，意思是"向上"、"上一层"。）
//这等于在子对象上打开一条通道，可以直接调用父对象的方法。这一行放在这里，只是为了实现继承的完备性，纯属备用性质。
function extend(Child, Parent) {
	var F = function(){};
	F.prototype = Parent.prototype;
	Child.prototype = new F();
	Child.prototype.constructor = Child;
	Child.uber = Parent.prototype;
}
//copy继承
function extend2(Child, Parent) {
	var p = Parent.prototype;
　var c = Child.prototype;
　for (var i in p) {
　		c[i] = p[i];
　}
　c.uber = p;
}


//
function object(o) {
　function F() {}
　F.prototype = o;
　return new F();
}

var obj = {
	name:'obj'
};

var obj1 = object(obj);
obj1.age = 24

console.log(obj1.name)
