/**
 * 高级类型 type
 */

// ! 交叉类型, [mixins]
// * 将多个类型合并为一个类型, 特性也将合并， 

function extend<T, U>(first: T, second: U): T & U { // 参数类型不一致，返回类型不一
  let result = <T & U>{};
  for (let id in first) {
      (<any>result)[id] = (<any>first)[id];
  }
  for (let id in second) {
      if (!result.hasOwnProperty(id)) {
          (<any>result)[id] = (<any>second)[id];
      }
  }
  return result;
}

class Person {
  constructor(public name: string) { }
}
interface Loggable {
  log(): void;
}
class ConsoleLogger implements Loggable {
  log() {
      // ...
  }
}
var jim = extend(new Person("Jim"), new ConsoleLogger());
var n = jim.name;
jim.log();

// ! 联合类型， number | string | boolean

function padLeft(value: string, padding: string | number) {
  // ...
}

let indentedString = padLeft("Hello world", 2);

// ? 值联合类型

interface Bird {
  fly();
  layEggs();
}

interface Fish {
  swim();
  layEggs();
}

interface Merge extends Bird, Fish {}

function getSmallPet(): Fish | Bird {
  let result = <Merge>{};
  result.fly = () => {};
  result.layEggs = () => {};
  result.swim = () => {};
  result.layEggs = () => {};
  return result;
}

// * 只能访问联合类型中共同拥有的成员
let pet = getSmallPet();
pet.layEggs(); // okay
// pet.swim();    // errors

// 类型断言, 就能访问当前断言类型的成员
if ((<Fish>pet).swim) {
  (<Fish>pet).swim();
}
else if ((<Bird>pet).fly) {
  (<Bird>pet).fly();
}

// 类型保护， parameterName is Type
function isFish(pet: Fish | Bird): pet is Fish {
  return (<Fish>pet).swim !== undefined;
}

if (isFish(pet)) {
  pet.swim();
}
else {
  pet.fly();
}

// typeof 类型保护
// 必须是 "number"， "string"， "boolean"或 "symbol"。
// 但是TypeScript并不会阻止你与其它字符串比较，语言不会把那些表达式识别为类型保护。

function padLeft2(value: string, padding: string | number) {
  if (typeof padding === "number") {
      return Array(padding + 1).join(" ") + value;
  }
  if (typeof padding === "string") {
      return padding + value;
  }
  throw new Error(`Expected string or number, got '${padding}'.`);
}

// instanceof 类型保护：通过构造函数来细化类型的一种方式
/**
 * 此构造函数的 prototype属性的类型，如果它的类型不为 any的话
 * 构造签名所返回的类型的联合
 */

interface Padder {
  getPaddingString(): string
}

class SpaceRepeatingPadder implements Padder {
  constructor(private numSpaces: number) { }
  getPaddingString() {
      return Array(this.numSpaces + 1).join(" ");
  }
}

class StringPadder implements Padder {
  constructor(private value: string) { }
  getPaddingString() {
      return this.value;
  }
}

function getRandomPadder() {
  return Math.random() < 0.5 ?
      new SpaceRepeatingPadder(4) :
      new StringPadder("  ");
}

// 类型为SpaceRepeatingPadder | StringPadder
let padder: Padder = getRandomPadder();

if (padder instanceof SpaceRepeatingPadder) {
  padder; // 类型细化为'SpaceRepeatingPadder'
}
if (padder instanceof StringPadder) {
  padder; // 类型细化为'StringPadder'
}

// ! null 价值亿万美金的错误
// ? null与 undefined是所有其它类型的一个有效值。 这也意味着，你阻止不了将它们赋值给其它类型
// * --strictNullChecks标记可以解决此错误
// * 使用了 --strictNullChecks，可选参数和可选属性会被自动地加上 | undefined:

// let s = "foo";
// s = null; // 错误, 'null'不能赋值给'string'
let sn: string | null = "bar";
sn = null; // 可以

sn = undefined; // error, 'undefined'不能赋值给'string | null'
class C {
  a: number;
  b?: number;
}
let c = new C();
c.a = 12;
c.a = undefined; // error, 'undefined' is not assignable to 'number'
c.b = 13;
c.b = undefined; // ok
c.b = null; // error, 'null' is not assignable to 'number | undefined'

// ! 类型断言去除 null|undefined, 采用 !后缀

function fixed(name: string | null): string {
  function postfix(epithet: string) {
    return name!.charAt(0) + '.  the ' + epithet; // ok name!
  }
  name = name || "Bob"; // 短路去除
  return postfix("great");
}

// ! 类型别名 type aliesName
// * 起别名不会新建一个类型 - 它创建了一个新 名字来引用那个类型。
// * 给原始类型起别名通常没什么用，尽管可以做为文档的一种形式使用。

type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
    if (typeof n === 'string') {
        return n;
    }
    else {
        return n();
    }
}

// type Yikes = Array<Yikes>; // error， 类型别名不能出现在声明右侧的任何地方。

// ! 别名泛型

type Container<T> = { value: T };
type Tree<T> = {
  value: T;
  left: Tree<T>;
  right: Tree<T>;
}

// ? 交杂类型
type LinkedList<T> = T & { next: LinkedList<T> };

interface Person {
    name: string;
}

var people: LinkedList<Person>;
var s = people.name;
var s = people.next.name;
var s = people.next.next.name;
var s = people.next.next.next.name;

