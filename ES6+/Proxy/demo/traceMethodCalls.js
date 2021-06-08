/**
 * proxy 拦截方法 属性
 */

function tracePropAccess(obj, propKeys) {
  const propKeySet = new Set(propKeys);
  return new Proxy(obj, {
    get(target, propKey, receiver) {
      if (propKeySet.has(propKey)) {
        console.log("GET " + propKey);
      }
      return Reflect.get(target, propKey, receiver);
    },
    set(target, propKey, value, receiver) {
      if (propKeySet.has(propKey)) {
        console.log("SET " + propKey + "=" + value);
      }
      return Reflect.set(target, propKey, value, receiver);
    },
  });
}

function traceMethodCalls(obj) {
  const handler = {
    get(target, propKey, receiver) {
      const origMethod = target[propKey]; // 获取原始方法
      return function (...args) {
        const result = origMethod.apply(this, args);
        console.log(
          propKey + JSON.stringify(args) + " -> " + JSON.stringify(result)
        );
        return result;
      };
    },
  };
  return new Proxy(obj, handler);
}


const man = {
  name: "semlinker",
};
const tracedMan = tracePropAccess(man, ["name"]);

console.log(tracedMan.name); // GET name; semlinker
console.log(tracedMan.age); // undefined
tracedMan.name = "kakuqo"; // SET name=kakuqo


const obj = {
  multiply(x, y) {
    return x * y;
  },
};

const tracedObj = traceMethodCalls(obj);
tracedObj.multiply(2, 5); // multiply[2,5] -> 10
