## RegExp 学习

> :smile:

### perl 语法

```
var reg = /pattern/flags ;
```

- g: 全局
- i: 不区分大小写
- m: 多行匹配

**匹配元字符**
>需要进行 \ 转义
```
( [ { \ ^ $ | ? * + .}])
```

```
//匹配以ad结尾的3个字符的组合
var reg = /.ad/gi ;
```

### RegExp 语法

```
var reg = new RegExp('pattern', 'flags');
```
> 俩参数均为字符串string,所以需要进行双重转义 \\ 
