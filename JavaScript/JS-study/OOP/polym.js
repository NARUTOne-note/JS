/**
 * 多态：同一操作作用于不同的对象上，可以产生不同的解释和不同的执行结果。
 * 多态最根本的作用就是通过把过程化的条件语句转化为对象的多态性，从而消除这些条件分支语句。
 */

function makeSound (animal) {  
  if (animal.sound instanceof Function) { 
    // 判断是否有animal.sound且该属性为函数    
    animal.sound()  
  }
}
class Cat {  
  sound () {    
    console.log('喵喵喵～')  
  }
}
class Dog {  
  sound () {    
    console.log('汪汪汪！')  
  }
}
class Pig {  
  sound () {    
    console.log('啂妮妮')  
  }
}
makeSound(new Cat()) // '喵喵喵～'
makeSound(new Dog()) // '汪汪汪！'
makeSound(new Pig()) // '啂妮妮'