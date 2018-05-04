## JS 黑科技 :ghost:

- [黑科技 一](https://zhuanlan.zhihu.com/p/28937831)


### YOU KNOW ?

![](https://i.imgur.com/8pa1Rvd.png)

```
parseInt(0.0000008) === 8 // true
```

```
[].forEach.call($$("*"),function(a){
    a.style.outline="1px solid #"+(~~(Math.random()*(1<<24))).toString(16)
})
```

:grin:

```
try {
    something
} catch (e) {
    window.location.href =
        "http://stackoverflow.com/search?q=[js]+" +
        e.message;
}
```

**匿名自执行**

>这么多写法你选择哪一种？我选择死亡。

```
( function() {}() );
( function() {} )();
[ function() {}() ];

~ function() {}();
! function() {}();
+ function() {}();
- function() {}();

delete function() {}();
typeof function() {}();
void function() {}();
new function() {}();
new function() {};

var f = function() {}();

1, function() {}();
1 ^ function() {}();
1 > function() {}();
// ...
```

**逗号运算符**

```
var a = 0; 
var b = ( a++, 99 ); 
console.log(a);  // 1
console.log(b);  // 99
```

**论如何最佳的让两个整数交换数值**
常规办法：
```
var a=1,b=2;
a += b;
b = a - b;
a -= b;
```

缺点也很明显，整型数据溢出，对于32位字符最大表示数字是2147483647，如果是2147483645和2147483646交换就失败了。

黑科技办法：
```
a ^= b;
b ^= a;
a ^= b;
```

**arguments 转 数组**

```
var argArray = Array.prototype.slice.call(arguments);

或者ES6：

var argArray = Array.from(arguments)

```