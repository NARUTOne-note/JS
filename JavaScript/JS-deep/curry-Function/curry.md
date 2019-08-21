# 柯里化 函数

> 参数复用

- [柯里化实现](https://segmentfault.com/a/1190000010608477)

```js
function sum (x, y, z) {
  return x + y + x
}
// 柯里化
function currySum = (x) {
  return y => {
    return z => {
      return x + y + z
    }
  }
}
```
