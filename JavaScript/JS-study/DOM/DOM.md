# Welcome to DOM

> **DOM可以理解为一个访问或操作HTML各种标签的实现标准**

DOM的工作模式是：先加载文档的静态内容、再以动态方式对它们进行刷新，动态刷新不影响文档的静态内容。

PS：IE 中的所有 DOM 对象都是以 COM 对象的形式实现的，这意味着 IE 中的 DOM可能会和其他浏览器有一定的差异。

## Node 接口

> 特性/方法类型/返回类型说明

- nodeName	String	节点的名字；根据节点的类型而定义
- nodeValue	String	节点的值；根据节点的类型而定义
- nodeType	Number	节点的类型常量值之一
- ownerDocument	Document	返回某元素的根元素
- firstChild	Node	指向在childNodes列表中的第一个节点
- lastChild	Node	指向在childNodes列表中的最后一个节点
- childNodes	NodeList	所有子节点的列表
- previousSibling	Node	返回选定节点的上一个同级节点，若不存在，则返回null
- nextSibling	Node	返回被选节点的下一个同级节点，若不存在，则返回null
- hasChildNodes()	Boolean	如果当前元素节点拥有子节点，返回true，否则返回false
- attributes	NamedNodeMap	返回包含被选节点属性的 NamedNodeMap
- appendChild(node)	node	将node添加到childNodes的末尾
- removeChild(node)	node	从childNodes中删除node
- replaceChild(newnode, oldnode)	Node	将childNodes中的oldnode替换成newnode
- insertBefore	Node	在已有子节点之前插入新的子节点
- firstChild 相当于 childNodes[0]；lastChild 相当于childNodes[box.childNodes.length - 1]。

### nodeType返回结点的类型

- 元素结点返回1
- 属性结点返回2
- 文本结点返回3 

### innerHTML 和 nodeValue

对于文本节点，nodeValue 属性包含文本。
对于属性节点，nodeValue 属性包含属性值。
nodeValue 属性对于文档节点和元素节点是不可用的。

**两者区别**:

```js
box.childNodes[0].nodeValue = "<strong>abc</strong>";//结果为：<strong>abc</strong>
abcbox.innerHTML = "<strong>abc</strong>";//结果为：abc
```

### nodeName属性获得结点名称

- 对于元素结点返回的是标记名称,如：`<a herf><a>`返回的是"a"
- 对于属性结点返回的是属性名称,如：`class="test"` 返回的是test
- 对于文本结点返回的是文本的内容

**tagName**:

- document.getElementByTagName(tagName)：返回一个数组，包含对这些结点的引用
- getElementsByTagName()方法将返回一个对象数组 HTMLCollection(NodeList)，这个数组保存着所有相同元素名的节点列表。

- document.getElementsByTagName("*");//获取所有元素

> PS：IE 浏览器在使用通配符的时候，会把文档最开始的 html 的规范声明当作第一个元素节点。

- document.getElementsByTagName("li");//获取所有 li 元素，返回数组
- document.getElementsByTagName("li")[0];//获取第一个 li 元素，HTMLLIElement
- document.getElementsByTagName("li").item(0);//获取第一个 li 元素，HTMLLIElement
- document.getElementsByTagName("li").length;//获取所有 li 元素的数目

### 节点的绝对引用：

- 返回文档的根节点：document.documentElement
- 返回当前文档中被击活的标签节点：document.activeElement
- 返回鼠标移出的源节点：event.fromElement
- 返回鼠标移入的源节点：event.toElement
- 返回激活事件的源节点：event.srcElement
- 节点的相对引用：(设当前对节点为node)
- 返回父节点：node.parentNode || node.parentElement（IE）
- 返回子节点集合（包含文本节点及标签节点）：node.childNodes
- 返回子标签节点集合：node.children
- 返回子文本节点集合：node.textNodes
- 返回第一个子节点：node.firstChild
- 返回最后一个子节点：node.lastChild
- 返回同属下一个节点：node.nextSibling
- 返回同属上一个节点：node.previousSibling 

