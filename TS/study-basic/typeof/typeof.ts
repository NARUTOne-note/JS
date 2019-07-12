/**
 * 在 JS 中 typeof 可以判断一个变量的基础数据类型，在 TS 中，
 * 它还有一个作用，就是获取一个变量的声明类型，如果不存在，则获取该类型的推论类型。
 */

interface Person {
  name: string;
  age: number;
  location?: string;
}

const jack: Person = { name: 'jack', age: 100 };

type Jack = typeof jack; // -> Person
console.log(typeof jack);

function foo(x: number): Array<number> {
  return [x];
}

type F = typeof foo; // -> (x: number) => number[]
console.log(typeof foo);
