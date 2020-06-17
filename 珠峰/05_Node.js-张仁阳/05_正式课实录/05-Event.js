// - events 模块
let EventEmitter = require('./events');
// - util 核心模块
let util = require('js-sundry-goods/珠峰/05_Node.js-张仁阳/05_正式课实录/util');

// - 使用 events
function Bell() {
    EventEmitter.call(this);
}

// - 继承原型
// - Node.js 的 util.js 文件中是使用:
//   `Object.setPropertyOf(ctor.prototype, superCtor.prototype);` 来实现的,
//   也等于下面这中写法: `ctor.prototype.__proto__ = superCtor.prototype;`
util.inherits(Bell, EventEmitter);

let bell = new Bell();
function studentInClassroom(roomNumber, book) {
    console.log(`学生带着 ${book} 进 ${roomNumber} 教室`);
}
function teachInClassroom(roomNumber, book) {
    console.log(`老师带着 ${book} 进 ${roomNumber} 教室`);
}
function jiaTeachInClassroom(roomNumber, book) {
    console.log(`贾老师带着 ${book} 进 ${roomNumber} 教室`);
}

bell.on('铃响', studentInClassroom);
bell.on('铃响', teachInClassroom);
bell.once('铃响', jiaTeachInClassroom);

// - 第一个参数是事件类型，第二个及以后的函数参数会传递给监听函数
bell.emit('铃响', '301', '书');
console.log('========= ========= =========');
bell.emit('铃响', '301', '书');
