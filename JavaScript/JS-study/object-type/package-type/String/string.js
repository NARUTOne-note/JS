/**
 * String 类型
 * @author: NARUTOne
 * @date: 2017-09-06
 */

var str = 'hello world';

console.log(str.length); //11

function run (str) {
	console.log(str);
}

/**
 * 字符方法
 */

//获取字符

var char = str.charAt(1); // 'e'

console.log(str[1]); // 'e', IE7+

//获取字符编码

var charCode = str.charCodeAt(1); // '101'

/**
 * 字符串操作
 */

//连接 concat()

var name = 'NARUTOne';

var concatStr = str.concat(name); // 'hello world NARUTOne'
var concatStr1 = str + name + '';

// 截取子字符串, slice, substring, substr

console.log(str.slice(3)); // 'lo world'
console.log(str.substring(3)); // 'lo world'
console.log(str.substr(3)); // 'lo world'

console.log(str.slice(3, 7)); // 'lo w'
console.log(str.substring(3, 7)); // 'lo w'
console.log(str.substr(3, 7)); // 'lo worl'

/**
 * 负数param
 * slice(a, b): a + str.length, b + str.length
 * substr(a, b): a + str.length, b => 0 , 将较小的作为开始
 * substring(a, b): substring(0, 0)
 * 
 */
console.log(str.slice(3, -4)); // 'lo w'
console.log(str.substring(3, -4)); // 'hel'
console.log(str.substr(3, -4)); // ''


// 字符串位置

// indexOf('item', start), 从前往后
// lastIndexOf('item', start)， 从后往前

run(str.indexOf('o', 6)); // 7
run(str.lastIndexOf('o', 6)); // 4

// 循环调用，查询所有位置

function findAll(str, item) {
	var pos = str.indexOf(item);
	var result = [];

	while(pos > -1) {
		result.push(pos);
		pos = str.indexOf(item, pos+1);
	}

	run(result.join(','));
}

findAll(str, 'o');

// 去除空格 trim(), 前置、后置的空格

var trimStr = '  hello world  ';
run(trimStr.trim()); //'hello world'

/**
 *  大小写转换
 *  通用： toLowerCase(), toUpperCase()
 *  特殊地区：toLocaleLowerCase(), toLocaleUpperCase()
 */

run(str.toLowerCase()); 
run(str.toUpperCase()); // 'HELLO WORLD'
run(str.toLocaleUpperCase());
run(str.toLocaleLowerCase());


/**
 *  模式匹配方法
 */

// str.match(RegExp), 等同于 RegExp.exec(str)

run(str.match(/o/)); // ["o", index: 4, input: "hello world"]
run(str.match(/.o/ig)); // ["lo", "wo"]

run(/o/.exec(str)); // ["o", index: 4, input: "hello world"]

// search(RegExp) , 返回index || -1

run(str.search(/o/)); // 4 
run(str.search(/o/ig)); // 4 

// 替换 replace(RegExp, item)

run(str.replace('o', 1)); // "hell1 world"
run(str.replace(/o/, 1)); // "hell1 world"
run(str.replace(/o/gi, 1)); // "hell1 w1rld"

// 分组替换， 
run(str.replace(/(o)/gi, 'word($1)')); // "hellword(o) wword(o)rld"

// 替换回调函数

function htmlReplace(regexp, htm) {
	return htm.replace(regexp, function(match, pos, originHtml){
		switch(match) {
			case '<':
				return '&lt';
				break;
			case '>':
				return '&gt';
				break;
			case '&':
				return '&amp';
				break;
			case '\"':
				return '&quot';
				break;
			default:
				return ''
		}
	})
}

var resultHtm = htmlReplace("<p class=\" greeting\"> Hello World!</p>");

run(resultHtm); 

// 字符串 => 数组 ， split()
// 第一个参数，regexp||字符
// 第二个参数，返回数组的长度

run(str.split(/o/, 2)); // ["hell", " w"]
run(str.split(/o/)); // ["hell", " w", "rld"]


// str.localeCompare(str1) , 比较字符串排位

// fromCharCode()， 将字符编码 转为 字符

run(String.fromCharCode(104, 101, 108, 108, 111)); // 'hello'