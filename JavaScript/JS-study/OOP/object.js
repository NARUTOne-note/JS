/**
 * 对象Object
 * @author NARUTOne
 * @date 2017/09/08
 */

/*
	创建方式
	1、new Object()
	2、对象字面量表示：{} ,不会调用Object构造函数 ; 推荐
*/

var obj = new Object();
obj.name = 'NARUTOne';

var obj1 = {
	name: 'NARUTOne'
};
obj1.age = 23;

/**
 * 对象属性的数据属性[[attr]]
 * [[Configurable]] ： 是否可修改配置，创建自定义的属性，默认为true：是否能delete 操作 ：
 * 注：一旦修改此属性false, 将不能再调用Object.defineProperty()，只能修改 writable
 * [[Enumerable]]:  是否for in 枚举
 * [[Writable]]: 是否 可写， 默认 true
 * [[Value]]: 属性获取值，设置值的位置 . 默认undefined
 *
 * Object.defineProperty() 修改特征属性值
 */
obj.attr = 'test';
Object.defineProperty(obj, "attr", {
	writable: false,
	value: 'test-attr'
});
/**
 * 或
 * Object.defineProperty(obj, {
 * 	"attr": {
 * 		writable: false,
 * 		value: 'test-attr'
 * 	}
 * })
 */
// 只读，不可修改
console.log(obj.attr);

/**
 * 对象属性的 访问器属性 [[attr]]
 * [[value]]: 属性值
 * [[Configurable]]：同上
 * [[Enumerable]]: 同上
 * [[Get]]: 读取属性时调用, getter,  遗留方法： obj.__defineGetter__('attr', function() {})
 * [[Set]]: 设置属性时调用, setter, 遗留方法： obj.__defineSetter__('attr', function() {})
 * ☆ get,set设置时不能设置writable和value，要一对一对设置，交叉设置/同时存在 就会报错
 * Object.defineProperty() 修改特征属性值
 */

obj.attr2 = 'str';

Object.defineProperty(obj, 'attr2', {
	get: function() {
		return this.attr2;
	},
	set: function(newVal) {
		this.attr2 = newVal;
	}
});

obj.attr2 = 'strsas';

console.log(obj.attr2);

/**
 * 读取属性的特性
 * Object.getOwnPropertyDescriptor()
 */

var definePropertyObj = Object.getOwnPropertyDescriptor(obj, 'attr');
console.log(definePropertyObj);

/**
 * demo
 */

let demo = {
	singer: "周杰伦"
};
let value = "青花瓷";
Object.defineProperty(demo, "music", {
	// value: '七里香', // 设置属性的值 下面设置了get set函数 所以这里不能设置
	configurable: false, // 是否可以删除属性 默认不能删除
	// writable: true,  // 是否可以修改对象 下面设置了get set函数 所以这里不能设置
	enumerable: true, // music是否可以被枚举 默认是不能被枚举(遍历)
	// ☆ get,set设置时不能设置writable和value，要一对一对设置，交叉设置/同时存在 就会报错
	get() {
		// 获取obj.music的时候就会调用get方法
		// let value = "强行设置get的返回值"; // 打开注释 读取属性永远都是‘强行设置get的返回值’
		return value;
	},
	set(val) {
		// 将修改的值重新赋给song
		value = val;
	}
});
console.log(demo.music); // 青花瓷
delete demo.music; // configurable设为false 删除无效
console.log(demo.music); // 青花瓷
demo.music = "听妈妈的话"; 
console.log(demo.music); // 听妈妈的话
for (let key in demo) {
	// 默认情况下通过defineProperty定义的属性是不能被枚举(遍历)的
	// 需要设置enumerable为true才可以 否则只能拿到singer 属性
	console.log(key); // singer, music
}
