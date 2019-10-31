/**
 * ! Set 集合型数据结构, 数据值唯一，不含重复值
 * ES6 提供了一个新的数据结构 Set 用来存储任意类型的值，它类似于数组
 */

const s = new Set();

[2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));

for (let i of s) {
  console.log(i);
}
// 2 3 5 4

// ? array => set
let arr = [1, 2, 3]
let set = new Set(arr)

// Set(3) {1, 2, 3}

// ? set => array
let set = new Set([1, 2, 3])
let arr = [...set]

// ? 去重
new Set([1, 1, 2, 2])

// 输出 Set(2) {1, 2}

// * Set 内部判断两个值是否不同，使用的算法叫做“Same-value-zero equality”，它类似于精确相等运算符（===），主要的区别是向 Set 加入值时认为NaN等于自身，而精确相等运算符认为NaN不等于自身。
new Set([NaN, NaN])

// Set(1) {NaN} 

// * 两个对象总是不相等的。
let set = new Set();

set.add({});
set.size // 1

set.add({});
set.size // 2

// ! 数组去重, 转数组
let arr = [1, 1, 2, 2]
let newArr = [...new Set(arr)] // 扩展运算符（...）内部使用for...of循环，所以也可以用于 Set 结构

// ! 特性
let set = new Set([1, 2, 3])
set.size // 3, 长度

// ? add， 追加值， 支持链式

let set = new Set()
set.add(1)
set.add('hello')
set.add(2).add('hello2') 

// Set(2) {1, "hello", 2, "hello2"}

// ? delete 删除值

let set = new Set([4, 5, 6])
set.delete(5) // return true/false, 删除成功返回 true，如果删除一个不存在的元素则返回 false。

// Set(2) {4, 6}

// ? 判存  has

arr.indexOf(1) > -1
arr.includes(1)

let set = new Set([4, 5, 6])
set.has(1) // false

// ? 清空, clear

// 数组清空

arr.length = 0

let set = new Set([4, 5, 6])
set.clear()

// Set(0) {}

let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);

// 并集
let union = new Set([...a, ...b]);
// Set {1, 2, 3, 4}

// 交集
let intersect = new Set([...a].filter(x => b.has(x)));
// set {2, 3}

// 差集
let difference = new Set([...a].filter(x => !b.has(x)));
// Set {1}

/**
 * ! 遍历
 */
// * Set 不支持索引获取值, 可以通过遍历

let sets = new Set([5, 8, 10])
for (let value of sets) { // 默认 values方法
  console.log(value)
}

// 5
// 8
// 10

// * keys()，values()，entries()

let set = new Set(['red', 'green', 'blue']);

for (let item of set.keys()) {
  console.log(item);
}
// red
// green
// blue

for (let item of set.values()) {
  console.log(item);
}
// red
// green
// blue

for (let item of set.entries()) {
  console.log(item);
}
// ["red", "red"]
// ["green", "green"]
// ["blue", "blue"]

// * forEach()

let set = new Set([1, 4, 9]);
set.forEach((value, key) => console.log(key + ' : ' + value))
// 1 : 1
// 4 : 4
// 9 : 9

// ! 改变原Set结构

// 方法一
let set = new Set([1, 2, 3]);
set = new Set([...set].map(val => val * 2));
// set的值是2, 4, 6

// 方法二
let set = new Set([1, 2, 3]);
set = new Set(Array.from(set, val => val * 2));
// set的值是2, 4, 6