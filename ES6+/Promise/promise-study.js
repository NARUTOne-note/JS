/*
 * @File: promise-study.js
 * @Project: Promise
 * @File Created: Friday, 10th August 2018 2:40:53 pm
 * @Author: NARUTOne (wznaruto326@163.com/wznarutone326@gamil.com)
 * -----
 * @Last Modified: Friday, 10th August 2018 2:40:58 pm
 * @Modified By: NARUTOne (wznaruto326@163.com/wznarutone326@gamil.com>)
 * -----
 * @Copyright <<projectCreationYear>> - 2018 bairong, bairong
 * @fighting: code is far away from bug with the animal protecting
 *  ┏┓      ┏┓
 *  ┏┛┻━━━┛┻┓ 
 *  |           |
 *  |     ━    |
 *  |  ┳┛ ┗┳ |
 *  |          |
 *  |     ┻   |
 *  |           |
 *  ┗━┓     ┏━┛
 *     |      | 神兽保佑
 *     |      | 代码无BUG！！！
 *     |      ┗━━━┓
 *     |            ┣┓
 *     |            ┏┛
 *     ┗┓┓ ┏━┳┓┏┛
 *      |┫┫   |┫┫
 *      ┗┻┛   ┗┻┛
 */

/**
 * ! Promise 学习
 * ? http://es6.ruanyifeng.com/#docs/promise
 * * pending => default
 * * fulfilled => resolve
 * * rejected => reject
 */

// basic use

const promise = new Promise(function(resolve, reject) {
  // ... some code

  if ( /* 异步操作成功 */ true ) {
    resolve(value);
  } else {
    reject(error);
  }
});

promise.then(value => {}).catch(err => {});

// ! 异步加载图片
function loadImageAsync(url) {
  return new Promise(function(resolve, reject) {
    const image = new Image();

    image.onload = function() {
      resolve(image);
    };

    image.onerror = function() {
      reject(new Error('Could not load image at ' + url));
    };

    image.src = url;
  });
}

// ! 异步请求

const getJSON = function(url) {
  const promise = new Promise(function(resolve, reject){
    const handler = function() {
      if (this.readyState !== 4) {
        return;
      }
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    };
    const client = new XMLHttpRequest();
    client.open("GET", url);
    client.onreadystatechange = handler;
    client.responseType = "json";
    client.setRequestHeader("Accept", "application/json");
    client.send();

  });

  return promise;
};

getJSON("/posts.json").then(function(json) {
  console.log('Contents: ' + json);
}, function(error) {
  console.error('出错了', error);
});

// ? 链式调用
// ! Promise.prototype.then()
// ! Promise.prototype.catch() === Promise.prototype.then(null, rejection)

const someAsyncThing = function() {
  return new Promise(function(resolve, reject) {
    // 下面一行会报错，因为x没有声明
    resolve(x + 2);
  });
};

someAsyncThing()
.catch(function(error) {
  console.log('oh no', error);
})
.then(function() {
  console.log('carry on');
});
// oh no [ReferenceError: x is not defined]
// carry on

// ! Promise.prototype.finally()  ES9 
// ? 不管promise最后的状态，在执行完then或catch指定的回调函数以后，都会执行finally方法指定的回调函数。

promise
.then(result => {})
.catch(error => {})
.finally(() => {});

promise
.finally(() => {
  // 语句
});

// 等同于
promise
.then(
  result => {
    // 语句
    return result;
  },
  error => {
    // 语句
    throw error;
  }
);

/** finally  */
Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(
    value  => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => { throw reason })
  );
};

// ! Promise.all, 
// ? 多个promise实例

const p1 = new Promise((resolve, reject) => {
  resolve('hello');
})
.then(result => result)
.catch(e => e);

const p2 = new Promise((resolve, reject) => {
  throw new Error('报错了');
})
.then(result => result)
.catch(e => e);

Promise.all([p1, p2])
.then(result => console.log(result))
.catch(e => console.log(e));
// ["hello", Error: 报错了]

// !promise.race() 同上all

// !Promise.resolve()  
// ? 对象 => Promise对象实例, 返回resolve状态

Promise.resolve('foo')
// 等价于
new Promise(resolve => resolve('foo'))

// !空参
const p = Promise.resolve();

p.then(function () {
  // ...
});

// !非对象
const p = Promise.resolve('Hello');

p.then(function (s){
  console.log(s)
});
// Hello

// !thenable对象
let thenable = {
  then: function(resolve, reject) {
    resolve(42);
  }
};

let p1 = Promise.resolve(thenable);
p1.then(function(value) {
  console.log(value);  // 42
});

// !Promise.reject() 同上， 返回reject状态

// !async  desc
const f = () => console.log('now');
Promise.resolve().then(f);
console.log('next');
// next
// now

const f = () => console.log('now');
Promise.try(f);
console.log('next');
// now
// next
