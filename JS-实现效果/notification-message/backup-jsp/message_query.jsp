    <%@ page language="java" import="java.util.*" pageEncoding="UTF-8" %>
        <%@include file="/WEB-INF/view/include/i18n.jsp" %>

        <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
        <html>
        <head>
        <title><spring:message code='Message.notification.query'/></title><!--消息 通知查询 -->
        <link rel="icon" type="image/png" href="<%=static_path %>/img/xiaoLogo.png" sizes="32x32">

        <link rel="stylesheet" type="text/css" href="<%=static_path %>/css/reset.css">
        <link rel="stylesheet" type="text/css" href="<%=static_path %>/css/publicStyle.css">
        <link rel="stylesheet" type="text/css" href="<%=static_path %>
        /css/account-settings/account-settings-body-left.css">
        <link rel="stylesheet" type="text/css" href="<%=static_path %>
        /css/account-settings/account-settings-body-right.css">
        <link rel="stylesheet" type="text/css" href="<%=static_path %>
        /css/notification-information-css/notification-information.css">
        <link rel="stylesheet" type="text/css" href="<%=static_path %>/css/pagination-css/pagination.css">

        <script type="text/javascript" src="<%=static_path %>/js/jq/jquery.min.js"></script>
        <script type="text/javascript">
        window.imgPath = "<%=static_path %>/";

        // 判断中英文标识
        window.languageFlag = "${pageContext.response.locale}";

        // 当前选中的页码数
        window.activePagNum = null;

        </script>
        </head>

        <body>

        <div class="posRelative minHei100Per">

        <!--头部 header wall-->
        <div class="headerWall">
        <jsp:include page="../include/head.jsp"></jsp:include>
        </div>
        <!--头部 header wall-->

        <!--主体 main-->
        <div style="overflow: hidden;">
        <div class="main content-wall">
        <!--内容左侧导航-->
        <jsp:include page="../include/leftMenu.jsp"></jsp:include>


        <!--内容右侧-->
        <div class="content-right-plate">
        <!-- 消息头部 -->
        <p class="information-title">
        <span class="unread-msg"><spring:message code="dinpay.pms.jsp.unread.message"/><i class="unread-msg-num"
        id="unread-msg-num">XXX</i></span><!--未读消息 -->

        <!-- 4个操作按钮 -->
        <span class="group-four-edit-btn-wall" id="group-four-edit-btn-wall" data-flag="0">
        <label id="selected-all-btn"><spring:message code="dinpay.pms.jsp.total.select"/></label> <!--全选 -->
        <label id="cancel-selected-btn"><spring:message code="dinpay.pms.jsp.cancel.select"/></label> <!-- 取消选择 -->
        <label id="mark-as-read"><spring:message code="dinpay.pms.jsp.mark.read"/></label> <!-- 标为已读 -->
        <label id="remove-btn"><spring:message code="dinpay.pms.jsp.delete"/></label> <!-- 删除 -->
        </span>
        </p>

        <!-- 消息列表 -->
        <ul class="information-list" id="information-list"></ul>


        <!-- 分页 -->
        <div class="paginate-container"></div>
        </div>

        <!--内容中间垂直线-->
        <div id="content-vertical-line"></div>
        </div>
        </div>


        <!--页脚 footerWall-->
        <div class="footerWall bgd2d2d2 posAbsolute left bottom">
        <jsp:include page="../include/foot.jsp"></jsp:include>
        </div>
        </div>


        <!-- 全屏遮罩层 -->
        <div class="full-screen-div dis-none" id="full-screen-div"></div>


        <!-- 弹框-模态框~~消息详情 -->
        <div class="modal-box">

        <div class="modal-box-head">
        <p class="modal-box-head-title">
        <span>详细信息</span>
        <span class="triangle-up-left"></span>
        </p>
        <p class="close-btn-wall">
        <img class="close-btn" src="<%=static_path %>/img/notification-information/closeIcon.png">
        </p>
        </div>

        <!--消息内容-->
        <div class="info-detail-content"></div>

        </div>


        <script type="text/javascript">

        var $baseInfList = $(".baseInfList");
        $baseInfList.find("li").eq(0).removeClass("nav-a-select-style");
        $baseInfList.find("li").eq(0).find("span").eq(0).removeClass("sel0Span").addClass("baseInf0Span");
        $baseInfList.find("li").eq(4).addClass("nav-a-select-style");
        $baseInfList.find("li").eq(4).find("span").eq(0).removeClass("baseInf4Span").addClass("sel4Span");

        </script>

        <script type="text/javascript" src="<%=static_path %>/js/common-js/des.js"></script>
        <script type="text/javascript" src="<%=static_path %>/js/common-js/ToolsLibrary.js"></script>

        <script type="text/javascript">

        // 元素配置图
        var Elements = {
        // 全屏遮罩层
        fullScreen: getId("full-screen-div"),

        /* 弹框 模态框 */
        modalBox: getClassName("modal-box")[0],
        closeBtnWall: getClassName("close-btn-wall")[0],
        };


        // ajax 配置图
        var AjaxConfMap = {

        /* 点击“消息通知”请求接口(页面加载完毕立即请求)
        * - 回传数据: 当前页码
        * - 响应数据: sysNoticeList(当前页面需要展示的列表集合,默认为10条) */
        fnCurrentPageList: function (num) {
        var currentPageList;
        $.ajax({
        type: "post",
        dataType: "json",
        async: false,
        url: "<%=path%>/memberManage/getMessageNotify",
        data: { pageNum: num },
        success: function (data) {
        if (data.ok === true) {
        currentPageList = data.data;
        // console.log(currentPageList);
        } else {
        console.log("当前页面需要展示的列表集合: " + data.msg);
        }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        // "timeout", "error", "notmodified" 和 "parsererror"。
        console.log(textStatus);
        }
        });
        return currentPageList;
        },

        // 消息总条数
        fnTotalInfoNum: function () {
        var totalInfoNum;
        $.ajax({
        type: "post",
        dataType: "json",
        async: false,
        url: "<%=path%>/memberManage/getMessageNotifyTotal",
        success: function (data) {
        if (data.ok === true) {
        totalInfoNum = data.data;
        console.log("输出总条数: ", totalInfoNum);
        } else {
        console.log("消息总条数: " + data.msg);
        }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        console.log(textStatus);
        }
        });
        return totalInfoNum;
        },

        // 取得未读信息条数
        fnNoReadInfoNum: function () {
        var noReadInfoNum;
        $.ajax({
        type: "post",
        dataType: "json",
        async: false,
        url: "<%=path%>/memberManage/getNoReadMessageTotal",
        success: function (data) {
        if (data.ok === true) {
        noReadInfoNum = data.data.noReadNoticeCount;
        console.log("取得未读信息条数", noReadInfoNum);
        } else {
        console.log("未读信息条数: " + data.msg);
        }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        console.log(textStatus);
        }
        });
        return noReadInfoNum;
        },

        // 点击查看消息，未读的记录变成已读
        fnInfoBecomeRead: function (currentLiId) {
        $.ajax({
        type: "post",
        dataType: "json",
        async: false,
        url: "<%=path%>/memberManage/updateSysNoticeIsread",
        data: { sysNoticeId: currentLiId },
        success: function (data) {
        if (data.ok === true) {
        console.log( "点击查看消息，未读的记录变成已读 -- 成功" );
        } else {
        console.log("点击查看消息，未读的记录变成已读: " + data.msg);
        }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        console.log(textStatus);
        }
        });
        },

        // 消息管理未读全部标记为已读
        fnAllRemarkRead: function (severalLisId) {
        // console.log(severalLisId);
        $.ajax({
        type: "post",
        dataType: "json",
        async: false,
        url: "<%=path%>/memberManage/noReadSignRead",
        data: { noticeIdList: severalLisId },
        success: function (data) {
        if (data.ok === true) {
        console.log( "全部标记为已读 -- 成功" );
        } else {
        console.log("全部标记为已读: " + data.msg);
        }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        console.log(textStatus);
        }
        });
        },

        // 单条/批量 删除消息
        fnDeleteInfo: function (severalLisId) {
        $.ajax({
        type: "post",
        dataType: "json",
        async: false,
        url: "<%=path%>/memberManage/deleteNotice",
        data: { noticeIdList: severalLisId },
        success: function (data) {
        if (data.ok === true) {
        console.log( "删除成功执行" );
        } else {
        console.log("删除执行: " + data.msg);
        }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        console.log(textStatus);
        }
        });
        }

        };


        var MainConfMap = {

        // 展示模态框
        showModalBox: function () {
        removeClass("dis-none", Elements.fullScreen);
        Elements.modalBox.style.cssText += "z-index: 3;";

        setTimeout(function () {
        Elements.modalBox.style.cssText +=
        "opacity:1; transform: translateY(0);" +
        "transition: opacity .1s linear, transform .5s ease;";
        }, 100);
        },

        // 关闭模态框
        closeModalBox: function () {
        addClass("dis-none", Elements.fullScreen);
        Elements.modalBox.style.cssText =
        "opacity:0; transform: translateY(90px);" +
        "transition: opacity 0s linear, transform 0s ease;";

        setTimeout(function(){
        Elements.modalBox.style.cssText += "z-index: -3;";

        // 关闭模态框时更新未读消息
        NotiEles.unreadMsgNum.innerHTML = AjaxConfMap.fnNoReadInfoNum();

        }, 300)
        },

        };


        // 给全屏遮罩层设置高度
        var documentHeight = Math.max(document.documentElement.clientHeight,
        document.body.scrollHeight, document.documentElement.scrollHeight);
        Elements.fullScreen.style.height = documentHeight + "px";


        </script>

        <script type="text/javascript" src="<%=static_path %>/js/notification-info-js/notification.js"></script>
        <script type="text/javascript" src="<%=static_path %>/js/pagination-js/pagination.js"></script>
        <script type="text/javascript">

        window.onload = function () {

        // 滚动条事件: 模态框居中
        EventUtil.addHandler(window, "scroll", function () {
        fnElementCenter(Elements.modalBox);
        });
        EventUtil.addHandler(Elements.fullScreen, "click", function () {
        MainConfMap.closeModalBox();
        });
        EventUtil.addHandler(Elements.closeBtnWall, "click", function () {
        MainConfMap.closeModalBox();
        });

        /*EventUtil.addHandler(NotiEles.unreadMsgNum, "click", function () {
        // 模态框居中
        fnElementCenter(Elements.modalBox);
        // 展示模态框
        MainConfMap.showModalBox();
        });*/


        /** 分页~start **/
        // 调用总消息条数
        var totalInfoNum = AjaxConfMap.fnTotalInfoNum();
        console.log("totalInfoNum: ", totalInfoNum);
        var totalPages = Math.ceil(totalInfoNum / 10);
        var pag = new PAG(totalPages);
        var zhEn = null;
        if (languageFlag === "zh_CN") {
        zhEn = false;
        }
        else if (languageFlag === "en_US") {
        zhEn = true;
        }
        pag.initialize({
        container: ".paginate-container",
        // 英文: true, 中文: false
        EN: zhEn,

        startShowMaxBtn: 8,
        startShowDefaultBtn: 5,
        lastShowMaxBtn: 8,
        lastShowMinBtn: 5,
        centerShowBtn: 5,

        pagUl: "",
        previousBtn: "",
        nextBtn: "",
        pagActive: "",
        numPag: "",

        });
        /** 分页~over **/


        // 给 content-vertical-line 赋值高度
        (function () {
        var conVerticalLine = getId("content-vertical-line");
        if (NotiEles.conRightPlate.offsetHeight < 660) {
        conVerticalLine.style.height = "660px";
        } else {
        conVerticalLine.style.height = NotiEles.conRightPlate.offsetHeight + "px";
        }
        })();


        // 写入未读信息数量
        NotiEles.unreadMsgNum.innerHTML = AjaxConfMap.fnNoReadInfoNum();

        }

        </script>

        </body>
        </html>