### 节点信息

- 是否包含某节点：node.contains()
- 是否有子节点node.hasChildNodes()

**创建新节点**:

- createDocumentFragment()－－创建文档碎片节点
- createElement(tagname)－－创建标签名为tagname的元素
- createTextNode(text)－－创建包含文本text的文本节点

### 获取鼠标点击事件的位置

```js
document.onclick = mouseClick;

function mouseClick(ev){
    ev = ev || window.event;//window.event用来兼容IE
    var x = 0; var y = 0;

    if(ev.pageX){
        x = ev.pageX;
        y = ev.pageY;
    }else if(ev.clientX){
        var offsetX = 0 , offsetY = 0;
        if(document.documentElement.scrollLeft){
            offsetX = document.documentElement.scrollLeft;
            offsetY = document.documentElement.scrollTop;
        }else if(document.body){
            offsetX = document.body.scrollLeft;
            offsetY = document.body.scrollTop;
        }
        x = ev.clientX + offsetX;
        y = ev.clientY + offsetY;
    }
    alert("你点击的位置是 x="+ x + " y=" + y);
}
```

**以下所描述的属性在chrome和Safari** 都很给力的支持了。

**问题一**：Firefox，Chrome、Safari和IE9都是通过非标准事件的pageX和pageY属性来获取web页面的鼠标位置的。pageX/Y获取到的是触发点相对文档区域左上角距离，以页面为参考点，不随滑动条移动而变化

**问题二**：在IE 中，event 对象有 x, y 属性（事件发生的位置的 x 坐标和 y 坐标）火狐中没有。在火狐中，与event.x 等效的是 event.pageX。event.clientX 与 event.pageX 有微妙的差别（当整个页面有滚动条的时候），不过大多数时候是等效的。

offsetX:IE特有，chrome也支持。鼠标相比较于触发事件的元素的位置,以元素盒子模型的内容区域的左上角为参考点,如果有boder,可能出现负值

**问题三**：
scrollTop为滚动条向下移动的距离，所有浏览器都支持document.documentElement。

**其余参照**：http://segmentfault.com/a/1190000002559158#articleHeader11

**参照表**（+为支持，-为不支持）：

```js
offsetX/offsetY：W3C- IE+ Firefox- Opera+ Safari+ chrome+

x/y：W3C- IE+ Firefox- Opera+ Safari+ chrome+

layerX/layerY：W3C- IE- Firefox+ Opera- Safari+ chrome+

pageX/pageY：W3C- IE- Firefox+ Opera+ Safari+ chrome+

clientX/clientY：W3C+ IE+ Firefox+ Opera+ Safari+ chrome+

screenX/screenY：W3C+ IE+ Firefox+ Opera+ Safari+ chrome+
```

**查看下方DEMO**：
你会发现offsetX在Firefox下是undefined，在chrome和IE则会正常显示。

https://jsfiddle.net/f4am208m/embedded/result/

**getComputedStyle与currentStyle**:

- getComputedStyle()接受两个参数：要取得计算样式的元素和一个伪元素，如果不需要伪元素，则可以是null。然而，在IE中，并不支持- getComputedStyle，IE提供了currentStyle属性。

- getComputedStyle(obj , false ) 是支持 w3c (FF12、chrome 14、safari)：在FF新版本中只需要第一个参数，即操作对象，第二个参数写“false”也是大家通用的写法，目的是为了兼容老版本的火狐浏览器。

缺点:在标准浏览器中正常，但在IE6/7/8中不支持

```js
 window.onload=function(){
    var oBtn=document.getElementById("btn");
    var oDiv=document.getElementById("div1");

    oBtn.onclick=function(){
        //alert(oDiv.style.width); //写在样式表里无法读取，只能得到写在行内的
        //alert(getComputedStyle(oDiv).width); //适用于标准浏览器       IE6、7、8不识别
        //alert(oDiv.currentStyle.width); //适用于IE浏览器，标准浏览器不识别
        if(oDiv.currentStyle){
            alert(oDiv.currentStyle.width);
        }else{
            alert(getComputedStyle(oDiv).width);
        }

    };
};
```

