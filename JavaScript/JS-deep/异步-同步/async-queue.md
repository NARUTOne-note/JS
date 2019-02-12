# 异步队列

> 单线程js，异步队列思考

## 队列设计

> FIFO先进先出，队列异步函数顺序执行

- add: 添加
- run: 执行
- next: 后移

**闭包**简单实现：

```js
const queue = () => {
  const list = []; // 队列
  let index = 0;  // 游标

  // next 方法
  const next = () => {
    if (index >= list.length - 1) return;

    // 游标 + 1
    const cur = list[++index];
    cur(next);
  }
  
  // 添加任务
  const add = (...fn) => {
    list.push(...fn);
  }

  // 执行
  const run = (...args) => {
    const cur = list[index];
    typeof cur === 'function' && cur(next);
  }

  // 返回一个对象
  return {
    add,
    run,
  }
}

// 生成异步任务
const async = (x, s = 1000) => {
  return (next) => {// 传入 next 函数
    setTimeout(() => {
      console.log(x);
      next();  // 异步任务完成调用
    }, s);
  }
}

const q = queue();
const funs = '123456'.split('').map(x => async(x , 1000));
q.add(...funs);
q.run();// 1, 2, 3, 4, 5, 6 隔一秒一个。
```

### Thunk

> 传名回调, 回调函数

```js
const thunk = () => {
  return x + 1;
};

const A = thunk => {
  return thunk() * 2;
}
```

### 暂停stop

> 加入判断限制，阻止`next`调用

方案一：判断执行

```js
// async 加限制条件
const async = (x) => {
  return (next) => {
    setTimeout(() => {
      if(x > 3) {
        console.log(x);
        q.run();  // 重试
        return;
      }
      console.log(x);
      next();
    }, 1000);
  }
}
const q = queue();
const funs = '123456'.split('').map(x => async(x));
q.add(...funs);
q.run();
// 打印结果： 1, 2, 3, 4, 4，4， 4，4 一直是 4
```

方案二： 主动stop

```js
const queue = () => {
  const list = [];
  let index = 0;
  let isStop = false;

  const next = () => {
    // 加限制
    if (index >= list.length - 1 || isStop) return;
    const cur = list[++index];
    cur(next);
  }

  const add = (...fn) => {
    list.push(...fn);
  }

  const run = (...args) => {
    const cur = list[index];
    typeof cur === 'function' && cur(next);
  }

  const stop = () => {
    isStop = true;
  }

  const retry = () => {
    isStop = false;
    run();
  }

  const goOn = () => {
    isStop = false;
    next();
  }

  return {
    add,
    run,
    stop,
    retry,
    goOn,
  }
}

const async = (x) => {
  return (next) => {
    setTimeout(() => {
      console.log(x);
      next();
    }, 1000);
  }
}

const q = queue();
const funs = '123456'.split('').map(x => async(x));
q.add(...funs);
q.run();// 1, 2, 3, , , 4, 5, 6 停2s

setTimeout(() => {
  q.stop();
}, 3000)


setTimeout(() => {
  q.goOn();
}, 5000)
```

## 并发

> js 单线程串行执行，模拟并行

```js
const queue = () => {
  const list = [];
  let index = 0;
  let isStop = false;
  let isParallel = false;

  const next = () => {
    // 加限制
    if (index >= list.length - 1 || isStop || isParallel) return;
    const cur = list[++index];
    cur(next);
  }

  const add = (...fn) => {
    list.push(...fn);
  }

  const run = (...args) => {
    const cur = list[index];
    typeof cur === 'function' && cur(next);
  }

  const parallelRun = () => {
    isParallel = true;
    for(const fn of list) {
      fn(next); // 并行执行
    }
  }

  const stop = () => {
    isStop = true;
  }

  const retry = () => {
    isStop = false;
    run();
  }

  const goOn = () => {
    isStop = false;
    next();
  }

  return {
    add,
    run,
    stop,
    retry,
    goOn,
    parallelRun
  }
}

const async = (x) => {
  return (next) => {
    setTimeout(() => {
      console.log(x);
      next();
    }, 1000);
  }
}

const q = queue();
const funs = '123456'.split('').map(x => async(x));
q.add(...funs);
// q.run();// 1, 2, 3, , , 4, 5, 6 停2s
// setTimeout(() => {
//   q.stop();
// }, 3000)


// setTimeout(() => {
//   q.goOn();
// }, 5000)

q.parallelRun();
// 一秒后全部输出 1, 2, 3, 4, 5, 6
```

