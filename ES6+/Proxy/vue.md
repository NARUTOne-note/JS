# Vue 响应式

> Vue对于数据的响应式经历了主要两次的变革

[参考](https://juejin.im/post/6844904122479542285?utm_source=gold_browser_extension)

- V2的 `Object.defineProperty`: 确认key；get/set

```js
let vm = new Vue({
  data() {
    return {
        a: 1
    }
  },
  watch: {
    b() {
      console.log('change !!')
    }
  }
})

// ❌  oops，没反应！
vm.b = 2

```

- V3的 `Proxy`: 任意key; 更多操作符

```js
// 响应式数据
const data = reactive({
  count: 1
})

// 观测变化
effect(() => console.log('count changed', data.count))

// 触发 console.log('count changed', data.count) 重新执行
data.count = 2

```
