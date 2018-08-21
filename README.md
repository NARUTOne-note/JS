# JS

> :rocket: 记录、学习一些JS及相关语言的特性，知识

## JS运行机制

![web-front-zh](https://raw.githubusercontent.com/NARUTOne/resources-github/master/imgs/js/JS-main-thread.jpg)

**关键角色**:

- **Call Stack**：调用栈，即 JavaScript 代码执行的地方，Chrome 和 NodeJS 中对应 V8 引擎。当它执行完当前所有任务时，栈为空，等待接收 Event Loop 中 next Tick 的任务。
- Browser APIs：这是连接 JavaScript 代码和浏览器内部的桥梁，使得 JavaScript 代码可以通过 Browser APIs 操作 DOM，调用 setTimeout，AJAX 等。
- **Event queue**: 每次通过 AJAX 或者 setTimeout 添加一个异步回调时，回调函数一般会加入到 Event queue 当中。
- **Job queue**: 这是预留给 promise 且优先级较高的通道，代表着“稍后执行这段代码，但是在 next Event Loop tick 之前执行”。它属于 ES 规范，注意区别对待，这里暂不展开。
- **Next Tick**: 表示调用栈 call stack 在下一 tick 将要执行的任务。它由一个 Event queue 中的回调，全部的 job queue，部分或者全部 render queue 组成。注意 current tick 只会在 Job queue 为空时才会进入 next tick。这就涉及到 task 优先级了，可能大家对于 microtask 和 macrotask 更加熟悉，这里不再展开。
- **Event Loop**: 它会“监视”（轮询）call stack 是否为空，call stack 为空时将会由 Event Loop 推送 next tick 中的任务到 call stack 中。

## 参考

### 书籍、文档

- JavaScript权威指南
- JavaScript高级程序设计

### 优文、优站

- js禅意花园：[javascript](https://bonsaiden.github.io/JavaScript-Garden/zh/#intro)
- Base64编码与解码：[详解Base64编码和解码](https://my.oschina.net/goal/blog/201032)
