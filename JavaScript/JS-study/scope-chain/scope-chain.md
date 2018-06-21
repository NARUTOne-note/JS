### Welcome to Scope Chain

> JavaScript中的函数运行在它们被定义的作用域里,而不是它们被执行的作用域里。

- [深入理解JavaScript系列（14）：作用域链(Scope Chain)](http://www.cnblogs.com/tomxu/archive/2012/01/18/2312463.html)

- [javascript 执行环境，变量对象，作用域链](https://segmentfault.com/a/1190000000533094)

### 概念

- EC(执行环境或者执行上下文，Execution Context)
- ECS(执行环境栈Execution Context Stack)
- VO(变量对象，Variable Object)|AO(活动对象，Active Object)
- scope chain(作用域链)和[[scope]]属性

```js
exampelEC={
  Scope:[
    f2Context.AO+f2.[[scope]],
    f1.context.AO+f1.[[scope]],
    globalContext.VO
  ]
}
```

**总结**
- EC分为两个阶段，进入执行上下文和执行代码。
- ECStack管理EC的压栈和出栈。
- 每个EC对应一个作用域链Scope，VO|AO（AO，VO只能有一个），this。
- 函数EC中的Scope在进入函数EC时创建，用来有序访问该EC对象AO中的变量和函数。
- 函数EC中的AO在进入函数EC时，确定了Arguments对象的属性；在执行函数EC时，其它变量属性具体化。
- 函数的[[scope]]属性在函数创建时就已经确定，并保持不变。

