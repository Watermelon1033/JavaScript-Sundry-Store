let fs = require("fs");
function req(moduleName) {
    // content 是读取的文件内容
    let content = fs.readFileSync(moduleName, "utf8");
    // 最后一个参数是函数的内容体
    let fn = new Function("exports", "module", "require",
                    "__dirname", "__filename", content + "\n return module.exports");
    let module = {
        exports: {}
    };
    // (1)
    return fn(module.exports, module, req, __dirname, __filename);
}
let str = req("./a.js");
console.log("str: ", str);


/*
 * - (1) return 返回的内容就是这样的
 *      + ```function (exports, module, require, __dirname, __filename) {
 *              module.exports = "commonjs 的实现原理";
 *              return module.exports;
 *        }```
 *
 *
 */
