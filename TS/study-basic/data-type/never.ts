// never 是指没法正常结束返回的类型，一个必定会报错或者死循环的函数会返回这样的类型
interface Foo {
  type: 'foo'
}

interface Bar {
  type: 'bar'
}

interface Baz {
  type: 'baz'
}

type All = Foo | Bar | Baz;

function handleValue(val: All) {
  switch (val.type) {
    case 'foo':
      // 这里 val 被收窄为 Foo
      break
    case 'bar':
      // val 在这里是 Bar
      break
    default:
      // val 在这里本来是 never, All新增了Baz类型，但是这块忘了加上Baz的逻辑，导致default类型判断报错
      const exhaustiveCheck: never = val
      break
  }
}
