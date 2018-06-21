/**
 * Global 内置对象
 * @author NARUTOne
 * @date: 2017/09/07
 *
 * 全局方法 isNaN(), isFinite(), parseInt(), parseFloat()等
 */

// URI编码， 以utf-8编码替换无效字符
// encodeURI：不会对URI的特殊字符进行编码
// encodeURIComponent: 对所有特殊字符进行编码

var url = 'http://www.work.com/illegal value.html#start';

console.log(encodeURI(url)); // 'http://www.work.com/illegal%20value.html#start'

console.log(encodeURIComponent(url)); //"http%3A%2F%2Fwww.work.com%2Fillegal%20value.html%23start"

// 解码
// decodeURI()
// decodeURIComponent()

// eval(str) 方法, 类js解析器, 结果返回原位置；执行环境作用域为当前所在的作用域(非严格模式)；预防代码注入

eval('alert("hi")');
eval('alert("url")');

// window 对象, 浏览器下的js中Global角色

var global = function() {
	return this;
}



