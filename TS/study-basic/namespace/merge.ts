/**
 * 合并命名空间
 * 对于命名空间的合并，模块导出的同名接口进行合并，构成单一命名空间内含合并后的接口。

对于命名空间里值的合并，如果当前已经存在给定名字的命名空间，那么后来的命名空间的导出成员会被加到已经存在的那个模块里。

 非导出成员仅在其原有的（合并前的）命名空间内可见。这就是说合并之后，从其它命名空间合并进来的成员无法访问非导出成员。
*/

namespace Animal {
  let haveMuscles = true;

  export function animalsHaveMuscles() {
      return haveMuscles;
  }
}

namespace Animal {
  export function doAnimalsHaveMuscles() {
      return haveMuscles;  // Error, because haveMuscles is not accessible here
  }
}