## generator / co

> `generator`也是采用next执行下一步，yield类似于add, 通过函数体内部定义迭代算法，然后返回一个 iterator 对象。

[iterator](https://github.com/sunyongjian/blog/issues/18)

yield表达式是暂停执行的标记，而next方法可以恢复执行。
next方法可以带一个参数，该参数就会被当作上一个yield表达式的返回值。

```js
// 一个简单的🌰，介绍它的用法

function* gen(x) {
  const y = yield x + 1;
  console.log(y, 'here'); // 12
  return y;
}

const g = gen(1);
const value = g.next().value; // {value: 2, done: false}

console.log(value); // 2
console.log(g.next(value + 10)); // {value: 12, done: true}
```

gen 执行返回一个对象 g，而不是返回结果。g 跟其他 iterator 一样，通过调用 next 方法，保证游标 + 1，并且返回一个对象，包含了 value（yield 语句的结果），和 done（迭代器是否完成）。另外，yield 语句的值，比如上面代码中的 y，是下一次调用 next 传入的参数，也就是 value + 10，所以是 12.这样设计是有好处的，因为这样你就可以在 generator 内部，定义迭代算法的时候，拿到上次的结果（或者是处理后的结果）了。

### co 实现

> Thunk / Promise

[https://github.com/tj/co/blob/master/index.js](https://github.com/tj/co/blob/master/index.js)

自动调用 next

#### Thunk 实现

```js
const coThunk = function(gen, ...params) {

  const g = gen(...params);
  
  const next = (...args) => { // args 用于接收参数
    const ret = g.next(...args);   // args 传给 g.next，即赋值给上一个 yield 的值。
    if(!ret.done) { // 去判断是否完成
      typeof ret.value === 'function' && ret.value(next);  // ret.value 就是下一个 thunk 函数
    }
  }

  next(); // 先调用一波
}

// 返回 thunk 函数的 asyncFn
const asyncFn = (x) => {
  return (next) => { // 接收 next
    const data = x + 1;
    setTimeout(() => {
      next && next(data);
    }, 1000)
  }
}

const gen = function* (x) {
  const a = yield asyncFn(x);
  console.log(a);

  const b = yield asyncFn(a);
  console.log(b);

  const c = yield asyncFn(b);
  console.log(c);

  const d = yield asyncFn(c);
  console.log(d);

  console.log('done');
}

coThunk(gen, 1);
// 2, 3, 4, 5, done
```

#### Promise 实现

yield 后面的语句是 promise 对象的话，我们可以在 co 内部拿到了，然后在 g.next().value 的 then 语句执行 next 就好了

```js
// 定义 co
const coPromise = function(gen) {
// 为了执行后的结果可以继续 then
  return new Promise((resolve, reject) => {
    const g = gen();

    const next = (data) => { // 用于传递，只是换个名字
      const ret = g.next(data);
      if(ret.done) { // done 后去执行 resolve，即co().then(resolve)
        resolve(data); // 最好把最后一次的结果给它
        return;
      }
       // then 中的第一个参数就是 promise 对象中的 resolve，data 用于接受并传递。
      typeof ret.value === 'function' && ret.value.then((data) => {
        next(data);  //调用下一次 next
      })
    }

    next();
  })
}

const asyncPromise = (x) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(x + 1);
    }, 1000)
  })
}

const genP = function* () {
  const data1 = yield asyncPromise(1);
  console.log(data1);

  const data2 = yield asyncPromise(data1);
  console.log(data2);

  const data3 = yield asyncPromise(data2);
  console.log(data3);
}

coPromise(genP).then((data) => {
  setTimeout(() => {
    console.log(data + 1); // 5
  }, 1000)
});
// 一样的 2, 3, 4, 5
```

## async/await

如果把 async/await 转化成 generate/yield，只需要把 await 语法换成 yield，再扔到一个 generate 函数中，async 的执行换成 coPromise(gennerate) 就好了。

```js
const asyncPromise = (x) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(x + 1);
    }, 1000)
  })
}

async function fn () {
  const data = await asyncPromise(1);
  console.log(data);
}
fn();

// 那转化成 generator 可能就是这样了。 coPromise 就是上面的实现
function* gen() {
  const data = yield asyncPromise(1);
  console.log(data);
}

coPromise(gen);
```

> asyncToGenerator 就是这样的原理，事实上 babel 也是这样转化的。