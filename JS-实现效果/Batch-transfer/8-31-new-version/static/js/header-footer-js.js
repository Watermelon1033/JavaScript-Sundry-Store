$(function () {
    // "头部 / 页脚" 下所有的a标签添加: 鼠标移动上字体变蓝移开还原事件
    $(".header-wall a").hover(function(){
        this.style.color = "#1198E3";
    }, function(){
        this.style.color = "#fff";
    });
    $(".footer-wall a").hover(function(){
        this.style.color = "#1198E3";
    }, function(){
        this.style.color = "#232323";
    });


    // 给head头部的导航条添加从中间展开的长条横线
    $(".header-nav-ul li").hover(
        function(){
            $("span", this).stop().css("height", "2px");
            $("span", this).animate({
                left:"0",
                width:"100%",
                right:"0"
            }, 200);
        },
        function(){
            $("span", this).stop().animate({
                left:"50%",
                width:"0"
            }, 200)
        }
    );

    // 给头部导航条添加scrollReveal(滚动显示效果)
    /*var  defaultConfig = {
        origin:     "top",
        distance:   "60px",
        opacity:    0.4,
        scale:      1,
        /!*delay:      100,*!/
        easing:     "ease-in-out",
        reset:      false,
        duration:   150
    };
    sr.reveal(".header-wall", defaultConfig);*/

    sr.reveal(".header", {
        origin:     "bottom",
        distance:   "30px",
        opacity:    0,
        scale:      1,
        delay:      200,
        easing:     "ease-in-out",
        reset:      true,
        duration:   400
    });
});

//头部消息通知
var fnHeaderMsgTipsNum = function(java_file_path){
    $.ajax({
        type: "post",
        dataType: "json",
        async: false,
        url:  java_file_path +"/memberCenter/index",
        success: function (data) {
            if (data.ok == true) {
                newsCount = data.data.newsCount;
                $(".tips-num").html(newsCount);
            }
        }
    });
};



//切换语言
function switchLanguage(langType){
    $.ajax({
        type: "post",
        dataType: "json",
        async: false,
        url: "<%=path%>/common/switchLanguage",
        data:{"langType":langType},
        success: function (data) {
            if (data.ok == true) {
                location.reload();
            } else {
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        }
    });
}