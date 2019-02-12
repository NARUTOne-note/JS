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
```

**在对象转换为原始值的时候， valueOf() 的优先级比 toString() 要高。**.
**parseInt() 只使用 toString() 进行对象到原始值的转换**.