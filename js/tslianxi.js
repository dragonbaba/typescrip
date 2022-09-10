"use strict";
let obj;
obj = { name: 'zhangsan', age: 20 };
let func;
func = function (a, b) {
    return a + b;
};
var A;
(function (A) {
    A.a = 1;
})(A || (A = {}));
