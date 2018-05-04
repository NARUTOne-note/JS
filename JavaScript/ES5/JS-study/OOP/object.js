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
 * [[Configurable]]：同上
 * [[Enumerable]]: 同上
 * [[Get]]: 读取属性时调用, getter,  遗留方法： obj.__defineGetter__('attr', function() {})
 * [[Set]]: 设置属性时调用, setter, 遗留方法： obj.__defineSetter__('attr', function() {})
 *
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
