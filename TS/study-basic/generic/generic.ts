/**
 * ! generic 泛型
 * *无法创建泛型枚举和泛型命名空间
 */

// * 使用变量T，我们把这个版本的identity函数叫做泛型，因为它可以适用于多个类型。 不同于使用 any，它不会丢失信息
function identity<T>(arg: T): T {
  return arg;
}
// ? 传入所有的参数，包含类型参数
let output = identity<string>("myString");  // type of output will be 'string'

// ? 类型推论 -- 即编译器会根据传入的参数自动地帮助我们确定T的类型：

let output2 = identity("myString");  // type of output will be 'string'

// ! 使用泛型， 必须把这些参数当做是任意或所有类型。

function loggingIdentity<T>(arg: T): T {
  // console.log(arg.length);  // Error: T doesn't have .length
  return arg;
}

// ?泛型函数loggingIdentity2，接收类型参数T和参数arg，它是个元素类型是T的数组，并返回元素类型是T的数组
function loggingIdentity2<T>(arg: T[]): T[] { // Array<T>
  console.log(arg.length);  // Array has a .length, so no more error
  return arg;
}

// ! 泛型类型
// ? 对象字面量拿出来做为一个接口,描述泛型函数
interface GenericIdentityFn {
  <T>(arg: T): T;
}
// ? 传入一个类型参数来指定泛型类型
interface GenericIdentityFn2<T> {
  (arg: T): T;
}

function identity3<T>(arg: T): T {
  return arg;
}

let myIdentity: <U>(arg: U) => U = identity;
let myIdentity2: {<T>(arg: T): T} = identity; // 带有调用签名的对象字面量来定义泛型函数
let myIdentity3: GenericIdentityFn = identity;
let myIdentity4: GenericIdentityFn2<number> = identity;

// ! 泛型类
// ?类有两部分：静态部分和实例部分。 泛型类指的是实例部分的类型，所以类的静态属性不能使用这个泛型类型。
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };

// ! 泛型约束

interface Lengthwise {
  length: number;
}

function loggingIdentity4<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);  // Now we know it has a .length property, so no more error
  return arg;
}

// loggingIdentity(3);  // Error, number doesn't have a .length property

loggingIdentity({length: 10, value: 3});

// ! 泛型中使用类类型
function getProperty<T>(obj: T, key: string): T {
  return obj[key];
}

let x1 = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x1, "a"); // okay
getProperty(x1, "m"); // error: Argument of type 'm' isn't assignable to 'a' | 'b' | 'c' | 'd'.

class BeeKeeper {
  hasMask: boolean;
}

class ZooKeeper {
  nametag: string;
}

class Animal1 {
  numLegs: number;
}

class Bee extends Animal1 {
  keeper: BeeKeeper;
}

class Lion extends Animal1 {
  keeper: ZooKeeper;
}

function createInstance<A extends Animal1>(c: new () => A): A {
  return new c();
}

createInstance(Lion).keeper.nametag;  // typechecks!
createInstance(Bee).keeper.hasMask;   // typechecks!