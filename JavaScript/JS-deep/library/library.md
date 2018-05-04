### Welcome to JavaScript library

- [web页面模板引擎](http://blog.jobbole.com/56689/)

### 初步想法

```js
var TemplateEngine = function(tpl, data) {
    // magic here ...
}
var template = '<p>Hello, my name is <%name%>. I\'m <%age%> years old.</p>';
console.log(TemplateEngine(template, {
    name: "Krasimir",
    age: 29
}));
```

**正则匹配**
```js
var re = /<%([^%>]+)?%>/g;
var match = re.exec(tpl);
```
console打印出来
```js
[
    "<%name%>",
    " name ", 
    index: 21,
    input: 
    "<p>Hello, my name is <%name%>. I\'m <%age%> years old.</p>"
]
```

改进，打印所有匹配项
```js
var re = /<%([^%>]+)?%>/g;
while(match = re.exec(tpl)) {
    console.log(match);
}
```

**变量替换**

```js
var TemplateEngine = function(tpl, data) {
    var re = /<%([^%>]+)?%>/g;
    while(match = re.exec(tpl)) {
        tpl = tpl.replace(match[0], data[match[1]])
    }
    return tpl;
}
```
>数据data格式固定，对复杂格式不匹配。

改进，模板中使用javascript语法进行匹配

```js
//预期
var template = 
'My skills:' + 
'<%for(var index in this.skills) {%>' + 
'<a href=""><%this.skills[index]%></a>' +
'<%}%>';
```

```js
//引例，函数创建
var fn = new Function("arg", "console.log(arg + 1);");
//等价于
var fn = function(arg) {
    console.log(arg + 1);
}
fn(2);
```

利用数组分开，最后拼接。
```js
var r = [];
r.push('My skills:'); 
for(var index in this.skills) {
r.push('<a href="">');
r.push(this.skills[index]);
r.push('</a>');
}
return r.join('');
```

成果
```js
var TemplateEngine = function(tpl, data) {
    var re = /<%([^%>]+)?%>/g,
        code = 'var r=[];\n',
        cursor = 0; //游标
	  var add = function(line, js) {
	    js? code += 'r.push(' + line + ');\n' :
	        code += 'r.push("' + line.replace(/"/g, '\\"') + '");\n';
		}
		while(match = re.exec(tpl)) {
		    add(tpl.slice(cursor, match.index));
		    add(match[1], true); // <-- say that this is actually valid js
		    cursor = match.index + match[0].length;
		}
    add(tpl.substr(cursor, tpl.length - cursor));
    code += 'return r.join("");'; // <-- return the result
    console.log(code);
//  return tpl;
    return new Function(code.replace(/[\r\t\n]/g, '')).apply(data);
}
var template = '<p>Hello, my name is <%this.name%>. I\'m <%this.profile.age%> years old.</p>';
console.log(TemplateEngine(template, {
    name: "Krasimir Tsonev",
    profile: { age: 29 }
}));
```

console打印结果
```js
var r=[];
r.push("<p>Hello, my name is ");
r.push(this.name);
r.push(". I'm ");
r.push(this.profile.age);
return r.join("");
```

**问题**

```js
var template = 
'My skills:' + 
'<%for(var index in this.skills) {%>' + 
'<a href="#"><%this.skills[index]%></a>' +
'<%}%>';
console.log(TemplateEngine(template, {
    skills: ["js", "html", "css"]
}));

```
打印结果
```js
var r=[];
r.push("My skills:");
r.push(for(var index in this.skills) {);
r.push("<a href=\"\">");
r.push(this.skills[index]);
r.push("</a>");
r.push(});
r.push("");
return r.join("");
```

增加循环、条件判断正则
```js
var re = /<%([^%>]+)?%>/g,
    reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g,
    code = 'var r=[];\n',
    cursor = 0;
var add = function(line, js) {
    js? code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n' :
        code += 'r.push("' + line.replace(/"/g, '\\"') + '");\n';
}
```

### 结果

```js
var TemplateEngine = function(html, options) {
    var re = /<%([^%>]+)?%>/g, reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g, code = 'var r=[];\n', cursor = 0;
    var add = function(line, js) {
        js? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n') :
            (code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
        return add;
    }
    while(match = re.exec(html)) {
        add(html.slice(cursor, match.index))(match[1], true);
        cursor = match.index + match[0].length;
    }
    add(html.substr(cursor, html.length - cursor));
    code += 'return r.join("");';
    return new Function(code.replace(/[\r\t\n]/g, '')).apply(options);
}
```