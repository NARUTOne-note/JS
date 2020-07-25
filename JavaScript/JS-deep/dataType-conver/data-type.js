/*
 * @File: data-type.js
 * @Project: dataType-conver
 * @File Created: Tuesday, 23rd July 2019 11:38:52 am
 * @Author: NARUTOne (wznaruto326@163.com/wznarutone326@gamil.com)
 * -----
 * @Last Modified: Tuesday, 23rd July 2019 11:39:02 am
 * @Modified By: NARUTOne (wznaruto326@163.com/wznarutone326@gamil.com>)
 * -----
 * @Copyright <<projectCreationYear>> - 2019 bairong, bairong
 * @fighting: code is far away from bug with the animal protecting
 *  ┏┓      ┏┓
 *  ┏┛┻━━━┛┻┓
 *  |           |
 *  |     ━    |
 *  |  ┳┛ ┗┳ |
 *  |          |
 *  |     ┻   |
 *  |           |
 *  ┗━┓     ┏━┛
 *     |      | 神兽保佑 🚀🚀🚀
 *     |      | 代码无BUG！！！
 *     |      ┗━━━┓
 *     |            ┣┓
 *     |            ┏┛
 *     ┗┓┓ ┏━┳┓┏┛
 *      |┫┫   |┫┫
 *      ┗┻┛   ┗┻┛
 */

/**
 * 数据类型转换
 */

true + false // 1
12 / "6" // 2
"number" + 15 + 3 // number153
15 + 3 + "number" // 18number
[1] > null // '1' > 0 => 1 > 0 => true
"foo" + + "bar" // foo + (+bar) => foo + NaN => fooNaN
"true" == true // NaN == 1 => false
false == "false" // 0 == NaN => false
null == "" // 0 == NaN => false
!!"false" == !!"true" // true == true => true
["x"] == "x" // true, == 运算符对数组类型执行 number 转换，先调用对象的 valueOf() 方法，结果是数组本身，不是原始类型值，所以执行对象的 toString() 方法，得到字符串 'x'
[] + null + 1 // null1, '+' 运算符执行 number 类型转换，先调用对象的 valueOf() 方法，结果是数组本身，不是原始类型值，所以执行对象的 toString() 方法，得到字符串 ''， 接下来执行表达式 '' + null + 1。
0 || "0" && {}  // {}
[1,2,3] == [1,2,3] // false, 当运算符两边类型相同时，不会执行类型转换，两个数组的内存地址不一样，所以返回 false
{} + [] + {} + [1] // '0[object Object]1'

/**
 * ==> +[] + {} + [1]
==> 0 + {} + [1]
==> 0 + '[object Object]' + '1'
==> '0[object Object]1'
复制代码所有的操作数都不是原始类型，所以会按照从左到右的顺序执行 number 类型的隐式转换， object 和 array 类型的 valueOf() 方法返回它们本身，所以直接忽略，执行 toString() 方法。 这里的技巧是，第一个 {} 不被视为 object，而是块声明语句，因此它被忽略。计算从 +[] 表达式开始，该表达式通过toString()方法转换为空字符串，然后转换为0。

 */

! + [] + [] + ![] // !(+[]) + [] + (![]) => !0 + [] + false => true + '' + false => 'truefalseß'
new Date(0) - 0 // 0, '-' 运算符执行 number 类型隐式转换对于 Date 型的值，Date.valueOf() 返回到毫秒的时间戳。
new Date(0) + 0 // 'Thu Jan 01 1970 02:00:00 GMT+0200 (EET)0' , '+' 运算符触发默认转换，因此使用 toString() 方法，而不是 valueOf()。
