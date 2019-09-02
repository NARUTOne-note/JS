# Array

> :smile:

```js
var arr = new Array();

new Array('food')
// ['food']

new Array(2, 3)
// [2, 3]

new Array(2)
// [empty × 2]

new Array({length: 2})
// [{length: 2}]

new Array(-1)
// Invalid array length
```

## 填充

```js
Array.from(new Array(100), (val,index)=> index + 1);

Array.apply(null, {length: 100}).map((val,index)=> index + 1)
// func.apply(thisArg, [argsArray])
// thisArg 用来指定 this 的指向，如果为 null 或 undefined，则指向全局对象。
// argsArray 一个数组或者类数组对象，包含了要传入的参数。这里我我们传入了一个类数组对象 {length: 100}，实际上就会被解析成长度为 100 元素为 undefined 的数组。

Array.from({length: 100}).map((val,index)=> index + 1)

Array.from(Array(100).keys()).map((val)=> val + 1)
```
