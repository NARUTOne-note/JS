# window [Global]

> 浏览器，核心全局对象

所有全局下声明的变量，均为window下的属性和方法。不能使用delete进行删除

```js
var age = 24;
window.sex = '男';

// IE < 9 error; 其他false
delete window.age;

// IE < 9 error; 其他 true
delete window.sex;

console.log(window.age); // 24
console.log(window.sex); // undefined

```

## 窗口框架frame

> **重要事项**：您不能与 `<frameset></frameset>` 标签一起使用 `<body></body>` 标签。不过，如果您需要为不支持框架的浏览器添加一个 `<noframes>` 标签，请务必将此标签放置在 `<body></body>` 标签中！

**跨域**: frame/iframe访问

- 动态创建script
- 使用document.domain

```html
<!-- morningstar.com/parent.html -->
<iframe id="ifr" src="http://test.morningstar.com/MarketBarometer/html/test.html" width="200px"></iframe>
<script>document.domain = 'morningstar.com';
functionaa(str){
    console.log(str);
}
window.onload = function(){
    document.getElementById('ifr').contentWindow.bb('aaa');
}
</script>
<!--test.morningstar.com/test.html --><script>document.domain = 'morningstar.com';
functionbb(str){
    console.log(str);
}

parent.aa('bbb');
</script>
```

- 使用HTML5新属性postMessage

```js
<!-- qsstage.morningstar.com.com/parent.html --><iframeid="ifr"src="http://bar.com/b.html"></iframe><script>window.onload = function(){
    var ifr = document.querySelector('#ifr');
    ifr.contentWindow.postMessage({a: 1}, '*');
}
window.addEventListener('message', function(e){
    console.log('bar say: '+e.data);
}, false);
</script>
<!-- test.com/test.html -->
window.addEventListener('message', function(e){
    console.log('foo say: ' + e.data.a);
    e.source.postMessage('get', '*');
}, false)
```

- 利用iframe和location.hash

```html
<!-- chart.com/parent.html -->
<iframe id="test1" src="http://test.com/test.html" width="100%" height="200px"></iframe>
    <script>
        function callback(data) {
            console.log(data);
        }
    </script>
```

```html
<!-- chart.com/poxy.html -->
<script type="text/javascript">
        window.onload = function () {
            var data = location.hash.substr(1);
            data = eval("(" + decodeURIComponent(data) + ")");
            top.document.getElementById("test1").style.height = data.height + 'px';
            //调用父页面方法，可不写
            top.callback(data);
        }
    </script
```

```html
<!-- test.com/child.html -->
 <div style="height:400px">
        <p>我是子页面</p>
    </div>
    <script type="text/javascript">
        window.onload = function () {
            if (!document.getElementById("crossFrame")) {
                var iframe = document.createElement('iframe');
                iframe.setAttribute('style', 'width:100%');
                iframe.setAttribute('src', 'http://chart.com/poxy.html');
                var height = document.documentElement.scrollHeight;
                var data = '{height:' + height + '}';
                //通过参数传递高度heights
                iframe.src = 'http://chart.com/poxy.html#' + data;
                document.body.appendChild(iframe);
            } else {
                document.getElementById("crossFrame").src = url;
            }
        }
    </script>
```

```html
<!--iframe 是在html页面内嵌入框架框架内可以连接另一个页面-->  
<html>  
<head></head>  
<body>  
<iframe src="xxx.html"></iframe>  
</body>  
</html>
  
<!--frameset在一个页面中设置一个或多个框架,不能嵌套在body标签里-->  
<html>  
<head></head>  
<frameset>  
<frame src=""></frame>  
<frame src=""></frame>  
</frameset>  
</html>  
```

- 1.在任何html页面中(window.self == window)，self和window都是获取当前窗口自身的window对象。

- 2.top用来获取最顶层的窗口对象，而parent只是获取当前窗口的父窗口。如果当前窗口是最顶层的窗口，那么window.parent == window.top == window.self。如果a.html-->b.html-->c,html通过<frameset>或者<iframe>形成了层次关系，那么在c.html中，window.parent获取的是b.html的窗口，window.top获取的是a.html的窗口。

- 3.通过<a>打开的页面和原来页面之前没有这种父子关系。