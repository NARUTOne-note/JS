# location

> 提供当前窗口加载文档的信息, 还将URL解析为独立的片段。

location是一个很特别的对象**window.location, document.location**

[window.location](https://developer.mozilla.org/en-US/docs/Web/API/Window/location)


## 属性

- hash  ,  #contents  ,  返回URL中hash(#后更0/n个字符), 若没有，返回空字符串
- host , www.wrox.com:80,  服务器名称和端口号
- hostname, www.wrox.com, 服务器名称
- href  , location.toString()  http://www.wrox.com   , 返回完整URL
- pathname   , /wenjianname/   ,  返回URL中的目录和（或）文件名
- port 端口
- protocol,  http  协议
- search   ?q=123  返回URL查询字符串
