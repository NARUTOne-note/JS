/**
 * 类型兼容, 基于结构性类型
 * 在基于名义类型的类型系统中，数据类型的兼容性或等价性是通过明确的声明和/或类型的名称来决定的。
 * 这与结构性类型系统不同，它是基于类型的组成结构，且不要求明确地声明
 * ! 类型兼容性是由赋值兼容性来控制的
 */

interface Named {
  name: string;
}

class Person {
  name: string;
}

let p: Named;
// OK, because of structural typing
p = new Person(); // 在使用基于名义类型的语言，比如C#或Java中，这段代码会报错，因为Person类没有明确说明其实现了Named接口。

// TypeScript结构化类型系统的基本规则是，如果x要兼容y，那么y至少具有与x相同的属性
// 检查y是否可以赋值给x, 检查x中的每个属性，y中是否具备
let x1: Named;
let y1 = { name: 'Alice', location: 'Seattle' };
x1 = y1;

// 函数参数类型检查, 同理
function greet(n: Named) {
  console.log('Hello, ' + n.name);
}
greet(y1); // OK

// 比较函数兼容, 参数列表比较
let f1 = (a: number) => 0;
let f2 = (b: number, s: string) => 0;

f2 = f1; // OK
// f1 = f2; // Error

// enum EventType { Mouse, Keyboard }

// interface Event { timestamp: number; }
// interface MouseEvent extends Event { x: number; y: number }
// interface KeyEvent extends Event { keyCode: number }

// function listenEvent(eventType: EventType, handler: (n: Event) => void) {
//     /* ... */
// }

// // Unsound, but useful and common
// listenEvent(EventType.Mouse, (e: MouseEvent) => console.log(e.x + ',' + e.y));

// // Undesirable alternatives in presence of soundness
// listenEvent(EventType.Mouse, (e: Event) => console.log((<MouseEvent>e).x + ',' + (<MouseEvent>e).y));
// listenEvent(EventType.Mouse, <(e: Event) => void>((e: MouseEvent) => console.log(e.x + ',' + e.y)));

// Still disallowed (clear error). Type safety enforced for wholly incompatible types
// listenEvent(EventType.Mouse, (e: number) => console.log(e));

// ! 比较两个类类型的对象时，只有实例的成员会被比较。 静态成员和构造函数不在比较的范围内。类的私有成员和受保护成员会影响兼容性。
//  当检查类实例的兼容时，如果目标类型包含一个私有成员，那么源类型必须包含来自同一个类的这个私有成员。 同样地，这条规则也适用于包含受保护成员实例的类型检查。 这允许子类赋值给父类，但是不能赋值给其它有同样类型的类。

class Animal {
  feet: number;
  constructor(name: string, numFeet: number) { }
}

class Size {
  feet: number;
  constructor(numFeet: number) { }
}

let a: Animal;
let s: Size;

a = s;  // OK
s = a;  // OK

// ! 泛型类型在使用时就好比不是一个泛型类型。对于没指定泛型类型的泛型参数时，会把所有泛型参数当成any比较。

interface Empty<T> {
  // data: T; // 添加这个报错
}
let x: Empty<number>;
let y: Empty<string>;

x = y;  // OK, because y matches structure of x

