# 正则储备

## 随记  

^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S{8,20}$   //8-20位字母、数字、非空字符组合，缺陷中文

^(?![a-zA-Z]+$)(?![0-9]+$)(?![\u4e00-\u9fa5])[^\s]{8,20}$  //8-20位字母、数字、非空字符组合,缺陷纯字符

^(?=[\x21-\x7e]+)[^A-Za-z0-9\s]*$  //非空字符

^([1-9]\d{0,}|0)([.]{1}[0-9]{1}){0,1}$   //整数 小数 输入

/[\u4e00-\u9fa5]+/   中文

/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/  一般邮箱

^1(3[0-9]|4[57]|5[0-35-9]|7[01678]|8[0-9])\d{8}$  手机号

^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$ 电话

1，得到网页上的链接地址：
string matchString = @"<a[^>]+href=\s*(?:'(?<href>^']+)'|""(?<href>[^""]+)""|(?<href>[^>\s]+))\s*[^>]*>";
2，得到网页的标题：
string matchString = @"<title>(?<title>.*)</title>";
3，去掉网页中的所有的html标记：
string temp = Regex.Replace(html, "<[^>]*>", ""); //html是一个要去除html标记的文档
4, string matchString = @"<title>([\S\s\t]*?)</title>";
5, js去掉所有html标记的函数：
functiondelHtmlTag(str)
{
      return str.replace(/<[^>]+>/g,"");//去掉所有的html标记
}
6. 统计字数
t = $('.remarktext').html().replace(/<[^>]+>/g,"").length;

## 黑科技趣闻

- [一行能装逼的JavaScript代码](http://www.jfh.com/jfperiodical/article/3224)
