/**
 * Function 类型
 * @author  NARUTOne
 * @date  2017/08/31
 */


/**
 * Function 定义
 * @list 声明式
 * @list 表达式
 * @list Function构造式
 */

(() => {
	// 声明式
	
	function foo (a, b) { return a + b}

	// 表达式
	
	var foo = function (a, b) { return a + b}

	// 构造式
	
	var foo = new Function('a', 'b', 'return a + b')
})();

// 函数没有重载，覆盖前任;函数名 即 指针

(() => {
	function foo (a, b) {
		return a + b;
	}

	function foo (a, b) {
		return a * b;
	}

	foo(2, 3); // 6
})();

// 函数声明 提升， 函数表达式不提升

(() => {
	foo(2, 3); // 5
	foo1(2, 3); // error
	function foo (a, b) {
		return a + b;
	}
	var foo1 = function (a, b) {
		return a + b;
	}

})(); 

//函数嵌套
(() => {
	// sort 示例
	
	function objComparisonFunction(propertyName) {
		return function(obj1, obj2) {
			var val1 = obj1[propertyName];
			var val2 = obj2[propertyName];

			if(val1 < val2) {
				return -1
			}
			else if(val1 > val2) {
				return 1;
			}
			else {
				return 0;
			}
		}
	}

	var data = [{name: 'tom', age: 28}, {name: 'jack', age: 29}]

	data.sort(objComparisonFunction('name'));

	console.log(data);
})();

//解耦函数名： arguments.callee ; user static 模式下不支持arguments


function factorial (num) { // 阶乘
	if(num <= 1) {
		return 1;
	}
	else {
		return num * arguments.callee(num - 1);
	}
}



function outer() {
	inner();
}

function inner() {
	alert(arguments.callee.caller); // 返回调用函数 function outer() {}
}

outer();

/**
 * 函数function 对象的属性 方法
 *
 * 属性：length(参数)、prototype
 * 方法：apply(this, Array)、call(this, param, ...) 、 bind(this)
 *
 */

(function() {
	function foo(a, b){
		
	}

	console.log(foo.length) // 2
	console.log(foo.prototype) // 不可枚举的， toString()、valueOf()

	function sum(num1, num2) {
		return num1 + num2;
	}

	function callSum1(num1, num2) {
		return sum.apply(this, arguments); 
		// 如果 直接使用 apply(this, arguments) // this => undefined
	}

	function callSum2(num1, num2) {
		return sum.call(this, num1, num2);
	}

	callSum1(2, 3); // 5

	// bind
	
	var color = 'red';
	var o = {color: 'blue'};

	function getColor() {
		console.log(this.color);
	}

	var changeScope = getColor.bind(o);
	changeScope(); // blue


	//arguments对象不是一个 Array 。它类似于数组，但除了 长度之外没有任何数组属性。例如，它没有 pop 方法。
	//但是它可以被转换为一个真正的数组
	//var arr = Array.prototype.slice.call(arguments); // 转数组

	function foo() {
		Array.prototype.forEach.call(arguments,(item) => {console.log(item)})
	}

	foo(1,2) // 1, 2

})();