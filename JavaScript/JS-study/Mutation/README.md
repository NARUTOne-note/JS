# MutationObserver

> MutationObserver接口提供了监视对DOM树所做更改的能力

- [MutationObserver MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver)
- [ResizeObserver MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/ResizeObserver)
- [参考 link](https://juejin.im/post/5c26d01a6fb9a049b07d6ce2)

```JS
let MutationObserver = window.MutationObserver ||
                      window.WebKitMutationObserver ||
                      window.MozMutationObserver

var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        console.log(mutation.type);
      })
    })

// 选择目标节点
var target = document.querySelector('#some-id');

// 配置观察选项:
var config = { attributes: true, childList: true, characterData: true }

// 传入目标节点和观察选项
observer.observe(target, config);

// 随后,你还可以停止观察
observer.disconnect();

```
