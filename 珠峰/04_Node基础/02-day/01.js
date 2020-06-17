console.log("Start");
console.log("End");

// - 在文件中打印 this 并不是 global 属性, node 自带模块化功能, 一个 js 文件就是
//   一个模块, 模块 this 不是 global (闭包)
console.log(this);  // {}

// - global - 全局变量
// Object [global] {
//   global: [Circular],
//   clearInterval: [Function: clearInterval],
//   clearTimeout: [Function: clearTimeout],
//   setInterval: [Function: setInterval],
//   setTimeout: [Function: setTimeout] { [Symbol(util.promisify.custom)]: [Function] },
//   queueMicrotask: [Function: queueMicrotask],
//   clearImmediate: [Function: clearImmediate],
//   setImmediate: [Function: setImmediate] {
//     [Symbol(util.promisify.custom)]: [Function]
//   }
// }
console.log(global);

// - 在 WebStorm 中配置环境变量
//     + (1) 在命令行中给当前即将运行额文件添加 process.env.NODE_ENV 属性; 在命令行
//       中进入当前文件所在的文件夹内, 然后设置:
//          - Mac: export NODE_ENV=dev  (Tip: 等号左右不能加空格)
//          - Windows: set NODE_ENV=dev
//     + (2) 在 WebStorm 中设置环境变量: 打开当前文件, 点击右上角 `01.js` 后的下三角,
//       然后点击 `Edit Configurations...`, 然后在单前弹框中,点击左侧的 "01.js"
//       文件名, 看到右侧的 `Environment variables:` 点击后面的 ... 按钮, 在弹出的
//       弹框中点击 `+` 号, 添加 `NODE_ENV`: `dev` --> apply 后点击确定, 即可.
console.log(process.env.NODE_ENV);
let url = "";
if (process.env.NODE_ENV === "dev") {
    url = "http://localhost:3000";
} else {
    url = "www.baidu.com";
}
console.log(url);


// - process.nextTick() : 下一个队列
process.nextTick(function() {

});