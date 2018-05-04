## Function

**函数是对象， 函数名是指针**

> 函数均为Function类型得实例
> 函数名为指向函数对象的指针

```
function foo (a, b) { return a + b}

var foo = new Function('a', 'b', 'return a + b')

var foo = function(a, b) {return a + b}
```

**常用注释tag**
@author、@callback、@copyright、@default、@deprecated、@throws 、@todo
@param、@returns

