# 引用类型

> 对象定义，包装类型: 一系列属性、方法。

- 基本引用类型：Object, Array, Date, RegExp, Function,
- 包装类型： Boolean, String, Number
- 内置对象： Global(window), Math

> js-数据类型, undefined, null, Number, String, Object, Boolean

## Object

- [object MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Working_with_Objects)

>大多数引用类型值都是Object类型得实例。

```js
var obj = new Object();
var a = new String('abc'); // 返回封装对象

typeof a; // object

Object.prototype.toString.call(a); // [object String]
```

`Object.prototype.toString`获取对象内部的`[[Class]]`值

**在对象转换为原始值的时候， valueOf() 的优先级比 toString() 要高。**.
**parseInt() 只使用 toString() 进行对象到原始值的转换**.

## == 操作符的对比规则

- 如果有一个操作数是布尔值，则在比较相等性之前先将其转换为数值----false转换为0，而true转换为1。

- 如果一个操作数是字符串，另一个操作数是数值，在比较相等性之前先将字符串转换为数值。

- 如果一个操作数是对象，另一个操作数不是，则调用对象的valueOf()方法，如果得到的值不是基本类型值，则基于返回值再调用toString方法（这个过程即ToPrimitive），用得到的基本类型值按照前面的规则进行比较。

- 如果两个操作数都是对象，则比较他们是不是同一个对象。如果两个操作数指向同一个对象，则相等操作符返回true, 否则返回false。
