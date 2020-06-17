/** 封装跨浏览器添加事件 **/
let EventUtil = {
    addHandler: function (element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
    }, //添加跨浏览器的事件

    removeHandler: function (element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(element, type, handler);
        } else if (element.detachEvent) {
            element.detachEvent("on" + type, handler);
        } else {
            element["on" + type] = null;
        }
    },//移除跨浏览器的事件

    getEvent: function (event) {
        return event ? event : window.event;
    },//取得跨浏览器的事件event

    getTarget: function (event) {
        return event.target || event.srcElement;
    },//取得事件的目标

    preventDefault: function (event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = null;
        }
    },//取消事件的默认行为

    stopPropagation: function (event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    },//取消事件的进一步传播和冒泡

    getRelatedTarget: function (event) {
        if (event.relatedTarget) {
            return event.relatedTarget;
        } else if (event.toElement) {
            return event.toElement;
        } else if (event.fromElement) {
            return event.fromElement;
        } else {
            return null;
        }
    }, //取得相关元素的方法

    getButton: function (event) {
        if (document.implementation.hasFeature("MouseEvents", "2.0")) {
            return event.button;
        } else {
            switch (event.button) {
                case 0:
                case 1:
                case 3:
                case 5:
                case 7:
                    return 0;
                case 2:
                case 6:
                    return 2;
                case 4:
                    return 1;
            }
        }
    },// 取得跨浏览器的鼠标按钮事件

    getWheelDelta: function (event) {
        if (event.wheelDelta) {
            return event.wheelDelta;
        } else {
            return -event.detail * 40;
        }
    }, //鼠标滚轮事件

    getCharCode: function (event) {
        if (typeof event.charCode == "number") {
            return event.charCode;
        } else {
            return event.keyCode;
        }
    } //取得字符编码
};


// 1.trim: 去掉字符串的前后空格。 \s: 匹配一个空白字符
let trim= function(el){
    return  el.replace(/(^\s*)|(\s*$)/g, "");
};

// 2.把数字转为字符串后,截取小数点后两位
// ( slice dot after two places [ Interception of two decimal places ] )
// \d: 匹配0-9的任何数字。 \(?:): 非捕获型分组。 ?: 匹配前面元字符0次或1次，/ba？/: 将匹配b 或 ba
let dotAfterTwo= function(el){
    var reg = /^\d+(?:\.\d{0,2})?/;
    return String(el).match(reg)[0];
};

// 3.通过id获取元素
let getId= function(id) {
    return typeof id === "string" ? document.getElementById(id): id;  // 如果不是字符串直接返回此参数
};

// 4.通过标签名tagName获取元素
let getTagName= function(tagName, oParent){
    // 有父级就在在此元素之下查找，没有直接从document开始查找
    return (oParent || document).getElementsByTagName(tagName);
};

// 5.通过className获取元素
let getClassName= function(oClass, oParent){
    var obj = oParent || document;
    var arr = [];
    if(document.getElementsByClassName){
        return obj.getElementsByClassName(oClass);
    }else{
        var alls = obj.getElementsByTagName("*");
        for(var i=0; i<alls.length; i++){
            if(hasClass(alls[i], oClass)){
                arr.push(alls[i]);
            }
        }
        return arr;
    }
};

// 6.取得当前元素的className的数量
let getClassNum= function(el){
    // split()基于指定的分隔符将一个字符串分割成多个子字符串，并将结果放在一个数组中。
    return el.className.split(/\s+/);
};

// 7.取得当前元素的索引
let getIndex= function(el){
    var n=0;
    // 同级节点中第一个节点的previousSibling属性为null,最后一个节点的nextSibling属性为null;
    var pre = el.previousSibling;
    while(pre != null){
        if(pre.nodeType == 1){
            n++;
        }
        pre = pre.previousSibling;
    }
    return n;
};

// 11.判断数组(类数组)包含特定项就返回此项的索引，如果没有就返回-1
let arrIndexOf= function(oneOf, arr){
    for(var i=0; i<arr.length; i++){
        if(arr[i] == oneOf){
            return i;
        }
    }
    return -1;
};

// 8.给元素添加class
let addClass= function(addClassName, el){
    var oldClassName = el.className;
    if(oldClassName == ""){
        oldClassName = addClassName;
        return oldClassName;
    }else{
        var aClassName = oldClassName.split(" ");
        var oIndex = arrIndexOf(aClassName, addClassName);
        if(oIndex == -1){
            oldClassName += " " + addClassName;
            return  oldClassName;
        }
    }
};

