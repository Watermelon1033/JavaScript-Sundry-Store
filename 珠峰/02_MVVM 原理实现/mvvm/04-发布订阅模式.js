// 发布订阅模式

// Dependence 收集订阅者 和 通知发布
function Dep() {
    this.subs = [];
}
// - addSub 方法负责收集订阅者，收集的订阅者是 Watcher 构造函数的实例。
Dep.prototype.addSub = function(fn) {
    this.subs.push(fn);
};
Dep.prototype.notify = function() {
    // - notify 就是通知发布，那么怎么发布呢? A: forEach 循环 subs 数组收集到的
    //   Watcher 构造函数的实例，实例调用原型上的 update 方法。
    this.subs.forEach(sub => sub.update())
};


// - 订阅者构造函数，我们默认规定每个构造函数的实例都有一个 update 方法,
//   构造函数 Watcher 收到的 fn 为一个添加的订阅者
function Watcher(fn) {
    this.fn = fn;
}
// - update 方法的目的就是执行构造函数实例传入的订阅者
Watcher.prototype.update = function() {
    this.fn();
}
let watcher = new Watcher(function() {
    console.log("我是一个订阅者");
});


let dep = new Dep();
dep.addSub(watcher);
dep.addSub(watcher);
console.log(dep.subs);
dep.notify();
