/** Created on 2017/3/2---5/6-change */


var jQuery = function(selector, context){
    return new jQuery.fn.init(selector, context, jQuery);
};

var core_pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source; //匹配数字
var core_rnotwhite = /\S+/g;  //分割空格
var rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/; //匹配HTML标签和ID
var rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/; //匹配HTML单标签
var rmsPrefix = /^-ms-/;  //匹配-ms-前缀
var rdashAlpha = /-([\da-z])/gi; //匹配一个数字和字母

/*-------------------------讲解部分-----------------------------*/
othis = {
    0 : "li",
    1 : "li",
    2 : "li",
    length : 3
};

for(var i=0; i<othis.length; i++){
    console.log(othis[i].length);
}
/*------------选择元素的所有情况------------*/
    // $("")    $(null)     $(undefined)    $(false)
    // $("#div1")   $(".box")    $("div")   $("#div1 div.box")
    // $("<li>")    $("<li>1</li><li>2</li>")
    // $(this)      $(document)
    // $(function())
    // $([])    $({})
/*------------选择元素的所有情况------------*/


/*
if(selector.charAt(0) === "<" && selector.charAt(selector.length -1) === ">" && selector.length >=3){
    match = [null, selector, null];
}else{
    match = rquickExpr.exec(selector);
}
//这里是上面的if else 讲解
if(){
    $("<li>")    $("<li>1</li><li>2</li>")

    match = [null, "<li>", null];
    match = [null, "<li>1</li><li>2</li>", null];

}else{
    $("#div1")   $(".box")    $("div")   $("#div1 div.box")
    $("<li>hello")
    match = null;       //$(".box")    $("div")   $("#div1 div.box")
    match = ["#div1", null, "div1"]         //$("#div1")
    match = ["<li>hello", "<li>", null]     //$("<li>hello")
}
*/



/*-------------------------讲解部分-----------------------------*/


jQuery.fn = jQuery.prototype = {
    constructor: jQuery,
    init: function(selector, context, rootjQuery){
        var match; var elem;
        if(!selector){
             return this;
        }

        if(typeof selector === "string"){ //选择的元素是字符串类型的
            //charAt():接受一个参数，即基于0的字符位置
            if(selector.charAt(0) === "<" && selector.charAt(selector.length -1) === ">" && selector.length >=3){
                match = [null, selector, null];
            }else{
                match = rquickExpr.exec(selector);
            }

            //首先match存在，就是id的形式和传入的是元素
            if(match && (match[1] || !context)){ //能进入的有: 标签 和 id
                if(match[1]){ //mach[1] 就是判断数组的第2项为真的话，第二项为真看上面的注释讲解就是传入的为元素的情况
                   // 确定一个值是哪种基本类型可以使用 typeof 操作符，而确定一个值是哪种引用类型可以使用instanceof 操作符。
                    context = context instanceof jQuery ? context[0] : context;
                    jQuery.merge(this, jQuery.parseHTML(
                        match[1],
                        context && context.nodeType ? context.ownerDocument || context : document,
                        true
                    ));
                    //匹配单标签 singletTag :  <li> 或者 <li></li>
                    if(rsingleTag.test(match[1]) && jQuery.isPlainObject(context)){ //isPlainObject()必须是对象字面量
                        //所以上面的if就匹配这样的形式: $("<li>", {title: "hi", html: "insertCode"}).appendTo("ul")
                        for(match in context){ //循环上面的的json对象  : 关于for in循环的讲解见同级目录--> jQuery一些方法讲解.html
                            if(jQuery.isFunction(this[match])){ //找jQuery中是不是有例如 ：this.html()方法
                                this[match](context[match]);
                            }else{
                                this.attr(match, context[match]); //如果jQuery中找不到相应的方法，就设置元素对应的属性
                            }
                        }
                    }
                    return this;
                }else{  //这里是判断传入的为id的情况   match = ["div1", null, "#div1"]  //$("#div1")
                    elem = document.getElementById(match[2]);
                    if(elem && elem.parentNode){
                        this.length = 1;
                        this[0] = elem;
                    }
                    this.context = document;
                    this.selector = selector;
                    return this;
                }
            }else if(!context || context.jquery){ //假如上下文不存直接走里面的判断 或 上下文存在的话是不是jQuery对象
                return (context || rootjQuery).find(selector);
                //示例为: $("ul", $(document)).find("li")  --> jQuery(document).find();
            }else{ //如果有上下文的话context
                return this.constructor(context).find(selector);
                //示例为:  $("ul", document).find("li")  --> this.constructor(document).find(); === jQuery(document).find();
            }
        }else if(selector.nodeType){
            this.context = this[0] = selector;
            this.length =1;
            return this;
        }else if(jQuery.isFunction(selector)){
            return rootjQuery.ready(selector);
        }

        if(selector.selector !== undefined){  //这种情况匹配不规范的这种写法 $($("#div"))
            this.selector = selector.selector;
            this.context = selector.context;
        }

        return jQuery.makeArray(selector, this) //把类数组转换为数组的方法，添加this参数可以再把数组转为换jQuery使用的json数组对象
    }
};