// 9.删除元素的class
let removeClass= function(remClassName, el){
    var oldClassName = el.className;
    if(oldClassName != ""){
        var aClassName = oldClassName.split(" ");
        var oIndex = arrIndexOf(remClassName, aClassName);
        if(oIndex != -1){
            //splice() 方法始终都会返回一个数组，该数组中包含从原始数组中删除的项（如果没有删除任何项，则返回一个空数组）
            aClassName.splice(oIndex, 1); //删除当前项
            oldClassName = aClassName.join(" ");
            return oldClassName;
        }
    }
};

// 10.判断元素是不是有某个样式hasClass
let hasClass= function(curClass, el){
    var curClaName = el.className,  //获取el现有的className
        claNameArr = curClaName.split(/\s+/);//通过split空字符将cls转换成数组.

    for(var i =0; i<claNameArr.length; i++) {
        if(claNameArr[i] == curClass) {//循环数组, 判断是否包含claName
            return true;  //返回true代表含有当前要判断的claName
        }
    }
    return false;  //返回false代表没有
};


// 12.仿jQuery的siblings方法
let siblings= function(el){
    var arr = [];
    var previousSib = el.previousSibling;
    while(previousSib){
        if(previousSib.nodeType === 1){
            arr.push(previousSib);
        }
        previousSib = previousSib.previousSibling;
        arr.reverse(); //把顺序反转一下，这样元素的顺序就是按照先后的了
    }
    var nextSib = el.nextSibling;
    while(nextSib){
        if(nextSib.nodeType === 1){
            arr.push(nextSib);
        }
        nextSib = nextSib.nextSibling;
    }
    return arr;
};

// 13.获取元素的偏移量: 调用方式 getPosition(el).left/top
let getPosition= function(el){
    var curEleLeft = el.offsetLeft;
    var curEleTop = el.offsetTop;
    var curEleParent = el.offsetParent;
    while(curEleParent != null){
        curEleLeft += curEleParent.offsetLeft;
        curEleTop += curEleParent.offsetTop;
        curEleParent = curEleParent.offsetParent;
    }
    return {left: curEleLeft, top: curEleTop};
};

// 14.获取元素的样式(通过计算后的所有样式)
let getCss= function(attr, el){
    if(window.getComputedStyle){
        return window.getComputedStyle(el, false)[attr];
    }else{
        return el.currentStyle[attr];
    }
};

// 15.把字符串转换为json
let toJson = function(theData){
    if(typeof(theData) == ""){
        return JSON.parse(theData);
    }else{
        return theData;
    }
};



// requestAnimationFrame polyfill
(function() {
    let lastTime = 0;
    const vendors = ['ms', 'moz', 'webkit', 'o'];
    for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }
    if (!window.requestAnimationFrame){
        window.requestAnimationFrame = function(callback, element) {
            let currTime = new Date().getTime();
            let timeToCall = Math.max(0, 16 - (currTime - lastTime));   // 回调时间
            let id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        }
    }
}());

