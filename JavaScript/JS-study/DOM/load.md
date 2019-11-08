# DOM 监听

> 页面DOM监听 [https://hijiangtao.github.io/2017/08/03/How-to-Manipulate-DOM-Effectively/](https://hijiangtao.github.io/2017/08/03/How-to-Manipulate-DOM-Effectively/)

## load 类似事件

- **DOMContentLoaded**: 当初始HTML文档被完全加载和解析时，DOMContentLoaded 事件被触发，而无需等待样式表、图像和子框架完成加载；
- **readystatechange**: 一个document 的 Document.readyState 属性描述了文档的加载状态，当这个状态发生了变化，就会触发该事件；
- **load**: 当一个资源及其依赖资源已完成加载时，将触发load事件；
- **beforeunload**: 当浏览器窗口，文档或其资源将要卸载时，会触发beforeunload事件。
- **unload**: 当文档或一个子资源正在被卸载时, 触发 unload事件。

## 页面DOM发生变动

- **DOMSubtreeModified**: 在DOM结构发生任何变化的时候。这个事件在其他事件触发后都会触发；
- **DOMNodeRemoved**: 在节点从其父节点中移除时触发；
- **DOMNodeInsertedIntoDocument**: 在一个节点被直接插入文档或通过子树间接插入文档之后触发。这个事件在 DOMNodeInserted 之后触发；
- **DOMNodeRemovedFromDocument**: 在一个节点被直接从文档移除或通过子树间接从文档移除之前触发。这个事件在 DOMNodeRemoved 之后触发；
- **DOMAttrModified**: 在特性被修改之后触发；
- **DOMCharacterDataModified**: 在文本节点的值发生变化时触发；

## MutationObserver

[http://javascript.ruanyifeng.com/dom/mutationobserver.html](http://javascript.ruanyifeng.com/dom/mutationobserver.html)

> 专门用于DOM监听; 能在某个范围内的DOM树发生变化时作出适当反应的能力.该API设计用来替换掉在DOM3事件规范中引入的Mutation事件.

```js
let observer = new MutationObserver(callback);
let article = document.body;

let  options = {
  'childList': true,
  'attributes':true
} ;

observer.observe(article, options);
```
