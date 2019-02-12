/**
 * javascript 设计模式（design pattern）
 * 
 * Date: 2017/07/28
 * author: NARUTOne
 *
 */

/**
 *1、单例模式
 * 单例模式的定义是产生一个类的唯一实例，但js本身是一种“无类”语言。很多讲js设计模式的文章把{}当成一个单例来使用也勉强说得通。
 */

//实例1.0
var createMask = function() {
	var mask;
	return function() {
		return mask || (mask = document.body.appendChild(document.createElement('div')))
	}
}()

//实例2.0
var singleton = function(fn) {
	var result;
	return function() {
		return result || (result = fn.apply(this, arguments));
	}
}

var createMask = singleton(function() {
	return document.body.appendChild(document.createElement('div'));
})

/**
 * 2、简单工厂模式
 * 简单工厂模式是由一个方法来决定到底要创建哪个类的实例, 而这些实例经常都拥有相同的接口. 这种模式主要用在所实例化的类型在编译期并不能确定， 而是在执行期决定的情况。
 * 说的通俗点，就像公司茶水间的饮料机，要咖啡还是牛奶取决于你按哪个按钮。 
 * 
 * 所谓的构造函数也是一个简单工厂。只是批了一件new的衣服。
 *
 */

function A(name) {
	this.name = name;
}

function ObjectFactory() {
	var obj = {},
		Constructor = Array.prototype.shift.call(arguments);
	obj.__proto__ = typeof Constructor.prototype === 'number' ? Object.prototype : Constructor.prototype;
	var ret = Constructor.apply(obj, arguments);

	return typeof ret === 'object' ? ret : obj;
}

var a = ObjectFactory(A, 'svenzeng');

console.log(a.name); //svenzeng

/**
 * 3、观察者模式
 * 
 * 观察者模式( 又叫发布者-订阅者模式 )应该是最常用的模式之一. 
 * 在很多语言里都得到大量应用. 包括我们平时接触的dom事件. 也是js和dom之间实现的一种观察者模式.
 *
 */

// 事件模式定义
var Events = function() {
	var listen, log, obj, one, remove, trigger, __this;

	obj = {};

	var __this = this;

	listen = function(key, eventfn) { //把简历扔盒子, key就是联系方式.

		var stack, _ref; //stack是盒子

		stack = (_ref = obj[key]) != null ? _ref : obj[key] = [];

		return stack.push(eventfn);

	};

	one = function(key, eventfn) {

		remove(key);

		return listen(key, eventfn);

	};

	remove = function(key) {

		var _ref;

		return(_ref = obj[key]) != null ? _ref.length = 0 : void 0;

	};

	trigger = function() { //面试官打电话通知面试者

		var fn, stack, _i, _len, _ref, key;

		key = Array.prototype.shift.call(arguments);

		stack = (_ref = obj[key]) != null ? _ref : obj[key] = [];

		for(_i = 0, _len = stack.length; _i < _len; _i++) {

			fn = stack[_i];

			if(fn.apply(__this, arguments) === false) {

				return false;

			}

		}
	}

	return {

		listen: listen,

		one: one,

		remove: remove,

		trigger: trigger

	}

}

//订阅者

var adultTv = Events();

adultTv.listen('play', function(data) {

	alert("今天是谁的电影" + data.name);

});

//发布者 
adultTv.trigger('play', {
	'name': '成龙'
})

/**
 * 4、适配器模式
 * 
 * 适配两者，达到适用
 *
 */

//假如有一个3个字符串参数的函数，但是现在拥有的却是一个包含三个字符串元素的对象，那么就可以用一个配置器来衔接二者

var clientObj = {
	str1: 'sds',
	str2: 'asd',
	str3: 'ssss'
}

function interfaceMethod(str1, str2, str3) {
	console.log(str2)
}

//配置器函数，adapterMethod函数的作为就在于对interfaceMethod函数进行包装，并把传递给它的参数转换为后者需要的形式。

function adapterMethod(o) {
	interfaceMethod(o.str1, o.str2, o.str3);
}

adapterMethod(clientObj)

/**
 * 5、代理模式(Proxy)
 * 
 * 代理模式的定义是把对一个对象的访问, 交给另一个代理对象来操作.
 *
 */
/*
	var request = Ajax.get( 'cgi.xx.com/xxx' );
	 
	request.send();
	 
	request.done(function(){
	 
	});
*/


/**
 *六 桥接模式
 * 桥接模式的作用在于将实现部分和抽象部分分离开来， 以便两者可以独立的变化。
 */

//singleton是抽象部分， 而createMask 、createScript是实现部分

var singleton = function( fn ){
    var result;
    return function(){
        return result || ( result = fn .apply( this, arguments ) );
    }
}

var createMask = singleton( function(){

return document.body.appendChild( document.createElement('div') );

 })

var createScript = singleton( function(){

return document.body.appendChild( document.createElement('script') );

 })

/**
 * 7、外观模式
 * 外观模式(门面模式)，是一种相对简单而又无处不在的模式。外观模式提供一个高层接口，这个接口使得客户端或子系统更加方便调用。
 */

var stopEvent = function( e ){   //同时阻止事件默认行为和冒泡
  e.stopPropagation();
  e.preventDefault();
}

/**
 *八 访问者模式
 * 
 * 访问者模式先把一些可复用的行为抽象到一个函数(对象)里，这个函数我们就称为访问者（Visitor）
 * 如果另外一些对象要调用这个函数，只需要把那些对象当作参数传给这个函数，在js里我们经常通过call或者apply的方式传递this对象给一个Visitor函数.
 */

var Visitor = {}
Visitor .push  =  function(){
    return Array.prototype.push.apply( this, arguments );
}
var obj = {};
obj.push = Visitor.push;
obj.push( "first" );
alert ( obj[0] )  //"first"
alert ( obj.length );  //1


/**
 * 九 策略模式
 * 策略模式的意义是定义一系列的算法，把它们一个个封装起来，并且使它们可相互替换。
 */

