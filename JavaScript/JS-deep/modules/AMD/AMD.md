### Welcome to AMD

>异步模块定义规范（AMD）制定了定义模块的规则，这样模块和模块的依赖可以被异步加载。
这和浏览器的异步加载模块的环境刚好适应（浏览器同步加载模块会导致性能、可用性、调试和跨域访问等问题）。

## define() 函数

本规范只定义了一个函数 "define"，它是全局变量。函数的描述为：

    define(id?, dependencies?, factory);


- [AMD中文文档](https://github.com/amdjs/amdjs-api/wiki/AMD-(%E4%B8%AD%E6%96%87%E7%89%88))
