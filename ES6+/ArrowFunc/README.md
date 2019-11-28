# 箭头函数

> 重新认识一下这个 ES6 用得最多的东西。

问到箭头函数带来的好处时，大部分人都只说到了写得少（？？？）
，不需要用 `that`、`self` 之类的变量，可以直接使用 this。但当细问下去，其实很多人不了解箭头函数的 this 就是是啥回事（或者包括我自己

先说说在此之前我对箭头函数的理解吧：箭头函数里的 this 是「继承」的，本身不存在自己的 this，当调用到 this 时用的其实是上一层作用域的 this。现在看来这个理解还是有一定偏差。

## 从 this 说起

### 闭包与词法作用域

摘录一段犀牛书的代码，就能很好说明闭包和词法作用域的问题了：

```js
var scope = 'global scope';
function checkscope() {
  var scope = 'local scope';
  function f() { return scope; }
  return f;
}
checkscope()();
```

这里返回的是 `'local scope'`，是因为在函数 f 函数体内访问 `scope` 变量时，会沿着从 f 开始的作用域链往上查找，因此第一个查找到的变量是在 `checkscope` 作用域内定义的 `scope`。

注意无论 f 在何时何地调用，返回的 `scope` 总是 `'local scope'`，这是由于作用域查找总是从 f 开始，因此 `scope` 的值通过 **词法作用域** 确定了。

### Function 的 this

在 `ES5` 中，函数中的 this 是动态变化的，会根据调用方式的不同产生不同的绑定，只有在被调用时才能确定 this 的值：

- 普通函数调用时，全局对象（浏览器下非严格模式 `window`）
- 作为对象方法调用时，为该对象
- 作为构造函数调用时，为新对象的引用
- 使用 `call`、`apply` 调用，为绑定的值（第一个参数）
用代码说明一下：

```js
function f(change) {
  if (change) {
    this.a = 300;
  }
  console.log(this.a);
}

var a = 100;
var obj = {
  a: 200
};

// 普通调用，输出 100
f();

// 方法调用，输出 200
obj.f = f;
obj.f();

// 构造函数调用，改变的是新对象的 a，输出 300, 100, 300
var newObj = new f(true);
console.log(a);
console.log(newObj.a);
```

### Arrow Function 的 this

先看 MDN 的说明：[MDN - 箭头函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions)，其实写得很清楚了。关键在于箭头函数的 this 是词法作用域绑定这个概念。这意味着箭头函数的 this 类似于一个变量，在定义的时候就已经确定了指向的上下文，而非动态获取。看个例子：

```js
var a = 100;
var obj1 = {
  a: 200,
  b: () => {
    console.log(this.a);
  }
};
obj1.b();

var obj2 = {
  a: 200,
  b: function () {
    var f = () => {
      console.log(this.a);
    }
    f();
  }
};
obj2.b();
var ff = obj2.b;
ff();
```

在箭头函数中，`this` 可以看成是一个变量，而非关键字，箭头函数本身作用域里并没有 `this` 的定义，当引用 `this` 时，会沿着作用域链往上查找（跟闭包那个 `scope` 好像哦）。

因此例子中的 `obj1.b()` 跟 `obj2.b()` 输出分别为 100 和 200，由于 `obj1.b` 在查找 `this` 时会一直查找到全局作用域，因此 `this.a = 100`；而 `obj2.b` 在 `function` 作用域就找到了 `this`（注意使用了 `function` 定义了函数），而这时的 `this` 为方法调用的对象 `obj2`，因此 `this.a = 200`。

进一步说明这种作用域查找规则的是下面两行，输出是 100. 由于此时 `obj2.b` 的调用是一个普通函数调用，因此 this 的值是全局对象，所以输出的是 `window.a` 了。

## Arrow Function 到底是啥

在了解到箭头函数内部的 `this` 其实是 **一个词法绑定的变量** 时，我不禁怀疑这个箭头函数究竟是个啥，甚至于它是不是一个函数，有没有自己的作用域？

以前很多对箭头函数的简单解释是 **JavaScript 函数的语法糖** ，根据前文所述的 this 获取值的不同，已经知道箭头函数与普通函数其实有很大的不同，于是尝试一下：

```js
var f = () => {};

// 'function'
typeof f;

// true
f instanceof Function;

// true
f.__proto__ === Function.prototype;

// 根据 MDN，箭头函数没有原型：undefined
f.prototype
```

## 注意

1、函数体内的 this 对象，就是定义时所在的对象，而不是使用时所在的对象。

2、不可以使用 arguments 对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。

3、不可以使用 yield 命令，因此箭头函数不能用作 Generator 函数。

4、不可以使用 new 命令

[MDN 箭头函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
