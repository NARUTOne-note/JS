# iterators

> 迭代器

Iterator 的遍历过程是这样的。

（1）创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。

（2）第一次调用指针对象的next方法，可以将指针指向数据结构的第一个成员。

（3）第二次调用指针对象的next方法，指针就指向数据结构的第二个成员。

（4）不断调用指针对象的next方法，直到它指向数据结构的结束位置。

每一次调用next方法，都会返回数据结构的当前成员的信息。具体来说，就是返回一个包含value和done两个属性的对象。其中，value属性是当前成员的值，done属性是一个布尔值，表示遍历是否结束。

```js
class LinkedList {
  constructor(data) {
    this.data = data;
  }

  firstItem() {
    return this.data.find(i => i.head);
  }

  findById(id) {
    return this.data.find(i => i.id === id);
  }

  [Symbol.iterator]() {
    let item = {next: this.firstItem().id};
    return {
      next: () => {
        item = this.findById(item.next); // 迭代指向
        if(item) {
          return {value: item.value, done: false};
        }
        return {value: undefined, done: true};
      }
    };
  }
}

const myList = new LinkedList([
  {id: 'a10', value: 'First', next: 'a13', head: true },
  {id: 'a11', value: 'Last', next: null, head: false },
  {id: 'a12', value: 'Third', next: 'a11', head: false },
  {id: 'a13', value: 'Second', next: 'a12', head: false }
]);

for(let item of myList) {
  console.log(item);    // 'First', 'Second', 'Third', 'Last'
}
```

> ES6 规定，默认的 Iterator 接口部署在数据结构的Symbol.iterator属性，或者说，一个数据结构只要具有Symbol.iterator属性，就可以认为是“可遍历的”（iterable）。Symbol.iterator属性本身是一个函数，就是当前数据结构默认的遍历器生成函数。执行这个函数，就会返回一个遍历器。至于属性名Symbol.iterator，它是一个表达式，返回Symbol对象的iterator属性，这是一个预定义好的、类型为 Symbol 的特殊值。
