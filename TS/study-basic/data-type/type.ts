// boolean

let isDone: boolean = false;

// number, 支持es6的进制字面量

let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
let binaryLiteral: number = 0b1010;
let octalLiteral: number = 0o744;

// 字符串

let name2: string = `Gene`;
let age: number = 37;
let sentence: string = `Hello, my name is ${ name2 }.
I'll be ${ age + 1 } years old next month.`;

// 数组

let list: number[] = [1, 2, 3];
let list2: Array<number> = [1, 2, 3];

// 元组

let x: [string, number];
x = ['hello', 10];

// 枚举: 类型补充，使用枚举类型可以为一组数值赋予友好的名字。

enum Color {Red, Green, Blue}
let c: Color = Color.Green;
// 枚举编号，默认从0开始
enum Color1 {Red = 1, Green, Blue}
let colorName: string = Color1[2];

console.log(colorName);  // 显示'Green'因为上面代码里它的值是2

// any, 类型随意
let list3: any[] = [1, true, "free"];
list3[1] = 100;

// void, 没有任何类型

function warnUser(): void {
  console.log("This is my warning message");
}

// null/undefined

let u: undefined = undefined;
let n: null = null;

// never, 永不存在的值的类型；never类型是任何类型的子类型，也可以赋值给任何类型；然而，没有类型是never的子类型或可以赋值给never类型（除了never本身之外）。 即使 any也不可以赋值给never。

// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
  throw new Error(message);
}
// 推断的返回值类型为never
function fail() {
  return error("Something failed");
}
// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
  while (true) {
  }
}

// object

declare function create(o: object | null): void;

create({ prop: 0 }); // OK
create(null); // OK

// create(42); // Error
// create("string"); // Error
// create(false); // Error
create(undefined); // Error

// 类型断言。明确知道某个值将会是什么类型
let someValue: any = "this is a string";

let strLength: number = (<string>someValue).length; // 或 let strLength: number = (someValue as string).length;


