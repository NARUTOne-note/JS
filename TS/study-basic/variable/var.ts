/**
 * ts-var 变量
 */

// eg var作用域|函数作用域， var, 提升、重定义、屏蔽

function f(shouldInitialize: boolean) {
  if (shouldInitialize) {
      var x = 10;
  }

  return x;
}

f(true);  // returns '10'
f(false); // returns 'undefined'

// 变量捕获
for (var i = 0; i < 10; i++) {
  setTimeout(function() { console.log(i); }, 100 * i);
}

// => 改进， 立即执行函数闭包

for (var i = 0; i < 10; i++) {
  (function(i) {
      setTimeout(function() { console.log(i); }, 100 * i);
  })(i);
}

// => 块作用域， let, 不进行变量提升

for (let i = 0; i < 10 ; i++) {
  setTimeout(function() {console.log(i); }, 100 * i);
}

function f1 (input: boolean) {
  let a = 100;

  if (input) {
      // Still okay to reference 'a'
      let b = a + 1;
      return b;
  }

  // Error: 'b' doesn't exist here
  // return b;
}

function foo() {
  // okay to capture 'a'
  return a;
}

// 不能在'a'被声明前调用'foo'
// 运行时应该抛出错误
foo();

let a;
// 不是说块级作用域变量不能用函数作用域变量来声明。 而是块级作用域变量需要在明显不同的块里声明
function f2 (condition, x) {
  if (condition) {
      let x = 100;
      return x;
  }

  return x;
}

f2(false, 0); // returns 0
f2(true, 0);  // returns 100

// const 常量，与let类似，但不可重新赋值

const v = 'const';
// v = 'let'; // error

// 解构赋值
let inputs: [number, number] = [1, 2];
let [first, second] = inputs;
console.log(first); //  1
console.log(second); //  2
// swap variables
[first, second] = [second, first];

function f3(arr: [number, number]) {
  const [first, second] = arr;
  console.log(first);
  console.log(second);
}
f3(inputs);

type C = { a: string, b?: number }

function keepWholeObject(wholeObject: C): void  {
  let { a, b = 1001 } = wholeObject;
}

let defaults = { food: "spicy", price: "$$", ambiance: "noisy" };
let search = { ...defaults, food: "rich" };