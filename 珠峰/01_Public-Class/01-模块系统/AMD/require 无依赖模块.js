// Edited on 20190624

// define 声明模块 通过 require 使用一个模块

/* 注释:
 * - (1)、 把每个 factory 工厂回调函数赋值给 factories 对象下动态属性名 moduleName 所代
 *      表的属性名 (tip: 此处就为 name 和 age)。赋值之后的代码为:
 *      + ```javascript
 *          let factories = {
 *              name: function() {return "珠峰培训";},
 *              age: function() {return 9;}
 *          }
 *        ```
 * - (2)、Array.map(): 对数组中的每一项运行给定函数，返回每次函数调用的结果组成的数组。
 *      + ```javascript
 *          let numbers = [1, 3, 4, 5, 6, 8, 7, 9];
 *          let operation = numbers.map(function(item, index, array) {
 *              return item * 2;
 *          })
 *          console.log(operation);
 *        ```
 *
 */



let factories = {};

// 参数: 模块的名，依赖，工厂函数
function define(moduleName, dependencies, factory) {
    // (1)
    factories[moduleName] = factory;
}

function require(mods, callback){
    // mod: name, age
    // (2)
    let result = mods.map(function(mod) {
        let factory = factories[mod];
        let exports;
        exports = factory();
        return exports;

        // 上面四行可以简写为: return factories[mod]();
    });
    console.log("result: ", result);
    callback.apply(null, result);
}


define("name", [], function() {
    return "珠峰培训"
});

define("age", [], function() {
    return 9;
});

require(["name", "age"], function(name, age) {
    // 珠峰培训 9
    console.log(name, age);
});
