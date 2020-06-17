(function(window, undefined){
    var jQuery = (function(){
        var jQuery = function(selector, context){
            return new jQuery.fn.init(selector, context, rootjQuery);
        };
        //一堆局部变量声明
        jQuery.fn = jQuery.prototype = {
            constructor: jQuery,
            init: function(selector, context, rootjQuery){
                //一堆原型属性和方法
            }
        };
        jQuery.fn.init.prototype = jQuery.fn;
        jQuery.extend = jQuery.fn.extend = function(){
            /**jQuery中的继承叫做 “拷贝继承”**/
            var options, name, src, copy, copyIsArray, clone,
                target = arguments[0] || {},
                i = 1,
                length = arguments.length,
                deep = false;
        };
        jQuery.extend({
            //一堆静态属性和方法
        });
        return jQuery;
    })();

    // 工具方法 Utilities  /juː'tɪlɪtɪ/ 实用
    // 回调函数列表 Callbacks Object
    // 异步队列 Deferred Object
    // 浏览器功能检测 Support
    // 数据缓存 Data
    // 队列 Queue
    // 属性操作 Attributes
    // 事件系统 Events
    // 选择器 Sizzle
    // DOM遍历  Traversing
    // DOM操作 Manipulation
    // 样式操作 CSS(计算样式，内联样式)
    // 异步请求 Ajax
    // 动画 Effects
    // 坐标 offset  尺寸 Dimensions

    window.jQuery = window.$ = jQuery;
})(window);
