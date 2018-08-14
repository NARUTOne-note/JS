/**
 * js 黑科技
 */

//单行写一个评级组件

function getRate(rate) {
	return "★★★★★☆☆☆☆☆".slice(5 - rate, 10 - rate);
}

//如何装逼用代码骂别人SB

function sb () {
	return (!(~+[])+{})[--[~+""][+[]]*[~+[]] + ~~!+[]]+({}+[])[[~!+[]]*~+[]];
}

function nb() {
	return ([][[]]+[])[+!![]]+([]+{})[!+[]+!![]]
}

//JavaScript错误处理的方式的正确姿势

try {
    something
} catch (e) {
    window.location.href =
      "http://stackoverflow.com/search?q=[js]+" +
      e.message;
}

//从一行代码里面学点JavaScript

function addBorder() {
	[].forEach.call($$("*"),function(a){
    a.style.outline="1px solid #"+(~~(Math.random()*(1<<24))).toString(16)
	})
}
// ——》等同于
function addBorder2() {
	Array.prototype.forEach.call(document.querySelectorAll('*'), 
	dom => dom.style.outline = `1px solid #${parseInt(Math.random() * 
	Math.pow(2,24)).toString(16)}`)
}

//论如何优雅的取随机字符串

function getString() {
	return Math.random().toString(16).substring(2) 
	//Math.random().toString(36).substring(2) 
}

//转字符

function toString(n) {
	// (10)["toString"]() === "10"
	return (n)["toString"]()
}

//论如何优雅的取整

function getInt(num) {
	// var a = ~~2.33

	// var b= 2.33 | 0

	// var c= 2.33 >> 0
	
	return num | 0;
}

// 如何优雅的实现金钱格式化：1234567890 --> 1,234,567,890

function numRegExpFormat(num) {
	// var test1 = '1234567890'
	// var format = test1.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

	// console.log(format) // 1,234,567,890
	
	return num.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function numFormat(num) {
	return num.split('').reverse().reduce((prev, next, index) => {
    return ((index % 3) ? next : (next + ',')) + prev
  })
}

// 最短的代码实现数组去重

function uniqueArray(arr) { 
	// Set 对象
	// [...new Set([1, "1", 2, 1, 1, 3])] // [1, '1', 2, 3]
	return [...new Set(arr)]
}

// 用最短的代码实现一个长度为m(6)且值都n(8)的数组

function cArray(m ,n) {
	return Array(m).fill(n);
}


//取出一个数组中的最大值和最小值
//var numbers = [5, 458 , 120 , -215 , 228 , 400 , 122205, -85411]; 
// var maxInNumbers = Math.max.apply(Math, numbers); 
// var minInNumbers = Math.min.apply(Math, numbers);

function getNumMax (nums) {
	return Math.max.apply(Math, nums); 
}

function getNumMin (nums) {
	return Math.max.apply(Math, nums); 
}
