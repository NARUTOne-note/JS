/**
 * 自我判断定义情况
 */

// ! 类型断言

// ? 1、 <type>

let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;

// ? 2、 as type

let sValue: any = "this is a string";
let sLength: number = (someValue as string).length;

// ! 非空断言， x! 将从 x 值域中排除 null 和 undefined
// ? 因为 ! 非空断言操作符会从编译生成的 JavaScript 代码中移除，所以在实际使用的过程中，要特别注意
type NumGenerator = () => number;
function myFunc(maybeString: string | undefined | null, numGenerator: NumGenerator | undefined) {
  // Type 'string | null | undefined' is not assignable to type 'string'.
  // Type 'undefined' is not assignable to type 'string'. 
  const onlyString: string = maybeString; // Error
  const ignoreUndefinedAndNull: string = maybeString!; // Ok

   // Cannot invoke an object which is possibly 'undefined'.(2722)
   const num1 = numGenerator(); // Error
   const num2 = numGenerator!(); //OK
}

/**
 * 非空编译后移除
 * 
const a: number | undefined = undefined;
const b: number = a!;
console.log(b); 

=> tsc

"use strict";
const a = undefined;
const b = a;
console.log(b); // undefined

 */

// ! 确认赋值断言

// 通过 let x!: number; 确定赋值断言，TypeScript 编译器就会知道该属性会被明确地赋值。
// 加上 !
let x!: number;
initialize();

// 如果没加 !  Variable 'x' is used before being assigned.(2454)
console.log(2 * x); // Ok

function initialize() {
  x = 10;
}
