/**
 * 一个普通的对象加上一个 length 属性就可以变成一个类数组对象.
 * @example  arguments
 */

// ! 类数组 =》 数组

// ? Array.from()

let say = function () {
  console.log(Array.from(arguments))
}
say(1, 2)

// ? slice
Array.prototype.slice.call(arguments)

// ! 创建类数组， length 值是决定最终生成数组的长度的，多余的去掉，不足的用 undefined 补齐
let mans = {
  0: 'tom',
  1: 'lucy',
  length: 2 
}
Array.from(mans)
// ["tom", "lucy"]

const cm = [...mans]
// Uncaught TypeError: mans is not iterable

// ! 遍历类数组, for , for...of , for ... in 

for (let i = 0; i < mans.length; i++) {
  console.log(i)
}
// 0
// 1

// ! 检测

// DOM 元素节点集合也是一个类数组对象

Object.prototype.toString.call(document.getElementsByTagName('div'))
// [object HTMLCollection]