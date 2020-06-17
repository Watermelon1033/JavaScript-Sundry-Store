/**
 * ScrollReveal
 * ------------
 * Version : 3.3.6
 * Website : scrollrevealjs.org
 * Repo    : github.com/jlmakes/scrollreveal.js
 * Author  : Julian Lloyd (@jlmakes)
 */


/*
  生词:
    instantiation   /in,stænʃieiʃən/    n.实例化
    utility         /juː'tɪlɪtɪ/        工具  n. 功用 效用
    Configuration   /kən,fɪgə'reɪʃ(ə)n/ 配置  n. 构造 外形
    signature       /'sɪgnətʃə/         n. 签字 签名
    rotate          /rə(ʊ)'teɪt/        n. 旋转
    trigger         /'trɪgə/            n. 触发 引发
    container       /kən'teɪnə/         n. 容器
    consistent      /kən'sɪst(ə)nt/     adj. 一致的
    generate        /'dʒenəreɪt/        vt 生成  发生
    transition      /træn'zɪʃ(ə)n/      n. 过渡，转变，变迁
    transform       /træns'fɔːm/        vt & vi 改变
    alter           /'ɔːltə/            vt 改变，更改.   vi 改变，修改
    aid             /eɪd/               vt 帮助，援助.   n 帮助 援助
 */