**取消表单提交**:

```js
  function listenEvent(eventObj,event,eventHandler) {
    if(eventObj.addEventListener){
       eventObj.addEventListener(event,eventHandler,false);
    } else if(eventObj.attachEvent){
      event = "on" + event;
      eventObj.attachEvent(event,eventHandler);
    }else{
      eventObj["on" + event] = eventHandler;
    }
  }
  function cancelEvent(event){
    if(event.preventDefault){
      event.preventDefault();//w3c
    }else{
      event.returnValue = true;//IE 
    }
  }
  window.onload = function () {
    var form = document.forms["picker"];
    listenEvent(form,"submit",validateFields);
  };
  function validateFields(evt){
    evt = evt ? evt : window.event;
    if(invalid){
      cancelEvent(evt);
    }
  }
```

## 确定浏览器窗口的尺寸

对于主流浏览器来说，比如IE9、Firefox，Chrome和Safari，支持名为innerWidth 和 innerHeight的窗口对象属性，它返回窗口的视口区域，减去任何滚动条的大小。IE不支持innerWidth 和 innerHeight

```js
function size(){
  var w = 0, h=0;
  if(!window.innerWidth){
    w = (document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body.clientWidth);
    h = (document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.clientHeight);
  }else{
    w = window.innerWidth;
    h = window.innerHeight;
  }
  return {width:w,height:h};
}
console.log(size()); //Object { width: 1366, height: 633 }</script>
// 实用的 JavaScript 方案（涵盖所有浏览器）：

var w=window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

var h=window.innerHeight || document.documentElement.clientHeight|| document.body.clientHeight;

```

**对于 IE 6、7、8的方案如下**:

document.documentElement.clientHeight
document.documentElement.clientWidth
或者

document.body.clientHeight
document.body.clientWidth
Document对象的body属性对应HTML文档的`<body>`标签。Document对象的documentElement属性则表示 HTML文档的根节点。

## attributes 属性

attributes 属性返回该节点的属性节点集合。

```js
document.getElementById("box").attributes//NamedNodeMap
document.getElementById("box").attributes.length;//返回属性节点个数
document.getElementById("box").attributes[0]; //Attr，返回最后一个属性节点
document.getElementById("box").attributes[0].nodeType; //2，节点类型
document.getElementById("box").attributes[0].nodeValue; //属性值
document.getElementById("box").attributes["id"]; //Attr，返回属性为 id 的节点
document.getElementById("box").attributes.getNamedItem("id"); //Attr
```

### setAttribute 和 getAttribute

在IE中是不认识class属性的，需改为className属性，同样，在Firefox中，也是不认识className属性的，Firefox只认识class属性，所以通常做法如下：

```js
element.setAttribute(class, value);  //for firefox
element.setAttribute(className, value);  //for IE
```

>IE：可以使用获取常规属性的方法来获取自定义属性,也可以使用getAttribute()获取自定义属性
>Firefox：只能使用getAttribute()获取自定义属性.
>解决方法：统一通过getAttribute()获取自定义属性

```js
document.getElementById("box").getAttribute("id");//获取元素的 id 值
document.getElementById("box").id;//获取元素的 id 值
document.getElementById("box").getAttribute("mydiv");//获取元素的自定义属性值
document.getElementById("box").mydiv//获取元素的自定义属性值， IE 不支持非
document.getElementById("box").getAttribute("class");//获取元素的 class 值，IE 不支持
document.getElementById("box").getAttribute("className");//非 IE 不支持
```

> PS：在 IE7 及更低版本的IE浏览器中，使用 setAttribute()方法设置 class 和 style 属性是没有效果的，虽然 IE8 解决了这个 bug，但还是不建议使用。

removeAttribute()方法
removeAttribute()可以移除 HTML 属性。
document.getElementById("box").removeAttribute("style");//移除属性
> PS：IE6 及更低版本不支持 removeAttribute()方法。

