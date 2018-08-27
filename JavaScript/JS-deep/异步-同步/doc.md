# JS —— 异步、同步

> JS单线程执行 => 出异步同步

## 异步方式

### 回调函数

```js
function f1 (callback) {
  // todo

  callback();
}
function f2 () {
  // todo
}

f1(f2);
```

> 回调函数的优点是简单、容易理解和部署，缺点是不利于代码的阅读和维护，高耦合，使得程序结构混乱、流程难以追踪，很容易造成回调地狱，而每个任务只能指定一个回调函数.

### 事件监听

```js
function f1 () {
  // todo

  f1.trigger('done');
}
function f2 () {
  // todo
}

f1.on('done', f2);
```

> 事件监听也比较容易理解，可以绑定多个事件，每个事件可以指定多个回调函数，而且很好地 去耦合，有利于实现模块化。缺点是整个程序都要改写成事件驱动型，运行流程会变得很模糊。

### 发布、订阅(观察者模式)

```js
function f1 () {
  // todo

  jQuery.publish('done'); // 发布信号
}
function f2 () {
  // todo
}

// 订阅
jQuery.subscribe('done', f2);
// 取消订阅
jQuery.unsubscribe('done', f2);

```

> 这种方法的性质与 事件监听类似，但是明显优于后者，因为可以通过查看 消息中心，了解存在多少信号、每个信号有多少订阅者，从而监控程序运行

## 异步流程顺序控制

```js
function async(arg, callback){
    console.log('参数为 ' + arg + ' , 1秒后返回结果');
    setTimeout(function(){ callback(arg * 2); }, 1000);
}

function final(value) {
  console.log('完成: ', value);
}
```

### 串行

```js
var items = [ 1, 2, 3, 4, 5, 6];
var results = [];

function series(item){
    if(item){
        async(item, function(result){
            results.push(result);
            return series(items.shift());
        });
    } else {
        return final(results);
    }
}
series(items.shift());
```

### 并行

```js
var items = [ 1, 2, 3, 4, 5, 6];
var results = [];

items.forEach(function(item){
    async(item, function(result){
        results.push(result);
        if( results.length === items.length ){
            final(results);
        }
    });
});
```

### 串、并结合

> 设置并行上限

```js
var items = [ 1, 2, 3, 4, 5, 6];
var results = [];
var running = 0;
var limit = 2;

function launcher(){
    while( running < limit && items.length > 0 ){
        var item = items.shift();
        async(item, function(result){
            results.push(result);
            running--;
            if( items.length > 0 ){
                launcher();
            } else if(running == 0）{
                final(results);
            }
        });
        running++;
    }
}

```

## setTimeout  async  promise异步执行顺序

```js
async function async1() {
    console.log("async1 start");
    await  async2(); // //执行这一句后，输出async2后，await会让出当前线程，将后面的代码加到任务队列中，然后继续执行函数后面的同步代码
    console.log("async1 end");
}
async function async2() {
    console.log( 'async2');
}
console.log("script start");
setTimeout(function () {
    console.log("settimeout");
},0);
async1();
new Promise(function (resolve) {
    console.log("promise1");
    resolve();
}).then(function () {
    console.log("promise2");
});
console.log('script end');
```

⌛结果：

```js
script start
async1 start
async2
promise1
script end
async1 end
promise2
settimeout
```

**队列任务优先级**：同步 > promise.Trick() > promise的回调 > setTimeout > setImmediate

> 一句话总结，先执行同步代码，遇到异步代码就先加入队列，然后按入队的顺序执行异步代码，最后执行setTimeout队列的代码。