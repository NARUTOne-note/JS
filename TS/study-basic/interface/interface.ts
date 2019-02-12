/**
 * ts-interface 接口
 * @description 类型检查，就是为这些类型命名和为你的代码或第三方代码定义契约
 *  1、类型检查器不会去检查属性的顺序，只要相应的属性存在并且类型也是对的就可以。
 */

 // option bags
interface LabelledValue { // 必须包含一个label属性且类型为string
  label: string;
}

function printLabel(labelledObj: LabelledValue) {
  console.log(labelledObj.label);
}

let myObj = {size: 10, label: "Size 10 Object"};
printLabel(myObj);

// 非必需
interface SquareConfig { // ?: 非必需
  color?: string;
  width?: number;
}

interface SquareConfig2 { // 任意数量的其它属性
  color?: string;
  width?: number;
  [propName: string]: any;
}

// 函数return  {color: string; area: number}
function createSquare(config: SquareConfig): {color: string; area: number} {
  let newSquare = {color: "white", area: 100};
  if (config.color) {
    newSquare.color = config.color;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}

function createSquare2(config: SquareConfig2): {color: string, area: number} {
  let newSquare = {color: "white", area: 100};
  if (config.color) {
    newSquare.color = config.color;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}

// let mySquare0 = createSquare({colour: "red", width: 100}); // 类型报错
let mySquare = createSquare({color: "black"});
let mySquare1 = createSquare({color: "black", opacity: 0.5} as SquareConfig); // 使用类型断言
let mySquare2= createSquare2({color: "black", opacity: 0.5}); 
let squareOptions = { colour: "red", width: 100 };
let mySquare3 = createSquare(squareOptions); // 绕过类型检查

// 只读
// 最简单判断该用readonly还是const的方法是看要把它做为变量使用还是做为一个属性。 做为变量使用的话用 const，若做为属性则使用readonly。
interface Point {
  readonly x: number;
  readonly y: number;
}

let p1: Point = { x: 10, y: 20 };
// p1.x = 5; // error!

// 只读数组
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
// ro[0] = 12; // error!
// ro.push(5); // error!
// ro.length = 100; // error!
// a = ro; // error!，赋值也不可以
a = ro as number[]; // 类型断言重写

/**
 *! 函数接口
 */

interface SearchFunc { // 参数：return
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc; // 函数变量化
mySearch = function(source: string, subString: string) {
  let result = source.search(subString);
  return result > -1;
}

// 等效于

/**
 * function mySearch (source: string, subString: string): boolean {
  let result = source.search(subString);
  return result > -1;
}
 */

/**
 * 可索引类型: 字符串和数字
 */

interface StringArray {
  [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];

class Animal {
  name: string;
}
class Dog extends Animal {
  breed: string;
}

// 错误：使用数值型的字符串索引，有时会得到完全不同的Animal!
interface NotOkay {
  // [x: number]: Animal; // 报错
  [y: string]: Dog;
}

interface NumberDictionary {
  [index: string]: number; // 返回类型number
  length: number;    // 可以，length是number类型
  // name: string       // 错误，`name`的类型与索引类型返回值的类型不匹配
  name: number;
}
// 只读
interface ReadonlyStringArray {
  readonly [index: number]: string;
}
let myArrayOnly: ReadonlyStringArray = ["Alice", "Bob"];
myArray[2] = "Mallory"; // error!

/**
 * ! 类类型 = 类静态 + 实例
 * ? implements 接口名
 */
interface ClockConstructor { // 构造函数所用
  new (hour: number, minute: number): ClockInterface;
}
interface ClockInterface { // class, 实例方法
  tick(msg: string);
}

function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
  return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface {
  constructor(h: number, m: number) { }
  tick(msg: string) {
      console.log("beep beep" + msg);
  }
}
class AnalogClock implements ClockInterface {
  constructor(h: number, m: number) { }
  tick(msg: string) {
      console.log("tick tock" + msg);
  }
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);

// !接口继承

interface Shape {
  color: string;
}

interface PenStroke {
  penWidth: number;
}

interface Square extends Shape, PenStroke {
  sideLength: number;
}

let square = <Square>{};
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;

// !混合类型
// 函数、对象混合
interface Counter {
  (start: number): string;
  interval: number;
  reset(): void;
}

function getCounter(): Counter {
  let counter = <Counter>function (start: number) { };
  counter.interval = 123;
  counter.reset = function () { };
  return counter;
}

let gc:Counter;
gc = getCounter();
gc(10);
gc.reset();
gc.interval = 5.0;

// !接口继承类
// ? 接口同样会继承到类的private和protected成员
class Control {
  private state: any;
}

interface SelectableControl extends Control {
  select(): void;
}

class Button extends Control implements SelectableControl {
  select() { }
}

class TextBox extends Control {
  select() { }
}

// 错误：“Image”类型缺少“state”属性。
// class Image implements SelectableControl {
//   select() { }
// }

interface LocationInterfance {
  name: string
}
class locatoinClass implements LocationInterfance {
  name: string;
  constructor() {

  }
}
