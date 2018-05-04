/**
 * JS 异步编程 示例
 * 不能执行
 * @author NARUTOne
 * @date 2017/08/31
 */

// 1、回调函数 示例

var fn = function(callback) {
    // do something here
    ...
    setTimeout(function() {
			callback.apply(this, this.arguments);
    }, 300)
}
 
var mycallback = function(parameter) {
    // do someting in customer callback
}
 
// call the fn with callback as parameter
fn(mycallback);

///2、setTimeout异步 示例

setTimeout(function(){
    console.log("this will be exectued after 1 second!");
},1000);

var start = new Date()
setTimeout(function(){
  var end = new Date()

  console.log(end - start)
},500)

while(new Date - start<1000){

}

// 3、类事件监听 采用 jquery on() trigger()

function f1(){
　setTimeout(function () {
　// f1的任务代码
　　f1.trigger('done');   //触发事件
　}, 1000);
}

f1.on('done', mycallback);

// 4、发布订阅 jquery.subscribe  

function f2() {
  console.log('hello world!')
}

jQuery.subscribe("done", f2);

function f1(){
　setTimeout(function () {
　// f1的任务代码
　　jQuery.publish("done");
　}, 1000);
}
 
jQuery.unsubscribe("done", f2);


// 5、高阶函数

function fn(str1) {
  return function(str2) {
    return str1 + str2;
  }
}

fn('hello')('world');

// 6、promise , ES6

function timeout(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms, 'done');
  });
}

timeout(100).then((value) => {
  console.log(value);
});


var p1 = Promise.resolve( 42 );
var p2 = Promise.resolve( "Hello World" );
var p3 = Promise.reject( "Oops" );

Promise.race( [p1,p2,p3] )
.then( function(msg){
	console.log( msg );		// 42
} );

Promise.all( [p1,p2,p3] )
.catch( function(err){
	console.error( err );	// "Oops"
} );

Promise.all( [p1,p2] )
.then( function(msgs){
	console.log( msgs );	// [42,"Hello World"]
} );


// 7、Generator ES6

function* gen(x){
  try {
    var y = yield x + 2;
  } catch (e){ 
    console.log(e);
  }
  return y;
}
var g = gen(1);
g.next(); // 3
g.throw（'出错了'）;// 出错了

// 8、async/await  ES7

var sleep = function (time) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve();
        }, time);
    })
};
var start = async function () {
    // 在这里使用起来就像同步代码那样直观
    console.log('start');
    await sleep(3000);
    console.log('end');
};
start()