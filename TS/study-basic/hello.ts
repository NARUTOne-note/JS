// tsc hello.ts 编译
// 类型注解
function greeter (person: string) {
  return 'Hello, ' + person + ', welcome to the TypeScript World !';
}

let person = 'NARUTOne';
console.log(greeter(person));

// 接口
interface Person {
  firstName: string,
  lastName: string
}

function inGreeter (person: Person) {
  return "Hello, " + person.firstName + " " + person.lastName;
}

let user = { firstName: "Jane", lastName: "User" };

console.log(inGreeter(user));

// 类
class Student {
  fullName: string;
  constructor (public firstName, public middleInital, public lastName) {
    this.fullName = firstName + ' ' + middleInital + ' ' + lastName;
  }
}

let stu = new Student('Jane', 'M.', 'User');

console.log(inGreeter(stu));
