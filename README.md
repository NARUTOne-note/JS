# JS

> :rocket: 记录、学习一些JS及相关语言的特性，知识

## ECMAScript

- ECAM 国际： 技术标准制定的协会，前身为欧洲计算机制造商协会，这个组织的目标是评估、开发和制定计算机标准，总部设在日内瓦。
- ECMA-262：Ecma 国际发布的一项标准。它包含通用目的的脚本语言的规范。
- ECMAScript：Ecma 国际通过 ECMA-262 标准化的脚本程序设计语言。
- JavaScript: ECMAScript 语言的实现，或者叫方言, ECMA-262 标准的实现和扩展。在日常场合，ECMAScript 和 JavaScript 可以互换的。
- TC39(Technical Committee 39): 是一个推动 JavaScript 发展的标准委员会，由各个主流浏览器厂商的代表构成

[https://github.com/tc39](https://github.com/tc39)

## Stage

> 每一项新特性要最终纳入 ECMAScript 规范中，需要经历一个由 TC39 拟定的处理过程，称为 TC39 process。一共有五个阶段，每个阶段的变动都需要由 TC39 委员会批准。

[https://github.com/tc39/proposals](https://github.com/tc39/proposals)

- Stage 0

> Strawman（展示阶段）

任何 TC39 成员，或者注册为 TC39 贡献者的会员，都可以提交。类似于选秀的海选阶段，由 TC39 评委审核通过则会被列入 stage 0 proposals，地址是

[https://github.com/tc39/proposals/blob/master/stage-0-proposals.md](https://github.com/tc39/proposals/blob/master/stage-0-proposals.md)

- Stage 1

> Proposal（征求意见阶段）

该阶段产生一个正式的提案，由一个 TC39 成员带头负责。需要描述清楚该功能要解决什么问题，解决方案中必须包含例子，API 以及相关的语义和算法。存在哪些潜在的问题以及实现它所面临的挑战。

- Stage 2

> Draft（草案阶段）

草案是规范的第一个版本，与最终标准基本一致。

草案之后只接受增量修改。草案中包含新增特性语法和语义的，要有尽可能完善的说明，允许包含一些待办事项或者占位符。

必须包含2个实验性的具体实现，其中一个可以是借助转译器实现的，例如 Babel。

- Stage 3

> Candidate（候选人阶段）

获取来自具体实现和用户的反馈，只有出现了重大问题才会修改。评审人和 ECMAScript 的编辑需要在规范上签字，至少要有两个符合规范的具体实现。

- Stage 4

> Finished（定案阶段）

已经准备就绪，该特性会出现在年度发布的规范之中。需要通过 Test 262 的验收测试

[https://github.com/tc39/test262](https://github.com/tc39/test262)

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

- [js禅意花园](https://bonsaiden.github.io/JavaScript-Garden/zh/#intro)
- [详解Base64编码和解码](https://my.oschina.net/goal/blog/201032)
- [现代 JavaScript 教程](https://zh.javascript.info/)
