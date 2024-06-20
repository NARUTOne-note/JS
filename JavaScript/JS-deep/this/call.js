// 基础版实现
Function.prototype.myCall = function (context) {
  var context = context || window
  // 给 context 添加一个属性
  // getValue.call(a, 'yck', '24') => a.fn = getValue
  context.fn = this
  // 将 context 后面的参数取出来
  var args = [...arguments].slice(1)
  // getValue.call(a, 'yck', '24') => a.fn('yck', '24')
  var result = context.fn(...args)
  // 删除 fn
  delete context.fn
  return result
}

// 基于 eval 版本
(() => {
Function.prototype.myCall = function (context) {
  context = (context == null || context == undefined) ? window : new Object(context);
  context.fn = this

  var args = []
  for (var i = 1, len = arguments.length; i < len; i++) {
    args.push('arguments[' + i + ']')
  }

  var result = eval('context.fn(' + args + ')')

  delete context.fn
  return result
}

// 基于 eval 版本 终极版

var hasStrictMode = (function () {
  "use strict";
  return this == undefined;
}());
var isStrictMode = function () {
  return this === undefined;
};
var getGlobal = function () {
  if (typeof self !== 'undefined') { return self; }
  if (typeof window !== 'undefined') { return window; }
  if (typeof global !== 'undefined') { return global; }
  throw new Error('unable to locate global object');
};
function isFunction(fn){
  return typeof fn === "function";
}
function getContext(context) {

  var isStrict = isStrictMode();

  if (!hasStrictMode || (hasStrictMode && !isStrict)) {
      return (context === null || context === void 0) ? getGlobal() : Object(context);
  }

  // 严格模式下, 妥协方案
  return Object(context);
}
Function.prototype.call = function (context) {

  // 不可以被调用
  if (typeof this !== 'function') {
      throw new TypeError(this + ' is not a function');
  }
  
  // 获取上下文
  var ctx = getContext(context);

  // 更为稳妥的是创建唯一ID, 以及检查是否有重名
  var propertyName = "__fn__" + Math.random() + "_" + new Date().getTime();
  var originVal;
  var hasOriginVal = isFunction(ctx.hasOwnProperty) ? ctx.hasOwnProperty(propertyName) : false;
  if (hasOriginVal) {
      originVal = ctx[propertyName]
  }
  
  ctx[propertyName] = this;    

  // 采用string拼接
  var argStr = '';
  var len = arguments.length;
  for (var i = 1; i < len; i++) {
      argStr += (i === len - 1) ? 'arguments[' + i + ']' : 'arguments[' + i + '],'
  }
  var r = eval('ctx["' + propertyName + '"](' + argStr + ')');

  // 还原现场
  if (hasOriginVal) {
      ctx[propertyName] = originVal;
  } else {
      delete ctx[propertyName]
  }

  return r;
}
})()

// 基于 new Function 版本
(() =>{
var hasStrictMode = (function () {
  "use strict";
  return this == undefined;
}());

var isStrictMode = function () {
  return this === undefined;
};

var getGlobal = function () {
  if (typeof self !== 'undefined') { return self; }
  if (typeof window !== 'undefined') { return window; }
  if (typeof global !== 'undefined') { return global; }
  throw new Error('unable to locate global object');
};

function isFunction(fn){
  return typeof fn === "function";
}

function getContext(context) {
  var isStrict = isStrictMode();

  if (!hasStrictMode || (hasStrictMode && !isStrict)) {
      return (context === null || context === void 0) ? getGlobal() : Object(context);
  }
  // 严格模式下, 妥协方案
  return Object(context);
}

function generateFunctionCode(argsLength){
  var code = 'return arguments[0][arguments[1]](';
  for(var i = 0; i < argsLength; i++){
      if(i > 0){
          code += ',';
      }
      code += 'arguments[2][' + i + ']';
  }
  code += ')';
  // return arguments[0][arguments[1]](arg1, arg2, arg3...)
  return code;
}

Function.prototype.call = function (context) {

  // 不可以被调用
  if (typeof this !== 'function') {
      throw new TypeError(this + ' is not a function');
  }

  // 获取上下文
  var ctx = getContext(context);

  // 更为稳妥的是创建唯一ID, 以及检查是否有重名
  var propertyName = "__fn__" + Math.random() + "_" + new Date().getTime();
  var originVal;
  var hasOriginVal = isFunction(ctx.hasOwnProperty) ? ctx.hasOwnProperty(propertyName) : false;
  if (hasOriginVal) {
      originVal = ctx[propertyName]
  }

  ctx[propertyName] = this;

  var argArr = [];
  var len = arguments.length;
  for (var i = 1; i < len; i++) {
      argArr[i - 1] = arguments[i];
  }

  var r = new Function(generateFunctionCode(argArr.length))(ctx, propertyName, argArr);

  // 还原现场
  if (hasOriginVal) {
      ctx[propertyName] = originVal;
  } else {
      delete ctx[propertyName]
  }

  return r;
}
})();


/**
 * !!未解决问题
 * 1. 禁止使用 eval
 * 2. this是 基础数据类型的处理
 * 3. object.freeze 的处理
 */