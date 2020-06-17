### jq源码解析 (传智视频)

#### (21, 94)      定义了一些变量和函数  jQuery = function(){}
#### (96, 283)     给jq对象，添加一些方法和属性
#### (285, 347)    extend: jq的继承方法 (extend /ɪk'stend/ vt. 扩充 )
#### (349, 817)    jQuery.extend(): 扩展一些工具方法
#### (877, 2856)   Sizzle : 复杂选择器的实现
#### (2880, 3042)  Callbacks ： 回调对象： 对函数的统一管理
#### (3043, 3183)  Deferred: 延迟对象： 对异步的统一管理  (defer /dɪ'fɜː/ vt 推迟 延迟 )
#### (3184, 3295)  support : 功能检测
#### (3308, 3652)  data(): 数据缓存
#### (3653, 3797)  queue(): 队列方法： 执行顺序的管理  (queue /kjuː/ n 队列 长队)
#### (3803, 4299)  attr() prop() val() addClass()等 ： 对元素属性的操作
#### (4300, 5128)  on() trigger() : 事件操作的相关方法  
#### (5140, 6057)  DOM操作： 添加 删除 获取 包装 DOM筛选 
#### (6058, 6620)  css() : 样式的操作  
#### (6621, 7854)  提交的数据和ajax(): ajax() load() getJSON()   
#### (7855, 8584)  animate(): 运动的方法  
#### (8585, 8792)  offset(): 位置和尺寸的方法
#### (8804, 8821)  JQ支持模块化的模式
#### (8826)        window.jQuery = window.$ = jQuery


-------------(21, 94) 定义了一些变量和函数  jQuery = function(){}-------------

####. jquery中定义面向对象的写法 (感觉这种写法没有prototype中的面型对象写法容易懂)
function jQuery(){
    return new jQuery.fn.init(selector, context, rootjQuery);   //initialize /ɪ'nɪʃ(ə)laɪz/ 初始化 
}
jQuery.fn.init.prototype = jQuery.fn; 把jQuery.prototype赋值给jQuery.prototype.init构造函数的prototype
jQuery.fn = jQuery.prototype = {
    constructor : jQuery;
    init: function(selector, context, rootjQuery){
    }
}
#### 自己写示例按照prototype.js中的写法为：
    见zhifuwallet中的formInputValidation.js
    


-------------(96, 283) 给jq对象，添加一些方法和属性-------------
jQuery.fn = jQuery.prototype = {
    jquery:         版本
    constructor:    从新制定构造函数：(这个在js高级上有讲，如果从新定义了原型，原来指向构造函数的指针就会改变，利用construction属性可以重新制定为原来的构造函数)
    init():         initialize初始化和参数管理
    selector:       存储选择字符串
    length:         this对象的长度
    toArray():      转数组
    get():          转原生集合
    pushStack():    JQ对象的入栈
    each():         遍历集合
    ready():        DOM加载的接口
    slice():        集合的截取
    first():        集合的第一项
    last():         集合的最后一项
    eq():           集合的指定项
    map():          返回新集合
    end():          返回集合前一个状态
    push():         (内部使用)
    sort():         (内部使用)
    splice():       (内部使用)
    
}



-------------(285, 347) extend: jq的继承方法 (extend /ɪk'stend/ vt. 扩充 )-------------


 jQuery.fn.extend({
        find: function (selector) {
            var i,
                ret = [],
                self = this,
                len = self.length;
            if (typeof selector !== "string") {
                return this.pushStack(jQuery(selector).filter(function () {
                    for (i = 0; i < len; i++) {
                        if (jQuery.contains(self[i], this)) {
                            return true;
                        }
                    }
                }))
            }
            for (i = 0; i < len; i++) {
                jQuery.find(selector, self[i], ret);
            }
            //Needed because $(selector, context) becomes $(context).find(selector)
            ret = this.pushStack(len > 1 ? jQuery.unique(ret) : ret);
            ret.selector = this.selector ? this.selector + " " + selector : selector;
            return ret;
        }
    })
    
    
    


-------------------(349, 817)    jQuery.extend(): 扩展一些工具方法-------------------
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




























