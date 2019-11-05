/*
 * @File: promise-es5-realize.js
 * @Project: Promise
 * @File Created: Friday, 10th August 2018 2:42:46 pm
 * @Author: NARUTOne (wznaruto326@163.com/wznarutone326@gamil.com)
 * -----
 * @Last Modified: Friday, 10th August 2018 3:46:02 pm
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
 * ! ES5 promise
 * Promise/A+规范：
(1) 一个promise必须具备三种状态(pending|fulfilled(resolved)|rejected)，
  当处于pending状态时，可以转移到fulfilled(resolved)状态或rejected状态，
  处于fulfilled(resolved)状态或rejected状态时，状态不再可变；
(2) 一个promise必须有then方法，then方法必须接受两个参数：
(3) then方法必须返回一个promise
 */

function MyPromise(fn) {
  this.value;
  this.status = 'pending';
  this.resolveFunc = function() {};
  this.rejectFunc = function() {};
  fn(this.resolve.bind(this), this.reject.bind(this));
}

MyPromise.prototype.resolve = function(val) {
  var self = this;
  if (this.status == 'pending') {
    this.status = 'resolved';
    this.value = val;
    setTimeout(function() {
      self.resolveFunc(self.value);
    }, 0);
  }
}

MyPromise.prototype.reject = function(val) {
  var self = this;
  if (this.status == 'pending') {
    this.status = 'rejected';
    this.value = val;
    setTimeout(function() {
      self.rejectFunc(self.value);
    }, 0);
  }
}

MyPromise.prototype.then = function(resolveFunc, rejectFunc) {
  var self = this;
  return new MyPromise(function(resolve_next, reject_next) {
    function resolveFuncWrap() {
      var result = resolveFunc(self.value);
      if (result && typeof result.then === 'function') {
        //如果result是MyPromise对象，则通过then将resolve_next和reject_next传给它
        result.then(resolve_next, reject_next);
      } else {
        //如果result是其他对象，则作为参数传给resolve_next
        resolve_next(result);
      }
    }
    function rejectFuncWrap() {
      var result = rejectFunc(self.value);
      if (result && typeof result.then === 'function') {
        //如果result是MyPromise对象，则通过then将resolve_next和reject_next传给它
        result.then(resolve_next, reject_next);
      } else {
        //如果result是其他对象，则作为参数传给resolve_next
        resolve_next(result);
      }
    }
    self.resolveFunc = resolveFuncWrap;
    self.rejectFunc = rejectFuncWrap;
  })
}

// ? 示例

var fn = function(resolve, reject) {
  resolve('hello');
}

var p = new MyPromise(fn);
p.then(function(data) {
  console.log(data);
  return 'hello again';
}).then(function(data) {
  console.log(data);
  return new MyPromise(function(resolve, reject) {
    reject('hello third time!');
  });
}).then(function(data) {
  console.log(data);
}, function(data) {
  console.log(data, ' from reject');
});

// module.exports = MyPromise;
