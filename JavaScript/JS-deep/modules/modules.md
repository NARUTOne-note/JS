### Welcome to js の modules

- [Javascript模块化编程](http://www.ruanyifeng.com/blog/2012/10/javascript_module.html)
- [JS模块加载发展](https://segmentfault.com/a/1190000009446236)
- [ES6模块](http://es6.ruanyifeng.com/#docs/module)
- [AMD,CMD,CommonJS及UMD](http://blog.gejiawen.com/2015/11/03/what-is-amd-cmd-commonjs-umd/)
- [modules](http://javascript.ruanyifeng.com/nodejs/module.html)

## 1.模块的写法
模块化编程一般都有这么几个过渡过程，如下描述。

**原始方法**
```js
function m1(){
　　//...
}
function m2(){
　　//...
}
```
上面的函数m1()和m2()，组成一个模块。使用的时候，直接调用就行了。

这种做法的缺点很明显："污染"了全局变量，无法保证不与其他模块发生变量名冲突，而且模块成员之间看不出直接关系。

**对象写法**
为了解决上面的缺点，可以把模块写成一个对象，所有的模块成员都放到这个对象里面。

```js
var module1 = new Object({
　　　　_count : 0,
　　　　m1 : function (){
　　　　　　//...
　　　　},
　　　　m2 : function (){
　　　　　　//...
　　　　}
　　});
```
上面的函数m1()和m2(），都封装在module1对象里。使用的时候，就是调用这个对象的属性。

	module1.m1();
但是，这样的写法会暴露所有模块成员，内部状态可以被外部改写。比如，外部代码可以直接改变内部计数器的值。

	module1._count = 5;
	
**立即执行函数写法**
使用"立即执行函数"（Immediately-Invoked Function Expression，IIFE），可以达到不暴露私有成员的目的。

```js
var module1 = (function(){
　　　　var _count = 0;
　　　　var m1 = function(){
　　　　　　//...
　　　　};
　　　　var m2 = function(){
　　　　　　//...
　　　　};
　　　　return {
　　　　　　m1 : m1,
　　　　　　m2 : m2
　　　　};
　　})();
```

使用上面的写法，外部代码无法读取内部的_count变量。

	console.info(module1._count); //undefined
module1就是Javascript模块的基本写法。下面，再对这种写法进行加工。

**放大模式**
如果一个模块很大，必须分成几个部分，或者一个模块需要继承另一个模块，这时就有必要采用"放大模式"（augmentation）。

```js
var module1 = (function (mod){
　　　　mod.m3 = function () {
　　　　　　//...
　　　　};
　　　　return mod;
　　})(module1);
```

上面的代码为module1模块添加了一个新方法m3()，然后返回新的module1模块。

**宽放大模式（Loose augmentation）**
在浏览器环境中，模块的各个部分通常都是从网上获取的，有时无法知道哪个部分会先加载。如果采用上一节的写法，第一个执行的部分有可能加载一个不存在空对象，这时就要采用"宽放大模式"。

var module1 = ( function (mod){
　　　　//...
　　　　return mod;
　　})(window.module1 || {});
与"放大模式"相比，＂宽放大模式＂就是"立即执行函数"的参数可以是空对象。

**输入全局变量**
独立性是模块的重要特点，模块内部最好不与程序的其他部分直接交互。

为了在模块内部调用全局变量，必须显式地将其他变量输入模块。
```js
var module1 = (function ($, YAHOO) {
　　　　//...
　　})(jQuery, YAHOO);
```
上面的module1模块需要使用jQuery库和YUI库，就把这两个库（其实是两个模块）当作参数输入module1。这样做除了保证模块的独立性，还使得模块之间的依赖关系变得明显。

## 2.AMD规范
2009年，美国程序员Ryan Dahl创造了node.js项目，将javascript语言用于服务器端编程。

这标志"Javascript模块化编程"正式诞生。因为老实说，在浏览器环境下，没有模块也不是特别大的问题，毕竟网页程序的复杂性有限；但是在服务器端，一定要有模块，与操作系统和其他应用程序互动，否则根本没法编程。

node.js的模块系统，就是参照CommonJS规范实现的。在CommonJS中，有一个全局性方法require()，用于加载模块。假定有一个数学模块math.js，就可以像下面这样加载。

	var math = require('math');
然后，就可以调用模块提供的方法：

	var math = require('math');
	math.add(2,3); // 5
	
因为这个系列主要针对浏览器编程，不涉及node.js，所以对CommonJS就不多做介绍了。我们在这里只要知道，require()用于加载模块就行了。

有了服务器端模块以后，很自然地，大家就想要客户端模块。而且最好两者能够兼容，一个模块不用修改，在服务器和浏览器都可以运行。

但是，由于一个重大的局限，使得CommonJS规范不适用于浏览器环境。还是上一节的代码，如果在浏览器中运行，会有一个很大的问题，你能看出来吗？

	var math = require('math');
	　　math.add(2, 3);
	
第二行math.add(2, 3)，在第一行require('math')之后运行，因此必须等math.js加载完成。也就是说，如果加载时间很长，整个应用就会停在那里等。

这对服务器端不是一个问题，因为所有的模块都存放在本地硬盘，可以同步加载完成，等待时间就是硬盘的读取时间。但是，对于浏览器，这却是一个大问题，因为模块都放在服务器端，等待时间取决于网速的快慢，可能要等很长时间，浏览器处于"假死"状态。

因此，浏览器端的模块，不能采用"同步加载"（synchronous），只能采用"异步加载"（asynchronous）。这就是AMD规范诞生的背景。

AMD是"Asynchronous Module Definition"的缩写，意思就是"异步模块定义"。它采用异步方式加载模块，模块的加载不影响它后面语句的运行。所有依赖这个模块的语句，都定义在一个回调函数中，等到加载完成之后，这个回调函数才会运行。

AMD也采用require()语句加载模块，但是不同于CommonJS，它要求两个参数：

	require([module], callback);
第一个参数[module]，是一个数组，里面的成员就是要加载的模块；第二个参数callback，则是加载成功之后的回调函数。如果将前面的代码改写成AMD形式，就是下面这样：

	require(['math'], function (math) {
	　　　　math.add(2, 3);
	　　});
	math.add()

与math模块加载不是同步的，浏览器不会发生假死。所以很显然，AMD比较适合浏览器环境。

## 3.require.js的异步加载
	<script src="js/require.js"></script>
有人可能会想到，加载这个文件，也可能造成网页失去响应。解决办法有两个，一个是把它放在网页底部加载，另一个是写成下面这样：

	<script src="js/require.js" defer async="true" ></script>
async属性表明这个文件需要异步加载，避免网页失去响应。IE不支持这个属性，只支持defer，所以把defer也写上。

加载require.js以后，下一步就要加载我们自己的代码了。假定我们自己的代码文件是main.js，也放在js目录下面。那么，只需要写成下面这样就行了：

	<script src="js/require.js" data-main="js/main"></script>
data-main属性的作用是，指定网页程序的主模块。在上例中，就是js目录下面的main.js，这个文件会第一个被require.js加载。由于require.js默认的文件后缀名是js，所以可以把main.js简写成main。

**require.config()的配置**
使用require.config()方法，我们可以对模块的加载行为进行自定义。require.config()就写在主模块（main.js）的头部。参数就是一个对象，这个对象的paths属性指定各个模块的加载路径。
```js
require.config({
　　　　baseUrl: "js/lib",
　　　　paths: {
　　　　　　"jquery": "jquery.min",
　　　　　　"underscore": "underscore.min",
　　　　　　"backbone": "backbone.min"
　　　　}
　　});
```
AMD模块的写法
模块必须采用特定的define()函数来定义。如果一个模块不依赖其他模块，那么可以直接定义在define()函数之中。

假定现在有一个math.js文件，它定义了一个math模块。那么，math.js就要这样写：

```js
// math.js
　　define(function (){
　　　　var add = function (x,y){
　　　　　　return x+y;
　　　　};
　　　　return {
　　　　　　add: add
　　　　};
　　});
```
加载方法如下：

```js
// main.js
　　require(['math'], function (math){
　　　　alert(math.add(1,1));
　　});
```
如果这个模块还依赖其他模块，那么define()函数的第一个参数，必须是一个数组，指明该模块的依赖性。

```js
define(['myLib'], function(myLib){
　　　　function foo(){
　　　　　　myLib.doSomething();
　　　　}
　　　　return {
　　　　　　foo : foo
　　　　};
　　});
```
当require()函数加载上面这个模块的时候，就会先加载myLib.js文件。

define()的完整定义：

```js
define('sample3' ,['sample','sample1'],function (sample,sample1) {
    var sample4 = require('sample4');
    return function(){
        alert(sample.name+':'+sample.sayhell());
    }
});
```
关于define函数的name和require函数的依赖名称之间的关系
1）define(name，[] , callback); 这个name可以省掉，默认是文件名称；当然也可以自定义，一旦我们定义了name，根据源代码我们可以发现define函数内部其实就是把这个name以及依赖模块、回调函数作为一个对象存储在全局的数组当中，也就是 defQueue.push([name,deps,callback])；那么这个name就是这个组件注册的的ID！

2）require（[name , name2],callback）; 系统首先会在全文检索path中是否对应的路径，如果没有自然把他作为路径拼接在baseUrl上去异步加载这个js文件，加载时从源代码中可以看到 ,var data = getScriptData(evt)；返回的 data.id 其实就是name，然后执行contex.completeLoad(node.id)，其内部就很清楚了，把define中注册的name和这里得到的name进行比较如果相等就执行，所以道理就是：require 和 define 的 name 必须保证一致！

标签加载完成之后，获取标签的唯一标识name

加载非规范的模块
举例来说，underscore和backbone这两个库，都没有采用AMD规范编写。如果要加载它们的话，必须先定义它们的特征。

```js
require.config({
　　　　shim: {

　　　　　　'underscore':{
　　　　　　　　exports: '_'
　　　　　　},
　　　　　　'backbone': {
　　　　　　　　deps: ['underscore', 'jquery'],
　　　　　　　　exports: 'Backbone'
　　　　　　}
　　　　}
　　});
```

require.config()接受一个配置对象，这个对象除了有前面说过的paths属性之外，还有一个shim属性，专门用来配置不兼容的模块。具体来说，每个模块要定义
（1）exports值（输出的变量名），表明这个模块外部调用时的名称；
（2）deps数组，表明该模块的依赖性。

比如，jQuery的插件可以这样定义：

```js
shim: {
　　　　'jquery.scroll': {
　　　　　　deps: ['jquery'],
　　　　　　exports: 'jQuery.fn.scroll'
　　　　}
　　}
```
**require.js插件**
require.js还提供一系列插件，实现一些特定的功能。

domready插件，可以让回调函数在页面DOM结构加载完成后再运行。

```js
require(['domready!'], function (doc){
　　　　// called once the DOM is ready
　　});
```
text和image插件，则是允许require.js加载文本和图片文件。

```js
define([
　　　　'text!review.txt',
　　　　'image!cat.jpg'
　　　　],

　　　　function(review,cat){
　　　　　　console.log(review);
　　　　　　document.body.appendChild(cat);
　　　　}
　　);
```
类似的插件还有json和mdown，用于加载json文件和markdown文件。

## ES6 Module 的语法

> export  import 

[ES6 Module](http://es6.ruanyifeng.com/#docs/module)

## UMD

UMD的实现很简单：

- 先判断是否支持Node.js模块格式（exports是否存在），存在则使用Node.js模块格式。
- 再判断是否支持AMD（define是否存在），存在则使用AMD方式加载模块。
- 前两个都不存在，则将模块公开到全局（window或global）。
- 各种具体的实现方式，可以查看UMD的github。我这里举例一个jQuery使用的，按照如上方式实现的代码:

```js
// if the module has no dependencies, the above pattern can be simplified to
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.returnExports = factory();
  }
}(this, function () {

    // Just return a value to define the module export.
    // This example returns an object, but the module
    // can return a function as the exported value.
    return {};
}));
```
## exports、module.exports 和 export、export default 咋回事
> 模块导出

- require: node 和 es6 都支持的引入
- export / import : 只有es6 支持的导出引入
- module.exports / exports: 只有 node 支持的导出

### exports、module.exports
> node模块， commonJS规范

CommonJS定义的模块分为: 模块标识(module)、模块定义(exports) 、模块引用(require)

node 执行个文件，默认生成exports及module对象，都指向一块{}内存区域
```
// exports => {} <= module.exports

exports = module.exports = {};
```

看段代码：

```js
let a = 100;

console.log(module.exports); //能打印出结果为：{}
console.log(exports); //能打印出结果为：{}

exports.a = 200; //这里辛苦劳作帮 module.exports 的内容给改成 {a : 200}

exports = '指向其他内存区'; //这里把exports的指向指走

//test.js

var a = require('/utils');
console.log(a) // 打印为 {a : 200}

```

>从上面可以看出，其实require导出的内容是module.exports的指向的内存块内容，并不是exports的。
简而言之，区分他们之间的区别就是 exports 只是 module.exports的引用，辅助后者添加内容用的。

- module.exports 初始值为一个空对象 {}
- exports 是指向的 module.exports 的引用
- require() 返回的是 module.exports 而不是 exports

> 为了避免糊涂，尽量都用 module.exports 导出，然后用require导入

### export 和 export default (import)
> ES6 模块语法

- export与export default均可用于导出常量、函数、文件、模块等
- 在一个文件或模块中，export、import可以有多个，export default仅有一个
- 通过export方式导出，在导入时要加{ }，export default则不需要
- export能直接导出变量表达式，export default不行。

