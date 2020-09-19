/**
 * 类class
 * ! protected 修饰符与 private 修饰符的行为很相似，但有一点不同， protected成员在派生类中仍然可以访问
 */

class Greeter {
  static standardGreeting = "Hello, there";
  greeting: string;
  constructor(message: string) {
      this.greeting = message;
  }
  greet() {
      return "Hello, " + this.greeting;
  }
}

let greeter: Greeter;
greeter = new Greeter("world");
console.log(greeter.greet());

/**
 * 使用 typeof Greeter，意思是取Greeter类的类型，而不是实例的类型。
 *  或者更确切的说，"告诉我 Greeter标识符的类型"，也就是构造函数的类型。 
 * 这个类型包含了类的所有静态成员和构造函数。 
 * 之后，就和前面一样，我们在 greeterMaker上使用 new，创建 Greeter的实例。
 */
let greeterMaker: typeof Greeter = Greeter;
greeterMaker.standardGreeting = "Hey there!";

let greeter2: Greeter = new greeterMaker('message');
console.log(greeter2.greet());

// 继承
// 公共，私有与受保护的修饰符
// 默认为 public
// 你可以使用 readonly关键字将属性设置为只读的。 只读属性必须在声明时或构造函数里被初始化。
class Animal {
  private size: number; // 私有属性, 它就不能在声明它的类的外部访问
  private name: string;
  protected type: string; // protected修饰符与 private修饰符的行为很相似，但有一点不同， protected成员在派生类中仍然可以访问
  readonly id: string;
  readonly numberOfLegs: number = 8;
  public constructor(theName: string, id: string) { 
    this.name = theName;
    this.id = id || 'Animal'
  }
  move(distanceInMeters: number = 0) {
    console.log(`Animal moved ${distanceInMeters}m.`);
  }
}

class Animal1 extends Animal {
  constructor() { super("Rhino", 'animal1'); }
  public getType () {
    console.log(this.type); // 访问 父class 中的 protected属性
  }
}

class Employee {
  private name: string;
  constructor(theName: string) { this.name = theName; }
  
}

class Dog extends Animal {
  bark() {
      console.log('Woof! Woof!');
  }
}

const dog = new Dog('tom', 'Dog');
dog.bark();
dog.move(10);
dog.bark();

let animal = new Animal("Goat", 'a-goat');
let rhino = new Animal1();
let employee = new Employee("Bob");

animal = rhino;
// animal = employee; // 错误: Animal 与 Employee 不兼容.

// ! set get
// 只带有 get不带有 set的存取器自动被推断为 readonly
let passcode = "secret passcode";

class EmployeeConstrol {
    private _fullName: string;

    get fullName(): string {
        return this._fullName;
    }

    set fullName(newName: string) {
        if (passcode && passcode == "secret passcode") {
            this._fullName = newName;
        }
        else {
            console.log("Error: Unauthorized update of employee!");
        }
    }
}

let employeeC = new EmployeeConstrol();
employeeC.fullName = "Bob Smith";
if (employeeC.fullName) {
  alert(employeeC.fullName);
}

// ! 静态属性  static
// 每个实例想要访问这个属性的时候，都要在 origin前面加上类名

class Grid {
  static origin = {x: 0, y: 0};
  calculateDistanceFromOrigin(point: {x: number; y: number;}) {
      let xDist = (point.x - Grid.origin.x);
      let yDist = (point.y - Grid.origin.y);
      return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
  }
  constructor (public scale: number) { }
}

let grid1 = new Grid(1.0);  // 1x scale
let grid2 = new Grid(5.0);  // 5x scale

console.log(grid1.calculateDistanceFromOrigin({x: 10, y: 10}));
console.log(grid2.calculateDistanceFromOrigin({x: 10, y: 10}));

// !抽象类

abstract class Department {

  constructor(public name: string) {
  }

  printName(): void {
      console.log('Department name: ' + this.name);
  }

  abstract printMeeting(): void; // 必须在派生类中实现
}

class AccountingDepartment extends Department {

  constructor() {
      super('Accounting and Auditing'); // 在派生类的构造函数中必须调用 super()
  }

  printMeeting(): void {
      console.log('The Accounting Department meets each Monday at 10am.');
  }

  generateReports(): void {
      console.log('Generating accounting reports...');
  }
}

let department: Department; // 允许创建一个对抽象类型的引用
// department = new Department(); // 错误: 不能创建一个抽象类的实例
department = new AccountingDepartment(); // 允许对一个抽象子类进行实例化和赋值
department.printName();
department.printMeeting();
// department.generateReports(); // 错误: 方法在声明的抽象类中不存在

// !类接口

class Point {
  x: number;
  y: number;
}

interface Point3d extends Point {
  z: number;
}

let point3d: Point3d = {x: 1, y: 2, z: 3};


// 类 编译 ES5代码

class Greeters {
  // 静态属性
  static cname: string = "Greeter";
  // 成员属性
  greeting: string;

  // 构造函数 - 执行初始化操作
  constructor(message: string) {
    this.greeting = message;
  }

  // 静态方法
  static getClassName() {
    return "Class name is Greeter";
  }

  // 成员方法
  greet() {
    return "Hello, " + this.greeting;
  }
}

let greeters = new Greeters("world");

/**
 * "use strict";
var Greeter = (function () {
    // 构造函数 - 执行初始化操作
    function Greeter(message) {
      this.greeting = message;
    }
    // 静态方法
    Greeter.getClassName = function () {
      return "Class name is Greeter";
    };
    // 成员方法
    Greeter.prototype.greet = function () {
      return "Hello, " + this.greeting;
    };
    // 静态属性
    Greeter.cname = "Greeter";
    return Greeter;
}());
var greeters = new Greeter("world");

 */