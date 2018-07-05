/*
 作用域
 * createDate: 2017/07/19
 * author: NARUTOne
 * 
 * JavaScript中的函数运行在它们被定义的作用域里,而不是它们被执行的作用域里。
 * JS的预编译是以段为处理单元的。
 * */

//引例
var name = 'laruence';
function echo() {
     alert(name);
     var name = 'eve';
     alert(name);
     alert(age);
}
 
echo(); // undefined, eve, error

//引例2.0
var name = 'laruence';
function echo() {
  alert(name);
}
 
function env() {
  var name = 'eve';
  echo();
}
env(); // laruence

//引例3.0
function factory() {
     var name = 'laruence';
     var intro = function(){
          alert('I am ' + name);
     }
     return intro;
}
 
function app(para){
     var name = para;
     var func = factory();
     func();
}
 
app('eve');// I am laruence


//实例

var x = 10;
 
function foo() {
 
  var y = 20;
 
  function barFD() { // 函数声明
    alert(x);
    alert(y);
  }
 
  var barFE = function () { // 函数表达式
    alert(x);
    alert(y);
  };
 
  var barFn = Function('alert(x); alert(y);');
 
  barFD(); // 10, 20
  barFE(); // 10, 20
  barFn(); // 10, "y" is not defined
 
}
 
foo();