// ! 接口 vs 类型

// ? 接口创建了一个新的名字，可以在其它任何地方使用。 类型别名并不创建新名字
// ? 类型别名不能被 extends和 implements（自己也不能 extends和 implements其它类型）
// * 如果你无法通过接口来描述一个类型并且需要使用联合类型或元组类型，这时通常会使用类型别名。

// ! 字符串字面量类型
// * 字符串字面量类型允许你指定字符串必须的固定值
// * 字符串字面量类型可以与联合类型，类型保护和类型别名很好的配合

type Easing = "ease-in" | "ease-out" | "ease-in-out";
class UIElement {
    animate(dx: number, dy: number, easing: Easing) {
        if (easing === "ease-in") {
            // ...
        }
        else if (easing === "ease-out") {
        }
        else if (easing === "ease-in-out") {
        }
        else {
            // error! should not pass null or undefined.
        }
    }
}

let button = new UIElement();
button.animate(0, 0, "ease-in");
// button.animate(0, 0, "uneasy"); // error: "uneasy" is not allowed here

// ! 数字字面量类型
// TypeScript还具有数字字面量类型。

// ! 可辨识联合
// * 合并单例类型，联合类型，类型保护和类型别名来创建一个叫做 可辨识联合的高级模式，它也称做 标签联合或 代数数据类型

interface Square {
  kind: "square";
  size: number;
}
interface Rectangle {
  kind: "rectangle";
  width: number;
  height: number;
}
interface Circle {
  kind: "circle";
  radius: number;
}

// 每个接口都有 kind属性但有不同的字符串字面量类型。 kind属性称做 可辨识的特征或 标签。 其它的属性则特定于各个接口

// 联合
type Shape2 = Square | Rectangle | Circle;
// type Shape2 = Square | Rectangle | Circle | Triangle;

function area(s: Shape2) {
  switch (s.kind) {
      case "square": return s.size * s.size;
      case "rectangle": return s.height * s.width;
      case "circle": return Math.PI * s.radius ** 2;
  }
}

// !完整性检查
// * 当没有涵盖所有可辨识联合的变化时，我们想让编译器可以通知我们。
// * 1、启用--strictNullChecks并且指定一个返回值类型
// * 2、使用 never类型，编译器用它来进行完整性检查：

function assertNever(x: never): never {
  throw new Error("Unexpected object: " + x);
}
function area2(s: Shape2) {
  switch (s.kind) {
      case "square": return s.size * s.size;
      case "rectangle": return s.height * s.width;
      case "circle": return Math.PI * s.radius ** 2;
      default: return assertNever(s); // error here if there are missing cases
  }
}

// !多态this类型
// * 表示的是某个包含类或接口的 子类型。 这被称做 F-bounded多态性。 它能很容易的表现连贯接口间的继承, return this采用链式调用

// ! 索引类型
// * 使用索引类型，编译器就能够检查使用了动态属性名的代码

// ? keyof T， 索引类型查询操作符。 对于任何类型 T， keyof T的结果为 T上已知的公共属性名的联合。 keyof Person会自动根据改变发生变化
// ? T[K]， 索引访问操作符. 类型语法反映了表达式语法。 这意味着 person['name']具有类型 Person['name']

function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
  return names.map(n => o[n]);
}

interface Person {
    name: string;
    age: number;
}
let person: Person = {
    name: 'Jarid',
    age: 35
};
let strings: string[] = pluck(person, ['name']); // ok, string[]
let personProps: keyof Person; // 同 'name' | 'age'

// * 可以在普通的上下文里使用 T[K]，这正是它的强大所在。 你只要确保类型变量 K extends keyof T就可以了
function getProperty2<T, K extends keyof T>(o: T, name: K): T[K] {
  return o[name]; // o[name] is of type T[K]
}

interface Map2<T> {
  [key: string]: T;
}
let keys: keyof Map2<number>; // string
let value: Map2<number>['foo']; // number

// ! 映射类型， 在映射类型里，新类型以相同的形式去转换旧类型里每个属性
// ! 注意 Readonly<T>和 Partial<T>用处不小，因此它们与 Pick和 Record一同被包含进了TypeScript的标准库里：
type NullablePerson = { [P in keyof Person]: Person[P] | null }
type PartialPerson = { [P in keyof Person]?: Person[P] }

// type Readonly<T> = {
//   readonly [P in keyof T]: T[P];
// }
// type Partial<T> = {
//   [P in keyof T]?: T[P];
// }

type Proxy<T> = {
  get(): T;
  set(value: T): void;
}
type Proxify<T> = {
  [P in keyof T]: Proxy<T[P]>;
}
function unproxify<T>(t: Proxify<T>): T {
  let result = {} as T;
  for (const k in t) {
      result[k] = t[k].get();
  }
  return result;
}
let obj = {
  name: 'zz',
  get: () => obj.name,
  set: (value) => {obj.name = value}
}
let proxyProps: Proxify<object> = {};
let originalProps = unproxify(proxyProps);

/**
 * ! 预定义的有条件类型
 * 
Exclude<T, U> -- 从T中剔除可以赋值给U的类型。
Extract<T, U> -- 提取T中可以赋值给U的类型。
NonNullable<T> -- 从T中剔除null和undefined。
ReturnType<T> -- 获取函数返回值类型。
InstanceType<T> -- 获取构造函数类型的实例类型。
 */