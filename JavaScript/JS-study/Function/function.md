# Welcome to function

- [函数参数传递](http://www.cnblogs.com/youxin/p/3354903.html)

原问题：[Is JavaScript a pass-by-reference or pass-by-value language?](http://stackoverflow.com/questions/518000/is-javascript-a-pass-by-reference-or-pass-by-value-language)

JavaScript中函数参数的传递方式。

## 传值还是传引用

```js
function changeStuff(num, obj1, obj2)
{
    num = num * 10;
    obj1.item = "changed";
    obj2 = {item: "changed"};
}

var num = 10;
var obj1 = {item: "unchanged"};
var obj2 = {item: "unchanged"};
changeStuff(num, obj1, obj2);
console.log(num);   // 10
console.log(obj1.item);    // changed
console.log(obj2.item);    // unchanged
```

首先得澄清一下大家常说的传值和传引用。仍然以上面的`changeStuff(num, obj1, obj2)`为例。

### 传值

函数内的num, obj1, obj2都将是一份新的内存，与调用函数之前定义的三个变量毫无关系。函数内无论怎么修改这三个参数，外部定义的三个变量的值始终不变

传值的意思就是：传内存拷贝。

### 传引用

函数内的num, obj1, obj2都分别指向一块内存，该内存就是调用函数之前定义的三个变量时创建的内存。函数内对这三个参数所做的任何改动，都将反映到外部定义的三个变量上。

传引用的意思就是：传内存指针。

从上面的代码可以看出，JavaScript中函数参数的传递方式既不是传值，也不是传引用，而是叫[call-by-sharing](http://en.wikipedia.org/wiki/Evaluation_strategy#Call_by_sharing)。

## Call-by-sharing

它的意思是：传引用的拷贝。

- `changeStuff()`中的num, obj1, obj2都是一个引用
- 他们的内容是某块内存的地址
- 这个地址的值来自于外部定义的三块内存，是那三块内存地址的一份拷贝
- 同时，在函数内部这三个参数的值是可以直接被修改的，可以指向其他对象（由于JavaScript中没有指针或引用运算符，只能直接修改）

因此，我们从内存和引用的角度再来看看`changeStuff()`的定义：

```js
function changeStuff(num, obj1, obj2)
{
    num = num * 10; // 对num赋值，修改num的指向，新内存的内容为old_num * 10
    obj1.item = "changed";  // 修改原始obj1内存中的内容
    obj2 = {item: "changed"};   // 对obj2赋值，修改obj2指向，新内存的内容为{item: "changed"}
}
```

这里我们忽略`num = num * 10`具体是如何完成的。这依赖于具体语言的解释器，实际上包含了数个对指针的操作。

由于call-by-sharing本质上也是**传值**，因此，也可以说JavaScript的传参方式都是传值。

除了JavaScript之外，Python, Java, Ruby, Scheme等语言也是采用call-by-sharing的求值策略。

## 函数式声明、函数表达式

**Javascript中函数声明和函数表达式是存在区别的，函数声明在JS解析时进行函数提升，因此在同一个作用域内，不管函数声明在哪里定义，该函数都可以进行调用。而函数表达式的值是在JS运行时确定，并且在表达式赋值完成后，该函数才能调用**。这个微小的区别，可能会导致JS代码出现意想不到的bug，让你陷入莫名的陷阱中。

```js
var getName;
console.log(getName)//undefined
getName()//Uncaught TypeError: getName is not a function
var getName = function() {
    console.log('wscat')
}
```

```js
var getName;
console.log(getName)//function getName() {console.log('oaoafly')}
getName()//oaoafly
function getName() {
    console.log('oaoafly')
}
```
