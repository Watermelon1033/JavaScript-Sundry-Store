/**
 * 页头页脚骨架-配置文件
 * ------
 * header footer shell
 */

var headerFooterConfigMap = {

    // 创建头部(header)html
    createHeaderHtml:  function(headerWall, java_file_path, java_img_path){
        if(headerWall.innerHTML != ""){
            headerWall.innerHTML = ""
        }
        var fragment = document.createDocumentFragment();
        var theHeader = document.createElement("div");
        theHeader.className = "margin-auto header";
        theHeader.innerHTML +=
            '<div class="fl">' +
                '<a href='+ java_file_path +'/memberCenter/memberIndex  class="dis-block">' +
                    '<img src='+ java_img_path +'/img/default.png  alt="智付钱包" class="header-logo">' +
                '</a>' +
            '</div>' +

            '<div class="fl over-hid header-nav">' +
                '<ul class="header-nav-ul">' +
                    '<li class="header-nav-li">' +
                        '<a href='+ java_file_path +'/memberCenter/memberIndex>首页</a>' +
                        '<span></span>'+
                    '</li>' +
                    '<li class="header-nav-li">' +
                        '<a href='+ java_file_path +'/orderExchange/chooseOrderExchangeRecvAccount>购付汇</a>' +
                        '<span></span>'+
                    '</li>' +
                    '<li class="header-nav-li">' +
                        '<a href='+ java_file_path +'/myBill/getTradeList>账单</a>' +
                        '<span></span>'+
                    '</li>' +
                    '<li class="header-nav-li">' +
                        '<a href='+ java_file_path +'/memberManage/toAccountManage>账户设置</a>' +
                        '<span></span>'+
                    '</li>' +
                '</ul>' +
            '</div>' +

            '<div class="fr font-12 over-hid tips-language">' +
                '<a target="_blank" href='+ java_file_path +'/memberLogin/loginMerchant  class="fl merchant-login dis-none">商家系统</a>'+
                '<a class="fl" href='+ java_file_path +'/memberLogin/toLoginPMSWeb>回到旧版</a>' +
                '<a class="fl pos-relative info-tips" href='+ java_file_path +'/memberManage/getMessageNotify>' +
                    '<span class="">消息</span>' +
                    '<span class="tips-num"></span>' +
                '</a>' +
                '<span  class="fl white-font head-vertical-line"> | </span>' +
                '<a class="fl language" href="javascript:" onclick= " switchLanguage("en")"> EN </a>' +
                '<a class="fl language" href="javascript:" onclick= " switchLanguage("zh")"> 中文 </a>' +
                '<a class="fl safety-exit" href='+ java_file_path +'/memberLogin/userOut>安全退出</a>' +
            '</div>' +
            '<div class="clear"></div>';
        fragment.appendChild(theHeader);
        headerWall.appendChild(fragment);
    },


    // 创建页脚(footer)html
    createFooterHtml:   function(footerWall, java_file_path){
        if(footerWall.innerHTML != ""){
            footerWall.innerHTML = "";
        }
        var fragment = document.createDocumentFragment();
        var theFooter = document.createElement("div");
        theFooter.className = "footer margin-auto";
        theFooter.innerHTML +=
        '<div class="footer-nav margin-auto over-hid text-center">' +
            '<a href='+ java_file_path +'/showPage/about-us?showType=1>关于智付钱包</a> |' +
            '<a href='+ java_file_path +'/showPage/cooperation?showType=2>商务合作</a>|' +
            '<a href='+ java_file_path +'/showPage/contact?showType=3>联系我们</a>|' +
            '<a href="http://www.dinpay.com/terms.html">服务条款</a>|' +
            '<a href="https://www.zfbill.com/head_help?type=6">帮助中心</a>|' +
            '<a href="http://www.dinpay.com/policy.html">隐私政策 </a>' +
        '</div>' +
        '<div class="over-hid copy-right margin-auto">' +
            '智付版权所有 2012-2017 ICP证：增值电信业务经营许可证B2-20050689号 ' +
            '&nbsp;&nbsp;&nbsp; 备案号：粤ICP备10028467号-4 &nbsp;&nbsp;&nbsp;' +
        '</div>';
        fragment.appendChild(theFooter);
        footerWall.appendChild(fragment);
    }
};




