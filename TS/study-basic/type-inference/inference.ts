/**
 * type-inference 类型推论
 * * 当候选类型不能使用的时候我们需要明确的指出类型
 */

// ! 最佳通用类型
let x = [0, 1, null]; // 候选类型 number || null

// let zoo = [new Rhino(), new Elephant(), new Snake()]; // 联合数组类型 (Rhino | Elephant | Snake)[]

// ! 上下文类型
window.onmousedown = function(mouseEvent: any) {
  console.log(mouseEvent.button);  //<- Now, no error is given
};


