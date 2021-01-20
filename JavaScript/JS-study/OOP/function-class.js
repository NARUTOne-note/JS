/**
 * ES6前类class封装
 */

// ! ES5
function Cat(name, color) {
  // 私有属性
  var heart = '❤';
  var stomach = '胃';

  // 私有方法
  var heartBeat = function() {
    console.log(heart + '跳')
  }

  // 公有属性
  this.name = name;
  this.color = color;

  // 公有方法
  this.jump = function() {
    heartBeat();
    console.log('jump 跳');
  }
}

// 公有方法, 原型链上的
Cat.prototype.cleanBody = function() {
  console.log('用唾液清洁身体');
}

// 静态属性
Cat.descript = '当前构造函数用来new 一只 cat';
// 静态方法
Cat.actingCute = function() {
  console.log('cat会卖萌');
}

// 使用方式
var tomCat = new Cat('Tom', 'blue');
console.log(tomCat.name);
console.log(tomCat.color);
tomCat.jump();
console.log(Cat.descript)
Cat.actingCute()
console.log(guaiguai.descript)
guaiguai.cleanBody()

//! ES6 class
/**
 * 1、类的所有方法都定义在类的prototype属性上面
 * 2、类却不存在这种提升机制
 */

class Cat {
  constructor (name, color) {   
    // 局部变量 
    var heart = '❤️'    
    var stomach = '胃'    
    var heartbeat = function () {      
      console.log(heart + '跳')    
    }
    // 公有属性、方法
    this.name = name    
    this.color = color    
    this.jump = function () {      
      heartbeat()     	
      console.log('我跳起来了~来追我啊')    
    }  
  }

  // 静态属性、方法
  static descript = '我这个类是用来生产出一只猫的'
  static actingCute () {
    console.log('一听到猫我就想到了它会卖萌')
  }

  // 被添加到原型链上定义的公有方法
  cleanTheBody = function () {
    console.log('我会用唾液清洁身体')
  }
  hideTheShit () {
    console.log('我在臭臭完之后会把它藏起来')
  }
}
Cat.staticName = 'staticName';

var guaiguai = new Cat('guaiguai', 'white')
console.log(guaiguai)
guaiguai.jump()
guaiguai.cleanTheBody()

// 使用了static定义的属性和方法为静态属性和方法，并不存在于实例上
console.log(guaiguai.descript) // undefined
guaiguai.actingCute() // guaiguai.actingCute is not a function

// 静态方法属性，存在类上
Cat.actingCute()
console.log(Cat.descript)
console.log(Cat.staticName)
