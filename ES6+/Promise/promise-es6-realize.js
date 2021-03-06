/*
 * @File: promise-es6-realize.js
 * @Project: Promise
 * @File Created: Friday, 10th August 2018 2:41:37 pm
 * @Author: NARUTOne (wznaruto326@163.com/wznarutone326@gamil.com)
 * -----
 * @Last Modified: Friday, 10th August 2018 3:40:26 pm
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
 * ! 简单实现
 *
 * @class Promise
 */
class Promise {
  constructor (executor) {   // executor里面有两个参数，一个叫resolve（成功），一个叫reject（失败）。
    this.status = 'pending',
    this.value = undefined;
    this.reason = undefined;
    // 成功存放的数组
    this.onResolvedCallbacks = [];
     // 失败存放法数组
     this.onRejectedCallbacks = [];

     // 使用箭头函数，固定this
    let resolve = (value) => {
      if (this.status == 'pending') {
        this.status = 'resolve';
        this.value = value;
        this.onResolvedCallbacks.forEach(fn => fn())
      }
    }

    let reject = (reason) => {
      if (this.status == 'pending') {
        this.status = 'reject';
        this.reason = reason;
        this.onRejectedCallbacks.forEach(fn => fn())
      }
    }
    try{
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }
  // 简易，不合规实现
  then (onFullFilled, onRejected) {
    if (this.status == 'resolved') {
      onFullFilled(this.value)
    }
    if (this.status == 'rejectd') {
      onRejected(this.reason);
    }
    if (this.status == 'pending') {
      this.onResolvedCallbacks.push(()=>{
        onFullFilled(this.value);
      })
      this.onRejectedCallbacks.push(()=> {
          onRejected(this.reason);
      })
    }
  }
}

const p = new Promise((resolve, reject) => {
  setTimeout(() => {
      resolve('hello world')
  }, 1000);
})
p.then((data) =>{
  console.log(data)
},(err) =>{
  console.log(err);
})