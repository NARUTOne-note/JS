# Object.keys

> 获取对象key集合 `Object.keys(obj)`

- 第一步：参数转为object类型
- 第二步：对象属性枚举

```js
Object.keys({name: 'NARUTOne'}); // ['name']
Object.keys([1, 2, 3]); // ['0', '1', '2']
Object.keys(true);  // new Boolean(true) => []
Object.keys(null); // error
Object.keys(undefined); // error
Object.keys(99); // []
Object.keys('hello'); // new String("hello") => ["0", "1", "2", "3", "4"]
Object.keys(Symbol('foo')); // Object(Symbol("foo")) => []
```