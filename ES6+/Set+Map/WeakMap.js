/**
 * WeakMap, WeakMap结构与Map结构类似，也是用于生成键值对的集合。区别：
 * ? WeakMap只接受对象作为键名（null除外），不接受其他类型的值作为键名
 * ? WeakMap的键名所指向的对象，不计入垃圾回收机制。
 */

const map = new WeakMap();
map.set(1, 2)
// TypeError: 1 is not an object!
map.set(Symbol(), 2)
// TypeError: Invalid value used as weak map key
map.set(null, 2)
// TypeError: Invalid value used as weak map key

const wm = new WeakMap();

const element = document.getElementById('example');

wm.set(element, 'some information');
wm.get(element) // "some information"

// ! 没有遍历操作， size属性； 无法清空，即不支持clear方法； WeakMap只有四个方法可用：get()、set()、has()、delete()。