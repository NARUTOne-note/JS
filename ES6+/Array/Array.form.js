/**
 * Array.form
 * @param arrayLink, 想要转换成数组的伪数组对象或可迭代对象。
 * @param mapFn, 新数组中的每个元素会执行该回调函数  [, thisArg] 回调函数的this对象
 */

Array.from('foo')
// ["f", "o", "o"]

let s = new Set(['foo', window])
Array.from(s)
// ["foo", window]

let m = new Map([[1, 2], [2, 4], [4, 8]])
Array.from(m)
// [[1, 2], [2, 4], [4, 8]]

function f() {
  return Array.from(arguments)
}

f(1, 2, 3)

// [1, 2, 3]