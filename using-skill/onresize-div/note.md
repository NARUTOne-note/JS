# on-resize

> 一版都知道 window.onresize是监听window大小size变化，有时需要监听某个容器div或canvas的resize变化，这时就需要间接监听了。

对于div的resize事件的监听，实现方式有很多，比如周期性检查，通过scroll事件等等，本文主要介绍通过object元素来实现监听。

## object元素监听

**ie9-10**
默认支持div的resize事件，可以直接通过div.attachEvent('onresize', handler);的方式实现

**其它浏览器**
通过在div中添加一个内置object元素实现监听。

- 设置object元素的style使其填充满div，这样当div的size发生变化时，object的size也会发生变化。
- 然后监听object元素的contentDocument.defaultView(window对象)的resize事件。

> 在resize时，可能会连续快速的触发(比如拖动浏览器)，为了提高效率，可以考虑使用批处理的模式。
