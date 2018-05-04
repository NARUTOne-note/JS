/**
 * 创建对象
 */

// 工厂模式

 function CreatObject(name, age) {

  var object = new Object();

  object.name = name;
  object.age = age;
  //函数名其实是指向对象的引用
  //会调用外面的方法
  object.get = get;
  return object;
}
//定义对象方法：在构建对象时传入参数
function get() {
   alert(this.name + ":" + this.age)
}

var object = new CreatObject("旺财", "10");
object.get();

// 构造函数

 function Person(name, age)
{
    this.name = name;
    this.age = age;

    this.get = function()
    {
        alert(this.name + ": " + this.age);
    }
}

var obj1 = new Person("李四", 30);
obj1.get();