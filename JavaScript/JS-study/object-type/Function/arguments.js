//arguments对象不是一个 Array 。它类似于数组，但除了 长度之外没有任何数组属性。例如，它没有 pop 方法。
//但是它可以被转换为一个真正的数组
//var arr = Array.prototype.slice.call(arguments); // 转数组

var args = Array.prototype.slice.call(arguments);
var args = [].slice.call(arguments);

// ES2015
const args = Array.from(arguments);
const args = [...arguments];