## 跨浏览器事件Event对象

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <style type="text/css">
      #drop{
        width: 300px;
        height: 200px;
        background-color: #ff0000;
        padding: 5px;
        border: 2px solid #000000;
      }
      #item{
        width: 100px;
        height: 100px;
        background-color: #ffff00;
        padding: 5px;
        margin: 20px;
        border: 1px dashed black;
      }
      *[draggable = true]{
        -moz-user-select: none;
        -webkit-user-select: none;
        cursor: move;
      }
    </style>
</head>
<body>
<div>
    <p>将金黄色的小方块拖到红色的大方块中，不兼容IE7及以下浏览器，兼容主流浏览器！</p>
</div>
<div id="item" draggable="true"></div>
<div id="drop"></div>
<script type="text/javascript">
  function listenEvent(target,type,handler){
    if(target.addEventListener){
    //w3c
      target.addEventListener(type,handler,false);
    }else if(target.attachEvent){
      //IE
      type = "on" + type;
      target.attachEvent(type,handler);//IE
    }else{
      target["on" + type] = handler;
    }
  }
  //取消事件
  function cancelEvent(e){
    if(e.preventDefault){
      e.preventDefault();//w3c
    }else{
      e.returnValue = false;//IE
    }
  }
  //取消传递
  function cancelPropagation(e){
    if(e.stopPropagation){
      e.stopPropagation();//w3c
    }else{
      e.cancelBubble = true;//IE
    }
  }
  window.onload = function () {
    var target = document.getElementById("drop");
    listenEvent(target,"dragenter",cancelEvent);
    listenEvent(target,"dragover",dragOver);
    listenEvent(target,"drop", function (evt) {
      cancelPropagation(evt);
      evt = evt || window.event;
      evt.dataTransfer.dropEffect = "copy";
      var id = evt.dataTransfer.getData("Text");
      target.appendChild(document.getElementById(id));
    });
    var item = document.getElementById("item");
    item.setAttribute("draggable","true");
    listenEvent(item,"dragstart", function (evt) {
      evt = evt || window.event;
      evt.dataTransfer.effectAllowed = "copy";
      evt.dataTransfer.setData("Text",item.id);
    });
  };
  function dragOver(evt){
    if(evt.preventDefault) evt.preventDefault();
    evt = evt || window.event;
    evt.dataTransfer.dropEffect = "copy";
    return false;
  }
