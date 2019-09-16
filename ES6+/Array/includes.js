/**
 * 包含 includes/indexOf
 * 
arr.includes(searchElement, fromIndex) ， 返回bool
arr.indexOf(searchValue[, fromIndex]) , 返回索引
 */

[NaN].indexOf(NaN) // -1

[NaN].includes(NaN) // true

let mans = {
  0: 'tom',
  1: 'lucy',
  length: 2
}

Array.from(mans).indexOf('tom'); // 0
[].includes.call(mans, 'tom') // true
