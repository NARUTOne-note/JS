/**
 * ! WeakSet 结构与 Set 类似，也是不重复的值的集合。但是，它与 Set 有两个区别。
 * ? WeakSet 的成员只能是对象，而不能是其他类型的值
 *   * WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，
 *      也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中
 *   * WeakSet 里面的引用，都不计入垃圾回收机制，所以就不存在这个问题。因此，
 *      WeakSet 适合临时存放一组对象，以及存放跟对象绑定的信息。只要这些对象在外部消失，它在 WeakSet 里面的引用就会自动消失
 * ? ES6 规定 WeakSet 不可遍历, 由于引用对象，随时可能消失。
 * ? WeakSet 的一个用处，是储存 DOM 节点，而不用担心这些节点从文档移除时，会引发内存泄漏。
 */

const a = [[1, 2], [3, 4]];
const ws = new WeakSet(a); // a的成员会自动成为 WeakSet 的成员, 而不是a数组本身。这意味着，数组的成员只能是对象。
// WeakSet {[1, 2], [3, 4]}

// ! 方法  add  delete  has

const ws = new WeakSet();
const obj = {};
const foo = {};

ws.add(window);
ws.add(obj);

ws.has(window); // true
ws.has(foo);    // false

ws.delete(window);
ws.has(window);    // false

// ! WeakSet 没有size属性，没有办法遍历它的成员。


/**
 * 保证Foo的实例方法，只能在Foo的实例上调用。这里使用 WeakSet 的好处是，foos对实例的引用，不会被计入内存回收机制，
 * 所以删除实例的时候，不用考虑foos，也不会出现内存泄漏
 */
const foos = new WeakSet()
class Foo {
  constructor() {
    foos.add(this)
  }
  method () {
    if (!foos.has(this)) {
      throw new TypeError('Foo.prototype.method 只能在Foo的实例上调用！');
    }
  }
}