</script>
</body>
</html>
```

### dataTransfer 对象

**属性**描述

- dropEffect	设置或获取拖曳操作的类型和要显示的光标类型
- effectAllowed	设置或获取数据传送操作可应用于该对象的源元素

**方法**描述

- clearData	通过 dataTransfer 或 clipboardData 对象从剪贴板删除一种或多种数据格式
- getData	通过 dataTransfer 或 clipboardData 对象从剪贴板获取指定格式的数据
- setData	以指定格式给 dataTransfer 或 clipboardData 对象赋予数据

**HTML5拖拽的浏览器支持**:
Internet Explorer 9、Firefox、Opera 12、Chrome 以及 Safari 5 支持拖放

为了使元素可拖动，需把 draggable 属性设置为 true ：

`<img draggable="true" />`

**事件**描述

- dragstart	拖拽事件开始
- drag	在拖动操作上
- dragenter	拖动到目标上，用来决定目标是否接受放置
- dragover	拖动到目标上，用来决定给用户的反馈
- drop	放置发生
- dragleave	拖动离开目标
- dragend	拖动操作结束

上述代码的一些浏览器兼容性：

- 1.为了兼容IE，我们将`window.event`赋给 `evt`，其他浏览器则会正确将接收到的`event`对象赋给`evt`。
- 2.w3c使用addEventListener来为事件元素添加事件监听器，而IE则使用attachEvent。addEventListener为事件冒泡到的当前对象，而attachEvent是window
- 3.对于事件类型，IE需要加`on + type`属性，而其他浏览器则不用
- 4.对于阻止元素的默认事件行为，下面是w3c和IE的做法：

```js
e.preventDefault();//w3c
e.returnValue = false;//IE
```

- 5.对于取消事件传播，w3c和IE也有不同的处理机制：

```js
e.stopPropagation();//w3c
e.cancelBubble = true;//IE
```

- 跨浏览器获取目标对象

```js
//跨浏览器获取目标对象
function getTarget(ev){
    if(ev.target){//w3c
        return ev.target;
    }else if(window.event.srcElement){//IE
        return window.event.srcElement;
    }
}  
```

- 对于获取触发事件的对象，w3c和IE也有不同的做法：

```js
event.target;//w3c
event.srcElement;//IE
```

我们可以使用三目运算符来兼容他们：
`obj = event.srcElement ? event.srcElement : event.target;`

**innerText**的问题

> innerText在IE中能正常工作，但是innerText在FireFox中却不行。

```html
<p id="element"></p>
<script type="text/javascript">
if(navigator.appName.indexOf("Explorer") >-1){
  document.getElementById("element").innerText = "my text";
} else{
  document.getElementById("element").textContent = "my text";
}
</script>
```

**访问XMLHTTPRequest对象**:

```html
<script type="text/javascript">
if(window.XMLHttpRequest){
  xhr = new XMLHttpRequest(); //非IE
}else if(window.ActiveXObject){
  xhr = new ActiveXObject("Microsoft.XMLHttp");//IE
}
</script>
```

**禁止选取网页内容**
问题：  
FF需要用CSS禁止，IE用JS禁止  

解决方法：  
IE: `obj.onselectstart = function() {return false;} `
FF: `-moz-user-select:none;`

**三大不冒泡事件**
所有浏览器的focus/blur事件都不冒泡，万幸的是大部分浏览器支持focusin/focusout事件，不过可恶的firefox连这个都不支持。

IE6、7、8下 submit事件不冒泡。
IE6、7、8下 change事件要等到blur时才触发。
万恶的滚轮事件
滚轮事件的支持可谓是乱七八糟，规律如下：

IE6-11 chrome mousewheel wheelDetla 下 -120 上 120

firefox DOMMouseScroll detail 下3 上-3

firefox wheel detlaY 下3 上-3

IE9-11 wheel deltaY 下40 上-40

chrome wheel deltaY 下100 上-100  
事件委托方法
//事件委托方法  
IE：document.body.onload = inject; //Function inject()在这之前已被实现  
FF：document.body.onload = inject();   
查询操作
查询通过指的是通过一些特征字符串来找到一组元素，或者判断元素是不是满足字符串。

1. IE6/7不区分id和nam
在IE6/7下使用getElementById和getElementsByName时会同时返回id或name与给定值相同的元素。由于name通常由后端约定，因此我们在写JS时，应保证id不与name重复。

2. IE6/7不支持getElementsByClassName和querySelectorAll   
这两个函数从IE8开始支持的，因此在IE6/7下，我们实际可以用的只有getElementByTagName。

3. IE6/7不支持getElementsByTagName("*")会返回非元素节点    
要么不用*，要么自己写个函数过滤一下。

4. IE8下querySelectorAll对属性选择器不友好    
几乎所有浏览器预定义的属性都有了问题，尽量使用自定义属性或者不用属性选择器。

5. IE8下querySelectorAll不支持伪类    
有时候伪类是很好用，IE8并不支持，jquery提供的:first、:last、:even、:odd、:eq、:nth、:lt、:gt并不是伪类，我们在任何时间都不要使用它们。

6. IE9的matches函数不能处理不在DOM树上的元素
只要元素不在dom树上，一定会返回false，实在不行把元素丢在body里面匹配完了再删掉吧，当然了我们也可以自己写匹配函数以避免回流。    
to be continued...

资料参考：
http://w3help.org/zh-cn/kb/，
http://www.zhihu.com/question/29072028

- [DOM 详解](http://www.cnblogs.com/season-huang/p/4322451.html)

![](http://i.imgur.com/3vNA0NJ.jpg)
