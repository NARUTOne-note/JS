/**
 * 内置类型
 */

/* 
! Partial 转可选
type Partial<T> = {
  [P in keyof T]?: T[P];
};
*/
interface People {
  name: string;
  person: {name: string; name1: string}
}
type NewPeople = Partial<People>
// error: Property 'name1' is missing in type ...
const jack: NewPeople = {
  name: 'jack',
  person: {
    name: 'son',
    name1: 'son',
  }
}
// 如何解决多层可选呢 递归
type PowerPartial<T> = {
  [U in keyof T]?: T[U] extends object
    ? PowerPartial<T[U]>
    : T[U]
};

/**
 * ! Readonly 只读
 * type Readonly<T> {readonly [P in keyof T]: T[P]}
 * ? 只读可选
 * type ReadonlyPartial<T> = { readonly [P in keyof T]?: T[P] };
 */
interface InfoInterface {
  ID: string,
  address: string
}
type ReadonlyInfo = Readonly<InfoInterface>;

/**
 * ! Required 必选
  type Required<T> = {
    [P in keyof T]-?: T[P];
  };
 */

type RequiredPeople = Required<People>;

/**
 * ! Pick 取出属性
  type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
  };
 */

type NewPerson = Pick<People, 'name'>; // { name: string; }

/**
 * ! Exclude 移除属性
  type Exclude<T, U> = T extends U ? never : T;

 * ! NonNullable null | undefined排除
  type NonNullable<T> = T extends null | undefined ? never : T;
 */

type T = Exclude<1 | 2, 1 | 3> // => 2
type Teste = '111' | '222' | null;
type NewTest = NonNullable<Teste>; // '111' | '222'

/**
 * ! Extract 取交集
  type Extract<T, U> = T extends U ? T : never;
 */

type TE = Extract<'a'|'b'|'c'|'d' ,'b'|'c'|'e' > // => // 'b'|'c'

/**
 * ! Omit 不包含
 *  type Omit<T, K> = Pick<T, Exclude<keyof T, K>>
 */
type Foo = Omit<{name: string, age: number}, 'name'> // -> { age: number }

/**
 * ! Record 标记对象的 key value类型
  type Record<K extends keyof any, T> = {
    [P in K]: T;
  };
 */

const user: Record<'name'|'email', string> = {
  name: '', 
  email: ''
}
// 复杂一点
function mapObject<K extends string | number, T, U>(obj: Record<K, T>, f: (x: T) => U): Record<K, U>;
// 这里简易实现，否则报ts(2391)错误
function mapObject(): any {}
const names = { foo: "hello", bar: "world", baz: "bye" };
const lengths = mapObject(names, s => s.length); 
type newNames =  typeof lengths  // => { foo: number, bar: number, baz: number }

/**
 * ! ReturnType 返回值类型
 * type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
 * infer R 就是声明一个变量来承载传入函数签名的返回值类型（反解）, 简单说就是用它取到函数返回值的类型方便之后使用.
 */

function TestFn() {
  return 'test';
}
type TestR = ReturnType<typeof TestFn>; // => string

// 反解Promise类型
type PromiseType<T> = (args: any[]) => Promise<T>;
type UnPromisify<T> = T extends PromiseType<infer U> ? U : never;
// demo
async function stringPromise() {
  return "string promise";
}
type extractStringPromise = UnPromisify<typeof stringPromise>; // string

/**
 * ! Parameters 获取一个函数的所有参数类型
 *  type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;
 */

interface IPerson {name: string}
interface IFunc {
  (person: IPerson, count: number): boolean
}
type P = Parameters<IFunc> // => [IPerson, number]
const person1: P[0] = {
  name: '1'
}

/**
 * ! ConstructorParameters 获取一个类的构造函数参数
 * type ConstructorParameters<T extends new (...args: any) => any> = T extends new (...args: infer P) => any ? P : never;
 */

type DateConstrParams = ConstructorParameters<typeof Date>  // => string | number | Date
//  这里补充一下，源码中Date构造器定义
interface DateConstructor {
    new (value: number | string | Date): Date;
}
