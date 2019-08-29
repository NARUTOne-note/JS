/**
 * console.log 运用
 */

// ! %s 替换符

console.log('hello, %s', 'world')
// hello, world

console.log('hello, %o', {name: 'tom'})
// hello, > Object..

// ! 样式

console.log('hello, %cworld', 'color: red')
// hello, world（红色）

// ! 警示 warn

console.warn('这是一条警示');

// ! 错误 error

console.error('这是一条错误');

// ! 表格显示 对象数组结构

let data = [
  {
    "name": "tom",
    "age": 23
  }, {
    "name": "lucy",
    "age": 24
  }
]
console.table(data)
console.table(data, ["name"])

// ! 断言

console.assert(me !== 'tom', 'this is me')
// Assertion failed: this is me

// ! count 统计

for (let man of data) {
  // ....
  console.count('index')
}
// index: 1
// index: 2

// ! time 执行时间

console.time('tag')
setTimeout(() => {
  console.timeEnd('tag') // tag: 3000.571044921875ms
}, 3000)

// ! group 分组打印

console.group('一级分类')
console.group('硬装')
console.log('墙')
console.log('窗')
console.log('地板')
console.groupEnd('硬装')
console.group('软装')
console.log('护墙板')
console.groupEnd('软装')
console.groupEnd('一级分类')