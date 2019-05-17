/**
 * AOP 面向切面编程，OOP的横向补充， 无关业务的代码
 */

// ? 有三个变量a、b、c，要保证b、c在修改前后，a一直等于b与c的和。


// 装饰器模式
var a = b = c = 0;

function setA (action) {
    return function (value) {
        action(value);
        a = b + c;
    };
}

function validateValue (action) {
    return function (value) {
        if (typeof value !== 'number') {
            throw new Error('你传了个什么鬼进来');
        }
        action(value);
    };
}

var setB = validateValue(setA(function (value) {
    b = value;
}));

var setC = validateValue(setA(function (value) {
    c = value;
}));

setB(10);                    // a === 10;
setC(1);                     // a === 11;
setC('什么鬼');              // Uncaught Error: 你传了个什么鬼进来


// Object.defineProperty 以及 Object.defineProperties

var accessorDecorator = (function () {
  var context = {b:0,c:0};
  return {
      set: function (action) {
          return function (value) {
              action.call(this, value);
              wrapper.a = this.b + this.c;
          }.bind(this);
      }.bind(context),
      get: function (action) {
          return action.bind(context);
      }
  };
})();

var wrapper = Object.defineProperties({}, {
  a: {
      value: 0,
      writable: true
  },
  b: {
      set: validateValue(accessorDecorator.set(function (value) {
          this.b = value;
      })),
      get: accessorDecorator.get(function () {
          return this.b;
      })
  },
  c: {
      set: validateValue(accessorDecorator.set(function (value) {
          this.c = value;
      })),
      get: accessorDecorator.get(function () {
          return this.c;
      })
  }
});

function validateValue (action) {
  return function (value) {
      if (typeof value !== 'number') {
          throw new Error('你传了个什么鬼进来');
      }
      action(value);
  };
}

wrapper.b = 10;              // wrapper.a === 10;
wrapper.c = 1;               // wrapper.a === 11;
wrapper.c = '什么鬼';        // Uncaught Error: 你传了个什么鬼进来

// 装饰器语法（Decorator） http://es6.ruanyifeng.com/#docs/decorator#%E6%96%B9%E6%B3%95%E7%9A%84%E4%BF%AE%E9%A5%B0

class Wrapper {
  a = 0;

  @validateValue
  @setA
  b = 0;

  @validateValue
  @setA
  c = 0;
}

function validateValue (target, key, descriptor) {
  const action = descriptor.set;
  descriptor.set = (value) => {
      if (typeof value !== 'number') {
          throw new Error('你传了个什么鬼进来');
      }
      action(value);
  };
}

function setA (target, key, descriptor) {
  const action = descriptor.set;
  descriptor.set = (value) => {
      action(value);
      target.a = target.b + target.c;
  };
}

let wrapper = new Wrapper;

//  Proxy 与 Reflect 对象, proxy 拦截， reflect 反映触发

let validateProxy = new Proxy({a: 0, b: 0, c: 0}, {
  set(target, key, value, receiver) {
    console.log('v', 0);
      if (key in target && typeof value !== 'number') {
          throw new Error('你传了个什么鬼进来');
      }
      console.log('v', 1);
      return Reflect.set(target, key, value, receiver);
  }
});

let setProxy = new Proxy(validateProxy, {
  set(target, key, value, receiver) {
    console.log('s', 0);
      let done = Reflect.set(target, key, value, receiver);
      console.log('s', 1);
      if (key === 'b' || key === 'c') {
          Reflect.set(target, 'a', target.b + target.c, receiver);
          console.log('s', 2);
      }
      return done;
  }
});

setProxy.b = 2;
console.log(setProxy.a);

setProxy.c = 2;
console.log(setProxy.a);