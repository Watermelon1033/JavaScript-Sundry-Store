// ------ 消息通知-模块 ------


// 消息通知元素配置图
var NotiEles = {

    conRightPlate: getClassName("content-right-plate")[0],

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

    // 180702-edit: 创建消息列表 + 写入消息
    createInfoList: function (currentPageList) {
        if (NotiEles.infoListUl.innerHTML !== "") {
            NotiEles.infoListUl.innerHTML = "";
        }
        for (var i = 0; i < currentPageList.sysNoticeList.length; i++) {
            NotiEles.infoListUl.appendChild(createDom(currentPageList.sysNoticeList[i]));
        }

        function createDom(curList) {
            var fragment = document.createDocumentFragment();
            var infoListLi = document.createElement("li");
            infoListLi.setAttribute("data-id", curList.id);
            infoListLi.className = "info-li";
            infoListLi.setAttribute("data-li-selected", "false");
            infoListLi.innerHTML =
                '<span class="select-box" data-flag="0">' +
                '<label class="right-icon-label">' +
                '<img src="' + imgPath + 'img/notification-information/right-icon.svg" class="dis-none right-icon">' +
                '</label>' +
                '</span>' +
                '<span class="speaker-icon" data-read=' + curList.isRead + '>' +
                '<img src="' + imgPath + 'img/notification-information/speaker-icon.svg" >' +
                '<label class="unread-red-point" data-show="true"></label>' +
                '</span>' +
                '<span class="info-title">' + curList.title + '</span>' +
                '<span class="info-content dis-none">' + curList.content + '</span>' +
                '<span class="put-at-top dis-none" data-top-flag =' + curList.topFlag + '>置顶</span>' +
                '<span class="info-time">' + curList.publisherDate + '</span>';
            fragment.appendChild(infoListLi);
            return fragment;
        }

        // 调用返回的li上的 data-read 判断小红点显示/消失
        this.setReadStatus();
    },

    // 如果返回的消息列表 data-read="1" 小红点消失
    setReadStatus: function () {
        var getInfoList = getClassName("info-li", NotiEles.infoListUl),
            lisArr = [].slice.call(getInfoList);
        console.log("lisArr.length", lisArr.length);
        console.log(lisArr);

        // 已读(1)/未读(0):
        lisArr.forEach(function (item) {
            var secondSpan = item.getElementsByTagName("span")[1];
            if (secondSpan.getAttribute("data-read") === "1") {
                var redPoint = item.getElementsByTagName("span")[1].getElementsByTagName("label")[0];
                redPoint.style.cssText = "opacity: 0; transform: scale(0); translate: opacity 1s ease, transform 1s ease; ";
                redPoint.setAttribute("data-show", "false");
            }
        })
    },

    // 当前消息选中
    selectedCurInfo: function (ele) {
        var curLi, curSpan;
        if (ele.tagName === "SPAN") {
            curLi = ele.parentNode;
            curSpan = ele;
        } else if (ele.tagName === "LABEL") {
            curLi = ele.parentNode.parentNode;
            curSpan = ele.parentNode;
        }
        // 当前 li 添加浅蓝色背景
        curLi.style.backgroundColor = "#e9f6fc";
        curLi.setAttribute("data-li-selected", true);
        curSpan.setAttribute("data-flag", "1");
        // 当前复选框 span 下的 label 设置边框
        curSpan.childNodes[0].style.border = "1px solid #1198E3";
        // 复选框中的对号显示
        curSpan.childNodes[0].childNodes[0].style.display = "block";
    },

    // 当前消息取消选中
    cancelSelCurInfo: function (ele) {
        var curLi, curSpan;
        if (ele.tagName === "SPAN") {
            curLi = ele.parentNode;
            curSpan = ele;
        } else if (ele.tagName === "LABEL") {
            curLi = ele.parentNode.parentNode;
            curSpan = ele.parentNode;
        }
        curLi.style.backgroundColor = null;
        curLi.setAttribute("data-li-selected", false);
        curSpan.setAttribute("data-flag", "0");
        curSpan.childNodes[0].style.border = "1px solid #b9b9b9";
        curSpan.childNodes[0].childNodes[0].style.display = "none";
    }

};


// 调用 fnCurrentPagList 获取当前页面需要展示的列表集合
var currentPageList = AjaxConfMap.fnCurrentPageList(1);
NotiObjConfMap.createInfoList(currentPageList);


// 0613: 4个操作按钮显示动画
setTimeout(function () {
    // 4按钮包围框(wall)显示动画
    NotiEles.fourEditBtnWall.style.cssText = "z-index: 1; opacity: 1; transform: translateX(-20px); transition: opacity .6s ease, transform .6s ease;";
    NotiEles.fourEditBtnWall.setAttribute("data-flag", 1);
}, 200);


