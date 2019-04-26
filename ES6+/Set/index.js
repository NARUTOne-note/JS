/**
 * ! Set 数据结构, 数据值唯一，不含重复值
 * ES6 提供了一个新的数据结构 Set 用来存储任意类型的值，它类似于数组
 */

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

new Set([NaN, NaN])

// Set(1) {NaN} 

// ! 数组去重

let arr = [1, 1, 2, 2]
let newArr = [...new Set(arr)]

// ? 特性
let set = new Set([1, 2, 3])
set.size // 3, 长度

// ! Set 不支持索引获取值, 可以通过遍历

let sets = new Set([5, 8, 10])
for (let value of sets) {
  console.log(value)
}

// 5
// 8
// 10

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