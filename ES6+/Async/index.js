/**
 * async / await
 * 利用 Generator 函数的语法糖

  async/await自带执行器，不需要手动调用next()就能自动执行下一步
  async函数返回值是Promise对象，而Generator返回的是生成器对象
  await能够返回Promise的resolve/reject的值

 */
// 模拟实现
function run(gen) {
  //把返回值包装成promise
  return new Promise((resolve, reject) => {
    var g = gen()

    function _next(val) {
      //错误处理
      try {
        var res = g.next(val) 
      } catch(err) {
        return reject(err); 
      }
      if(res.done) {
        return resolve(res.value);
      }
      //res.value包装为promise，以兼容yield后面跟基本类型的情况
      Promise.resolve(res.value).then(
        val => {
          _next(val);
        }, 
        err => {
          //抛出错误
          g.throw(err)
        });
    }
    _next();
  });
}

function* myGenerator() {
  try {
    console.log(yield Promise.resolve(1)) 
    console.log(yield 2)   //2
    console.log(yield Promise.reject('error'))
  } catch (error) {
    console.log(error)
  }
}

const result = run(myGenerator)     //result是一个Promise
//输出 1 2 error
