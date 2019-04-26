/**
 * !循环
 * * forEach (ES5) ，遍历数组
 * * for ... in (ES5)，遍历对象可枚举属性
 * * for ... of (ES6)，遍历可迭代对象
 * 用来遍历可迭代对象，包括 Array，Map，Set，String，TypedArray，arguments 等
 */

/**
 * Array
 * [√] for...of
 * [√] forEach
 * [√] for...in （遍历的值为索引）
 */

const arr = [2, 5, 6];
arr.name = 'arr';

for (let value of arr) {
  console.log(value); // 2, 5, 6
}

for (let [index, value] of arr.entries()) {
  console.log(index, value);
  // 0, 2
  // 1, 5
  // 2, 6
}

for (let index  in arr) {
  console.log(index); // 0, 1, 2, name
}

/**
 * Object
 * [x] for...of
 * [x] forEach
 * [√] for...in （遍历的值为索引）
 */

const obj = {name: 'tom', age: 25};

for(let key in obj) {
  console.log(key); // name, age
}

for (let [index, value]  of obj.entries()) {
  console.log(index, value);
  // 0, 2
  // 1, 5
  // 2, 6
}

/**
 * String
 * [√] for...of
 * [x] forEach
 * [√] for...in （遍历的值为索引）
 */

let str = 'hello';

for (let value of str) {
  console.log(value); // h, e, l, l, o
}

for (let index in str) {
  console.log(index); // 0, 1, 2, 3, 4
}

/**
 * arguments
 * [√] for...of
 * [x] forEach
 * [√] for...in （遍历的值为索引）
 */

(function () {
  for (let argument of arguments) {
    console.log(argument); // 5, 8, 9
  }

  for (let index in arguments) {
    console.log(index); // 0, 1, 2
  }
})(5, 8, 9);


/**
 * arguments
 * [√] for...of
 * [√] forEach
 * [√] for...in （遍历的值为索引）
 */

let divs = document.querySelectorAll("div");

for (let div in divs) {
  console.log(div);
}

/**
 * Set
 * [√] for...of
 * [√] forEach
 * [x] for...in （遍历的值为索引）
 */

let sets = new Set([1, 1, 2, 2, 3, 3]); // 去重

for (let value of sets) {
  console.log(value); // 1, 2, 3
}

/**
 * Map
 * [√] for...of
 * [√] forEach
 * [x] for...in （遍历的值为索引）
 */

let maps = new Map([
  ['a', 1], 
  ['b', 2], 
  ['c', 3]
])

for (let item of maps) {
  console.log(item)
}
// ["a", 1]
// ["b", 2]
// ["c", 3]

for (let [key, value] of iterable) {
  console.log(value)
}
// 1
// 2
// 3