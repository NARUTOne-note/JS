## package type 包装类型

> String 、 Number 、 Boolean

引用类型和基本包装类型得主要区别：对象的生存期；基本包装类型即用即销。不能为其添加属性方法。

**使用new调用基本包装类型与直接调用同名包装类型 ，返回不一致**

```
var str = '23';

var num = Number(str);
console.log(typeof number); // 'number'

var obj = new Number(str);
console.log(typeof obj); // 'object'
```