;(function(){
    'use strict';

    var sr;                         //scroll reveal 滚动显示的缩写
    var _requestAnimationFrame;

    function ScrollReveal(config){
        // Support instantiation without the "new" keyword.
        // 支持实例化，没有new关键字。
        /* ECMAScript 5 增加了一个新方法，叫 Object.getPrototypeOf()【getPrototypeOf取得原型】,在所有支持的实现中，这个方法返回 [[Prototype]] 的值。例如：
         * alert(Object.getPrototypeOf(person1) == Person.prototype); //true
         * --《js高程》第6章: 取得原型对象 */
        if(typeof this === "undefined" || Object.getPrototypeOf(this) !== ScrollReveal.prototype){
            return new ScrollReveal(config)
        }

        // Save reference to instance.保存对实例的引用
        sr = this;
        sr.version = "3.3.6";

        // required utilities 所需工具
        // 把Tools构造函数的实例，赋值给 this.tools(当前ScrollReveal构造函数的自定义属性tools)
        sr.tools = new Tools();

        // isSupported()方法检查客户端是否支持CSS Transform 和 CSS Transition
        if(sr.isSupported()){

            // Tools 上 extend 方法的目的是: 把你在页面中自定义的配置对象,覆盖当前构造函数上 defaults() 对象中的默认属性，
            // config 可以在初始化构造函数时传入，如果没有就传入一个空对象
            sr.tools.extend(sr.defaults, config || {});

            // 取得 defaults 对象中的 container (容器)
            sr.defaults.container = _resolveContainer(sr.defaults);

            // 定义 this.store 属性，保存一个对象，对象包含:
            //  1. elements 对象属性 : 顾名思义这里保存所有要添加 scrollReveal 效果的元素
            //  2. containers 数组属性:
            sr.store = {
                elements: {},
                containers: []
            };
            sr.sequences = {};      // this.sequences 当前顺序
            sr.history = [];        // this.history   用于保存页面中已经添加了 reveal 的元素，提供给 sync() 方法使用
            sr.uid = 0;             // this.uid
            sr.initialized = false;
        }else if(typeof console !== "undefined" && console !== null){
            // 提示浏览器不支持 ScrollReveal
            console.log("ScrollReveal is not supported in this browser.");
        }
        return sr;
    }


    // Configuration(配置):
    // This object signature can be passed directly to the ScrollReveal constructor, or as the second argument of the `reveal()` method.
    // 该对象可以直接传递给 ScrollReveal 构造函数，也可以作为 reveal() 方法的第二个参数
    ScrollReveal.prototype.defaults = {

        // "bottom", "left", "top", "right"
        origin:     "bottom",

        // Can be any valid CSS distance, e.g. "5rem", "10%", "20vw", etc.
        distance:   "20px",
        // Time in milliseconds. 效果持续时间，以毫秒为单位
        duration:   500,
        // delay : 延迟多长时间执行 scrollReveal 效果，单位同上
        delay:      0,

        // Starting angles in degrees, will transition from these values to 0 in all axes.
        // rotate: css3 旋转
        rotate:     {x:0, y:0, z:0},

        // Starting opacity value, before transitioning to the computed opacity.
        opacity:    0,          // 默认透明度为0 - 1

        // Starting scale value, will transition from the value to 1
        scale:      0.9,        // 缩放

        // Accepts any valid CSS easing, e.g. "ease", "ease-in-out", "linear", etc.
        // 接受 css3 运动效果，
        // linear /'lɪnɪə/: adj.线的     线性动画-->     没有任何缓动的动画称为线性动画。 css3的动画效果为:
        // ease-out：                    缓出动画-->     缓出使动画在开头处比线性动画更快但在结尾处减速。缓出一般最适合界面，开头时快速使动画有反应快的感觉，在结尾仍允许有一点自然的减速。
        // ease-in:                      缓入动画-->     缓入动画开头慢结尾快，与缓出动画正好相反。(页面中几乎用不到)
        // ease-in-out:                  缓入缓出动画-->  缓入并缓出与汽车加速和减速相似，使用得当时，可以实现比单纯缓出更生动的效果效果
        easing: "cubic-bezier(0.6, 0.2, 0.1, 1)",


        // `<html>` is the default reveal container. You can pass either:
        // DOM Node, e.g. document.querySelector('.fooContainer')
        // Selector, e.g. '.fooContainer'
        container:  window.document.documentElement,

        // true/false to control reveal animations on mobile.
        mobile:     true,

        // true:  reveals occur every time elements become visible
        // false: reveals occur once as elements become visible
        reset:      true,

        // "always" - delay for all reveal animations                     "总是"    - 延迟所有的 reveal 动画
        // "once"   - delay only the first time reveals occur             "一次"    - 延迟只在第一次reveal是显示
        // "onload" - delay only for animations triggered by first load   "onload"  - 延迟仅在第一次加载时触发
        useDelay:   "always",

        // Change when an element is considered in the viewport, the default value of 0.20
        // means 20% of an element must be visible for its reveal to occur.
        // 考虑变更视图中的元素，默认的0.2是一个元素的20%必须是可见的。
        viewFactor: 0.2,

        // Pixel values(像素值) that alter(改变) the container boundaries    改变容器边界的像素值
        // e.g. Set `{ top: 48 }`, if you have a 48px tall fixed toolbar.
        // Visual Aid(可视帮助): https://scrollrevealjs.org/assets/viewoffset.png
        viewOffset: {top:0, right:0, bottom:0, left:0},

        // Callbacks that fire for each triggered element reveal, and reset.
        // 对每个触发 reveal 的元素进行回调，并重置。
        beforeReveal: function(domEl){},
        beforeReset: function(domEl){},

        // Callbacks that fire for each completed element reveal, and reset.
        // 对每个已完成 reveal 的元素进行回调，并重置。
        afterReveal: function(domEl){},
        afterReset: function(domEl){}

    };

    // Check if client supports CSS Transform and CSS Transition
    // @return { boolean }
    ScrollReveal.prototype.isSupported = function(){
        // 取得浏览器支持的所有 style 属性
        var style = document.documentElement.style;
        return "WebkitTransition" in style && "WebkitTransform" in style ||
                "transition" in style && "transform" in style
    };

    /**
     * Creates a reveal set, a group of elements that will animate when they become visible.
     * If [ interval ] is provided, a new sequence is created that will ensure elements reveal
     * in the order they appear in the DOM.   创建一个 reveal 集, 一组元素当他们变得可见时就会生成动画。
     * 如果提供了 interval, 则会创建一个新的序列，以确保元素按照他们在 DOM 中出现的顺序显示。
     *
     * @param {Node|NodeList|string}   [target]     The node, node list or selector to use for animation.
     * 参数 target 为 Node/NodeList/string 形式，用于添加 scrollReveal 动画的元素
     * @param {Object}                 [config]     Override the defaults for this reveal set.
     * 参数 config 为 reveal 集合 覆盖默认的 defaults 对象
     * @param {number}                 [interval]   Time between sequenced element animations (milliseconds).
     * 参数 interval 为一个数字，代表自定义的间歇调用时间
     * @param {boolean}                [sync]       Used internally when updating reveals for async content.
     * 参数 sync 为一个 boolean 值， 内部使用，当更新 reveals 为异步的内容。
     *
     * @return {object} The current ScrollReveal instance.
     * 返回值 object 当前 ScrollReveal实例 --> this
     * */
    ScrollReveal.prototype.reveal = function (target, config, interval, sync) {
        // container: 取得添加 reveal 元素的容器元素
        // elements:  添加 reveal 的元素集(单个或一组)
        // elem:      当前要添加 reveal 元素
        // elemId:    当前元素id
        // sequence:  保存所有添加 reveal 动画元素的队列
        // sequenceId:当前队列元素的id
        var container,
            elements,
            elem,
            elemId,
            sequence,
            sequenceId;

        // No custom configuration was passed, but a sequence interval instead.
        // let's shuffle things around to make sure everything works.
        // 如果没有自定义配置传入，但是 interval 存在，就先整理代码使正常工作。这里的意思是类似于这种调用情形
        // sr.reveal(document.querySelectorAll('.foo'), { duration: 2000 }, 50);
        // 上面调用中最后的 50 就是间歇调用时间， {duration: 2000} 代表 2000ms 后执行完，也可不传，
        // 因为实例原上的 defaults 对象中 定义的也有默认持续时间 duration
        if (config !== undefined && typeof config === "number") {
            interval = config;
            config = {};
        } else if (config === undefined || config === null) {
            config = {};
        }

        container = _resolveContainer(config);
        elements = _getRevealElements(target, container);


        // console.log("Target " + target.length);
        // console.log(container);
        // console.log("Elements " + elements);

        // 如果找不到要添加 reveal 效果的元素，给出错误提示。
        if (!elements.length) {
            console.log('ScrollReveal: reveal on "' + target + '"failed, no elements found.');
            return sr;
        }

        // Prepare a new sequence if an interval is passed.
        // 首先判断在页面中 sr.reveal() 这样调用时是否传递了 interval 间隔时间，如果有就准备一个序列对象 sequence;
        // 如果页面调用时没有传递 interval 参数那么 下面这里的操作都不会存在。
        if (interval && typeof interval === "number") {
            sequenceId = _nextUid();
            // console.log("sequenceId是 " + sequenceId);

            // sr.sequences --> this.sequences 是在 ScrollReveal 构造函数中设置的一个全局属性，代表的值为一个对象。
            /*
             *   第一次代码执行到这里会变成这样:
             *   sequence = sr.sequences = {
             *        1: {
             *           id:       1,
             *           interval: 50,
             *           blocked:  false,
             *           elemIds:  [],
             *           active:   true,
             *       }
             *   }
             *
             *  执行完当前 for 循环后是这样: sequence.elemIds 数组中的项是在下面的 if (sequence) {} 方法中推入
             *   sequence =  sr.sequences = {
             *       1: {
             *           id:       1,
             *           interval: 50,
             *           elemIds:  [2, 3, 4, 5, 6, 7, 8, 9],
             *           active:   false,
             *       }
             *   }
             *   这里说一点: sr.sequences 对象, 接下来的使用在 _setActiveSequences()【设置激活序列】 方法中， 此方法的调用顺序为:
             *   当前方法中的下面的代码 window.setTimeout(_init, 0) 内调用 _init()  --> _animate() --> _setActiveSequences()
             */
            sequence = sr.sequences[sequenceId] = {
                id: sequenceId,
                interval: interval,
                elemIds: [],
                active: false
            };
            // console.log(sr.sequences);
           //  console.log(sequence);
        }

        // Begin main loop to configure ScrollReveal elements.
        // 开始主循环来配置 scrollReveal 元素
        var i = 0,
            len = elements.length;
        for (; i < len; i++) {
            // Check if the element has already been configured and grab it from the store.
            // 检测元素上是否已有配置，如果有就从 store 中抓取配置
            elemId = elements[i].getAttribute("data-sr-id");

            // 假如当前元素已经有 data-sr-id 属性。 打开页面加载时每个元素都没有 data-sr-id 属性，所以第一次遍历元素要增加
            // scrollReveal 效果时都走 else, 此 if 在什么时候执行还没弄明白~~~
            if (elemId) {
                // 构造函数 this.store 属性: sr.store = { elements: {}, containers: []};
                // 把当前元素的 data-sr-id 属性值推到 this.store.elements对象中， 形式为:
                elem = sr.store.elements[elemId];
                // console.log(elem);
            } else {
                // Otherwise, let's do some basic setup.  如果没有，就做一些最基本的设置
                // 打开页面加载时，第一次走此 else, 因为此时当前元素(列表)还没有 data-sr-id， 但是下面 elem 对象中的 id 属性保存调用
                // _nextUid() 函数之后的值这里却要细说一下: (1.)第一种情况是上面的 interval 参数存在时，上面已经调用了一次 _nextUid()
                // 了, 所以此时是2。 (2.)如果interval参数不存在，那么这里调用 _nextUid() 之后的值是1
                elem = {
                    id: _nextUid(),
                    domEl: elements[i],
                    seen: false,
                    revealing: false
                };
                // console.log(elem);      // elem = { id: 9, domEl: p.foo, seen: false, revealing: false }
                elem.domEl.setAttribute("data-sr-id", elem.id);
            }

            // Sequence only setup
            // 如果上面的 interval 存在，sequence 就会被初始化一个对象，那么这个判断就可以执行
            if (sequence) {
                // 当前 reveal 方法中定义的 elem 变量在上面 for 循环的 else 判断中已经初始化一个对象 对象中包含四个属性
                // 这里 elem.sequence 是直接给 elem 对象添加一个自定义的 sequence 属性， 这个属性被赋值了一个对象，对象
                // 中包含2个属性，id 和 index
                elem.sequence = {
                    id: sequence.id,
                    index: sequence.elemIds.length
                };

                /*
                 * 最后 elem对象 (就是代表每个要添加scrollReveal的元素) 会变成这样
                 * elem = {
                 *      config: {
                 *          afterReset: f(domEl),  afterReveal: f(domEl),
                 *          beforeReset: f(domEl), beforeReveal: f(domEl),
                 *          axis:   "Y",  container: html,  delay:  0,
                 *          distance: "20px", easing: "cubic-bezier(0.6, 0.2, 0.1, 1)",
                 *          mobile: true, opacity: 0, origin: "bottom", reset: true,
                 *          rotate: {x:0, y:0, z:0}, scale: 0.9， useDelay: "always",
                 *          viewFactor: 0.2, viewOffset: {top:0, right:0, bottom:0, left:0},
                 *       },
                 *       domEl: p.foo，
                 *       id: 2,
                 *       revealing: true,
                 *       seen: true，
                 *       sequence: { id:1, index:0, timer:null },
                 *       styles: {
                 *           computed: {
                 *               opacity: "1",
                 *               transition: ""
                 *           },
                 *           inline: "; visibility: visible",
                 *           transform: {
                 *               // initial 初始化时 transform 的样式
                 *               initial: " -webkit-transform: translateY(20px) scale(0.9); opacity: 0;
                 *                          transform: translateY(20px) scale(0.9); opacity: 0;",
                 *
     *                           // target 目的样式
                 *               target: " -webkit-transform: translateY(0); opacity: 1;transform: translateY(0); opacity: 1;",
                 *
                 *               // traget(魔法种类): 现在看起来主要是定义 scale(缩放)，但还不明白前面为什么是 undefined
                 *               traget: "undefined scale(1) scale(1)"
                 *           }
                 *           transition: {
                 *               // delayed: 延迟的， instant: 立即的
                 *               delayed: "-webkit-transition: -webkit-transform 2s cubic-bezier(0.6, 0.2, 0.1, 1) 0s, opacity 2s cubic-bezier(0.6, 0.2, 0.1, 1) 0s;
                 *                          transition: transform 2s cubic-bezier(0.6, 0.2, 0.1, 1) 0s, opacity 2s cubic-bezier(0.6, 0.2, 0.1, 1) 0s; ",
                 *               instant: "-webkit-transition: -webkit-transform 2s cubic-bezier(0.6, 0.2, 0.1, 1) 0s, opacity 2s cubic-bezier(0.6, 0.2, 0.1, 1) 0s;
                 *                          transition: transform 2s cubic-bezier(0.6, 0.2, 0.1, 1) 0s, opacity 2s cubic-bezier(0.6, 0.2, 0.1, 1) 0s; ",
                 *           }
                 *       },
                 *       timer: null，
                 * }
                 *
                 *  domEl:  "",
                 *  id: 2,
                 *  revealing: true,
                 *  seen: true,
                 *  sequence: {
                 *      id: 1,
                 *      index: 0,
                 *      timer: null
                 *  },
                 * styles:{
                 *      computed: {"opacity": '1', "transition":''},
                 *     inline:'; visibility: visible; ',
                 *      transform:{},
                 *      transition:{}
                 * },
                 *  timer:null
                 */
                // console.log(elem);

                sequence.elemIds.push(elem.id);
            }

            // 此时输出上面定义的 sequence 队列对象的 sequence.elemIds 数组
            // console.log("此时输出上面定义的 sequence 队列对象的 sequence.elemIds 数组");
            // console.log("sequence对象的sequence.elemIds " + sequence.elemIds);


            // New or existing element, it's time to update its configuration, styles, and
            // send the updates to our store.
            // 新创建或已存在的元素，是时候开始更新配置和样式并保存更新到 sr.store 对象中了
            _configure(elem, config, container);

            /*
             * 打开页面第一次执行到这个 _style(elem) 函数时，元素上被添加的样式为:
             * <p class="foo" data-sr-id="2"
             *      style=";
             *          visibility: visible;
             *          -webkit-transform: translateY(20px) scale(0.9);
             *          opacity: 0;
             *          transform: translateY(20px) scale(0.9);
             *          opacity: 0;">1
             * </p>
             * 这里要说一下的是，这里只是增加默认样式，页面中调用 sr.reveal()上传入的最后要执行的样式，并没有走这里
             */
            _style(elem);


            /*
             * _updateStore(elem) 的主要目的是把每个元素(elem)推入到构造函数 ScrollReveal() 中的 sr.store
             * 对象属性的 elements 对象中， 并且此调用还是在 for 循环之中，所以我们 for 循环执行完毕之后，
             * sr.store.elements 对象中保存的键值对为:
             *  sr.store = {
             *      elements: {
             *           2: {
             *               config: {},
             *               domEl: p.foo,
             *               id: 2,
             *               revealing: true,
             *               seen: false,
             *               sequence: {id: 1, index: 0, timer: null},
             *               styles: {
             *                   computed: {
             *                       opacity: "1",
             *                       transition: ""
             *                   },
             *                   inline: "; visibility: visible",
             *                   transform: {...},
             *                   transition: {...}
             *               },
             *               timer: null
             *           },
             *           3: {},
             *           4: {},
             *           5: {},
             *           6: {},
             *           7: {},
             *           8: {},
             *           9: {},
             *           etc...
             *       },
             *       container: [ html,]
             *  }
             */
            _updateStore(elem);

            // We need to make sure elements are set to visibility: visible, event when on
            // mobile and `config.mobile === false`, or if unsupported.
            // 我们也需要确保元素是"可视的"，当在手机和 有`config.mobile === false`设置时，或者如果不支持 scrollReveal 时。
            if (sr.tools.isMobile() && !elem.config.mobile || !sr.isSupported()) {
                elem.domEl.setAttribute("style", elem.styles.inline);
                elem.disabled = true;
            } else if (!elem.revealing) {
                // Otherwise, proceed normally.
                elem.domEl.setAttribute("style", elem.styles.inline + elem.styles.transform.initial);

                // elem.domEl.style = " ; visibility: visible;
                //              -webkit-transform: translateY(20px) scale(0.9);
                //              opacity: 0;
                //              transform: translateY(20px) scale(0.9); opacity: 0;";

                // console.log(elem.domEl.getAttribute("style"));
            }

        }

        // Each `reveal()` is recorded so that when calling `sync()` while working with asynchronously
        // loaded content. it can re-trace your steps but with all your new elements now in the DOM.
        // 每个 "revel()" 都被记录下来，以便在使用异步加载的内容时调用 "sync()"。它可以重新跟踪你现在在 DOM 中的所有新元素的步骤。
        // Since "reveal()" is called internally by "sync()", record or initialize each reveal during syncing.
        // 由于"reveal()"是由"sync()"在内部调用的，因此在同步期间记录或初始化每个显示。
        if (!sync && sr.isSupported()) {

            /*
             * _record() 函数记录页面调用 sr.reveal() 中所传入的参数: _record()内部把这些赋值给了
             * ScrollReveal 构造函数内的 sr.history 数组属性: _record()函数内的代码为这样:
             * var record = {
             *    target: target,
             *    config: config,
             *    interval: interval
             * };
             * sr.history.push(record);
             * console.log(sr.history) 的结果为:
             *  sr.history = [ {
             *      config: {duration: 2000},
             *      interval: 50,
             *      target: [p.foo, p.foo, p.foo, p.foo, p.foo, p.foo, p.foo, p.foo]
             *  } ]
             */
            _record(target, config, interval);

            // We push initialization to the event queue using setTimeout, so that we can give ScrollReveal
            // room to process all reveal calls before putting things into motion.
            // 我们使用setTimeout将初始化推到事件队列中，这样我们就可以让ScrollReveal空间在处理所有事件之前处理所有的显示调用。
            // --
            // Philip Roberts - What the heck is the event loop anyway > (JSConf EU 2014)
            // https://www.youtube.com/watch?v=8aGhZQkoFbQ
            if (sr.initTimeout) {
                window.clearTimeout(sr.initTimeout);
            }

            // 把超时调用的方法赋值给当前"构造函数"的自定义属性 initTimeout, 超时调用中是间隔 0ms 调用一次 _init 函数
            // _init()函数中执行了什么？
            sr.initTimeout = window.setTimeout(_init, 0);
        }

        return sr;
    };


    /**
     * Re-runs "reveal()" for each record stored in history, effectively capturing any content loaded
     * asynchronously that matches existing reveal set targets.
     * 对存储在历史记录中的每个记录重新运行"reveal()"，有效地捕获任何与现有 reveal 集目标匹配的异步加载的内容。
     * @return {Object} The current ScrollReveal instance
     * */
    ScrollReveal.prototype.sync = function(){
        // sr.history 的存储是发生在 上面的 reveal() 方法内调用的 _record() 函数里发生的，存储内容见上面
        if (sr.history.length && sr.isSupported()) {
            var i = 0,
                len = sr.history.length;
            for (; i < len; i++) {
                var record = sr.history[i];
                sr.reveal(record.target, record.config, record.interval, true);
            }
            _init();
        } else {
            console.log("ScrollReveal: sync failed, no reveals found.");
        }
        return sr;
    };




    /** ------ Private Methods 私有方法 ------ **/

    // 确定当前container(容器是哪个元素)
    function _resolveContainer (config) {
        // config.container 即是: sr.default.container
        if(config && config.container){
            if(typeof config.container === "string"){

                // querySelector() 方法接收一个 CSS 选择符，返回与该模式匹配的第一个元素，如果没有找到匹配的元素，返回 null
                return window.document.documentElement.querySelector(config.container);

            }else if(sr.tools.isNode(config.container)){
                return config.container;
            }else{
                // console.log("滚动显示: 无效的容器" + config.container + "被提供。");
                // console.log("滚动显示: 返回默认的容器");
            }
        }
        return sr.defaults.container;
    }

    // check to see if a node or node list was passed in as the target, otherwise query the container using target as a selector.
    // 看看节点或节点列表是否作为目标传入，否则使用target作为选择器来查询容器。
    function _getRevealElements (target, container) {
        if (typeof target === "string") {
            // 对 arguments 对象使用 Array.prototype.slice() 方法可以将其转换为数组。
            // 对 NodeList 节点列表使用 Array.prototype.slice.call() 也可以将其转换为数组。
            return Array.prototype.slice.call(container.querySelectorAll(target));

        }else if (sr.tools.isNode(target)) {
            return [target];
        }else if (sr.tools.isNodeList(target)) {
            return Array.prototype.slice.call(target);
        }
        return [];
    }

    // A consistent way of creating unique IDs.
    // 创建唯一ID的一致方式: 我觉得作者这里应该是不想第一项从0开始，所以才写了前置递增
    function _nextUid(){
        return ++sr.uid;
    }

    function _configure(elem, config, container){
        if(config.container){
            config.container = container;
        }
        if(!elem.config){
            elem.config = sr.tools.extendClone(sr.defaults, config);
        }else{
            elem.config = sr.tools.extendClone(elem.config, config);
        }

        if(elem.config.origin === "top" || elem.config.origin === "bottom"){
            elem.config.axis = "Y"
        }else{
            elem.config.axis = "X"
        }
    }

    // 添加样式
    function _style(elem){

        // 取得元素计算后的样式
        var computed = window.getComputedStyle(elem.domEl);

        if(!elem.styles){
            // 如果 elem 元素上不存在 styles 属性，就定义一个对象，并赋值给 elem.styles
            elem.styles = {
                transition: {},
                transform: {},
                computed: {}
            };

            // Capture any existing inline styles, and add our visibility override.
            // 捕获任何已经存在的行内样式，并添加 visibility:visible 覆盖其上的 hidden
            // --
            // See section 4.2. in the Documentation:
            // https://github.com/jlmakes/scrollreveal.js#42-improve-user-experience

            /*
             * elem 对象下的 styles 属性代表了一个对象:
             * elem = {
             *      config: {},
             *      domEl: ,
             *      id: ,
             *      revealing: ,
             *      seen: ,
             *      sequence: { id:, index:, time:, },
             *      styles: {
             *          computed: { opacity:"1", transition: "" },
             *          inline: "; visibility: visible",
             *          transform: { initial: , target: ,  traget: ,},
             *          transition: { delayed:, instant: , }
             *      },
             *      timer: ,
             * }
             *
             */
            elem.styles.inline = elem.domEl.getAttribute("style") || "";
            elem.styles.inline += "; visibility: visible; ";

            // grab the elements existing opacity.      获取已经存在的 opacity
            elem.styles.computed.opacity = computed.opacity;

            // grab the elements existing transitions.  抓取已经存在的 transitions
            if(!computed.transition || computed.transition === "all 0s ease 0s"){
                elem.styles.computed.transition = "";
            }else{
                elem.styles.computed.transition = computed.transition + ", "
            }
        }

        // 如果 elem.styles 已经存在
        // Create transition styles         创建 transition 样式
        elem.styles.transition.instant = _generateTransition(elem, 0);
        elem.styles.transition.delayed = _generateTransition(elem, elem.config.delay);

        /*// Generate transform styles, first with the webkit prefix.
        elem.styles.transform.initial = " -webkit-transform:";
        elem.styles.transform.target =  " -webkit-transform:";
        _generateTransform(elem);*/

        // And again without any prefix.
        elem.styles.transform.initial = "transform:";
        elem.styles.transform.target = "transform:";
        _generateTransform(elem);
    }

    //  generate transition 生成转换 transition:
    /*
     transition: 允许CSS属性值在一定的时间区间内平滑的过渡，
             需要事件的触发，例如单击、获取焦点、失去焦点等
             transition:property duration timing-function delay;
             property:CSS的属性，例如：width height 为none时停止所有的运动，可以为transform

             duration:持续时间
             timing-function:ease等
             delay:延迟
             注意：当property为all的时候所有动画
             例如：transition:width 2s ease 0s;
     */
    function _generateTransition(elem, delay){
        var config = elem.config;

        return "transition: " + elem.styles.computed.transition +
            "transform " + config.duration / 1000 + "s " +
            config.easing + " " +
            delay / 1000 + "s, opacity " +
            config.duration / 1000 + "s " +
            config.easing + " " +
            delay / 1000 + "s; "
    }

    // 生成 transform
    function _generateTransform(elem){
        var config = elem.config;
        var cssDistance;
        var transform = elem.styles.transform;

        //让我们确定我们的像素距离在左上角是负的。
        //例如 origin ='top'，距离='25px'从CSS顶部的“-25px”开始。
        if(config.origin === "top" || config.origin === "left"){
            cssDistance = /^-/.test(config.distance) ? config.distance.substr(1) :
                "-" + config.distance;
        }else{
            cssDistance = config.distance;
        }

        if(parseInt(config.distance)){
            transform.initial += " translate" + config.axis + "(" + cssDistance  + ")";
            transform.target += " translate" + config.axis + "(0)"
        }
        if (config.scale) {
            transform.initial += " scale("+ config.scale + ")";
            transform.traget += " scale(1)";
        }
        if (config.rotate.x) {
            transform.initial += " rotateX(" + config.rotate.x + "deg)";
            transform.target += " rotateX(0)"
        }
        if (config.rotate.y) {
            transform.initial += " rotateY(" + config.rotate.y + "deg)";
            transform.target += " rotateY(0)";
        }
        if (config.rotate.z) {
            transform.initial += " rotateZ(" + config.rotate.z +"deg)";
            transform.target += " rotateZ(0)";
        }
        transform.initial += "; opacity: " + config.opacity + ";";
        transform.target += "; opacity: " + elem.styles.computed.opacity + ";";
    }

    // 更新 this.store 对象
    function _updateStore (elem) {
        var container = elem.config.container;

        // If this element's container isn't already in the store, let's add it.
        if (container && sr.store.containers.indexOf(container) === -1) {
            sr.store.containers.push(elem.config.container);
        }

        // Update the element stored with our new elements
        sr.store.elements[elem.id] = elem;
        // console.log(sr.store);
    }

    // 记录
    function _record (target, config, interval) {
        // Save the "reveal()" arguments that triggered this "_record" call,
        // so we can re_trace our steps when calling the "sync()" method.
        // 当触发"_record"回调时保存这个"reveal()"的参数，以便当调用"sync()"方法时可以再次重绘(retrace)我们的步骤。
        var record = {
            target: target,
            config: config,
            interval: interval
        };
        sr.history.push(record);
        // console.log(sr.history);
    }

    // initialize 初始化
    function _init () {
        if (sr.isSupported()) {
            // Initial animate call triggers valid reveal animations on first load.
            // Subsequent animate calls are made inside the event handler.
            // 第一次加载时触发的初始动画，后续的动画调用在事件循环中执行

            /*
            * 如果 scrollReveal 效果支持，第一步就先执行 _animate() 方法， 那么 _animate() 函数中都执行了什么呢？
            * 见函数内部
            * */
            _animate();

            // Then we loop through all container nodes in the store and bind event listeners to each.
            // 然后循环遍历存储的所有容器节点，并给每个元素绑定事件
            var i   = 0,
                len = sr.store.containers.length;
            for (; i < len; i++) {
                sr.store.containers[i].addEventListener("scroll", _handler);
                sr.store.containers[i].addEventListener("resize", _handler);
            }
            // Let's also do a one-time binding of window event listeners.
            if (!sr.initialized) {
                window.addEventListener("scroll", _handler);
                window.addEventListener("resize", _handler);
                sr.initialized = true;
            }
        }
        return sr;
    }

    // 绑定事件
    function _handler() {
        _requestAnimationFrame(_animate);
    }

    // 设置激活序列
    function _setActiveSequences () {
        var active;
        var elem;
        var elemId;
        var sequence;

        // Loop through all sequences   遍历所有序列

        /*
        * 在 ScrollReveal.prototype.reveal() 方法中，我们已经把全局属性( sr.sequences ),变成这样
        * sequence =  sr.sequences = {
        *     1: {
        *         id:       1,
        *         interval: 50,
        *         blocked:  false,
        *         elemIds:  [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
        *         active:   true,
        *      }
        * }
        */
        // ------------
        /*
         * sr.tools.forOwn() 工具方法见下面定义，其内部主要的代码便是这个 for 循环
         *  for(var property in object){
         *       if(object.hasOwnProperty(property)){
         *           // 把当前属性 property 传入到回调函数
         *           callback(property);
         *      }
         *  }
         *
         * 现在可以看到下面这个forOwn中的 function(sequenceId) 便是代表了 sr.sequences 内的键值对，但是 sr.sequences 内只有一个
         * 键值，所以 这个 sequenceId 就是代表-- 键 "1"
         */
        sr.tools.forOwn(sr.sequences, function (sequenceId) {
            console.log(sequenceId);
            sequence = sr.sequences[sequenceId];
            active = false;

            // For each sequenced element, let's check visibility and if any are visible, set it's sequence to active.
            // 对于每个有序元素，让我们检查可见性，如果有可见性，将其序列设置为有效状态
            var i = 0,
                len = sequence.elemIds.length;
            for (; i < len; i++) {
                elemId = sequence.elemIds[i];
                elem = sr.store.elements[elemId];
                if (_isElemVisible(elem) && !active) {
                    active = true;
                }
            }
            sequence.active = active;
        } )
    }

    // 动画
    function _animate () {

        // 第一步定义2个变量: delayed 和 elem
        var delayed;
        var elem;

        // 第二步: 调用 _setActiveSequences() 函数 激活 sr.sequences 中的 active
        _setActiveSequences();

        // loop through all elements in the store
        // 遍历 sr.store 中的所有元素  : elemId 的 注释见 【LICENSE.md 的下面 (### for循环执行之后的 sr.store )】
        sr.tools.forOwn(sr.store.elements, function (elemId) {
            elem = sr.store.elements[elemId];          // elem 这里是一个对象
            delayed = _shouldUseDelay(elem);           // 取得是否应该 delayed 延迟

            // Let's see if we should reveal and if so, trigger the "beforeReveal" callback and determine
            // whether or not to use delay. 查看是否应该显示，如果是，触发"beforeReveal"回调，并决定是否应该使用延迟
            if (_shouldReveal(elem)) {
                elem.config.beforeReveal(elem.domEl);

                // 如果
                if (delayed) {
                    elem.domEl.setAttribute("style",
                        elem.styles.inline +
                        elem.styles.transform.target +
                        elem.styles.transition.delayed
                    )
                } else {
                    elem.domEl.setAttribute("style",
                        elem.styles.inline +
                        elem.styles.transform.target +
                        elem.styles.transition.instant
                    )
                }

                // Let's queue the "afterReveal" callback and mark the element as seen and revealing.
                // 让我们对 "afterReveal"回调进行排队，并将元素标记为可见和显示
                _queueCallback("reveal", elem, delayed);
                elem.revealing = true;
                elem.seen = true;

                if (elem.sequence) {
                    _queueNextInSequence(elem, delayed);
                }
            } else if (_shouldReset(elem)) {
                // Otherwise reset our element and trigger the "beforeReset" calllback.
                elem.config.beforeReset(elem.domEl);
                elem.domEl.setAttribute("style",
                    elem.styles.inline +
                    elem.styles.transform.initial +
                    elem.styles.transition.instant
                );

                // And queue the "afterReset" callback.
                _queueCallback("reset", elem);
                elem.revealing = false;
            }

        })
    }


    // 依次排队 queue next in sequence
    function _queueNextInSequence(elem, delayed) {
        var elapsed = 0;
        var delay = 0;
        var sequence = sr.sequences[elem.sequence.id];

        // We're processing a sequenced element, so let's block other elements in this sequence.
        // 我们正在处理一个有序的元素，所以让我们按照这个顺序来阻塞其他元素
        sequence.blocked = true;

        // Since we're triggering animation a part of a sequence after animations on first load,
        // we need to check for that condition and explicitly add the delay to our timer.
        // 因为我们在第一次加载动画之后触发动画一部分，所以我们需要检查这个条件，并明确第将延迟加到我们的定时器。
        if (delayed && elem.config.useDelay === "onload") {
            delay = elem.config.delay;
        }

        // If a sequence timer is already running ,capture the elapsed time and clear it.
        if (elem.sequence.timer) {
            elapsed = Math.abs(elem.sequence.timer.started - new Date());
            window.clearTimeout(elem.sequence.timer);
        }

        // Start a new timer.
        elem.sequence.timer = { started: new Date() };
        elem.sequence.timer.clock = window.setTimeout(function () {
            // Sequence interval has passed, so unblock the sequence and re-run the handler.
            sequence.blocked = false;
            elem.sequence.timer = null;
            _handler();
        }, Math.abs(sequence.interval) + delay - elapsed);

    }

    // 队列回调
    function _queueCallback (type, elem, delayed) {
        var elapsed = 0;
        var duration = 0;
        var callback = "after";

        // Check which callback we're working with.
        switch (type) {
            case "reveal":
                duration = elem.config.duration;
                if (delayed) {
                    duration += elem.config.delay;
                }
                callback += "Reveal";
                break;

            case "reset":
                duration = elem.config.duration;
                callback += "Reset";
                break;
        }

        // If a timer is already running, capture the elapsed time and clear it.
        if (elem.timer) {
            elapsed = Math.abs(elem.timer.started - new Date());
            window.clearTimeout(elem.timer.clock);
        }

        // Start a new timer
        elem.timer = {started: new Date()};
        elem.timer.clock = window.setTimeout(function () {
            // The timer completed, so let's fire the callback and null the timer.
            elem.config[callback](elem.domEl);
            elem.timer = null;
        }, duration - elapsed )

    }

    // 显示
    function _shouldReveal (elem) {
        // 如果 elem. sequence 存在，确实是存在的
        if (elem.sequence) {
            //
            var sequence = sr.sequences[elem.sequence.id];
            return sequence.active && !sequence.blocked && !elem.revealing && !elem.disabled
        }
        return _isElemVisible(elem) && !elem.revealing && !elem.disabled;
    }

    // 延时
    function _shouldUseDelay (elem) {
        var config = elem.config.useDelay;

        /*
         * (1.) 如果 config 等于 always 由于 defaults 对象中默认写的延迟就是 always 所以这里返回 true
         * (2.) config 等于 onload 并且 sr.initialized 取反等于 true, 由于 ScrollReveal 构造函数中默认的
         *      sr.initialize = false 所以这里为true
         * (3.) config 等于 once 并且 elem.seen 取反等于 true : 在 reveal() 方法中 for 循环的 else 判断中
         *      执行完毕之后此 for 循环后 elem.seen 默认就是 false, 所以取反为 true。
         */
        return config === "always" ||
            (config === "onload" && !sr.initialized) ||
            (config === "once" && !elem.seen);
    }

    // 重置
    function _shouldReset (elem) {
        if (elem.sequence) {
            var sequence = sr.sequences[elem.sequence.id];
            return !sequence.active &&
                elem.config.reset &&
                elem.revealing && !elem.disabled;
        }
        return !_isElemVisible(elem) &&
            elem.config.reset &&
            elem.revealing && !elem.disabled;

    }

    // 取得容器 container 的大小
    function _getContainer (container) {
        return {
            width: container.clientWidth,
            height: container.clientHeight
        }
    }

    // 滚动 : 返回容器的滚动值 + 元素在页面中的偏移量
    function _getScrolled (container) {
        // Return the container scroll values, plus the its offset.
        // 返回容器的滚动值 加上他的偏移量
        // 如果 container 存在，并且 container 不等于 html 元素
        if (container && container !== window.document.documentElement) {
            var offset = _getOffset(container);
            return {
                // container.scrollLeft 是容器的水平左侧隐藏区域  + container 在页面的横轴的偏移量
                x: container.scrollLeft + offset.left,
                // container.scrollTop 是容器的垂直上侧隐藏区域 + container 在页面中的Y轴的偏移量
                y: container.scrollTop + offset.top
            }
        } else {
            // Otherwise, default to the window object's scroll values.
            // 否则，默认为窗口对象的滚动值。
            return {
                x: window.pageXOffset,
                y: window.pageYOffset
            }
        }
    }


    // 取得元素的偏移量
    function _getOffset (domEl) {
        var offsetTop = 0;
        var offsetLeft = 0;

        // Grab the element's dimensions. 取得元素的尺寸
        var offsetHeight = domEl.offsetHeight;
        var offsetWidth = domEl.offsetWidth;

        do {
            if (!isNaN(domEl.offsetTop)) {
                offsetTop += domEl.offsetTop;
            }
            if (!isNaN(domEl.offsetLeft)) {
               offsetLeft += domEl.offsetLeft;
            }
            domEl = domEl.offsetParent;
        } while (domEl);

        return {
            top:    offsetTop,
            left:   offsetLeft,
            height: offsetHeight,
            width:  offsetWidth
        }
    }


    // 元素显示 : 此方法在 _setActiveSequences() 内部的 for 循环内被调用，elem 参数是在 _setActiveSequences() 内部
    // 传入，也就是每个元素
    function _isElemVisible (elem) {
        // 取得元素的偏移量
        var offset =    _getOffset(elem.domEl);
        // 取得父容器
        var container = _getContainer(elem.config.container);

        // 取得父容器的 scroll : 【容器的滚动值 + 元素在页面中的偏移量】
        var scrolled =  _getScrolled(elem.config.container);
        // console.log("scrolledX" + scrolled.x);
        // console.log("scrolledY" + scrolled.y);

        var vF =        elem.config.viewFactor;
        // console.log(vF);        // 9 个 0.2

        // Define the element geometry; 定义元素的几何形状
        var elemHeight =    offset.height;          // 元素的高
        var elemWidth =     offset.width;           // 元素的宽
        var elemTop  =      offset.top;             // 元素距离根元素的可视窗口纵向偏移量
        var elemLeft =      offset.left;            // 元素距离根元素的可视窗口横向偏移量
        var elemBottom =    elemTop + elemHeight;   // 元素距离底部的偏移量
        var elemRight =     elemLeft + elemWidth;   // 元素距离右侧的偏移量

        return confirmBounds() || isPositionFixed();

        // confirm bounds 确认界限
        function confirmBounds () {
            // Define the element's functional boundaries using its view factor.
            // 使用视图因子定义元素的功能边界。
            // top, left, bottom, right 定义元素距离上下左右的距离
            var top =           elemTop + elemHeight * vF;
            var left =          elemLeft + elemWidth * vF;
            var bottom =        elemBottom - elemHeight * vF;
            var right =         elemRight - elemWidth * vF;

            // console.log("top " + top);
            // console.log("left " + left);
            // console.log("bottom " + bottom);
            // console.log("right " + right);

            // Define the container functional boundaries using its view offset.
            // 使用其视图偏移来定义容器的功能边界。
            var viewTop  =      scrolled.y + elem.config.viewOffset.top;
            var viewLeft =      scrolled.x + elem.config.viewOffset.left;
            var viewBottom =    scrolled.y - elem.config.viewOffset.bottom + container.height;
            var viewRight =     scrolled.x - elem.config.viewOffset.right + container.width;

            // console.log("viewTop " + viewTop);
            // console.log("viewLeft " + viewLeft);
            // console.log("viewBottom " + viewBottom);
            // console.log("viewRight " + viewRight);


            return top < viewBottom &&
                bottom > viewTop &&
                left < viewRight &&
                right > viewLeft;

        }

        function isPositionFixed () {
            return (window.getComputedStyle(elem.domEl).position === "fixed");
        }
    }





    /** ------ Utilities 工具集 ------ **/
    function Tools(){}

    // 检测参数是不是对象
    Tools.prototype.isObject = function(object){
        //1.不为null. 2是object. 3.构造函数为Object.
        return object !== null && typeof object === "object" && object.constructor === Object;
        //object.constructor 我感觉应该写成 object.prototype.constructor
    };

    // 检测参数是不是node节点
    Tools.prototype.isNode = function(object){
        // 0. 确定一个值是哪种基本类型可以使用 typeof 操作符，而确定一个值是哪种引用类型可以使用 instanceof 操作符。
        // 1. object instanceof window.Node : 检测object参数是不是属于Node(节点类型)
        //  console.log(object instanceof window.Node);
        // console.log(window.Node);
        return typeof window.Node === "object"
            ? object instanceof window.Node
            : object && typeof object === "object" &&
            typeof object.nodeType === "number" &&
            typeof object.nodeName === "string"
    };

    // 检测参数是不是节点列表(class/ele tag)
    Tools.prototype.isNodeList = function(object){
        /*
         * Object.prototype.toString.call([value]) :通过获取 Object 原型上的 toString 方法，让方法中的
         *  this 变为需要检测的数据类型，并且让方法执行。
         *      var obj = {name: "WANG"};
         *      var str =      "250";
         *      var bool =     true;
         *      var arr =      [20, 30];
         *      console.log(Object.prototype.toString.call(obj));     // [object Object]
         *      console.log(Object.prototype.toString.call(str));     // [object String]
         *      console.log(Object.prototype.toString.call(bool));    // [object Boolean]
         *      console.log(Object.prototype.toString.call(arr));     // [object Array]
         */
       var prototypeToString = Object.prototype.toString.call(object);

       var regex = /^\[object (HTMLCollection|NodeList|Object)\]$/;
       return typeof window.NodeList === "object" ? object instanceof window.NodeList : object
           && typeof object === "object" && regex.test(prototypeToString) &&
           typeof object.length === "number" && (object.length === 0 || this.isNode(object[0]))
    };

    // 当前对象本身(用于拷贝继承)
    // 此forOwn()方法在下面的 extend() 方法中调用: 第一个object 实际上为文件最上面的 ScrollReveal 构造函数
    Tools.prototype.forOwn = function(object, callback){
        // 1.如果参数 object 不是对象
        if(!this.isObject(object)){
            throw new TypeError("Expected 'object', but Received (期待值为对象，但被拒绝)" + typeof object + ".")
        }else{
            //
            for(var property in object){
                // 使用 hasOwnProperty() 方法可以检测一个属性是存在于实例中，还是存在于原型中，这个方法从 Object 继承而来，
                // 只在给定属性存在于对象实例中时才会返回 true。 --> 示例见同目录的: js高程hasOwnProperty().js
                // 此处用来检测 property 是否存在你自定义的对象字面量中，但此时明显是属于的。
                // 创建自定义对象的最简单方式就是【创建一个 Object 的实例】，创建Object的实例有2中方式
                // + 1.var person = new Object() --> 这样 new 一个 Object对象的实例
                // + 2.var person = {}  --> 这样创建一个"对象字面量"
                if(object.hasOwnProperty(property)){
                    // 把当前属性 property 传入到回调函数
                    callback(property);
                }
            }
        }
    };

    // extend: 扩展方法， 把第二个对象扩展到第一个对象
    // target 为 ScrollReveal.prototype.defaults 对象
    // source 为调用 ScrollReveal 构造函数的 reveal() 方法时自定义的一个 configure 配置对象 :
    Tools.prototype.extend = function(target, source){
        this.forOwn(source, function(property){
            // 如果 source[property] 又是对象的话 --> 就是说我们调用时写的 configure 配置对象里面的某项属性又是对象的话
            if(this.isObject(source[property])){
                // 假如 target 不存在此属性，或者 target 的此 property 属性不是对象
                if(!target[property] || !this.isObject(target[property])){
                    // 就把一个空对象赋值给当前 target.property属性。[为什么要这么做呢？: 因为比如 target 中并没有 "name"
                    // 属性，但是你想拷贝的对象中，有一个 name 属性，而且此属性代表的还是一个对象；所以那只有在 target中创建一
                    // 个 target.name 并把一个空对象赋值给当前属性]
                    target[property] = {};
                }

                // 如果 target 中存在 property 属性，而且 property 属性代表的还是对象
                // 此时已判断source[property]是对象, 直接把source[property]对象扩展到此对象上
                this.extend(target[property], source[property]);

            }else{

                // 如果source[property]不是对象的(注: 一般都会走这里，因为我们自定义的 configure 差不多都是css属性)，
                // 就把source的属性赋值给target的当前属性
                target[property] = source[property];
            }
        }.bind(this));  // ES5 的方法 bind() --> 讲解见同级目录: js高程---bind().html

        // 最后返回target : ScrollReveal.prototype.defaults 对象
        return target;
    };

    // 拷贝克隆: 调用extend()方法
    Tools.prototype.extendClone = function(target, source){
        return this.extend(this.extend({}, target),source);
    };

    //
    Tools.prototype.isMobile = function () {
        return /Andorid|webOs|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    };

    // Polyfills
    _requestAnimationFrame = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function (callback){
                window.setTimeout(callback, 1000/60);
            };

    // Module wrapper 模块包装
    if(typeof define === "function" && typeof define.amd === "object" && define.amd){
        define(function(){
          return ScrollReveal;
        })
    }else if(typeof module !== "undefined" && module.exports){
        module.exports = ScrollReveal;
    }else{
        window.ScrollReveal = ScrollReveal;
    }


})();


