## JS の var && scope && memory

## 变量
> 特定时间保存特定值的一个名字。

- 基本类型值： 简单的数据段，例：5种基本数据类型。按值传递
- 引用类型值： 多个值构成的对象。引用传递，操作内存引用地址；但增删改对象属性操作的实际对象。

## 作用域链
> 又局到全查询变量

- 全局变量对象
- 变量对象（局部，函数）

## 内存

### 垃圾回收机制

- 标记清除：
进入环境， 离开环境

- 引用计数
> 循环引用问题，内存泄露 ；null

### 性能问题

> 垃圾回收机制 的时间间隔及触发条件

### 管理内存

- 解除引用： null
> 解除引用是为了脱离执行环境，便以垃圾回收运行时回收释放内存。