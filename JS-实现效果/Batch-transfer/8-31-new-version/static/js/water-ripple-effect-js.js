/**
 * js + css3 实现水波纹效果
 */

var rippleConfigMap = {
    frameCount: 1,
    createHtml: function(rippleWall, color){
        var rippleContainer = document.createElement("span");
        rippleContainer.className = addClass("ripple-container", rippleContainer);
        var rippleEle = document.createElement("span");
        rippleEle.className = addClass("ripple", rippleEle);
        // 为了复用把水波纹元素的背景颜色当参数传入
        rippleEle.style.backgroundColor = color;
        rippleContainer.appendChild(rippleEle);
        rippleWall.appendChild(rippleContainer);
    },

    initEleStyle: function(event, rippleWall){
        var ripContainerEle = rippleWall.getElementsByClassName("ripple-container")[0],
            rippleEle = rippleWall.getElementsByClassName("ripple")[0];

        var rect, x, y, curOffset, scaleSty, radius;
        rect = rippleWall.getBoundingClientRect();

        var rectWid = rect.width,
            rectHei = rect.height;
        radius = Math.sqrt(rectWid*rectWid + rectHei*rectHei);
        x = event.clientX - rect.left;
        y = event.clientY - rect.top;

        curOffset = "translate(" + x + "px, " + y + "px)";
        scaleSty = " scale(0.001, 0.001)";
        var transformSty = curOffset + ' translate(-50%, -50%)' + scaleSty;

        rippleEle.style.width = radius *2 + 'px';
        rippleEle.style.height = radius *2 + 'px';
        rippleEle.style.opacity = "0.6" ;
        rippleEle.style.transform = transformSty;

        if(hasClass("animate-transition", rippleEle)){
            rippleEle.className = removeClass("animate-transition", rippleEle);
        }
        ripContainerEle.style.width = rectWid + "px";
        ripContainerEle.style.height = rectHei + "px";

        return curOffset;
    },

    fnRippleEffect: function (curOffset, rippleWall) {
        var rippleEle = rippleWall.getElementsByClassName("ripple")[0];
        var frameCount = this.frameCount;
        var rippleAnimate = function(){
            if ( frameCount-- > 0) {
                requestAnimationFrame(rippleAnimate);
            } else {
                var scaleSty = " scale(1, 1)";
                rippleEle.style.transform = curOffset + ' translate(-50%, -50%)' + scaleSty;

                if(hasClass("animate-transition", rippleEle) === false){
                    rippleEle.className = addClass("animate-transition", rippleEle);
                }
                frameCount = rippleConfigMap.frameCount;
            }
        };
        rippleAnimate();
    },

    fnHideRippleEle: function(rippleWall){
        var rippleEle = rippleWall.getElementsByClassName("ripple")[0];
        setTimeout(function() {
            rippleEle.style.opacity = '0';
        }, 0)
    }
};