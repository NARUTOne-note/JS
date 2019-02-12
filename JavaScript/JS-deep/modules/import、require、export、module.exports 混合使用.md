# import、require、export、module.exports 混合使用详解

> 🔥自从使用了 es6 的模块系统后，各种地方愉快地使用 import export default，但也会在老项目中看到使用commonjs规范的 require module.exports。甚至有时候也会常常看到两者互用的场景。使用没有问题，但其中的关联与区别不得其解，使用起来也糊里糊涂

**详情参考** [https://juejin.im/post/5a2e5f0851882575d42f5609](https://juejin.im/post/5a2e5f0851882575d42f5609)

- 为何有的地方使用 require 去引用一个模块时需要加上 `default`？ `require('xx').default`
- 经常在各大UI组件引用的文档上会看到说明 `import { button } from 'xx-ui'` 这样会引入所有组件内容，需要添加额外的 babel 配置，比如 `babel-plugin-component`？
- 为什么可以使用 `es6` 的 import 去引用 `commonjs` 规范定义的模块，或者反过来也可以又是为什么？
- 我们在浏览一些 npm 下载下来的 UI 组件模块时（比如说 `element-ui` 的 lib 文件下），看到的都是 webpack 编译好的 js 文件，可以使用 import 或 require 再去引用。但是我们平时编译好的 js 是无法再被其他模块 import 的，这是为什么？
- `babel` 在模块化的场景中充当了什么角色？以及 `webpack` ？哪个启到了关键作用？
- 听说 es6 还有 `tree-shaking` 功能，怎么才能使用这个功能？

## webpack/babel

> **问题5**

### webpack 模块化

> webpack 本身维护了一套模块系统，这套模块系统兼容了所有前端历史进程下的模块规范，包括 amd commonjs es6 等

webpack 配置编译后的 js 是无法被其他模块引用的, 只会作用于当前作用域。这个js并不能被其他模块继续以 require 或 import 的方式引用

### babel

> babel 能提前将 es6 的 import 等模块关键字转换成 commonjs 的规范。这样 webpack 就无需再做处理，直接使用 webpack 运行时定义的 `__webpack_require__`处理。其实两者的转换思路差不多，区别在于 webpack 的原生转换 可以多做一步静态分析，使用tree-shaking 技术

babel 转换 es6 的模块输出逻辑非常简单，即将所有输出都赋值给 exports，并带上一个标志 __esModule 表明这是个由 es6 转换来的 commonjs 输出。

```js
// es6

export default 123;

export const a = 123;

const b = 3;
const c = 4;
export { b, c };

// commonjs

exports.default = 123;
exports.a = 123;
exports.b = 3;
exports.c = 4;
exports.__esModule = true;
```

babel将模块的导出转换为commonjs规范后，也会将引入 import 也转换为 commonjs 规范。即采用 require 去引用模块，再加以一定的处理，符合es6的使用意图。

```js
function _interopRequireDefault(obj) {
    return obj && obj.__esModule
        ? obj
        : { 'default': obj };
}

var _a = require('assert');
var _a2 = _interopRequireDefault(_a);

var a = _a2['default'];

```

如果本来就是 commonjs 规范的模块，导出时没有default属性，需要添加一个default属性，并把整个模块对象再次赋值给default属性。

```js
function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj;
    }
    else {
        var newObj = {}; // (A)
        if (obj != null) {
            for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key))
                    newObj[key] = obj[key];
            }
        }
        newObj.default = obj;
        return newObj;
    }
}
```

`import { a } from './a.js'` 直接转换为 `require('./a.js').a`

> 🚀 如果借助 babel 的转换，es6 的模块系统最终还是会转换成 commonjs 的规范。所以我们如果是使用 babel 转换 es6 模块，混合使用 es6 的模块和 commonjs 的规范是没有问题的，因为最终都会转换成 commonjs。解释了：**问题3**

### babel5/babel6

> 我们在上文 babel 对导出模块的转换提到，es6 的 export default 都会被转换成 exports.default，即使这个模块只有这一个输出。解释**问题1**☘

**注意**： babel 5 转换成 commonjs 的时候也一起赋值给 module.exports，即整个导出对象被赋值了 default 所对应的值。

```js
// a.js

export default 123;

// b.js

var foo = require('./a.js').default; // babel 6
var foo = require('./a.js') // babel 5
```

还有一个很重要的问题，一旦 a.js 文件里又添加了一个具名的输出，那么引入方就会出麻烦。

```js
// a.js

export default 123;

export const a = 123; // 新增
复制代码// b.js

var foo = require('./a.js');

// 由之前的 输出 123
// 变成 { default: 123, a: 123 }
```

## exports、module.exports 和 export、export default 咋回事

> 模块导出

- require: node 和 es6 都支持的引入
- export / import : 只有es6 支持的导出引入
- module.exports / exports: 只有 node 支持的导出

## exports、module.exports

> node模块， commonJS规范

CommonJS定义的模块分为: 模块标识(module)、模块定义(exports) 、模块引用(require)

node 执行个文件，默认生成exports及module对象，都指向一块{}内存区域

```js
// exports => {} <= module.exports

exports = module.exports = {};
```

看段代码：

```js
let a = 100;

console.log(module.exports); //能打印出结果为：{}
console.log(exports); //能打印出结果为：{}

exports.a = 200; //这里辛苦劳作帮 module.exports 的内容给改成 {a : 200}

exports = '指向其他内存区'; //这里把exports的指向重新定义了

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

## export 和 export default (import)

> ES6 模块语法

- export与export default均可用于导出常量、函数、文件、模块等
- 在一个文件或模块中，export、import可以有多个，export default仅有一个
- 通过export方式导出，在导入时要加{ }，export default则不需要
- export能直接导出变量表达式，export default不行。
