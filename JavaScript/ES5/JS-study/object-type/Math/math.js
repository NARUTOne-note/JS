/**
 * Math 对象 http://www.w3school.com.cn/jsref/jsref_obj_math.asp
 * @author NARUTOne
 * @date 2017/09/07
 */

// 属性

console.log(MATH.PI); // π

//min, max

var max = Math.max(3, 54, 26); // 54
var min = Math.min(3, 54, 26); // 3

var arrNum = [3, 54, 26];
var max = Math.max.apply(Math, arrNum); // 54

// 舍入
// Math.ceil(), 向上舍入为整
// Math.floor(), 向下舍入为整
// Math.round(), 标准舍入为整

var num = 23.9;
var num1 = 23.1;

console.log(Math.ceil(num)); //26
console.log(Math.ceil(num1)); //26

console.log(Math.floor(num)); // 25
console.log(Math.floor(num1)); // 25

console.log(Math.round(num)); // 26
console.log(Math.round(num1)); // 25

// 随记数 random
// Math.floor(Math.random() * (max-min + 1) + min) ,[min, max] 随机整数

console.log(Math.random()) // [0, 1) 随机数

// 1-10
console.log(Math.floor(Math.random()*10 + 1));