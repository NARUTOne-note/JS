# Event Loop

> JS 事件循环, 执行顺序

- [深入解析你不知道的 EventLoop 和浏览器渲染、帧动画、空闲回调（动图演示）](https://juejin.im/post/6844904165462769678?utm_source=gold_browser_extension)

## 前言

由一道题引发的血案🔥

[参考](https://juejin.im/post/5c3cc981f265da616a47e028#heading-13)

```js
//请写出输出内容
async function async1() {
    console.log('async1 start'); // 2
    await async2();
    console.log('async1 end'); // 6
}
async function async2() {
  console.log('async2'); // 3
}

console.log('script start'); // 1

setTimeout(function() {
    console.log('setTimeout'); // 8
}, 0)

async1();

new Promise(function(resolve) {
    console.log('promise1'); // 4
    resolve();
}).then(function() {
    console.log('promise2'); // 7
});
console.log('script end'); // 5

/*
script start
async1 start
async2
promise1
script end
async1 end
promise2
setTimeout
*/
```

## 事件循环

> 为了协调事件，用户交互，脚本，渲染，网络任务等，浏览器必须使用事件循环

## 任务队列

> [https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/7#issue-408144349](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/7#issue-408144349)

- JS分为同步任务和异步任务
- 同步任务都在主线程上执行，形成一个执行栈
- 主线程之外，事件触发线程管理着一个任务队列，只要异步任务有了运行结果，就在任务队列之中放置一个事件。
- 一旦执行栈中的所有同步任务执行完毕（此时JS引擎空闲），系统就会读取任务队列，将可运行的异步任务添加到可执行栈中，开始执行。

根据规范，事件循环是通过任务队列的机制来进行协调的。一个 Event Loop 中，可以有一个或者多个任务队列(task queue)，一个任务队列便是一系列有序任务(task)的集合；每个任务都有一个任务源(task source)，源自同一个任务源的 task 必须放到同一个任务队列，从不同源来的则被添加到不同队列。 setTimeout/Promise 等API便是任务源，而进入任务队列的是他们指定的具体执行任务

![image](./event-loop.png)

### 宏任务

(macro)task（又称之为宏任务），可以理解是每次执行栈执行的代码就是一个宏任务（包括每次从事件队列中获取一个事件回调并放到执行栈中执行）。

浏览器为了能够使得JS内部(macro)task与DOM任务能够有序的执行，**会在一个(macro)task执行结束后，在下一个(macro)task 执行开始前，对页面进行重新渲染**，流程如下：

`(macro)task->渲染->(macro)task->...`

(macro)task主要包含：`script(整体代码)、setTimeout、setInterval、I/O、UI交互事件、postMessage、MessageChannel、setImmediate(Node.js 环境)`

settimeout的回调函数放到宏任务队列里，等到执行栈清空以后执行。

### 微任务

microtask（又称为微任务），**可以理解是在当前 task 执行结束后立即执行的任务。也就是说，在当前task任务后，下一个task之前，在渲染之前**。

所以它的响应速度相比setTimeout（setTimeout是task）会更快，因为无需等渲染。也就是说，在某一个macrotask执行完后，就会将在它执行期间产生的所有microtask都执行完毕（在渲染前）。

microtask主要包含：`Promise.then、 queueMicrotask、MutaionObserver、process.nextTick(Node.js 环境)、Object.observe`

## 运行机制

在事件循环中，每进行一次循环操作称为 tick，每一次 tick 的任务处理模型是比较复杂的，但关键步骤如下：

- 执行一个宏任务（栈中没有就从事件队列中获取）
- 执行过程中如果遇到微任务，就将它添加到微任务的任务队列中
- 宏任务执行完毕后，立即执行当前微任务队列中的**所有微任务**（依次执行）
- 当前宏任务执行完毕，开始检查渲染，然后GUI线程接管渲染
- 渲染完毕后，JS线程继续接管，开始下一个宏任务（从事件队列中获取）

![image](./taskRun.png)

1、await 后的值 v 会被转换为 Promise，实际上await是一个让出线程的标志。await后面的表达式会先执行一遍，将await后面的代码加入到microtask中，然后就会跳出整个async函数来执行后面的代码
2、Promise中的异步体现在then和catch中，所以写在Promise中的代码是被当做同步任务立即执行的。
3、settimeout的回调函数放到宏任务队列里，等到执行栈清空以后执行。
4、`new Promise(resolve => resolve(async2()))`，在执行顺序上等价于：

```js
new Promise((resolve) => {
    Promise.resolve().then(() => {
        async2().then(resolve)
    })
})

document.body.style = 'background:blue'
console.log(1);
Promise.resolve().then(()=>{
    console.log(2);
    document.body.style = 'background:pink'
});
console.log(3);
// 直接pink
```

> chrome 73后， `await v` 在语义上将等价于 `Promise.resolve(v)`，而不再是现在的 `new Promise(resolve => resolve(v))`

5、`Promise.resolve(v)` 不等于 `new Promise(r => r(v))`，因为如果 v 是一个 Promise 对象，前者会直接返回 v，而后者需要经过一系列的处理（主要是 `PromiseResolveThenableJob`）
6、宏任务的优先级是高于微任务的，而原题中的 setTimeout 所创建的宏任务可视为 第二个宏任务，第一个宏任务是这段程序本身
7、微任务和宏任务不在一个任务队列，不在一个任务队列

### requestAnimationFrame

`window.requestAnimationFrame()` 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行

> 注意：若你想在浏览器下次重绘之前继续更新下一帧动画，那么回调函数自身必须再次调用`window.requestAnimationFrame()`

- 在重新渲染前调用
- 很可能在宏任务之后不调用。

rAF在浏览器决定渲染之前给你最后一个机会去改变 DOM 属性，然后很快在接下来的绘制中帮你呈现出来，所以这是做流畅动画的不二选择

### requestIdleCallback

`window.requestIdleCallback()`方法将在浏览器的空闲时段内调用的函数排队。这使开发者能够在主事件循环上执行后台和低优先级工作，而不会影响延迟关键事件，如动画和输入响应。函数一般会按先进先调用的顺序执行，然而，如果回调函数指定了执行超时时间timeout，则有可能为了在超时前执行函数而打乱执行顺序。

## 总结

- 事件循环不一定每轮都伴随着重渲染，但是如果有微任务，一定会伴随着微任务执行。
- 决定浏览器视图是否渲染的因素很多，浏览器是非常聪明的。
- `requestAnimationFrame`在重新渲染屏幕之前执行，非常适合用来做动画。
- `requestIdleCallback`在渲染屏幕之后执行，并且是否有空执行要看浏览器的调度，如果你一定要它在某个时间内执行，请使用 timeout参数。
- `resize`和`scroll`事件其实自带节流，它只在 Event Loop 的渲染阶段去派发事件到 EventTarget 上。
