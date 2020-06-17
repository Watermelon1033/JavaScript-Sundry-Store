/*** Created on 2017/1/24.*/

/**
 (21, 94):       定义了一些变量和函数 jQuery = function(){};
 (96, 283):      给jQuery对象，添加一些方法和属性
 (285, 347):     extend: jQuery对象的继承方法
 (349, 817):     jQuery.extend(): 扩展一些工具方法
 (877, 2856):    Sizzle: 复杂选择器的实现
 (2880, 3042):   Callbacks: 回调对象: 对函数的统一管理
 (3043, 3183):   Deferred:  延迟对象: 对异步的统一管理
 (3184, 3295):   support:   功能检测:
 (3380, 3652):   data():    数据缓存:
 (3653, 3797):   queue(), dequeue(): 队列管理(用的最多的就是运动效果)
 (3803, 4299):   attr(), prop(), val(), addClass()等: 对元素属性的操作
 (4300, 5128):   on(), trigger(): 事件操作的相关方法
 (5140, 6057):   DOM操作:  添加 删除 获取 包装(wrap), DOM筛选(innerHTML, find)
 (6058, 6620):   css() : 样式的操作
 (6621, 7854):   提交的数据和ajax()操作: ajax(), load(), getJson(), getScript()等
 (7855, 8584):   animate(): 运动的方法
 (8585, 8792):   offset():  位置和尺寸的方法
 (8804, 8821):   jq支持模块化的方式
 (8826): window.jQuery = window.$ = jQuery;
 **/

