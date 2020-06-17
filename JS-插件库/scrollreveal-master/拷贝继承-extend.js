/** Create on 2018-1-17 */
"use strict";

function Tools () {}

Tools.prototype.isObject = function (obj) {
    return obj !== null && obj === "object" && obj.constructor === "Object";
};

// 检测元素是不是 Node 节点， 这里只能检测单个节点，如果是一组节点列表走下面的 isNodeList 方法
Tools.prototype.isNode = function (obj) {
    /*
     *     确定一个值是哪种基本类型可以使用 typeof 操作符，而确定一个值是哪种引用类型可以使用 instanceof 操作符。
     *
     *     DOM1 级定义了一个 Node 接口，该接口将由 DOM 中的所有节点类型实现.这个 Node 接口在 JavaScript 中
     * 是作为 Node 类型实现的；除了 IE 之外，在其他所有浏览器中都可以访问到这个类型。JavaScript 中的所有节点
     * 类型都继承自 Node 类型，因此所有节点类型都共享着相同的基本属性和方法。 --《js高程》 (10.1.1 Node 类型)
     *
     */
    // 利用 typeof 操作符确定 window.Node 是 object 类型就直接走第一个运算，否走第二个运算
    // console.log(typeof window.Node === "function");   // true
    // console.log(typeof window.Node === "object");     // false
    return typeof window.Node === "object" ? obj instanceof window.Node :
        obj && typeof obj.nodeType === "number" && typeof  obj.nodeName === "string";
};

Tools.prototype.isNodeList = function (obj) {
    var prototypeToString = Object.prototype.toString.call(obj);
};

Tools.prototype.forOwn = function (obj, callback) {
    // for () {}
};

