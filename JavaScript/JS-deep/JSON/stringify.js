/**
 * JSON 序列化字符串
 * JSON.stringify()
 * @link https://juejin.im/post/5decf09de51d45584d238319?utm_source=gold_browser_extension
 */

// 更新属性名

const todayILearn = {
  _id: 1,
  content: '今天学习 JSON.stringify()，我很开心！',
  created_at: 'Mon Nov 25 2019 14:03:55 GMT+0800 (中国标准时间)',
  updated_at: 'Mon Nov 25 2019 16:03:55 GMT+0800 (中国标准时间)'
}

const mapObj = {
  _id: "id",
  created_at: "createdAt",
  updated_at: "updatedAt"
};
JSON.parse(
  JSON.stringify(todayILearn).replace(
    /_id|created_at|updated_at/gi,
    matched => mapObj[matched]
  )
);


/**
 * ! 特殊字符
 * * undefined、任意的函数以及 symbol 作为对象属性值时 JSON.stringify() 将跳过（忽略）对它们进行序列化
 * * undefined、任意的函数以及 symbol 作为数组元素值时，JSON.stringify() 会将它们序列化为 null
 * * undefined、任意的函数以及 symbol 被 JSON.stringify() 作为单独的值进行序列化时，都会返回 undefined
 * * NaN 和 Infinity 格式的数值及 null 都会被当做 null
 * * 所有以 symbol 为属性键的属性都会被完全忽略掉，即便 replacer 参数中强制指定包含了它们。
 */

const data = {
  a: "aaa",
  b: undefined,
  c: Symbol("dd"),
  fn: function() {
    return true;
  }
};
JSON.stringify(data); // {"a":"aaa"}

JSON.stringify(["aaa", undefined, function aa() {
  return true
}, Symbol('dd')])  // "["aaa",null,null,null]"

JSON.stringify(function a (){console.log('a')}) // undefined

JSON.stringify(NaN)
// "null"
JSON.stringify(null)
// "null"
JSON.stringify(Infinity)
// "null"

JSON.stringify({ [Symbol.for("json")]: "stringify" }, function(k, v) {
  if (typeof k === "symbol") {
    return v;
  }
}) // undefined

/**
 * ! 非数组对象属性序列化后乱序
 */

const data = {
  a: "aaa",
  b: undefined,
  c: Symbol("dd"),
  fn: function() {
    return true;
  }
};
JSON.stringify(data); // {"a":"aaa"}

/**
 * ! toJSON函数
 * * 转换值如果有 toJSON() 函数，该函数返回什么值，序列化结果就是什么值，并且忽略其他属性的值。
 */

JSON.stringify({
  say: "hello JSON.stringify",
  toJSON: function() {
    return "today i learn";
  }
})
// "today i learn"

/**
 * ! Date对象
 * * 序列化Date对象
 * 实际上 Date 对象自己部署了 toJSON() 方法（同Date.toISOString()），因此 Date 对象会被当做字符串处理。
 */

JSON.stringify({ now: new Date() });
// "{"now":"2019-12-08T07:42:11.973Z"}"

/**
 * ! 基本类型
 * * 布尔值、数字、字符串的包装对象在序列化过程中会自动转换成对应的原始值。
 */

JSON.stringify([new Number(1), new String("false"), new Boolean(false)]);
// "[1,"false",false]"

/**
 * ! 对象属性可枚举
 * * 其他类型的对象，包括 Map/Set/WeakMap/WeakSet，仅会序列化可枚举的属性
 */

// 不可枚举的属性默认会被忽略：
JSON.stringify( 
  Object.create(
      null, 
      { 
          x: { value: 'json', enumerable: false }, 
          y: { value: 'stringify', enumerable: true } 
      }
  )
);
// "{"y":"stringify"}"

/**
 * ! 深拷贝
 * * 循环引用，函数等问题
 */

// 对包含循环引用的对象（对象之间相互引用，形成无限循环）执行此方法，会抛出错误。 
const obj = {
  name: "loopObj"
};
const loopObj = {
  obj
};
// 对象之间形成循环引用，形成闭环
obj.loopObj = loopObj;
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}
deepClone(obj)
/**
 VM44:9 Uncaught TypeError: Converting circular structure to JSON
    --> starting at object with constructor 'Object'
    |     property 'loopObj' -> object with constructor 'Object'
    --- property 'obj' closes the circle
    at JSON.stringify (<anonymous>)
    at deepClone (<anonymous>:9:26)
    at <anonymous>:11:13
 */

/**
 * ! 强大的第二个参数 replacer
 * * 函数：它有两个参数，键（key）和值（value），函数类似就是数组方法 map、filter 等方法的回调函数，对每一个属性值都会执行一次该函数
 * * 数组：数组的值代表将被序列化成 JSON 字符串的属性名。
 */

const data = {
  a: "aaa",
  b: undefined,
  c: Symbol("dd"),
  fn: function() {
    return true;
  }
};
// 不用 replacer 参数时
JSON.stringify(data); 

// "{"a":"aaa"}"
// 使用 replacer 参数作为函数时
JSON.stringify(data, (key, value) => {
  switch (true) {
    case typeof value === "undefined":
      return "undefined";
    case typeof value === "symbol":
      return value.toString();
    case typeof value === "function":
      return value.toString();
    default:
      break;
  }
  return value;
})
// "{"a":"aaa","b":"undefined","c":"Symbol(dd)","fn":"function() {\n    return true;\n  }"}"

const jsonObj = {
  name: "JSON.stringify",
  params: "obj,replacer,space"
};

// 只保留 params 属性的值
JSON.stringify(jsonObj, ["params"]);
// "{"params":"obj,replacer,space"}" 


// ? 需要注意的是，replacer 被传入的函数时，第一个参数不是对象的第一个键值对，而是空字符串作为 key 值，value 值是整个对象的键值对：

const data = {
  a: 2,
  b: 3,
  c: 4,
  d: 5
};
JSON.stringify(data, (key, value) => {
  console.log(value);
  return value;
})
// 第一个被传入 replacer 函数的是 {"":{a: 2, b: 3, c: 4, d: 5}}
// {a: 2, b: 3, c: 4, d: 5}   
// 2
// 3
// 4
// 5

/**
 * ! 排版的第三个参数 space
 * * space 参数用来控制结果字符串里面的间距
 * \t、 \n 等缩进能让输出更加格式化
 * * 如果是一个数字, 则在字符串化时每一级别会比上一级别缩进多这个数字值的空格（最多10个空格）；
 * * 如果是一个字符串，则每一级别会比上一级别多缩进该字符串（或该字符串的前10个字符）
 */

const tiedan = {
  name: "弹铁蛋同学",
  describe: "今天在学 JSON.stringify()",
  emotion: "like shit"
};
JSON.stringify(tiedan, null, "🐷");
// 接下来是输出结果
// "{
// 🐷"name": "弹铁蛋同学",
// 🐷"describe": "今天在学 JSON.stringify()",
// 🐷"emotion": "like shit"
// }"
JSON.stringify(tiedan, null, 2);
// "{
//   "name": "弹铁蛋同学",
//   "describe": "今天在学 JSON.stringify()",
//   "emotion": "like shit"
// }"
