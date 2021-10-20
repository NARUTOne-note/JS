/**
 * 键值获取 keyof
 * keyof 可以获取一个类型所有键值，返回一个联合类型
 */

type Kperson = {
  name: string;
  age: number;
}

type PersonKey = keyof Kperson;  // PersonKey得到的类型为 'name' | 'age'

function getValue (p: Kperson, k: keyof Kperson) {
  return p[k];  // 如果k不如此定义，则无法以p[k]的代码格式通过编译
}
