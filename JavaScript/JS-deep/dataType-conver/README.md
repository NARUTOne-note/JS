# 数据类型转换

> 众所周知javascript是一种弱类型语言。强类型和弱类型主要是站在变量类型处理的角度进行分类的。强类型是一旦指定数据类型，如果不经过强制转换，那么将永远是指定的这个类型。js中无法声明数据类型，变量类型是根据实际值决定的，由编译器自动调用转换函数进行转换，这种方式称之为隐式转换

[类型转换](https://juejin.im/post/5d4999fff265da038f47f5c7)

## 数据类型

- Undefined 只有一个值就是undefined，表示未经初始化的变量值
- Null 只有一个值null，null值表示空对象指针
- String 表示零个或多个16位的Unicode字符组成的字符序列
- Number 包括整数和浮点数
- Boolean 有两个字面值：true和false，表示一个逻辑实体
- Symbol 每次创建的值都是唯一的，不能被强制转换， ES6新类型
- Object 复杂数据类型

## js引擎内部实现类型转换的4个抽象操作

### 规则

第一个规则是：在 JS 中只有 3 种类型的转换

- to string
- to boolean
- to number

第二，类型转换的逻辑在原始类型和对象类型上是不同的，但是他们都只会转换成上面 3 种类型之一。

### ToPrimitive(input[, PreferredType])

将input对象转成原始类型值，依赖valueOf()和toString()

**PreferredType参数是Number**，则ToPrimitive执行顺序：

1、input本身是原始类型，返回input。
2、调用input.valueOf()，如果结果是原始类型，则返回这个结果。
3、调用input.toString()，如果结果是原始类型，则返回这个结果。
4、抛出TypeError异常。

**PreferredType 参数是String**，ToPrimitive执行顺序：

1、input本身是原始类型，返回input。
2、调用input.toString()，如果结果是原始类型，则返回这个结果。
3、调用input.valueOf()，如果结果是原始类型，则返回这个结果。
4、抛出TypeError异常。

**PreferredType没有传入参数**，

如果input是内置的Date类型，PreferredType视为String
否则PreferredType视为Number

### ToBoolean(argument)

- undefined: false
- null: false
- boolean:  false/true
- number: 仅当argument参数是 +0, -0, or NaN时，return false；否则return true
- string: 仅当argument参数是 空字符串时，return false；否则return true
- Symbol: true
- object: true

### ToNumber(argument)

- undefined: NaN
- null: 0
- boolean:  true => 1; false => 0
- number: number；0开头的16进制，按十进制转换
- string: 将字符串中的内容转化为数字（比如"23"->23），如果转化失败则返回NaN（比如"23a"->NaN）
- Symbol: 抛出 TypeError 异常,不管显示、隐式转换
- object: 先primValue = ToPrimitive(argument, Number)，再对primValue使用ToNumber(primValue)
  -- 从ES5开始，使用`Object.create(null)`创建的对象`[[Prototype]]`属性为null，并且没有valueOf()和toString()方法，因此无法进行强制类型转换

### ToString(argument)

- undefined: "undefined"
- null: "null"
- boolean:  true => "true"; false => "false"
- number: 用字符串表示数字, 大数使用指数形式e
- string: string
- Symbol: 抛出 TypeError 异常, 只能显示转换 `String(Symbol('symbol'))  // 'Symbol(symbol)'`
- object: 先primValue = ToPrimitive(argument, Number)，再对primValue使用ToString(primValue)
- array: 单元字符串化后 ',' 链接：[1, 2, 3] => '1,2,3'
- JSON.stringify: 合法格式转string，非法（function， symbol, undefined等）转 null， 保证跨语言使用； 非强制类型转换（显示转换）
  -- (1) 字符串、数字、布尔值和null的JSON.stringify(..)规则与ToString基本相同。
  -- (2) 如果传递给JSON.stringify(..)的对象中定义了toJSON()方法，那么该方法会在字符串化前调用，以便将对象转换为安全的JSON值。

## 隐式转换

### to String

- `+` 连接符

```js
var a = 123
var n = a + 'helloworld';
console.log(n)   // '123hellowold'

a = true
var m = a + 'helloworld'
console.log(m)   // 'truehelloworld'

[] + {} // "" + [obejct, object] => [obejct, object]
{} + [] // +[] => 0

```

- `+`符号两边有一边是Number型，此时+为算数运算符，则将令一边的数据转成Number型。此处注意空字符串、null以及布尔的false Number之后都是0

```js
console.log(1 + true) // 2 先Number(true)=> 1,再做加计算，结果为2
console.log(1 + undefined) // 先Number(undefined) => NaN ,再计算，结果NaN
console.log(1 + null) // 先Number(null) => 0,再计算，结果为1

String(Symbol('symbol'))  // 'Symbol(symbol)'
'' + Symbol('symbol')  // TypeError is thrown

```

### to Number

- n - 0
- 自增自减运算符 ++/--
- 加减乘除求余算数运算符 +-*/%

```js
var a = '100'
var b = a--
var c = a/2
console.log(b) // 100
console.log(a) // 99
a+= ''
console.log(c) // 49.5
console.log(5+ +'3.14'); / 8.14
```

- 关系运算符 > < >= <= == != === !===
  - 当关系运算符一边有字符串时，会将其数据类型使用Number转换，再做比较；
  - 当两边都是字符串时，则都转成Number，注意：此时不是转成对应的数字，而是按照字符串对应的的unicode编码转成数字
  - 多个字符从左往右进行比较

```js
console.log('10' > 3) // true 先转成数字10再比较
console.log('3' > '10') // true

console.log('3'.charCodeAt()) // 51
console.log('10'.charCodeAt()) // 49

console.log('abc' > 'b') // false 先比较a和b，a和b不等，直接false
console.log('abc' > 'ade') // false，先比较aa，相等，继续比较db，得出结果
console.log('b'.charCodeAt()) // 98
console.log('d'.charCodeAt()) // 100

// 不管是显式还是隐式转换都不能将 Symbol 类型转为 number 类型，当试图这样操作时，会抛出错误。
Number(Symbol('my symbol'))    // TypeError is thrown
+Symbol('123')                 // TypeError is thrown

var a = 'hello world'
~a.indexOf('lo') // -4 真值
~a.indexOf('ol') // 0 假值

Math.floor(-49.6) // -50
~~-49.6 // -49

```

- 日期类型

```js
var d = new Date();
+d; // 时间戳
```

### to Boolean

- Boolean转换参考上述ToBoolean(argument)说明, 以下这几种数据经过Boolean转换，会转成false，`+0、-0、NaN、undefined、null、""、document.all()`; 复杂数据类型经过Boolean转换后都是true，如：`[]、{}、Symbol()、function(){}`
- 逻辑非运算符`!`逻辑非运算中，会将数据先做Boolean转换，然后取反
- 特殊情况

> 当将 == 应用于 null 或 undefined 时，不会发生数值转换。null 只等于 null 或 undefined，不等于其他任何值。

```js
console.log(undefined == undefined) // true
console.log(undefined === undefined) // true

console.log(undefined == null) // true undefined是从null派生出来的
console.log(undefined === null) // false

console.log(null == null) // true
console.log(null === null) // true

console.log(NaN == NaN) // false NaN与任何数据比较都是NaN

```

## 复杂数据

- 转换规则如前面所述，使用valueOf()获取原始值，如果原始值不是基本类型，则使用toString方法转成字符串
- 逻辑非优先级高于关系符运算

```js
console.log([1,2] == '1,2') // true 解析如下

console.log([1,2].valueOf()) // [1,2]，获取原始值
console.log([1,2].toString()) // '1,2'，转成字符串，与右边数据相等

var a = {}
console.log(a == "[object Object]") // true

// 左边转换过程
console.log(a.valueOf()) // {}
console.log({}.toString()) // "[object Object]"，再进行比较

// boolean 在 == 比较中，优先转number
console.log(![] == 0) // true 解析：空数组转换布尔型是true，取非后为false；false跟数字0比较，布尔型被Number后为0，0 == 0

```

- 引用数据类型的转化处理
  - 引用数据类型，可称为对象类型，包括Object 、Array 、Function 、Date等；数据存在堆中，变量中存的是堆地址，我们只能操作存在栈内存的引用地址。
  - var声明的一般是栈内存
  - 6种基本数据类型的存储方式是值类型，存在于栈中

```js
console.log([] == []) // false 数组为引用类型，在堆中存放的是两份不同的数据，所以比较结果不相等
console.log({} == {}) // false，同理，{}为引用类型，结果不相等
NaN === NaN // false
+0 === -0 // true
```