//自调用的匿名函数:创建一个私有的命名空间，不破坏全局命名空间
(function(window, undefined){
    var rootjQuery, //document的引用
        readyList,  //延时对象使用
        core_strundefined = typeof undefined, // typeof操作符检测一个值是哪种基本类型(P82)

        location = window.location,   //下面这三个获取正确的window属性，以减少查找次数，
        document = window.document,   // 并且存储变量对压缩很有意义
        docElem = document.documentElement,

        _jQuery = window.jQuery, //保存jQuery变量,以防止被覆盖
        _$ = window.$,

        /*class2Type存储的是js语言内部的数据类型，不包括外部宿主环境提供的类型:
         javascript变量可保存两种类型的值：基本类型值和引用类型值。
         (1.) 基本类型的值源自以下5种基本数据类型： Undefined、Null、Boolean、Number和String 。
         (2.) 引用类型包含: Object类型、Array类型、Data类型、RegExp类型、Function类型、
         基本包装类型(Boolean类型、Number类型、String类型)、
         单体内置对象(Global对象、Math对象)*/
        /* class2type定义一个对象, 在下面的方法 $.type()中会用到，调用方法之后最终形式为: class2type =
         {'[Object String]':'string', '[Object Array]':'array'}。做类型判断，两个类型，所以是2
         */
        class2type = {},
        core_deletedIds = [], // 旧版本的ID删除，在2.0之后的新版本只做为数组方法引用
        core_version = "2.0.3",

        //一些数组核心方法的引用
        core_concat = core_deletedIds.concat,   //数组合并方法
        core_push = core_deletedIds.push,       //数组的推入方法(插入数组方法)
        core_slice = core_deletedIds.slice,     //切割数组(在这里多用于将集合转换为数组)
        core_indexOf = core_deletedIds.indexOf, //返回元素在数组中的下标，不存在返回 -1
        core_toString = class2type.toString,    //返回对象的原始字符串表示
        /*(高程:第六章)hasOwnProperty() 方法可以检测一个属性是存在于实例中还是存在于原型中,这个方法
         （不要忘了它是从 Object 继承来的）只在给定属性存在于对象实例中时，才会返回 true */
        core_hasOwn = class2type.hasOwnProperty, //判断一个对象是否含有你给出名称的属性或对象
        core_trim = core_version.trim,           //去除字符串前后空格, IE6-8不支持

        //jQuery函数: $()、jQuery()返回对象:
        jQuery = function(selector, context){
            /*jQuery对象实际上是init构造函数的引用: 为什么会这样说呢？ 因为此函数中真正调用的构造函数是:
             jQuery.fn.init(),所以说jQuery函数(js中函数也是对象)是init构造函数的一个引用,这里也就间接的说明，
             每当你用$()/jQuery()的时候，都会直接调用一次jQuery.fn.init()构造函数
             */
            return new jQuery.fn.init(selector, context, rootjQuery);
        },

        /* core_pnum:      正则数字匹配
         * core_rnotwhite: 正则单词匹配
         * rquickExpr：    正则标签匹配(是否为HTML标签或ID)(防止XSS木马注入)
         * rsingleTag：    用于匹配单独的一个标签，例如<div></div>、<a></a>
         * rmsPrefix:      正则匹配IE下转换ms
         * rdashAlpha:     正则匹配转换大写、数字
         * fcamelCase:     转驼峰回调函数
         * completed:      DOM触发成功时回调函数
         */

        /*正则特殊字符:
         1. \b: 匹配一个单词的边界位置。    2. \B: 匹配一个单词的非边界位置
         3. \d: 匹配0-9的任何数字。       4. \D: 匹配任何非数字字符
         5. \s: 匹配一个空白字符。         6. \S: 匹配一个非空白字符
         7. \w: 匹配字母、数字、下划线。    8. \w: 匹配除了字母、数字、下划线之外的字符。
         9. * : 匹配前面元字符0次或多次。  10.  ? :匹配前面的元字符0次或1次
         11. (): 捕获型分组。            12. (?:) 非捕获型分组
         */

        /* 1. /[+-]?：用来匹配正负号，正号或负号可以出现一次，也可以不出现
         2. (?:\d*\.|)：用来匹配类似1.2，.444，0.444这样的数字。(?:pattern)表示一个非捕获分组，意思是不进行存储供以后使用。
         \d*\.匹配小数点前面有零个或多个数字的情况。最后是|，后面接的是空，表示也就是表示这个(?:\d*\.|)这个非捕获分组可以进行匹配，如果匹配失败则匹配空。
         3. \d+：用来匹配一个或多个数字。
         4. (?:[eE][+-]?\d+|):这也是一个非捕获分组，用来匹配科学计数法的指数部分，类似e2，e-2，E+23，这样的字符串。
         最后的|也表示这个非捕获分组可以进行匹配，如果匹配失败则匹配空。
         整个正则表达的意思就是可以同时匹配小数和科学计数法两种计数模式。
         */
        core_pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,  //匹配数字

        core_rnotwhite = /\S+/g,                                   //匹配单词(+:匹配前面元字符一次或多次)


        /* 1. \s* 用来匹配一个到多个空格。
         2. (<[\w\W]+>)：用来匹配HTML标签的，比如 <div>， <DIV>, <span>类似的
         3.  [^>]*：用来匹配除>之外的任意字符，0个到多个。
         4.  #([\w-]*)用来匹配带上#的任意字符，包括连字符-与下划线_。
         */
        rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,        //标签匹配(检测是否为HTML标签或ID)

        //\1是捕获前面的(\w+)分组
        rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,    //用于匹配单独的一个标签，例如<div></div>、<a></a>,如果是多标签就不行

        /* 比如jQuery中有些样式会转化：比如
         margin-left：marginLeft
         -webkit-margin-left:webkitMarginLeft
         但是IE里他会首字母就大写的：
         -ms-margin-left:MsMarginLeft  (此处只做演示)
         */
        rmsPrefix = /^-ms-/,
        rdashAlpha = /-([\da-z])/gi, // 找到"-和字符"转换为大小写 如果 margin-left : marginLeft

        //转驼峰回调函数
        fcamelCase = function(all, letter){
            return letter.toUpperCase();
        },

        //DOM触发成功时回调函数
        completed = function(){
            /*当触发DOMContentLoaded事件或者load事件时执行该处理程序,执行之后就调用工具方法jQuery.ready()方法
             把我们自定义的需要在DOM加载完成之后执行的匿名函数添加到延迟队列当中准备执行 */
            document.removeEventListener("DOMContentLoaded", completed, false);
            window.removeEventListener("load", completed, false);
            jQuery.ready();
        };

    /*给jQuery的原型添加一些公共方法，【另外一篇注释上说，这些是挂载在jQuery实例对象上的核心方法】这里我很是不能理解，
     明明是添加在jQuery的prototype上，怎么就变成了添加到是实例上了呢？？? 所以我还是坚持认为是添加到原型上的。 */
    /** 给 jQuery.prototype 添加的公共方法和属性
     1. jquery        查看版本号
     2. init()        实例化jquery对象 (初始化和参数管理)
     3. selector      选择符    (存储选择字符串)
     4. length        jquery对象的元素长度  (this对象的长度)
     5. toArray()     jquery对象转化成数组
     6. get()         通过索引获取jquery对象中的DOM元素 (转原生集合)
     7. pushStack()   添加DOM到jquery的栈中
     8. each()        遍历jQuery对象中的DOM元素执行回调  (遍历集合)
     9. ready()       文档加载后执行函数 (DOM加载的借口)
     10. slice()      截取指定的DOM元素 (集合的截取)
     11. first()      返回第一个DOM元素 (集合的第一项)
     12. last()       返回最后一个DOM元素  (集合的最后一项)
     13. eq()         返回指定索引的元素  (集合的指定项)
     14. map()        映射jquery对象DOM元素 (返回新集合)
     15. end()        取出压入栈的jquery对象 (返回集合前一个状态)
     16. push()       (内部使用)
     17. sort()       (内部使用)
     18. splice()     (内部使用)
     **/
    jQuery.fn = jQuery.prototype = {
        jquery: core_version,  //jQuery当前版本号
        constructor: jQuery,   //修正重写prototype导致的构造函数丢失

        /*init[初始化和参数的管理]根据传入的参数的类型做出不同的处理，如DOM对象，字符串，
         数组对象与NodeList这样的类数组对象转换成jQuery对象，如果是函数，则改成DOM加载。*/
        //selector:选择符， context:选择元素的上下文
        init: function(selector, context, rootjQuery){ //rootjQuery内部使用的参数
            var match, elem;

            //这里判断传入的选择符(selector)是: $(""), $(null), $(undefined), $(false)这种错误情况
            /**一级if判断三个中的第 1 个**/
            if(!selector){
                return this;
            }

            /** 下面对 selector选择符(selector:可能是字符串,数组，函数，对象等)进行分类检查，不同类型不同处理:
             selector可能的类型如下:
             (1.) string类型:  a.没有context上下文的情况。 b. 有context的情况
             (2.) 直接一个 DOM Element 元素类型
             (3.) 函数 function 类型
             (4.) 类数组对象类型
             (5.) 数组类型
             **/
            /**一级if判断三个中的第 2 个**/
            /*判断 传入的选择符selector是字符串的情况*/
            if(typeof selector === "string") {

                /**二级if判断 -- 1**/
                /* 此处匹配的情况为: 1. $("<li>"), 2.$("<li>1</li><li>2</li>")
                 match = [null, "<li>", null];
                 match = [null, "<li>1</li><li>2</li>", null];
                 */
                //快速查找，假设字符串的开始和结束是< >这样的形式，并且长度大于3
                if (selector.charAt(0) === "<" && selector.charAt(selector.length - 1) === ">" && selector.length > 3) {
                    //如果字符串就是一个html的标签，跳过正则匹配，直接放入到匹配集合中
                    match = [null, selector, null];  //match在init()方法的第一行有声明
                } else {
                    /*此处匹配的情况为: 1. $("#div1")  2. $("<li>hello") :此处写法等于 $("<li>")的写法
                     match = ["#div1", null, "div1"]      // $("#div1")
                     match = ["<li>hello", "<li>", null]  // $("<li>hello")

                     匹配不到的情况为: match = null; //$(".box"), $("div") $("#div1 div.box")
                     这几种匹配不到的情况，都走了jq实现中最复杂的写法
                     */
                    match = rquickExpr.exec(selector); //具体示例见: jq语法讲解具体示例.html
                    /* console.log(rquickExpr.exec("<li>hello"));      // [ "<li>hello", "<li>", undefined ]
                     console.log(rquickExpr.exec("<li>hello</li>")); // [ "<li>hello</li>", "<li>hello</li>", undefined ]
                     console.log(rquickExpr.exec("#div1"));          // [ "#div1", undefined, "div1" ]
                     console.log(rquickExpr.exec("li"));             // null
                     */
                }

                /**二级if判断 -- 2**/
                //符合条件且不存在所谓的上下文: 从上面可以看出,match存在，match[1]也存在那一定是<li>这种标签
                //能进入这个if的只有 标签($("<li>")) 和 id($("#div1"))
                if(match && (match[1] || !context)){
                    /**三级if判断 ~~ 1**/
                    /*1. 处理$("html"): 处理html字符串 */
                    if(match[1]){
                        //instanceof : 确定一个值是属于哪种引用类型。 检测context是否为jQuery对象的一个实例，
                        //是(返回DOM对象)， 否(返回自身)
                        context = context instanceof jQuery ? context[0] : context;

                        //jQuery.merge是合并两个对象或数组，把后面一个的所有属性都存放到第一个对象中
                        jQuery.merge(this, jQuery.parseHTML(
                            match[1],
                            /* ownerDocument是Node对象的一个属性，返回的是某个元素的根节点文档对象即document对象
                             documentElement是Document对象的属性，返回的文档的根节点<html> */
                            context && context.nodeType ? context.ownerDocument || context : document,
                            true
                        ));
                        /**四级if判断 : 为简单的创建标签**/
                        /*创建元素节点的另外一种方法，但是这种创建方式有所限制，比如html标签只能包含标签，中间不能包含
                         文本和其他标签，只能是一堆标签或单个的标签，第二个参数是一个对象字面量形式的对象，用来修饰通过
                         标签创建的元素。事件的添加时通过on属性添加事件对象，如果直接添加事件处理程序，在这些直接添加的
                         事件处理程序内部同样调用的事实例对象的on方法，进行事件处理程序的注册。
                         $("<button></button>", {
                         text: "click",
                         on: {
                         click: function(event){
                         console.log(1111);
                         }
                         }
                         })
                         */
                        /*匹配的示例为: $("<li></li>", {title: "hi", html: "abcd"}).appendTo("ul")*/
                        if(rsingleTag.test(match[1]) && jQuery.isPlainObject(context)){
                            for(match in context){
                                /**五级if判断**/
                                //如果添加的属性在实例对象上含有对应的属性方法，直接调用属性方法应用属性
                                if(jQuery.isFunction(this[match])){
                                    this[match](context[match]);
                                }else {
                                    //如果只是简单的属性，通过attr方法来设置属性
                                    this.attr(match, context[match]);
                                }
                            }
                        }
                        //创建的html标签被添加到了this中，并且可以通过索引来访问
                        return this;

                    }
                    else{
                        /* 2. 处理id字符串: HANDLE: $(#id) */
                        elem = document.getElementById(match[2]);
                        /**四级if判断**/
                        if(elem && elem.parentNode){
                            this.length = 1;
                            this[0] = elem;
                        }
                        this.context = document;
                        this.selector = selector;
                        return this;
                    }
                }
                else if(!context || context.jquery){
                    /*3. 处理复杂的字符串。 : 如果程序走到这里，说明selector是上面无法解析的字符串，使用
                     更加强大的sizzle引擎来查找*/
                    return(context || rootjQuery).find(selector);

                }else{
                    return this.constructor(context).find(selector);
                }
            }
            /* 4.处理Node类型的节点 $(DOMElement) */
            else if(selector.nodeType){
                this.context = this[0] = selector;
                this.length = 1;
                return false;
            }
            /* 5.处理函数类型$(function), 等价于ready */
            else if(jQuery.isFunction(selector)){
                return rootjQuery.ready(selector);
            }

            /**一级if判断三个中的第 3 个**/
            //最后一种匹配的情况为: $([]), $({}), $($("#div1"))
            if(selector.selector !== undefined){
                this.selector = selector.selector;
                this.context = selector.context;
            }

            //把第一个参数的值添加到第二个参数的数组里面
            return jQuery.makeArray(selector, this);
        },

        selector: "",
        length: 0,

        //把jq对象转换为真正的数组对象: 见 jq语法讲解具体示例.html
        toArray : function(){
            return core_slice.call(this);
        },

        //通过索引获取jQuery中的对象，如果没有给定索引，返回全部的jquery对象
        get: function(num){
            return num == null ? this.toArray() : (num < 0 ? this[this.length +num] : this[num]);
        },

        //jQuery中的入栈
        pushStack: function(elems){
            /* merge()方法的第一个参数为什么是 this.constructor()? : 由于在开始
             jQuery = function(selector, context){
             return new jQuery.fn.init(selector, context, rootjQuery);
             }
             这里调用jQuery构造函数，实际上是通过调用jQuery.fn.init()构造函数来实现的，所以
             this.constructor()方法应该返回的是一个空白的init()构造函数的空实例对象。把elems转
             化为数组添加到新创建的空jQuery对象当中。然后保存当前的jquery对象为新对象的prevObject
             属性当中。等于推入栈中。最后返回的是新创建的jquery对象。
             */
            var ret = jQuery.merge(this.constructor(), elems);
            //把当前的上下文环境压入到栈中，等到需要的时候调用end方法取出。
            ret.prevObject = this;
            //保持上下文环境
            ret.context = this.context;
            return ret;
        },

        /* 遍历集合 : 对于匹配列表中的每一个元素执行回调函数。在each的循环当中想要停止循环回调，
         只需要返回false即可停止循环。callback的参数为索引值，元素本身。  */
        each: function(callback, args){
            return jQuery.each(this, callback, args); //内部调用的是工具方法each()实现的
        },

        //DOM加载的接口
        ready: function(fn){
            jQuery.ready.promise().done(fn);
        },

        /* 集合的截取: 先使用Array.prototype.slice方法从对象实例中切割取出指定的元素，然后把选取出来
         的元素放到新建的纯净的jquery对象中，把原来的jquery对象入栈， 从jquery对象中选取出指定
         数目的元素  */
        slice: function(){
            return this.pushStack(core_slice.apply(this, arguments));
        },

        //集合的第一项
        first: function(){
            return this.eq(0);
        },

        //集合的最后一项
        last: function(){
            return this.eq(-1);
        },

        //集合的指定项
        eq: function(i){
            var len = this.length,
                j = +i + (i < 0 ? len : 0);
            return this.pushStack(j >= 0 && j<len ? [this[j]] : []);
        },

        /*返回新集合: 实例对象jQuery中的回调函数的参数为位置索引与值。
         工具方法的map参数则是元素的值和位置索引  */
        map: function(callback){
            //jQuery.map()第一个参数:是数组中取出来的元素，第二个参数为取出来的元素的索引值。
            //在回调函数中this的值为全局对象
            return this.pushStack(jQuery.map(this, function(elem, i){
                //回调函数的参数一般都先是索引值，后是索引对应的元素。
                //过滤方法对应的则是元素和索引值。
                return callback.call(elem, i, elem);
            }))
        },

        //返回集合前一个状态
        end: function(){
            return this.prevObject || this.constructor(null);
        },

        push: core_push,
        sort: [].sort,
        splice: [].splice
    };

    //jQuery中无new实例化最关键的一句,把jQuery构造函数的原型赋值给init构造函数的原型，完成从init实例到jQuery实例的转变
    jQuery.fn.init.prototype = jQuery.fn;

    //jQuery中的继承: "拷贝继承" : 把多个对象的内容添加到第一个对象中去
    jQuery.extend = jQuery.fn.extend = function(){
        var options, name, src, copy, copyIsArray, clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;
        //处理深拷贝
            // 深拷贝的示例:
            //     var a = {
            //         name: "Wang",
            //         age: 28
            //     };
            //     var b = {
            //         sex: "male",
            //         age: 29
            //     };
            // $.extend(true, a, b);
            // console.log(a);  //{ name: "Wang", age: 29, sex: "male" }
        if(typeof target === "boolean"){  //如果第一项target等于boolean值
            deep = target;                //把target赋值给deep此时deep = true
            target = arguments[1] || {};  //然后把第二项赋值给target
            i = 2;
        }

        //处理目标对象为5中基本类型: 即当target不是对象也不是函数时，就强制把target设置为空对象
        if( typeof target !== "object" && jQuery.isFunction(target)){
            target = {};
        }

        //当参数只有一个时，拓展jQuery本身
            // 具体示例为:
            //     $.extend({
            //         'niceNav': function (time) {
            //             time = typeof time === 'number' ? time : 400;
            //             var $lis = $('.tradeRecord ul li'),
            //                 $h = $('#addSelectedBg');
            //             $lis.hover(function () {
            //                 $h.stop().animate({
            //                     'left': $(this).offsetParent().context.offsetLeft
            //                 }, time);
            //             })
            //         }
            //     });
        if(length === i){
            target = this;
            --i;
        }
    };



    jQuery.extend({
        /**
         expando : 生成唯一jQ字符串(内部)
         noConflict(): 防止冲突
         isReady : DOM是否加载完(内部)
         readyWait: 等待多少文件的计数器(内部)
         holdReady(): 推迟DOM触发
         ready(): 准备DOM触发
         isFunction() : 是否为函数
         isArray() : 是否为数组
         isWindow() : 是否为window
         isNumeric() : 是否为数字
         type() :  判断数据类型
         isPlainObject() : 是否为对象字面量
         isEmptyObject() : 是否为空的对象
         error() :  抛出异常
         parseHTML() :  解析节点
         parseJSON() :  解析JSON
         parseXML() :  解析XML
         noop() :  空函数
         globalEval() :  全局解析JS
         camelCase() : 转驼峰
         nodeName() : 是否为指定节点名(内部)
         each() : 遍历集合
         trim() : 去前后空格
         makeArray() : 类数组转真数组
         inArray() : 数组版 indexOf
         merge() : 合并数组
         grep() :   过滤新数组/'grep/
         map() :  映射新数组
         guid :  唯一标识符(内部)
         proxy() :  改this指向
         access() : 多功能值操作(内部)
         now() :   当前时间
         swap() :  css交换(内部)

         jQuery.ready.promise = function(){}; 监测 DOM的异步操作(内部)
         function isArraylike(){} 类似数组的判断(内部)
         **/
    });

})(window);