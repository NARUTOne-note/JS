// ! object.keys()
// *如果 key 为正整数（不是小数且大于等于 0），则会按照数字的从小到大的顺序排列，其它的则按照出现的顺序先后排列。
// 其本质是调用了对象的内部方法 OrdinaryOwnPropertyKeys，才有了这些排序规则

function keys(object) { 
  var result, key, result = [];
  for (key in object){
      if (object.hasOwnProperty(key))  result.push(key)
  }

  return result;
}