/**
 * 数组过滤
 */

var arr = ['a', 'b', 'c', 'b'];

// ! 常规, indexOf;
// * 当然这里用 forEach 也是可以的，reduce 只是避免了新创建外部变量。
arr.reduce((result, item) => {
  if (result.indexOf(item) < 0) {
    result.push(item)
  }
  return result
}, []);

// ! filter, 索引判断

arr.filter(function(item, index) {
  return arr.indexOf(item) === index
});

// ES6 , Set数据结构

let newArr = Array.from(new Set(arr));
let newArr = [...new Set(arr)];