// 类型注解
function greeter(person) {
    return 'Hello, ' + person + ', welcome to the TypeScript World !';
}
var person = 'NARUTOne';
console.log(greeter(person));
function inGreeter(person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}
var user = { firstName: "Jane", lastName: "User" };
console.log(inGreeter(user));
// 类
var Student = /** @class */ (function () {
    function Student(firstName, middleInital, lastName) {
        this.firstName = firstName;
        this.middleInital = middleInital;
        this.lastName = lastName;
        this.fullName = firstName + ' ' + middleInital + ' ' + lastName;
    }
    return Student;
}());
var stu = new Student('Jane', 'M.', 'User');
console.log(inGreeter(stu));
