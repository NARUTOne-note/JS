/**
 * symbol成为了一种新的原生类型, symbol类型的值是通过Symbol构造函数创建的
 * Symbols是不可改变且唯一的。
 */

let sym2 = Symbol("key");
let sym3 = Symbol("key");

sym2 === sym3; // false, symbols是唯一的

const getClassNameSymbol = Symbol();

class C {
    [getClassNameSymbol](){
       return "C";
    }
}

let c = new C();
let className = c[getClassNameSymbol](); // "C"