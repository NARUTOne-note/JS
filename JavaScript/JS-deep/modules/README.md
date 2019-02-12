# Modules 模块化

- [Javascript模块化编程](http://www.ruanyifeng.com/blog/2012/10/javascript_module.html)
- [JS模块加载发展](https://segmentfault.com/a/1190000009446236)
- [ES6模块](http://es6.ruanyifeng.com/#docs/module)
- [AMD,CMD,CommonJS及UMD](http://blog.gejiawen.com/2015/11/03/what-is-amd-cmd-commonjs-umd/)
- [modules](http://javascript.ruanyifeng.com/nodejs/module.html)
- [javascript的模块化](https://juejin.im/post/5b4420e7f265da0f4b7a7b27)
- [理解模块](https://zhuanlan.zhihu.com/p/22890374)

## why

- 高内聚、低耦合
- 可维护性
- 避免命名空间污染
- 复用性

## use

- [modules types](./modules.md)

## build

> 打包模块

### 打包commonJS

**Browserify**:

> 一个专门用来打包CommonJS模块以便在浏览器里运行的构建工具。

```js
var myDependency = require('myDependency');
var myGrades = [93, 95, 88, 0, 91];
var myAverageGrade = myDependency.average(myGrades);
```

打包, Browserify会依次把main.js里引入的所有模块一同打包到一个名为 bundle.js 的文件里：

```sh
browserify main.js -o bundle.js
```

### 打包AMD

> 需要一些例如RequireJS 或 Curl的AMD加载器

**AMD 和 CommonJS 的最主要区别是AMD是异步加载模块的**。这也就意味着你不是必须把所有的代码打包到一个文件里，模块加载不影响后续语句执行，逐步加载的的模块也不会导致页面阻塞无法响应。

### ES6

- 使用语法编译器（Babel或Traceur）来把ES6语法的代码编译成ES5或者CommonJS, AMD, UMD等其他形式。然后再通过Browserify 或 Webpack 一类的构建工具来进行构建。
- 使用Rollup.js, Rollup也可以把你的代码转换成包括ES6, CommonJS, AMD, UMD, IIFE在内的各种格式。其中IIFE和UMD可以直接在浏览器里运行，AMD, CommonJS, ES6等还需要你通过Browserify, Webpack, RequireJS一类的工具才能在浏览器中使用。