// 把事件绑定到消息列表ul上 (infoListUl)
EventUtil.addHandler(NotiEles.infoListUl, "click", function (event) {
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);

    if (target.className === "select-box") {
        if (target.getAttribute("data-flag") === "0") {
            NotiObjConfMap.selectedCurInfo(target);
        } else if (target.getAttribute("data-flag") === "1") {
            NotiObjConfMap.cancelSelCurInfo(target);
        }
    }

    if (target.className === "right-icon-label") {
        if (target.parentNode.getAttribute("data-flag") === "0") {
            NotiObjConfMap.selectedCurInfo(target.parentNode);
        } else if (target.parentNode.getAttribute("data-flag") === "1") {
            NotiObjConfMap.cancelSelCurInfo(target.parentNode);
        }
    }

    if (Tools.hasClass(target, "right-icon")) {
        target.parentNode.parentNode.parentNode.style.backgroundColor = null;
        target.parentNode.parentNode.parentNode.setAttribute("data-li-selected", false);
        target.parentNode.parentNode.setAttribute("data-flag", "0");
        target.parentNode.style.border = "1px solid #b9b9b9";
        target.style.display = "none";
    }

    // 点击标题展示弹出框显示消息内容
    if (Tools.hasClass(target, "info-title")) {
        var curLi = target.parentNode;

        var secondSpan = curLi.getElementsByTagName("span")[1];
        var fourthSpan = curLi.getElementsByTagName("span")[3];

        // 模态框居中
        fnElementCenter(Elements.modalBox);

        // 展示模态框
        MainConfMap.showModalBox();

        // 模态框显示后把当前消息内容写入其中
        var infoDetailConWall = getClassName("info-detail-content")[0];
        infoDetailConWall.innerHTML = "";
        infoDetailConWall.innerHTML = fourthSpan.innerHTML;

        // 把未读变为已读(红色按钮变大然后消失)
        var redPoint = secondSpan.getElementsByTagName("label")[0];
        redPoint.style.cssText = "opacity: 1; transform: scale(1.6); translate: opacity .1s ease, transform .1s ease; ";
        setTimeout(function () {
            redPoint.style.cssText = "opacity: 0; transform: scale(0); translate: opacity 1s ease, transform 1s ease; ";

        }, 1000);
        redPoint.setAttribute("data-show", "false");


        // 调用未读变成已读的ajax, 把当前li的 id 传给后台
        AjaxConfMap.fnInfoBecomeRead(curLi.getAttribute("data-id"));

    }

});


// 全选按钮-事件
EventUtil.addHandler(NotiEles.selectedAllBtn, "click", function () {
    var getInfoList = getClassName("info-li", NotiEles.infoListUl),
        lisArr = [].slice.call(getInfoList);
    lisArr.forEach(function (item) {
        var firstSpan = item.getElementsByTagName("span")[0];
        if (firstSpan.getAttribute("data-flag") === "0") {
            item.style.backgroundColor = "#e9f6fc";
            item.setAttribute("data-li-selected", true);
            firstSpan.setAttribute("data-flag", "1");
            // 当前复选框 span 下的 label 设置边框
            firstSpan.childNodes[0].style.border = "1px solid #1198E3";
            // 复选框中的对号显示
            firstSpan.childNodes[0].childNodes[0].style.display = "block";
        }
    })
});

// 取消选择按钮-事件
EventUtil.addHandler(NotiEles.cancelSelBtn, "click", function () {
    var getInfoList = getClassName("info-li", NotiEles.infoListUl),
        lisArr = [].slice.call(getInfoList);
    lisArr.forEach(function (item) {
        var firstSpan = item.getElementsByTagName("span")[0];
        if (firstSpan.getAttribute("data-flag") === "1") {
            item.style.backgroundColor = "";
            item.setAttribute("data-li-selected", false);
            firstSpan.setAttribute("data-flag", "0");
            firstSpan.childNodes[0].style.border = "1px solid #b9b9b9";
            firstSpan.childNodes[0].childNodes[0].style.display = "none";
        }
    })
});

// 标记为已读按钮-事件
EventUtil.addHandler(NotiEles.markAsRead, "click", function () {
    var getInfoList = getClassName("info-li", NotiEles.infoListUl),
        lisArr = [].slice.call(getInfoList);
    var spliceDataId = "";
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
            spliceDataId += item.getAttribute("data-id") + ",";
        }
    });

    if (spliceDataId !== "") {
        // 把当前列表全部标记为已读的 data-id 传到后台
        AjaxConfMap.fnAllRemarkRead(spliceDataId);

        // 最后更新未读消息
        NotiEles.unreadMsgNum.innerHTML = AjaxConfMap.fnNoReadInfoNum();
    }

});

// 删除按钮-事件
EventUtil.addHandler(NotiEles.removeBtn, "click", function () {
    var getInfoList = getClassName("info-li", NotiEles.infoListUl),
        lisArr = [].slice.call(getInfoList);
    var spliceDataId = "";
    lisArr.forEach(function (item) {
        if (item.getAttribute("data-li-selected") === "true") {
            // item.style.cssText += "background: #f1f1f1;";
            spliceDataId += item.getAttribute("data-id") + ",";
        }
    });

    if (spliceDataId !== "") {
        // 调用 单条/批量 删除消息
        AjaxConfMap.fnDeleteInfo(spliceDataId);
        // 完毕之后刷新页面
        window.location.reload();
    }

});