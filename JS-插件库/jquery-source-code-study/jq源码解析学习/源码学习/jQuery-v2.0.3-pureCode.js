/** Created on 2017/2/27. **/

(function (window, undefined) {
    var rootjQuery;
    var readyList;
    var core_strundefined = typeof undefined;
    var location = window.location;
    var document = window.document;
    var docElem = document.documentElement;

    var _jQuery = window.jQuery;
    var _$ = window.$;

    var class2type = {};

    var core_deletedIds = [];
    var core_version = "2.0.3";

    var core_concat = core_deletedIds.concat;   // [].concat
    var core_push = core_deletedIds.push;       // [].push
    var core_slice = core_deletedIds.slice;     // [].slice
    var core_indexOf = core_deletedIds.indexOf; // [].indexOf
    var core_toString = class2type.toString;    // [].toString
    var core_hasOwn = class2type.hasOwnProperty;// [].hasOwnProperty
    var core_trim = core_version.trim;          // [].trim

    var jQuery = function (selector, context) {
        return new jQuery.fn.init(selector, context, rootjQuery);
    };

    var core_pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source; //匹配数字
    var core_rnotwhite = /\S+/g;  //分割空格
    var rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/; //匹配HTML标签和ID
    var rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/; //匹配HTML单标签
    var rmsPrefix = /^-ms-/;  //匹配-ms-前缀
    var rdashAlpha = /-([\da-z])/gi; //匹配一个数字和字母

    //转驼峰的回调函数: 2个参数: (1.)正则的整体. (2.) 正则里的子项
    // all 所指代的正则为: rdashAlpha = /-([\da-z])/gi
    var fcamelCase = function (all, letter) {
        return letter.toUpperCase();
    };

    var completed = function () {
        document.removeEventListener("DOMContentLoader", completed, false);
        window.removeEventListener("load", completed, false);
        jQuery.ready();
    };

    jQuery.fn = jQuery.prototype = {
        jquery: core_version,
        constructor: jQuery,
        init: function(selector, context, rootjQuery){
            var match;
            var elem;
            if(!selector){
                return this;
            }
            if(typeof selector === "string"){
                if(selector.charAt(0) === "<" && selector.charAt(selector.length -1) === ">" && selector.length >=3){
                    match = [null, selector, null];
                }else{
                    match = rquickExpr.exec(selector);
                }

                if(match && (match[1] || !context)){
                    if(match[1]){
                        context = context instanceof jQuery ? context[0] : context;
                        jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, true));
                        if(rsingleTag.test(match[1]) && jQuery.isPlainObject(context)){
                            if(jQuery.isFunction(this[match])){
                                this[match](context[match]);
                            }else{
                                this.attr(match, context[match]);
                            }
                        }
                        return this;
                    }else{
                        elem = document.getElementById(match[2]);
                        if(elem && elem.parentNode){
                            this.length = 1;
                            this[0] = elem;
                        }
                        this.context = document;
                        this.selector = selector;
                        return this;
                    }
                }else if(!context || context.jquery){
                    return (context || rootjQuery).find(selector);
                }else{
                    return this.constructor(context).find(selector);
                }
            }else if(jQuery.isFunction(selector)){
                return rootjQuery.ready(selector);
            }

            if(selector.selector !== undefined){
                this.selector = selector.selector;
                this.context = selector.context;
            }

            return jQuery.makeArray(selector, this);
        },

        selector: "",
        length: 0,
        toArray: function(){
            return core_slice.call(this);
        },
        get:function(num){
            return num == null ? this.toArray() : (num <0 ? this[this.length + num] : this[num]);
        },
        pushStack: function(elems){
            var ret = jQuery.merge(this.constructor(), elems);
            ret.prevObject = this;
            ret.context = this.context;
            return ret;
        },
        each: function(callback, args){
            return jQuery.each(this, callback,args);
        },
        ready: function(fn){
            jQuery.ready.promise().done(fn);
            return this;
        },
        slice: function(){
            return this.pushStack(core_slice.apply(this, arguments));
        },
        first: function(){
            return this.eq(0);
        },
        last: function(){
            return this.eq(-1);
        },
        eq: function(i){
            var len = this.length;
            var j= +i + (i<0 ? len : 0 );
            return this.pushStack(j>=0 && j<len ? [this[j]] : []);
        },
        map: function(callback){
           return this.pushStack(jQuery.map(this, function(elem, i){
               return callback.call(elem, i, elem);
           }));
        },
        end: function(){
            return this.prevObject || this.constructor(null);
        },

        push: core_push,
        sort: [].sort,
        splice: [].splice
    };

    jQuery.fn.init.prototype = jQuery.fn;
    jQuery.extend = jQuery.fn.extend = function(){
        var options, name, src, copy, copyIsArray, clone,
            //比如: $.extend(a, {name: "Hello"}, {age: 30})
            target = arguments[0] || {},
            i = 1,
            length =  arguments.length,
            deep = false;
        if(typeof target === "boolean"){ // 看是不是深拷贝情况
            deep = target;
            target = arguments[1] || {};
            i= 2;
        }
        if(typeof target !== "object" && !jQuery.isFunction(target)){ //看参数是否正确
            target = {};
        }
        if(length === i){ //看是不是插件
            target = this;
            --i;
        }
        for( ; i<length; i++){  //可能有多个对象的情况
            if((options = arguments[i] != null)){ //防止循环引用
                for(name in options){
                    src = target[name];
                    copy = options[name];
                    if(target === copy){  //防止循环引用
                        continue;
                    }
                    if(deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))){
                        if(copyIsArray){
                            copyIsArray = false;  //深拷贝
                            clone = src && jQuery.isArray(src) ? src : [];
                        }else{
                            clone = src && jQuery.isPlainObject(src) ? src : {};
                        }
                        target[name] = jQuery.extend(deep, clone, copy);
                    }else if(copy !== undefined){  //浅拷贝
                        target[name] = copy;
                    }
                }
            }
        }
        return target;
    };

    // 扩展工具方法
    /*
     jQuery.extend({
         expando:        生成唯一jq字符串(内部)
         noConflict():   防止冲突
         isReady:        DOM是否加载完(内部)
         readyWait:      等待多少文件的计数器(内部)
         holdReady():    推迟DOM触发
         ready():        准备DOM触发
         isFunction():   是否为函数
         isArray():      是否为数组
         isNumberic():   是否为数字
         type():         判断数据类型
         isPlainObject():是否为对象自变量
         isEmptyObject():是否为空对象
         error():        抛出异常
         parseHTML():    解析节点
         parseJSON():    解析JSON
         parseXML():     解析XML
         noop():         空函数
         globalEval():   全局解析JS
         camelCase():    转驼峰
         nodeName():     是否为指定节点名(内部)
         each():         遍历集合
         trim():         去前后空格
         makeArray():    类数组转真数组
         inArray():      数组版indexOf
         merge():        合并数组
         grep():         过滤新数组
         map():          映射新数组
         guid:           唯一标识符(内部)
         proxy():        改this指向
         access():       多功能值操作(内部)
         now():          当前时间
         swap():         CSS交换(内部)
     })
     */
    jQuery.extend({
        // \D: 匹配任何非数字字符。replace()方法:用第二个参数替换第一个参数，第一个参数一般是正则。
        expando: "jQuery" + (core_version + Math.random().replace(/\D/g, "")),


        // 最上面定义的两个变量:
        // var _jQuery = window.jQuery;
        // var _$ = window.$;
        noConflict: function(deep){
            if(window.$ === jQuery){
                window.$ = _$;
            }
            // deep 代表有true此参数传入
            if(deep && window.jQuery === jQuery){
                window.jQuery = _jQuery;
            }

            return jQuery;
        },

        // DOM是否加载完(内部)
        isReady: false,

        // a counter to track how many items to wait for before the ready event fires.
        // 一个计时器去跟踪执行了多少次在准备事件触发之前。记录holdRead中你hold延迟了多少次
        readyWait: 1,

        // hold (or release) the ready event 推迟DOM的触发
        holdReady: function(hold){
            if(hold){
                // 在使用时添加一个$.holdReady(true)时，readyWait就加一
                jQuery.readyWait++;
            }else{
                // 每次走这里就释放一次(释放的原理在下面的函数判断中)
                jQuery.ready(true);
            }
        },

        ready: function(wait){
            // 虽然使用时$.holdReady(false)来释放延迟，但首先要检测readyWait保存了数字几，然后一次一次的释放
            // 如果
            if(wait === true ? --jQuery.readyWait: jQuery.isReady){
                return;
            }
            jQuery.isReady = true;

            if(wait !== true && --jQuery.readyWait > 0){
                return;
            }

            readyList.resolveWith(document, [jQuery]);

            if(jQuery.fn.trigger){
                jQuery(document).trigger("ready").off("ready")}

        },

        isFunction: function(obj){
            return jQuery.type(obj) === "function";
        },

        isArray: Array.isArray,

        isWidnow: function(obj){
            return obj != null && obj === obj.window;
        },

        isNumberic: function(obj){
            return !isNaN(parseFloat(obj)) && isFinite(obj);
        },


        // 判断对象的内部js类型
        /*
            - (1.) 6种基本数据类型(也称"简单数据类型"):
                1. Undefined : Undefined类型，一个没有被赋值的变量会有一个默认值undefined.
                2. Null : Null类型只有一个值: null。
                3. Boolean : 布尔类型表示一个逻辑实体，可以有两个值: true和false
                4. Number
                5. String
                6. Symbol (ECMAScript 6新定义)
            - (2.)复杂数据类型- Object
        */
        type: function(obj){
            if(obj == null){
                return String(obj);
            }

            /* 如果传进来的对象为对象类型或者是函数类型的引用类型，调用class2type对象进行
             类型比对，返回对应的类型字符串，如果找不到对应的类型字符串，直接返回"object"
             如果对象不是对象类型也不是函数类型，而是简单的值类型，直接返回它的类型 */
            return typeof obj === "object" || typeof obj === "function" ?
                class2type[core_toString.call(obj)] || "object"  // object引用类型
                : typeof obj; // 值类型
        },

        // 检测对象是不是对象字面量
        isPlainObject: function(obj){
            // Not plain objects(任何非对象字面量的对象包括):
            // - Any object or value whose internal [[Class]] property is not "[object Object]".(任何内部属性[[Class]]不是"[object Object]"对象)
            // - DOM nodes (DOM节点)
            // - window (window对象)
            if(jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow(obj)){
                return false;
            }

            try{
                // hasOwnProperty() 方法检测一个属性是存在实例中还是在原型中。这个方法（它是从 Object 继承来的只在给定属性存在于对象实例中时才会返回 true.
                // 通过调用hasOwnProperty("isPrototypeOf")来确定对象是否是通过对象字面量创建的。只有Object对象上具有isPrototypeOf方法
                if(obj.constructor && !core_hasOwn.call(obj.constructor.prototype, "isPrototypeOf")){
                    return false;
                }
            }catch(e){
                return false;
            }
            return true;
        },

        // 是否是一个空对象，没有任何属性
        isEmptyObject: function(obj){
            var name;
            // 如果可以遍历代表里面还有属性活方法，所以返回false
            for(name in obj){
                return false;
            }
            return true;
        },

        error: function(msg){
            throw new Error(msg);
        },

        // 使用时默认的三个参数为$.parseHTML(str, document, true/false);
        parseHTML: function(data, context, keepScripts){
            if(!data || typeof data !== "string"){
                return null;
            }
            // 如果context等于true/false
            if(typeof context === "boolean"){
                //把context的值赋值给keepScripts,false赋值给context
                keepScripts = context;
                context = false;
            }
            context = context || document;

            // \w: 匹配字母，数字，下划线。  \s: 匹配一个空表字符
            // * : 匹配前面元字符0次或多次，/ba*/将匹配b,ba,baa,baaa
            // ^<(\w+\s*)>(?:<\/\1>|)$ 字符串最前面和最后面必须都是"<"或">"
            var parsed = rsingleTag.exec(data),
                // 如果keepScripts为false,取反是true && [], 如果为true取反为flase
                scripts = !keepScripts && [];

            // single tag 单标签情况
            if(parsed){
                return [ context.createElement(parsed[i]) ];
            }

            //不 是单标签，进入buildFragment函数继续处理，该方法返回html碎片。
            parsed = jQuery.buildFragment([data], context, scripts);

            if(scripts){
                jQuery(scripts).remove();
            }

            // 把生成的节点放入数组中返回，把后面元素节点的子节点集合转化为数组。
            // buildFragment方法返回的文档片段的子节点集合是组合成的节点集。
            return jQuery.merge([], parsed.childNodes);
        },

        parseJson: JSON.parse,      // 我想不出来要这个干吗

        //
        parseXML: function(data){
            var xml, tmp;
            if(!data || typeof data !== "string"){
                return null;
            }

            // support: IE9
            try{
                tmp = new DOMParser();
                xml = tmp.parseFromString(data, "text/xml");
            }catch(e){
                xml = undefined;
            }

            if(!xml || xml.getElementsByTagName("parsererror").length){
                jQuery.error("Invalid XML: " + data);
            }
            return xml;
        },

        // noop:定义一个空函数
        noop: function(){},

        // Evaluates a script in a global context 在全局上下文中执行script脚本代码
        // 把一段文本解析成脚本，利用script元素的text属性
        globalEval: function(){
            var script,
                indirect = eval;
            code = jQuery.trim(code);
            if(code){
                // 如果在序言位置含有“use strict”, 则通过将脚本注入到文档中来执行代码
                if(code){
                    if(code.indexOf("use strict") === 1){
                        script = document.createElement("script");
                        script.text = code;
                        document.head.appendChild(script).parentNode.removeChild(script);
                    }
                }else{
                    // 如果没有字符串表示，避免在DOM元素的创建，直接在全局环境中执行
                    indirect(code);
                }
            }
        },

        // \d: 匹配0-9的任何数字。 g:全局匹配，i忽略大小写
        // rdashAlpha = /-[\da-z]/gi;
        // rmsPrefix = /^-ms-/,
        camelCase: function(string){
            // 第一个replace()转换这样:  -ms-transfor -> msTransform 只转IE下这种情况
            // 第二个replace()转换:
            //      margin-top -> marginTop
            //      -moz-transform ->  MozTransform
            return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
        },

        // 是否为指定节点名(内部)
        // console.log($.nodeName(document.documentElment, "html"));
        nodeName: function(elem, name){
            return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
        },

        // each遍历集合
        each: function(obj, callback, args){
            var value,
                i = 0,
                length = obj.length,
                isArray = isArraylike(obj);
            if(args){
                if(isArray){
                    for(; i < length; i++){
                        value = callback.apply(obj[i], args);
                        if(value === false){
                            break;
                        }
                    }
                }else{
                    for(i in obj){
                        value = callback.apply(obj[i], args);
                        if(value === false){
                            break;
                        }
                    }
                }
            }else{
                if(isArray){
                    for(; i<length; i++){
                        // call()方法的第二个参数: 必须逐个列举出来
                        value = callback.call(obj[i], i, obj[i]);
                        if(value === false){
                            break;
                        }
                    }
                }else{
                    for(i in obj){
                        value = callback.call(obj[i], i, obj[i]);
                        if(value === false){
                            break;
                        }
                    }
                }
            }
            return obj;
        },

        // trim 取出文本两端的空格
        trim: function(text){
            return text == null ? "" : core_trim.call(text);
        },

        // results is for internal usage only
        // 把类数组转换成真正的数组
        // 第一个参数为类数组对象，把类数组转换为真正的数组，后面一个参数为内部使用
        // makeArray是把值都给后面一个参数，而merge则是把值都给第一个参数
        makeArray: function(arr, results){
            var ret = results || [];
            // 首先判断 arr 类数组对象存不存在
            if(arr != null){
                // 鉴别字符串如果是字符串数组，直接存成数组转化.
                //     例如: var num = Object(123455);
                //     console.log(num);  // Number { 123455 }

                if(isArraylike(Object(arr))){
                    jQuery.merge(ret, typeof arr === "string" ? [arr] : arr);
                    // 如果是数组，直接调用push方法推进数组
                }else{
                    core_push.call(ret, arr);
                }
            }
        },

        // 数组版的indexOf();
        //     var inArr = ["a", "b", "c", "d"];
        //     console.log($.inArray("a", arr));   // 0
        inArray: function(elem, arr, i){
            // ECMAScript 5 为数组实例添加了两个位置方法： indexOf() 和 lastIndexOf() 。
            //  这两个方法都接收两个参数：要查找的项和（可选的）表示查找起点位置的索引。其中，
            //  indexOf() 方法从数组的开头（位置 0）开始向后查找
            return arr == null ? -1 : core_indexOf.call(arr, elem, i);
        },

        // 合并数组: 把2个数组或者伪数组的内容合并到第一个数组中去，只要第一个对象含有length属性且不为0即可
        // if: $.merge(['a', 'b'], ['c','d']);
        // else: $.merge(['a', 'b'], {0:'c', 1:'d'}) || $.merge({0:'a', 1:'b', length:2}, {0:'c', 1:'d'});
        merge: function(first, second){
            var l = second.length,
                i = first.length,
                j = 0;
            // l有长度代表必须为数组，这样first也必须为数组
            if(typeof l === "number"){
                for(; j < l; j++){
                    first[i++] = second[j];
                }
            }else{
                while(second[j] !== undefined){
                    first[i++] = second[j++];
                }
            }
            first.length = i;
            return first;
        },

        // grep: 过滤返回新数组。 参考示例使用
        grep: function(elems, callback, inv){
          var retVal,
              ret  = [],
              i = 0,
              length = elems.length;
          // 如果不写 inv 这个参数就是undefined，加2个!!就会转换为false,
          // 逻辑非操作符由一个叹号（！）表示
          inv = !!inv;
          for(; i < length; i++){
              // inv 参数就是true||false,根据callback回调函数中的判断语句来确定返回什么情况
              retVal = !!callback(elems[i], i);
              if(inv !== retVal){
                  ret.push(elems[i]);
              }
          }
          return ret;
        },

        // arg is for internal usage only (arg参数供内部使用)
        // map: 映射新数组。通过映射函数把数组映射成另一组数组
        map: function(elems, callback, arg){
            var value,
                i = 0,
                length = elems.length,
                isArray = isArraylike(elems),
                ret = [];
            // Go through the arrya, translating each of the items to their
            // 如果要转化的对象是数组，通过下标访问逐个执行回调函数，执行后的值放到一个新的数组中返回
            if(isArray){
                for(; i < length; i++){
                    value = callback(elems[i], i, arg);

                    if(value != null){
                        ret[ret.length] = value;
                    }
                }
            }else{  // 如果为对象就利用for-in循环
                for(i in elems){
                    value = callback(elems[i], i, arg);

                    if(value != null){
                        ret[ret.length] = value;
                    }
                }
            }

            // flatten any nested array
            /*  正常情况下这里返回的是个嵌套数组(复合数组)
                var mapArray = $.map([6,7,8,9,10], function(n){
                    return [n, 2*n];
                });
             */
            // 但是这里利用数组的 concat()方法,把嵌套数组中的数据取出来合并成一个数组
            return core_concat.apply([], ret);
        },

        // A global GUID counter for objects
        guid: 1,

        // Bind a function to a context, optionally partically applying any arguments.
        // 更改this指向

        // const proxyObj = {
        //     show: function(){
        //         alert(this);
        //      }
        // };
        // $(document).click($.proxy(proxyObj.show, proxyObj));   // [object Object]
        // 下面这个写法是上面的简写: 意思是把proxyObj下的show指向proxyObj
        // $(document).click($.proxy(proxyObj, "show"));            // [object Object]

        proxy: function(fn, context){
            var tmp, args, proxy;

            // 这个判断是判断类似上面这样的调用: $(document).click($.proxy(proxyObj, "show"));
            // 是经过这个判断之后把上面一行调用转换为最上面这样: $(document).click($.proxy(proxyObj.show, proxyObj));
            if(typeof context === "string"){
                tmp = fn[context];  // tmp = proxyObj.show
                context = fn;       // show = proxyObj
                fn = tmp;           // proxyObj = proxyObj.show
            }
            // Quick check to determine if target is callable, in the spec this
            // throws a TypeError, but we will just return undefined.
            // 快速检查以确定目标是否可调用，在规范中会抛出一个TypeError，但是我们将返回未定义。
            if(!jQuery.isFunction(fn)){
                return undefined;
            }

            // Simulated bind 模拟绑定
            // 这里是利用Array.prototype.slice.call()方法,把arguments从第3项转换成数组
            args = core_slice.call(arguments, 2);
            // 这里实际上就是在合并
            proxy = function(){
                return fn.apply(context || this, args.concat(core_slice.call(arguments)))
            };
            // Set the guid of unique handler to the same of original handler, so it can be removed
            // 将唯一处理程序的guid设置为相同的原始处理程序，因此可以将其删除
            proxy.guid = fn.guid = fn.guid || jQuery.guid++;

            return proxy;
        },


        // Multifunctional method to get and set values of a collection  多功能方法来获取和设置集合的值
        // The value/s can optionally be executed if it's a functon  如果它是一个函数可以选择执行该值
        // access:多功能值操作: 例如: $().css, $().att()这些方法都用到了access()方法
        // access /'ækses/ 访问  n. 通道，入口
        /* 调用方式分为3种:
            @1: (name, value) 传入名称和值的方式
            @2: ({key:value, key:value}) 传入一个键值对map对象
            @3: (name: fn(index,value){}) 传入一个名称和一个运算函数，函数接受2个值: index-元素中集合中的序列值，value-元素原来的值。
         */

        //$().css(),$().attr()，通过参数的不同，实现get/set。参数的个数，以及参数的类型。$("div").css("width")，
        // 获得第一个div元素的width，$("div").css("width",100)设置所有的div元素的width。$("div").css({width:100,height:200})，
        // 也是设置所有的div元素，尽管只有一个参数，但是类型不一样。JQuery中有很多这种方法，所以统一用access实现。

        /* 参数:
             1st-->         elems:          元素可以为一或多个
             2nd-->         fn:             传递map对象是一个参数。
             3rd && 4th-->  (key, value):   传递name:value是2个参数
             5th-->         chainable:      chainable为true，设置，为false就获取。
             6th-->         emptyGet:       jq中还有一个数据绑定的方法 $("...").data 中也使用了 access()方法，通过data方法，
                                            可以这样调用:
                                            $("#div2").data("message": {name: "girl", age: "18"});
                                            $("#div2").data("loaded", "yes");
                                            $("#div2").data("callback", function(){
                                                ...
                                                ......
                                            })
                                            这里第三种写法的value值是一个函数，但是不需要它运行来返回属性值，它本身就是一个属性，需要
                                            保存的只是这个函数的一个引用，所以相比"attr", "css"等方法，我们需要value是函数时，是否
                                            要运行，就要再来一个参数。
            7th-->          raw

         */
        access: function(elems, fn, key, value, chainable, emptyGet, raw){
            var i = 0,
                length = elems.length,
                // 如果 键不存在或者为空时 此时key == null,此时bulk = true.
                // 如果 键正常设置此时 key != null，所以 bulk = false.
                bulk = key == null;

            // 当为上面@2方式调用时,即为一个json对象时
            // Sets many values
            if(jQuery.type(key) === "object"){
                chainable = true;
                for(i in key){
                    // 此处的原理是即使是这样的调用 $("#div1").css({background: "yellow", width: "300px"}),最后还是要转化为，
                    // 这样的: $("#div1").css("background"， "yellow")，$("#div1").css("width", "300px");
                    jQuery.access(elems, fn, i, key[i], true, emptyGet, raw);
                }

            // Sets one value 设置单个值 : $("#div1").css("width", "100px");
            }else if( value !== undefined ){ //键值的值不能为空
                chainable = true;

                // value不为回调函数fn返回false,取反 !false == true,即value为字符串时 raw = true
                // value 为回调函数是 jQuery.isFunction(value) = true, !true = false; 所以内部不会走
                if(!jQuery.isFunction(value)){
                    raw = true;
                }

                // 此时是bulk为true 就是代表key不存在(没有key值) : 不去设置属性和样式，只是回调
                // 即: $("#div1").css("width")
                if(bulk){
                    // Bulk operations run against the entire set 批量操作针对整个集合运行
                    // raw = true存在，即为字符串/数字
                    if(raw){
                        // 调用回调方法
                        fn.call(elems, value);
                        // 把回调方法赋为空
                        fn = null;

                    // ...except when executing function values
                    // 是回调函数fn才走else
                    }else{
                        bulk = fn;
                        // 此时这个fn并不会执行，执行是在下面的if中调用
                        fn = function(elem, key, value){
                            return bulk.call(jQuery(elem), value);
                        }
                    }
                }

                if(fn){
                    for(; i < length; i++){
                        // raw为真代表为字符串直接，否则为函数
                        fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
                    }
                }
            }

            // 如果chainable为真就是代表为设置，否则为获取
            return chainable ?
                elems :
                // Gets 获取att/css时: 获取有分为2中情况:
                // @1. 获取没有key值时，直接触发回调
                // @2. 如果有key值的话还要分情况: 看length存不在
                //      a. 如果存在，代表有元素存在，获取第一个元素的key值(属性名的值)，没有元素的话就返回emptyGet
                //
                bulk ?
                    fn.call(elems) :
                    length ? fn(elems[0], key) : emptyGet;
        },

        
        // 当前时间距离1970年的毫秒数，相当于(new Date()).getTime();
        now: Date.now,
        
       
        // swap：css交换，内部使用(使用原理见: jq语法讲解具体示例.html)
        swap: function(elem, options, callback, args){
            var re, name,
                old = {};

            // Remember the old values, and insert the new ones  记住旧的值，然后插入新的值
            for(name in options){
                old[name] = elem.style[name];
                elem.style[name] = options[name];
            }

            ret = callback.apply(elem, args || []);

            // Revert the old values

            for(name in options){
                elem.style[name] = old[name];
            }

            return ret;
        }
    });

    jQuery.ready.promise = function(obj){
        // 代码最上面定义了readyList变量,没赋值
        if(!readyList){
            readyList = jQuery.Deferred();

            // 如果文档的状态现在已经是complete, 使用一个异步，来执行jQuery.ready方法
            if(document.readyState === "complete"){
                // Handle it asynchronously to allow scripts the opportunity to delay ready
                setTimeout(jQuery.ready);
            }else{
                document.addEventListener("DOMContentLoaded", completed, false);
                window.addEventListener("load", completed, false);
            }
        }
        return readyList.promise(obj);
    };

    // Populate the class2Type map
    // 监测DOM的异步操作(内部)
    // 此处检测都是针对js原生对象: 布尔、数字、字符串、函数、数组、日期、正则、对象、错误类型
    jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name){
        class2type["[object " + name + "]"] = name.toLowerCase();
    });


    // 类似数组的判断: 是不是数组或者类数组或者带长度的json对象 (内部)
    // isArraylike方法的限定对象是: array, arguments, nodelist, 与拥有非负整数的length属性的object对象
    function isArraylike(obj){
        // 加载对象的length属性
        var length = obj.length,
            // 获取对象的类型
            type = jQuery.type(obj);

        // 检测对象是否是window对象，如果是window对象返回false
        if(jQuery.isWindow(obj)){
            return false;
        }

        // nodeType为1，表示对象是一个DOM元素，也是类数组对象
        if(obj.nodeType === 1 && length){
            return true;
        }

        // 检测数组，含有length属性的对象
        return type === "array" || type !== "function" &&
            (length === 0 ||
            typeof length === "number" && length > 0 && (length - 1) in obj);
    }


})(window);



