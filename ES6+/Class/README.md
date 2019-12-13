# ES6 类

> class 语法糖

## ES5 构造函数

```js
function Point(x, y) {
  // ES6 引入 new.target， 确定构造函数调用合法性
  if (new.target !== undefined) {
    this.x = x;
    this.y = y;
  } else {
    throw new Error('必须使用 new 命令生成实例');
  }
}

Point.prototype.toString = function () {
  return '(' + this.x + ', ' + this.y + ')';
};

var p = new Point(1, 2);
```

## Class

```js
let methodName = 'getArea'; // 属性表达式
class Point {
  _count = 0; // 实例属性
  /**
   * constructor方法，这就是构造方法; 如果没有显式定义，一个空的constructor方法会被默认添加。
   * this关键字则代表实例对象
  */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }

  get prop() {
    return 'getter';
  }
  set prop(value) {
    console.log('setter: '+value);
  }

  [methodName]() {
    // ...
  }

  /**
   * static
   * 静态方法：该方法不会被实例继承，而是直接通过类来调用
   * 静态方法包含this关键字，这个this指的是类，而不是实例
   * 父类的静态方法，可以被子类继承
  */
  static bar() {
    this.baz(); // Point.baz()
  }

  static baz() {
    return 'hello';
  }

  // 静态方法可以与非静态方法重名
  baz() {
    console.log('world');
  }
}

// 静态属性指的是 Class 本身的属性，即Class.propName，而不是定义在实例对象（this）上的属性。
Point.staticProp = "ss"; // 静态属性，目前仅支持这种，其他方式需要另行提案编译
const p = new Point(1, 2);
p.bar(); // hello

typeof Point // "function"
Point === Point.prototype.constructor // true

// 在类的实例上面调用方法，其实就是调用原型上的方法
p.constructor === Point.prototype.constructor // true

// 类的新方法可以添加在prototype对象上面
Object.assign(Point.prototype, {
  toString(){},
  toValue(){}
});

// 实例的属性除非显式定义在其本身（即定义在this对象上），否则都是定义在原型上（即定义在class上）。
p.hasOwnProperty('x') // true
p.hasOwnProperty('y') // true
p.hasOwnProperty('toString') // false
p.__proto__.hasOwnProperty('toString') // true

// 与 ES5 一样, 在“类”的内部可以使用get和set关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为, 存值函数和取值函数是设置在属性的 Descriptor 对象上的。
p.prop = 123;
// setter: 123

p.prop
// 'getter'

var descriptor = Object.getOwnPropertyDescriptor(
  Point.prototype, "prop"
);

"get" in descriptor  // true
"set" in descriptor  // true
```

[Class 注意点](http://es6.ruanyifeng.com/#docs/class#%E6%B3%A8%E6%84%8F%E7%82%B9)

- 类的内部所有定义的方法，都是不可枚举的（non-enumerable）
- 类的所有实例共享一个原型对象。
- 使用实例的__proto__属性改写原型，必须相当谨慎，不推荐使用，因为这会改变“类”的原始定义，影响到所有实例。
- **私有方法和私有属性**，是只能在类的内部访问的方法和属性，外部不能访问。这是常见需求，有利于代码的封装，但 ES6 不提供，只能通过变通方法模拟实现

## 类继承 extends

> 继承所有父类 属性和方法

```js
class Point {
  constructor(x, y) {
    console.log(new.target.name);
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }

  static print() {
    console.log(this.x);
  }
}

/**
 * 只有调用super之后，才可以使用this关键字，否则会报错。这是因为子类实例的构建，基于父类实例，只有super方法才能调用父类实例。
 * super虽然代表了父类A的构造函数，但是返回的是子类B的实例，即super内部的this指的是B的实例，因此super()在这里相当于A.prototype.constructor.call(this)。
*/
class ColorPoint extends Point {
  constructor(x, y, color) {
    super(x, y); // 调用父类的constructor(x, y)
    this.color = color;

    // 由于this指向子类实例，所以如果通过super对某个属性赋值，这时super就是this，赋值的属性会变成子类实例的属性
    this.x = 2;
    super.x = 3;
    console.log(super.x); // undefined
    console.log(this.x); // 3
  }

  toString() {
    return this.color + ' ' + super.toString(); // 调用父类的toString()
  }

  static m() {
    super.print();
  }
}

// new Point() // Point
// new ColorPoint() // ColorPoint

// 实例对象cp同时是ColorPoint和Point两个类的实例，这与 ES5 的行为完全一致。
let cp = new ColorPoint(25, 8, 'green');

cp.x = 4;
cp.m(); // 4

cp instanceof ColorPoint // true
cp instanceof Point // true

Object.getPrototypeOf(ColorPoint) === Point; // true
```

- 父类的静态方法，也会被子类继承。
- super()只能用在子类的构造函数之中，用在其他地方就会报错
- super作为对象时，
  - 在普通方法中，指向父类的原型对象；方法内部的this指向当前的子类实例。
  - 在静态方法中，指向父类。方法内部的this指向当前的子类，而不是子类的实例。
- 子类的__proto__属性，表示构造函数的继承，总是指向父类。
- 子类prototype属性的__proto__属性，表示方法的继承，总是指向父类的prototype属性。
- 子类实例的__proto__属性指向子类prototype
