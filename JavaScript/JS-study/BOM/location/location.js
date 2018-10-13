/**
 * location操作
 */

// 打开新页

window.location = 'http://www.baidu.com';
location.href = 'http://www.baidu.com';
// 等价显示调用assign
location.assign('http://www.baidu.com');

// 修改其他属性也能改变当前页

location.hash = '#hash';  // http://www.baidu.com/#hash

location.search = '?q=123';  // http://www.baidu.com?q=123

location.hostname = 'www.yahoo.com'; // http://www.yahoo.com

location.pathname = 'mydir'; // http://www.baidu.com/mydir/

location.host = '8080'; //http://www.baidu.com:8080


// 以上均会产生新记录  push


location.replace('http://www.baidu.com'); // 不会产生新纪录，替换当前

// 重加载

location.reload(); // 有可能从缓存
location.reload(true); // 从服务器重新加载