// ? 属性重写，类型不一致
interface Test {
  name: string;
  age: number;
}
// error: Type 'string | number' is not assignable to type 'string'
// interface Test2  extends Test{
//   name: Test['name'] | number
// }

// 设置any
type Weaken<T, K extends keyof T> = {
  [P in keyof T]: P extends K ? any : T[P];
}

interface Test2  extends Weaken<Test, 'name'>{
  name: Test['name'] | number
}

// 排除再重写
interface Test3 extends Omit<Test, 'name'> {
  name: Test['name'] | number
}
