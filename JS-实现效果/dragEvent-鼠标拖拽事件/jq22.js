//获取ID
var $ = function (id) {
    return typeof id === "string" ? document.getElementById(id) : id
};
//获取tagName
var $$ = function (tagName, oParent) {
    return (oParent || document).getElementsByTagName(tagName)
};
//获取class
var $$$ = function (sClass, oParent) {
    var aClass = [],
        i = 0,
        // ^ 匹配一个输入或一行的开头，/^a/匹配"an A"，而不匹配"An a"
        // $ 匹配一个输入或一行的结尾，/a$/匹配"An a"，而不匹配"an A"
        // \s 匹配一个空白字符，包括\n,\r,\f,\t,\v等
        reClass = new RegExp("(\\s|^)" + sClass + "($|\\s)"),
        aElement = $$("*", oParent);
    for (i = 0; i < aElement.length; i++){
        reClass.test(aElement[i].className) && aClass.push(aElement[i]);
    }
    return aClass;
};
//获取元素位置
function getPos(obj) {
    var iTop = obj.offsetTop;
    var iLeft = obj.offsetLeft;
    while (obj.offsetParent) {
        iTop += obj.offsetParent.offsetTop;
        iLeft += obj.offsetParent.offsetLeft;
        obj = obj.offsetParent;
    }
    return {top: iTop, left: iLeft}
}
//创建照片墙对象
var PhotoWall = function () {
    this.initialize.apply(this, arguments)
};
PhotoWall.prototype = {
    initialize: function (obj, aData) { //传进来的obj是class为box的div, aData是一个保存所有图片的数组
        var oThis = this;
        this.oParent = $(obj);//实际上这里完全可以写成this.oParent = obj; 因为obj传进来就已经是class="box"这个div了
        this.oUl = $$("ul", this.oParent)[0];//取得所有ul中的第一个
        //this.oBtn = $$("a", this.oParent)[0];//取得所有a标签的第一个
        this.zIndex = 1;
        this.aPos = [];//this.aPos数组用来保存changeLayout()方法中推入的每个li的left和top值
        this.aData = aData; //把保存了所有图片的数组aData赋值给this.aData
        this.dom = document.documentElement || document.body;
        this.create();
        this.oBtn.onclick = function () {
            oThis.randomOrder()
        }
    },
    create: function () {
        var aFrag = document.createDocumentFragment();
        var i = 0;
        for (i = 0; i < this.aData.length; i++) {
            var oLi = document.createElement("li");
            var oImg = document.createElement("img");
            oImg.src = this.aData[i];
            oLi.appendChild(oImg);
            aFrag.appendChild(oLi)
        }
        this.oUl.appendChild(aFrag);
        this.aLi = $$("li", this.oParent);
        this.changeLayout()
    },
    changeLayout: function () {
        var i = 0;
        //这里就是求出最外围class="box"的div的高度，因为有上下边框所以要减去2px
        this.oParent.style.height = this.oParent.offsetHeight - 2 + "px";
        this.aPos.length = 0;
        //遍历所有的li,并清除所有的style特性
        for (i = 0; i < this.aLi.length; i++){
            //通过 cssText 属性可以访问style特性中的CSS代码。在读取模式下， cssText 返回浏览器对 style
            //特性中 CSS 代码的内部表示。在写入模式下，赋给 cssText 的值会重写整个 style 特性的值；
            this.aLi[i].style.cssText = "";
        }
        //第二个for循环是得到元素的left和top，并推送到this.aPos[]数组中
        for (i = 0; i < this.aLi.length; i++) {
            this.aLi[i].index = i;
            this.aLi[i].style.top = getPos(this.aLi[i]).top + "px";
            this.aLi[i].style.left = getPos(this.aLi[i]).left + "px";
            this.aPos.push({left: getPos(this.aLi[i]).left, top: getPos(this.aLi[i]).top})
        }
        //第三个for循环是设置元素的position和margin,接着就调用拖拽(drag)事件,传入当前拖拽的元素
        for (i = 0; i < this.aLi.length; i++) {
            this.aLi[i].style.position = "absolute";
            this.aLi[i].style.margin = "0";
            this.drag(this.aLi[i])
        }
    },
    drag: function (obj, handle) { //obj代表上面for循环中调用drag()方法传进来的项，handle还不知道是什么
        var oThis = this;
        //从这行可以看出handle和obj应该都是代表传进来的拖拽元素，这里就当做了定义为了事件的“句柄(handle)”
        var handle = handle || obj;
        handle.style.cursor = "move";
        handle.onmousedown = function (event) {
            event = event || window.event;
            //event.clientX,event.clientY:事件发生时，鼠标在浏览器可视窗口(视口)中水平和垂直坐标
            var disX = event.clientX - this.offsetLeft;
            var disY = event.clientY - this.offsetTop;
            var oNear = null;
            handle.style.zIndex = oThis.zIndex++;

            document.onmousemove = function (event) {
                event = event || window.event;
                var iL = event.clientX - disX; //移动之后的鼠标坐标要减去元素的左上角和鼠标之间的差值
                var iT = event.clientY - disY; //同上
                //这个maxL和maxT是过界判断，如果鼠标拖拽元素的位置大于当前的窗口的宽度，就设置成当前窗口的宽度
                //因为不同浏览器取得文档的最大宽度和高度不一样,所以此处用Math.max()取得数值的最大值
                var maxL = Math.max(oThis.dom.clientWidth, oThis.dom.scrollWidth) - handle.offsetWidth;
                var maxT = Math.max(oThis.dom.clientHeight, oThis.dom.scrollHeight) - handle.offsetHeight;

                //这下面几行是根据下面注释的几行简化版本么从新写的判断版本，我觉得这样更好看懂
                if (iL < 0 || iT < 0) {
                    iL = 0;
                    iT = 0;
                } else if (iL > maxL || iT > maxT) {
                    iL = maxL;
                    iT = maxT;
                } else {
                    handle.style.left = iL + "px";
                    handle.style.top = iT + "px";
                }
                //把调用findNearest()方法取得的和元素碰撞的元素赋值给oNear变量
                oNear = oThis.findNearest(obj);
                for (var i = 0; i < oThis.aLi.length; i++) {
                    oThis.aLi[i].className = "";
                }
                if (oNear) {
                    oNear.className = "hig";
                }
                return false;


               /*
                iL < 0 && (iL = 0);
                iT < 0 && (iT = 0);
                iL > maxL && (iL = maxL);
                iT > maxT && (iT = maxT);
                handle.style.left = iL + "px";
                handle.style.top = iT + "px";
                oNear = oThis.findNearest(obj);
                for (var i = 0; i < oThis.aLi.length; i++){
                    oThis.aLi[i].className = "";
                }
                oNear && (oNear.className = "hig");
                return false*/
            };
            document.onmouseup = function () {
                document.onmousemove = null;
                document.onmouseup = null;

                if (oNear) {
                    handle.index = [handle.index, oNear.index]; //this.aLi[i].index
                    oNear.index = handle.index[0];
                    handle.index = handle.index[1];
                    oNear.style.zIndex = oThis.zIndex++;
                    oThis.doMove(handle, oThis.aPos[handle.index]);
                    oThis.doMove(oNear, oThis.aPos[oNear.index]);
                    oNear.className = "";
                } else {
                    oThis.doMove(handle, oThis.aPos[handle.index])
                }
                //release capture 捕获释放
                handle.releaseCapture && handle.releaseCapture()
            };
            this.setCapture && this.setCapture();
            return false
        };
    },
    doMove: function (obj, iTarget, callback) {
        var oThis = this;
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            var iCurL = getPos(obj).left;
            var iCurT = getPos(obj).top;
            var iSpeedL = (iTarget.left - iCurL) / 5;
            var iSpeedT = (iTarget.top - iCurT) / 5;
            //运动速度如果大于0则向下取整，如果小于0就向上取整
            iSpeedL = iSpeedL > 0 ? Math.ceil(iSpeedL) : Math.floor(iSpeedL);
            iSpeedT = iSpeedT > 0 ? Math.ceil(iSpeedT) : Math.floor(iSpeedT);

            if (iCurL == iTarget.left && iCurT == iTarget.top) {
                clearInterval(obj.timer);
                callback && callback()
            } else {
                obj.style.left = iCurL + iSpeedL + "px";
                obj.style.top = iCurT + iSpeedT + "px"
            }
        }, 30)
    },
    //取得相碰撞元素中，离自己最近的元素
    findNearest: function (obj) { //obj是上面document.onmousemove中调用此方法，传进来的当前拖拽对象
        var aDistance = []; //创建一个用来保存距离的数组
        var i;
        for (i = 0; i < this.aLi.length; i++){
            //js中最大数值保存在Number.MAX_VALUE中
            //如果this.aLi[i]等于obj的话就把最大数值赋值给this.aLi[i],如果不等于就调用当前对象(this)的getDistance()方法,
            //并传入当前对象obj和this.aLi[i]项li，最后把调用getDistance()方法得到的一个值赋值给aDistance数组的当前项。
            aDistance[i] = this.aLi[i] == obj ? Number.MAX_VALUE : this.getDistance(obj, this.aLi[i])
        }

        var minNum = Number.MAX_VALUE;
        var minIndex = -1;
        for (i = 0; i < aDistance.length; i++){
            //aDistance[i] < minNum && (minNum = aDistance[i], minIndex = i);
            //上面的一行写法就等于下面这个判断语句
            if(aDistance[i] < minNum){
                minNum = aDistance[i];
                minIndex = i;
            }
        }
        //最后返回的是this.aLi[minIndex]就是离拖拽元素最近的元素
        return this.isButt(obj, this.aLi[minIndex]) ? this.aLi[minIndex] : null
    },
    //求两点之间的距离
    getDistance: function (obj1, obj2) {
        var a = (obj1.offsetLeft + obj1.offsetWidth / 2) - (obj2.offsetLeft + obj2.offsetWidth / 2);
        var b = (obj1.offsetTop + obj1.offsetHeight / 2) - (obj2.offsetTop + obj2.offsetHeight / 2);
        //a*a + b*b 是利用勾股定理(a的平方 + b的平方 = c的平方)  sqrt()是开平方
        return Math.sqrt(a * a + b * b)
    },
    //碰撞检测(butt: 烟头，碰撞)
    isButt: function (obj1, obj2) {
        var l1 = obj1.offsetLeft;
        var r1 = l1 + obj1.offsetWidth;
        var t1 = obj1.offsetTop;
        var b1 = t1 + obj1.offsetHeight;

        var l2 = obj2.offsetLeft;
        var r2 = l2 + obj2.offsetWidth;
        var t2 = obj2.offsetTop;
        var b2 = t2 + obj2.offsetHeight;

        //return !(r1 < l2 || b1 < t2 || r2 < l1 || b2 < t1) //这一行就等于下面的判断
        if(r1 < l2 || l1 > r2 || t1 > b2 || b1 < t2){
            return false;
        }else{
            return true;
        }
    },
    /*randomOrder: function () {
        this.aPos.sort(function () {
                return Math.random() > 0.5 ? 1 : -1
            }
        );
        for (var i = 0; i < this.aLi.length; i++) {
            this.aLi[i].index = i;
            this.doMove(this.aLi[i], this.aPos[i])
        }
    }*/
};
window.onload = function () {
    var aBox = $$$("box"); //取得class为box的div
    var aData = [];   //aData数组用来保存图片
    var aExample = []; //aExample数组用来保存每个oExample对象，每个oExample对象都调用PhotoWall对象来达到拖拽效果
    var i = 0;
    //生成图片数据
    for (i = 1; i < 9; i++) {
        aData[aData.length] = "images/wall" + i + ".jpg";
    }
    //循环创建多个实例
    for (i = 0; i < aBox.length; i++) {
        
        new PhotoWall(aBox[i], aData);
     //源代码为下面注释的两行，但是发现吧对象推到aExample完全没有用，所以下面的onresize也是注销了，
     //多组有多组可拖拽的照片墙的时候，下面的这种写法估计就用得上了
        
        /*var oExample = new PhotoWall(aBox[i], aData);
        //创建一个oExample对象，并把此对象推入到aExample数组中
        aExample.push(oExample)*/
    }
    /*this.onresize = function () {
        for (var x in aExample) {
            aExample[x].changeLayout();
        }
    };
    this.onresize();*/
};
