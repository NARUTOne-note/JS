/**
 * namespace 命名空间
 * 让这些接口和类在命名空间之外也是可访问的，所以需要使用 export
 */

// namespace Validation {
//   export interface StringValidator {
//       isAcceptable(s: string): boolean;
//   }

//   const lettersRegexp = /^[A-Za-z]+$/;
//   const numberRegexp = /^[0-9]+$/;

//   export class LettersOnlyValidator implements StringValidator {
//       isAcceptable(s: string) {
//           return lettersRegexp.test(s);
//       }
//   }

//   export class ZipCodeValidator implements StringValidator {
//       isAcceptable(s: string) {
//           return s.length === 5 && numberRegexp.test(s);
//       }
//   }
// }

// 命名空间，引用方式；模块用import
/// <reference path="validation.ts" />
/// <reference path="lettersOnlyValidator.ts" />
/// <reference path="zipCodeValidator.ts" />

// * 再次重申，不应该对模块使用命名空间，使用命名空间是为了提供逻辑分组和避免命名冲突。 
// * 模块文件本身已经是一个逻辑分组，并且它的名字是由导入这个模块的代码指定，所以没有必要为导出的对象增加额外的模块层。

// Some samples to try
let strings = ["Hello", "98052", "101"];

// Validators to use
let validators: { [s: string]: Validation.StringValidator; } = {};
validators["ZIP code"] = new Validation.ZipCodeValidator();
validators["Letters only"] = new Validation.LettersOnlyValidator();

// Show whether each string passed each validator
for (let s of strings) {
  for (let name in validators) {
      let isMatch = validators[name].isAcceptable(s);
      console.log(`'${ s }' ${ isMatch ? "matches" : "does not match" } '${ name }'.`);
  }
}