
// ------ 消息通知-模块 ------
var NotiEles = {

    conRightPlate: getClassName("container-right-plate")[0],

    // 未读消息数
    unreadMsgNum: getId("unread-msg-num"),


    // 4个操作按钮
    fourEditBtnWall: getId("group-four-edit-btn-wall"),
    selectedAllBtn: getId("selected-all-btn"),
    cancelSelBtn: getId("cancel-selected-btn"),
    markAsRead: getId("mark-as-read"),
    removeBtn: getId("remove-btn"),

    // 消息列表
    infoListUl: getId("information-list"),

};

var NotiObjConfMap = {

    // 创建消息列表
    createInfoList: function () {
        var fragment = document.createDocumentFragment();
        var infoListLi = document.createElement("li");
        infoListLi.setAttribute("data-li-selected", "false");
        infoListLi.innerHTML =
            '<span class="select-box" data-flag="0">' +
            '<label><img src="static/notification-img/right-icon.svg" class="dis-none"></label>' +
            '</span>' +
            '<span class="speaker-icon">' +
            '<img src="static/notification-img/speaker-icon.svg" alt="">' +
            '<label class="unread-red-point" data-show="true"></label>' +
            '</span>' +
            '<span class="info-title">【智付】关于清算系统升级维护公告 </span>' +
            '<span class="put-at-top">置顶</span>' +
            '<span class="info-time">2018-06-12 17:00:00</span>';
        fragment.appendChild(infoListLi);
        return fragment;
    },

    // 当前消息选中
    selectedCurInfo: function (ele) {
        // 当前 li 添加浅蓝色背景
        ele.parentNode.style.backgroundColor = "#e9f6fc";
        ele.parentNode.setAttribute("data-li-selected", true);

        ele.setAttribute("data-flag", "1");

        // 当前复选框 span 下的 label 设置边框
        ele.childNodes[0].style.border = "1px solid #1198E3";

        // 复选框中的对号显示
        ele.childNodes[0].childNodes[0].style.display = "block";
    },

    // 当前消息取消选中
    cancelSelCurInfo: function (ele) {
        ele.parentNode.style.backgroundColor = null;
        ele.parentNode.setAttribute("data-li-selected", false);

        ele.setAttribute("data-flag", "0");

        ele.childNodes[0].style.border = "1px solid #b9b9b9";

        ele.childNodes[0].childNodes[0].style.display = "none";
    }

};

(function (  ) {
    // 0612 - 创建消息列表 + 写入消息
    if (NotiEles.infoListUl.innerHTML !== "") {
        NotiEles.infoListUl.innerHTML = "";
    }
    for (var i = 0; i < 12; i++) {
        NotiEles.infoListUl.appendChild(NotiObjConfMap.createInfoList());
    }

    // 0613: 4个操作按钮显示动画
    setTimeout(function () {
        // 4按钮包围框(wall)显示动画
        NotiEles.fourEditBtnWall.style.cssText = "z-index: 1; opacity: 1; transform: translateX(-20px); transition: opacity .6s ease, transform .6s ease;";
        NotiEles.fourEditBtnWall.setAttribute("data-flag", 1);
    }, 200);


    // 0613: 获取当前所有的消息列表 li (公用)
    var getInfoList = NotiEles.infoListUl.getElementsByTagName("li"),
        lisArr = [].slice.call(getInfoList);

    // 复选框选中/反选事件
    var firstSpan, thirdSpan;
    for (var i = 0; i < getInfoList.length; i++) {
        firstSpan = getInfoList[i].getElementsByTagName("span")[0];

        // 把第三个 span 的高度赋值给第一个
        thirdSpan = getInfoList[i].getElementsByTagName("span")[2];
        firstSpan.style.height = thirdSpan.offsetHeight + "px";

        EventUtil.addHandler(firstSpan, "mouseenter", function () {
            this.childNodes[0].style.border = "1px solid #1198E3";
        });

        EventUtil.addHandler(firstSpan, "mouseleave", function () {
            if (this.getAttribute("data-flag") === "0") {
                this.childNodes[0].style.border = "1px solid #b9b9b9";
            }
        });

        EventUtil.addHandler(firstSpan, "click", function (i) {
            if (this.getAttribute("data-flag") === "0") {
                NotiObjConfMap.selectedCurInfo(this);
            } else if (this.getAttribute("data-flag") === "1") {
                NotiObjConfMap.cancelSelCurInfo(this);
            }
        });
    }


    // 全选按钮-事件
    EventUtil.addHandler(NotiEles.selectedAllBtn, "click", function () {
        lisArr.forEach(function (item) {
            var firstSpan = item.getElementsByTagName("span")[0];
            if (firstSpan.getAttribute("data-flag") === "0") {
                NotiObjConfMap.selectedCurInfo(firstSpan)
            }
        })
    });

    // 取消选择按钮-事件
    EventUtil.addHandler(NotiEles.cancelSelBtn, "click", function () {
        lisArr.forEach(function (item) {
            var firstSpan = item.getElementsByTagName("span")[0];
            if (firstSpan.getAttribute("data-flag") === "1") {
                NotiObjConfMap.cancelSelCurInfo(firstSpan);
            }
        })
    });

    // 标记为已读按钮-事件
    EventUtil.addHandler(NotiEles.markAsRead, "click", function () {
        lisArr.forEach(function (item) {
            var firstSpan = item.getElementsByTagName("span")[0];
            var redPoint = item.getElementsByTagName("span")[1].getElementsByTagName("label")[0];
            if (item.getAttribute("data-li-selected") === "true" && redPoint.getAttribute("data-show") === "true") {
                redPoint.style.cssText = "opacity: 1; transform: scale(1.6); translate: opacity .1s ease, transform .1s ease; ";
                setTimeout(function () {
                    redPoint.style.cssText = "opacity: 0; transform: scale(0); translate: opacity 1s ease, transform 1s ease; ";
                }, 1000);

                NotiObjConfMap.cancelSelCurInfo(firstSpan);

                redPoint.setAttribute("data-show", "false");

                // item.style.cssText += "background: #f1f1f1;";
            }
        })
    });

    // 删除按钮-事件
    EventUtil.addHandler(NotiEles.removeBtn, "click", function () {
    });
})();