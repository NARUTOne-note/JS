/**
 * 模块扩展
 */

// observable.ts stays the same
// map.ts
import { Observable } from "./observable";
declare module "./observable" {
    interface Observable<T> {
        map<U>(f: (x: T) => U): any;
    }
}

Observable.prototype.map = function (f) {
    // ... another exercise for the reader
}