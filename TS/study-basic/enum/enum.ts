/**
 * enum 枚举
 * * 每个枚举成员都带有一个值，它可以是 常量或 计算出来的。
 */

// ! 自增数字枚举
enum Direction {
  Up = 1, // default 0
  Down,
  Left,
  Right
}

// ? 通过枚举的属性来访问枚举成员，和枚举的名字来访问枚举类型

enum EResponse {
  No = 0,
  Yes = 1,
}

function respond(recipient: string, message: EResponse): void {
  // ...
}

respond("Princess Caroline", EResponse.Yes);

/**
 * enum E {
    A = getSomeValue(),
    B, // error! 'A' is not constant-initialized, so 'B' needs an initializer
  }  
**/

// ! 字符串枚举，不可自增

enum DirectionS {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT"
}

// !异构混合枚举，不建议

enum BooleanLikeHeterogeneousEnum {
  No = 0,
  Yes = "YES",
}

// ! 计算，常量
// ? 不带有初始化器且它之前的枚举成员是一个 数字常量, 第一个成员默认 0
enum E1 { X, Y, Z }

enum E2 {
    A = 1, B, C
}

function f(obj: { A: number }) {
  return obj.A;
}

if (E2) {
  console.log(E2.A);
}

enum FileAccess {
  // constant members
  None,
  Read    = 1 << 1,
  Write   = 1 << 2,
  ReadWrite  = Read | Write,
  // computed member
  G = "123".length
}

// ! 联合枚举， 枚举成员类型

enum ShapeKind {
  Circle,
  Square,
}

interface Circle {
  kind: ShapeKind.Circle;
  radius: number;
}

interface Square {
  kind: ShapeKind.Square;
  sideLength: number;
}

let c: Circle = {
  kind: ShapeKind.Circle,
  // kind: ShapeKind.Square,
  //    ~~~~~~~~~~~~~~~~ Error!
  radius: 100,
}

// ! 反向映射: name <=> value

enum Enum {
  A
}
let a = Enum.A;
let nameOfA = Enum[a]; // "A"

// ! const 枚举限制， 严格限制常量变化

const enum Directions {
  Up,
  Down,
  Left,
  Right
}

let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right]
// var directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];

// ! 外部枚举 declare ， 描述已经存在的枚举类型的形状

declare enum Enumd { // 对于非常数的外部枚举而言，没有初始化方法时被当做需要经过计算的。
  A = 1,
  B,
  C = 2
}