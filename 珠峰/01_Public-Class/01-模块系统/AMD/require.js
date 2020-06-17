/** AMD 规范的实现 */
// Edited on 20190624

// 什么是工厂函数？ A: 工厂函数是一个最后返回值是对象的函数，但它既不是类，也不是构造函数。
// 在 JavaScript 中，任何函数都可以返回一个对象。但当函数没有使用 new 关键字时，那它便
// 是一个工厂函数。


let factories = {};

// 参数: 模块的名，依赖模块，工厂函数
function define(moduleName, dependencies, factory) {
    // 被 define() 调用时传入的
    factories[moduleName] = factory;

    // 将依赖模块赋值给 factory 工厂函数的 dependencies 自定义属性上。
    factory.dependencies = dependencies;
}

function require(mods, callback){
    let result = mods.map(function(mod) {
        let factory = factories[mod];
        let exports;
        // 即取得 age 的依赖模块 ["name"]
        let dependencies = factory.dependencies;
        // 取到依赖的模块我们还是要拿到依赖模块里的值，所以此时就需要在内部执行一次 require()
        require(dependencies, function() {
           exports = factory.apply(null, arguments);
        });
        return exports;
    });
    callback.apply(null, result);
}


// define 声明模块 通过 require 使用一个模块
define("name", [], function() {
    return "珠峰培训"
});
// age 模块依赖了 name 模块
define("age", ["name"], function(name) {
    return name+9;
});

require(["age"], function(age) {
    // 珠峰培训9
    console.log(age);
});
