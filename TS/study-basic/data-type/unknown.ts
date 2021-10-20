// unknown 指的是不可预先定义的类型，在很多场景下，它可以替代 any 的功能同时保留静态检查的能力
// 在静态编译的时候，unknown 不能调用任何方法，而 any 可以。

const foo: unknown = 'string';
foo.substr(1);   	// Error: 静态检查不通过报错
const bar: any = 10;
bar.substr(1);		// Pass: any类型相当于放弃了静态检查

// 避免使用 any 作为函数的参数类型而导致的静态类型检查 bug
function test(input: unknown): number {
  if (Array.isArray(input)) {
    return input.length;    // Pass: 这个代码块中，类型守卫已经将input识别为array类型
  }
  return input.length;      // Error: 这里的input还是unknown类型，静态检查报错。如果入参是any，则会放弃检查直接成功，带来报错风险
}