// 基础动画(basic animation)
//obj为对象字面量, fnCallBack为回调函数
function basicAnimation(ele, obj, oncePx, fnCallBack){
    function getOffsetAttr(attr){
        let direction;
        switch(attr){
            case "left":
                direction = "offsetLeft";
                break;
            case "top":
                direction = "offsetTop";
                break;
            case "height":
                direction = "offsetHeight";
                break;
            case "width":
                direction = "offsetWidth";
                break;
            default:
                console.log("不支持此方向的运动效果!");
        }
        return direction;
    }

    function step(ele, attr, target){
        console.log("step target: ", target);
        attr = attr.toLowerCase();
        let nOffset;
        if(attr === "opacity"){
            if(target > 1 || target < 0){
                console.log("opacity的变化范围越界");
            }
            let val = ele.currentStyle ? ele.currentStyle.opacity : getComputedStyle(ele, "").opacity;
            if(val === 1 || typeof val == "undefined"){
                ele.style.opacity = 1;
                ele.style.filter = "alpha(opacity = 100)";
            }else{
                ele.style.opacity = val;
                ele.style.filter = "alpha(opacity=" + val *100 + ")";
            }
            nOffset = 0.043;
            let currentVal = parseFloat(ele.style.opacity);
            if(currentVal < target){
                if(currentVal + nOffset > target){
                    ele.style.opacity = target;
                    ele.style.filter = "alpha(opacity=" + target *100 + ")";
                    return "ok";
                }else{
                    ele.style.opacity = currentVal + nOffset;
                    ele.style.filter = "alpha(opacity=" + (currentVal + nOffset)*100 + ")";
                    ele.f = 0;
                }
            }else if(currentVal > target){
                if(currentVal - nOffset < target){
                    ele.style.opacity = target;
                    ele.style.filter = "alpha(opacity=" + target *100 + ")";
                    return "ok";
                }else{
                    ele.style.opacity = currentVal - nOffset;
                    ele.style.filter = "alpha(opacity=" + (currentVal - nOffset)*100 + ")";
                    ele.f = 0;
                }//负方向的过界判断结束
            }else {
                return "ok";
            }
        }else{
            let direction = getOffsetAttr(attr);
            let currentPosition = ele[direction];
            // 单步步长，单步的偏移量，单步速度
            nOffset = oncePx;
            if(currentPosition < target){
                // 正向过界判断
                if (currentPosition + nOffset > target) {
                    ele.style[attr] = target + "px";
                    console.log('if ele.style[attr]: ', ele.style[attr]);
                } else {
                    ele.style[attr] = currentPosition + nOffset + "px";
                    console.log('else ele.style[attr]: ', ele.style[attr]);
                }
            }else if(currentPosition > target) {
                // 负向过界判断
                if(currentPosition - nOffset < target){
                    ele.style[attr] = target + "px";
                }else{
                    ele.style[attr] = currentPosition - nOffset + "px";
                }
            } else {
                return "ok";
            }
        }

    }

    function move(){
        // cancelAnimationFrame();
        window.clearTimeout(ele.timer);

        // 设置一个标示符，默认为 false 表示不运动
        let flag = false;

        for (let attr in obj) {
            // 把 flag 改为 true 表示还要继续运动
            if(step(ele, attr, obj[attr]) !== "ok"){
                flag = true;
            }
        }

        console.log('flag: ', flag);

        if (flag) {
            ele.timer = requestAnimationFrame(move);
        } else {
            if(typeof fnCallBack == "function"){
                // output: window
                console.log("fnCallBack.call(this): ", this);
                fnCallBack.call(this);
            }
        }
    }
    move();
}



// 封装发送验证码对象: 因为一个页面可能有2个发送验证码的按钮，所以写成对象，在需要的地方创建单独的实例
function SendVerCode(){
    if(typeof this === "undefined" || Object.getPrototypeOf(this) !== SendVerCode.prototype ){
        return new SendVerCode();
    }
}
SendVerCode.prototype.verCode = function(ele, num){
    sendVerCodeFun(ele, num)
};
function sendVerCodeFun(ele, num){
    ele.style.backgroundColor = "#ffe7d1";
    if(num == 0){
        //倒计时完成接触禁用发送按钮
        ele.removeAttribute("disabled");
        ele.value = "获取验证码";
        num = 60;
        ele.style.backgroundColor = "#fff";
    }else{
        ele.setAttribute("disabled", true);
        ele.value = "重新发送" + "(" + num + ")";
        num--;
        setTimeout(function(){sendVerCodeFun(ele, num)}, 1000);
    }
}


/*
//封装发送验证码对象: 因为一个页面可能有2个发送验证码的按钮，所以写成对象，在需要的地方创建单独的实例
//点击“发送验证码”
function SendVerCode(){
    return this.init.apply(this, arguments);
}
SendVerCode.prototype = {
    init: function(){},
    verCode: function(ele, num){
        sendVerCodeFun(ele, num)
    }
};

function sendVerCodeFun(ele, num){
    ele.style.backgroundColor = "#ffe7d1";
    if(num == 0){
        //倒计时完成接触禁用发送按钮
        ele.removeAttribute("disabled");
        ele.value = "获取验证码";
        num = 60;
        ele.style.backgroundColor = "#fff";
    }else{
        ele.setAttribute("disabled", true);
        ele.value = "重新发送" + "(" + num + ")";
        num--;
        setTimeout(function(){sendVerCodeFun(ele, num)}, 1000);
    }
} */





