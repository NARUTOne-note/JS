## Welcome to OOP

> JavaScript是不是一门严格意义上的面向对象的语言，它并没有提供类的方法。它是使用原型继承而不是类继承达到面向对象的效果。

- [JavaScript面向对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript)
- [酷壳: Javascript 面向对象编程](http://coolshell.cn/articles/6441.html)
- [深入理解JavaScript系列（18）：面向对象编程之ECMAScript实现（推荐）](http://www.cnblogs.com/TomXu/archive/2012/02/06/2330609.html)
- [Javascript 面向对象编程（一）：封装](http://www.ruanyifeng.com/blog/2010/05/object-oriented_javascript_encapsulation.html)

- [OOP](http://www.alloyteam.com/2015/06/javascript-shu-ju-jie-gou-he-suan-fa-jian-shu-qian-yan/)

### 对象

> 无序属性的集合，其属性可以包含基本值、对象或者函数。

```
var obj = new Object();
obj.name = 'NARUTOne';

或
var obj1 = {
  name: 'NARUTOne'
};
obj1.age = 23;
```

### 什么是面向对象

**面向对象语言的三大特性:**

- 封装(Encapsulation): 把相关的信息（无论数据或方法）存储在对象中的能力
- 继承(Inheritance): 由另一个类（或多个类）得来类的属性和方法的能力
- 多态(Polymorphism): 编写能以多种方法运行的函数或方法的能力
其他的一些内容:

- 类(Class)： 定义了一件事物的抽象特点, 用来构造对象
- 对象(Object): 类的实例化
- 属性(Property): 对象具有的数据
- 方法(Method): 也成消息，用于对象之间传递数据