<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/view/include/i18n.jsp"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
    <title>批量转账到银行卡</title>
    <link rel="stylesheet" type="text/css" href="<%=static_path %>/css/reset.css">
    <link rel="stylesheet" type="text/css" href="<%=static_path %>/css/publicStyle.css">
    <link rel="stylesheet" type="text/css" href="<%=static_path %>/css/withdraw.css">
    <link rel="stylesheet" type="text/css" href="<%=static_path %>/css/login.css">
    <link rel="stylesheet" type="text/css" href="<%=static_path %>/css/subPublicStyle.css">
    <link rel="stylesheet" type="text/css" href="<%=static_path %>/css/pseudoElementStyle.css">
    <link rel="stylesheet" type="text/css" href="<%=static_path %>/uploadify/uploadify-2.css" />
    <link rel="stylesheet" type="text/css" href="<%=static_path %>/font-awesome/css/font-awesome.css">
    <script type="text/javascript" src="<%=static_path %>/js/jquery.min.js"></script>
    <script type="text/javascript" src="<%=static_path %>/uploadify/jquery.uploadify-2.js"></script>

    <style type="text/css">
        .minHei28{min-height:28px;}
        .marLeft18{margin-left:18px;}
        .marRight14{margin-right:14px;}
        .marLeft22{margin-left:22px;}
        .width162{width:162px;}
        .width178{width:178px;}
        .width186{width:186px;}
        .width216{width:216px;}
        .width274{width:274px;}
        .width422{width:422px;}
        .wid24Per{width:24%;}
        .wid75Per{width:75%;}
        .wid87Per{width:87%;}
        .maxHeight426{max-height:426px;}
        .padTop16{padding-top:16px;}
        .lightGreyBor3{border:1px solid #d2d2d2;}
        .lightPurpleBg{background:#d9e5f9;}
        .marRig5Per{margin-right:5%;}
        input.searchInput:focus{border:0;}
        .zIndex0{z-index:0;}
        .maskPopup{z-index:10;}
        .saveDelConsUl li{margin-bottom:4px;}
        .darkGreyFont2{color:#a5a4a4;}
        .darkGreyFont3{color:#666666;}
        .borBotF1{border-bottom:1px solid #f1f1f1;}

    </style>
</head>

<body>

<div class="posRelative minHei100Per">
    <!--头部 header wall-->
    <div class="headerWall" data-block = "0">
        <jsp:include page="../include/head.jsp"></jsp:include>
    </div>
    <!--头部 header wall-->

    <!--中间的主体 container-->
    <div class="wall100Per">
        <div class="width1198 minHeight678 whiteBg marginAuto marTop25 boxShadowGrey2 marBot115">
            <div class="sameHeader">
                <div class="width210 blueBg3 font18 lineHei60 posRelative textCenter whiteFont letterSpa1px">
                    <span>批量转账到银行卡</span>
                    <span class="displayBlock posAbsolute triangleBotRight right0 bottom"></span>
                </div>
            </div>

            <!--服务器返回错误提示弹框-->
            <div class="wid100Per height40 overflowHid posRelative">
                <div class="width560 redBg height40 marginAuto borBotRadius textCenter posAbsolute serverReturnErrorWall"
                     style="top:-40px;">
                    <span class="disInlBlock font14 height40 lineHei38 whiteFont marginAuto errorTipFont"></span>
                    <img src="<%=static_path %>/img/icon/error.png" alt=""
                         class="disInlBlock width14 height14 cursorPoint posAbsolute closeErrorIcon"
                         style="top:13px; right:14px;">
                </div>
            </div>
            <!--服务器返回错误提示弹框-->

            <div class="overflowHid">
                <!--左边~76%-->
                <div class="fl wid75Per overflowHid">
                    <!--批量转账到-->
                    <div class="marBot30 marTop26">
                        <div class="fl height40 lineHei40 textRight wid12Per marRig5Per">批量转账到：</div>
                        <div class="fl">
                            <a href="<%=path%>/transferToMoreDinpay/toTransferToMoreDinpayForm">
                                <div class="fl width178 height38 lightGreyBor whiteBg borRadius4 cursorPoint bankInput textCenter">
                                    <span class="lineHei38">智付钱包账号</span>
                                </div>
                            </a>

                            <a href="<%=path%>/transferToMoreBank/toTransferToMoreBankForm">
                                <div class="fl width178 height38 lightGreyBor whiteBg marLeft20 borRadius4 cursorPoint  bankSelected bankInput textCenter">
                                    <span class="lineHei38">银行卡</span>
                                </div>
                            </a>
                        </div>
                        <div class="clear"></div>
                    </div>
                    <!--批量转账到-->


                    <!--收款信息-->
                    <div class="marBot20 overflowHid">
                        <div class="fl height40 lineHei40 textRight wid12Per marRig5Per">收款信息：</div>
                        <div class="fl wid83Per marBot10 overflowHid">
                            <div class="line overflowHid">
                                <div class="marBot20">
                                    <span class="fl height38 lineHei38 width126 textInd10 marRight15">姓名</span>
                                    <span class="fl height38 lineHei38 width186 textInd10 marRight15">银行卡信息</span>
                                    <span class="fl height38 lineHei38 width168 textInd10 marRight15">转账金额</span>
                                    <span class="fl height38 lineHei38 width168 textInd10 marRight15">备注</span>
                                </div>
                            </div>

                            <!--动态创建收款人 add payee wall(添加收款人wall)-->
                            <div class="addPayeeWall marBot20">
                            </div>
                            <!--动态创建收款人 add payee wall(添加收款人wall)-->

                            <!--增加收款人~批量导入~下载模板——按钮-->
                            <div class="posRelative line">
                                <div class="lineHei38 threeBtnWall overflowHid">
                                    <p class="fl height38 width138 whiteBg lightDashedGreyBor borRadius5 marRight20 cursorPoint addPayeeBtn">
                                        <i class="fa fa-plus fa-lg fa-lg marLeft20 marRight10 darkBlackFont fontIcon"></i>
                                        <a href="javascript:" class="cursorPoint width88">增加收款人</a>
                                    </p>
                                    <p class="fl height38 width138 whiteBg lightDashedGreyBor borRadius4 marRight20 cursorPoint batchImportBtn">
                                        <i class="fa fa-arrow-circle-o-up fa-lg marLeft20 marRight10 darkBlackFont fontIcon"></i>
                                        <a  href="javascript:" class="cursorPoint width88">批量导入</a>
                                    </p>
                                    <p class="fl height38 width138 whiteBg lightDashedGreyBor borRadius4 marRight20 cursorPoint downloadTemBtn">
                                        <i class="fa fa-arrow-circle-o-down fa-lg marLeft20 marRight10 darkBlackFont fontIcon"></i>
                                        <a  href="<%=path%>/transferToMoreBank/fileDownTransferToMoreBankTemplate" class="cursorPoint width88">下载模板</a>
                                    </p>
                                    <p class="clear"></p>
                                </div>
                            </div>
                            <!--增加收款人~批量导入~下载模板——按钮-->


                            <!---点击"批量导入" 显示的下拉框: batch import file wall (批量导入框) -->
                            <div class="batchImpFileWall overflowHid" style="height:0;">
                                <div class="padTop18">
                                    <!--上传按钮框 type=file box -->
                                    <div class="width198 lightGreyBor3 marLeft130 borRadius4 whiteBg fileBox posRelative">
                                        <div class="marTop12">
                                            <!--上传代码-->
                                            <input id="importFile" type="file" class="displayBlock lineHei34 width162 whiteBg lightGreyBor borRadius4 textCenter marginAuto"/>
                                            <%-- <p>
                                                 <input class="displayBlock lineHei34 width162 whiteBg lightGreyBor borRadius4 textCenter marginAuto" type="file" name="inputTypeFile" id="inputTypeFile"/>
                                             </p>--%>
                                            <!--上传代码-->
                                        </div>
                                        <p class="overflowHid marBot5">
                                            <span class="fl blueBorder borRadius4 lineHei30 marLeft18 width68 whiteFont textCenter cursorPoint blueBg font12 confirmBtn">立即导入</span>
                                            <span class="fl blueBorder borRadius4 lineHei30 marLeft22 width68 whiteFont textCenter cursorPoint blueBg font12 cancelBtn">取消</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <!---点击"批量导入" 显示的下拉框-->

                        </div>
                        <div class="clear"></div>
                    </div>
                    <!--收款信息-->


                    <!--到账时间-->
                    <div class="marTop10 marBot30 overflowHid">
                        <div class="fl height40 lineHei40 textRight wid12Per marRig5Per">到账时间：</div>
                        <div class="fl wid82Per textLeft overflowHid">
                            <p class="overflowHid transferTime">  <!--到账时间 transfer to account time-->
                                <span class="fl width178 height38 lineHei38 lightGreyBor borRadius4 cursorPoint textCenter bankSelected" data-type="1">实时到账 (2小时)</span>
                                <span class="fl width178 height38 lineHei38 lightGreyBor marLeft20 borRadius4 cursorPoint whiteBg textCenter" data-type="0">普通到账 (24小时)</span>
                            </p>
                            <p class="marTop8 font12 wordWrap" style="color:green;">
                                <span>温馨提示：节假日期间，交易额度在5万元以上的，除工行、农行、建行、中行、中信、兴业当天处理，其他银行则顺延至下一个工作日处理。</span>
                            </p>
                        </div>
                        <div class="clear"></div>
                    </div>
                    <!--到账时间-->


                    <!--账户详情-->
                    <div class="marTop20">
                        <div class="fl lineHei30 textRight wid12Per marRig5Per">账户详情：</div>
                        <div class="fl wid82Per">
                            <div class="font14 wall100Per marBot6 overflowHid">
                                <p class="fl wid36Per">
                                    <span class="blackFont">可用余额：</span>
                                    <span class="redFont font16 availableBalance fontWeight"></span> <!--可用余额 available balance-->
                                    <span>元</span>
                                </p>
                                <p class="fl wid36Per darkGreyFont">
                                    <span class="">单日剩余可转金额：</span>
                                    <span class="font16 oneDayRemainMoney redFont"></span> <!--可用余额 available balance-->
                                    <span>元</span>
                                </p>
                            </div>
                            <div class="font14 wall100Per marBot6 overflowHid">
                                <p class="fl wid36Per">
                                    <!--当前付款笔数: current number of payments-->
                                    <span class="blackFont">付款笔数：</span>
                                    <span class="curPayNumber blueFont"></span>
                                    <span>笔</span>
                                </p>
                                <p class="fl wid36Per darkGreyFont">
                                    <!--单日剩余交易笔数: one day remaining number of payment-->
                                    <span class="">单日剩余交易笔数：</span>
                                    <span class="oneDayRemainPayNum blueFont"></span>
                                    <span>笔</span>
                                </p>

                                <%-- <p class="fl wid36Per darkGreyFont">
                                     <!--当日最大交易笔数: one day max number of payments-->
                                     <span class="">单日最大交易笔数：</span>
                                     <span class="oneDayMaxPayNum blueFont">10</span>
                                     <span>笔</span>
                                 </p>--%>
                            </div>
                            <div class="font14">
                                <div class="fl wid36Per">
                                    <!--服务费: service charge-->
                                    <span class="blackFont marRight14">服务费：</span>
                                    <span class="serviceCharge redFont fontWeight">0.00</span>
                                    <span>元</span>
                                </div>

                                <div class="fl wid36Per darkGreyFont posRelative">
                                    <!--收费规则: charging rule-->
                                    <span class="chargeRule cursorPoint lineHei28" style="color:green">收费规则</span>
                                    <div class="posRelative chargeTipBox displayNone">
                                        <div class="posAbsolute lineHei30 lightGreyBor2 borRadius2 whiteBg textCenter " style="left:-20px; top:12px; width:492px; height:128px;">
                                            <p class="triangleIcon2"></p>
                                            <table id="tipBox" class="darkGreyFont3" style="border-collapse: collapse; width:100%; font-size:13px;">
                                                <tbody>
                                                <tr>
                                                    <!--规定单元格可横跨的列数。-->
                                                    <th colspan="4" class="lightPurpleBg" style="text-indent:12px;" >
                                                        服务费采用单笔收费累加计算，以下为单笔收费标准：
                                                    </th>
                                                </tr>
                                                <tr >
                                                    <td class="wid24Per textCenter">到账时间<!-- 到账时间--></td>
                                                    <td class="wid24Per textCenter">服务费率<!-- 服务费率--></td>
                                                    <td class="wid24Per textCenter">收费下限<!-- 收费下限--></td>
                                                    <td class="wid24Per textCenter">收费上限<!-- 收费上限--></td>
                                                </tr>
                                                <tr>
                                                    <td class="textCenter" style="background-color:#e9f6fc;">实时到账<!-- 实时到账--></td>
                                                    <td class="textCenter twoFee" style="background-color:#e9f6fc;"></td>
                                                    <td class="textCenter twoMinFee" style="background-color:#e9f6fc;"></td>
                                                    <td class="textCenter twoMaxFee" style="background-color:#e9f6fc;"></td>
                                                </tr>
                                                <tr>
                                                    <td class="textCenter">普通到账<!-- 普通到账--></td>
                                                    <td class="textCenter twentyFourFee"></td>
                                                    <td class="textCenter twentyFourMinFee"></td>
                                                    <td class="textCenter twentyFourMaxFee"></td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div class="clear"></div>
                            </div>
                            <div class="font14 wall100Per marBot6 overflowHid">
                                <p class="fl wid36Per">
                                    <span class="blackFont">付款总额：</span>
                                    <!--付款总额 total payment-->
                                    <span class="font16 redFont totalPayment fontWeight"></span>
                                    <span>元</span>
                                </p>
                            </div>
                        </div>
                        <div class="clear"></div>
                    </div>
                    <!--账户详情-->

                    <form action="<%=path%>/transferToMoreBank/submitTransferToMoreBankForm" method="post">
                        <!--定义保存最终数据的隐藏域-->
                        <input type="hidden" class="saveAllDataInput" name="batchTransfer">
                        <input type="hidden" name="clientSessionToken" value="${serverSessionToken}">
                        <!--定义保存最终数据的隐藏域-->

                        <!--确定充值按钮-->
                        <div class="marTop50">
                            <div class="fl height40 lineHei40 textRight wid12Per marRig5Per"></div>
                            <div class="fl posRelative  overflowHid">
                                <input type="button" class="fl borRadius4 lineHei38 width178 textCenter cursorPoint font16 nextStep defaultNextStep marBot100"
                                       value="确认转账">
                            </div>
                            <div class="clear"></div>
                        </div>
                        <!--确定充值按钮-->
                    </form>
                </div>
                <!--左边~76%-->

                <!--右边~24%“常用联系人”和“向单人转账”按钮-->
                <div class="fl wid24Per marLeft5 posRelative overflowHid" style="margin-top:28px;">
                    <!--常用联系人~~板块-->
                    <!--contactPerWall高度利用js控制，高度在height34 ~ (contactPerP + contactPerShow)的高度-->
                    <div class="wid100Per marBot20 height34 overflowHid contactPerWall">
                        <!--"常用联系人" ~ 整行-->
                        <p class="width198 lineHei34 lightPurpleBg cursorPoint borRadius4 blueFont marginAuto contactPerP">
                            <i class="fa fa-address-card fa-lg marLeft28"></i>
                            <span class="marLeft10 marRight24">常用联系人</span>
                            <i class="fa fa-chevron-down"></i>
                        </p>
                        <!--"常用联系人" ~ 整行-->

                        <!--contactPerShow包含 = "搜索框" + "ul联系人" + “添加和删除”按钮 -->
                        <!--contactPersonShow包含 = "搜索框" + "ul联系人" + “添加和删除”按钮 -->
                    </div>
                    <!--常用联系人~~板块-->


                    <!--向单人转账~~整行-->
                    <div class="width198 marginAuto height34 borRadius4 lightBlueBg overflowHid">
                        <a href="<%=path%>/transferToOneBank/toTransferToOneBankForm">
                            <p class="wid100Per lineHei34 lightPurpleBg borRadius4 blueFont cursorPoint">
                                <i class="fa fa-user-circle-o fa-lg marLeft28"></i><span class="marLeft16">向单人转账</span>
                            </p>
                        </a>
                    </div>
                    <!--向单人转账~~整行-->
                </div>
                <!--右边~22%“常用联系人”和“向单人转账”按钮-->
            </div>

        </div>
    </div>
    <!--中间的主体 container-->

    <!--页脚 footerWall-->
    <div class="footerWall bgd2d2d2 bottom left posAbsolute height85">
        <jsp:include page="../include/foot.jsp"></jsp:include>
    </div>
    <!--页脚 footerWall-->

    <!--全屏遮罩层弹出框 mask popup-->
    <div class="maskPopup">
    </div>
    <!--全屏遮罩层弹出框 mask popup-->

    <!--删除常用联系人弹框 delete contact person box-->
    <div class="posAbsolute whiteBg displayNone zIndex100 overflowAuto minHei180 delConPerBox" style="width:480px;">
        <!--弹框头部-->
        <div class="wid100Per lightPurpleBg overflowHid">
            <div class="fl wid36Per blueBg3 font16 height46 lineHei46 posRelative textCenter whiteFont letterSpa1px overflowHid">
                <span>删除常用联系人</span>
                <span class="displayBlock posAbsolute triangleBotRight2 right0 bottom"></span>
            </div>
            <span class="fr"><img class="marRight20 cursorPoint marTop15 closeDelConBtn" src="<%=static_path %>/img/icon/closeIcon.png"></span>
        </div>
        <!--弹框头部-->

        <div class="wid100Per marTop20 font16 lineHei40 height40 textCenter letterSpa1px">常用联系人删除后无法恢复，您确定要删除？</div>
        <div class="width258  marginAuto">
            <!--保存要删除的li-->
            <ul class="marTop10 saveDelConsUl"></ul>
            <!--确定删除Btn + 取消Btn-->
            <p class="height34 lineHei34 marTop30 marBot30 textCenter whiteFont ">
                <!--确定confirm + 取消 cancel-->
                <span class="fl wid30Per marLeft6Per borRadius5 blueBg2 cursorPoint conDelBtn">确定</span>
                <span class="fr wid30Per marRight6Per borRadius5 blueBg2 cursorPoint canDelBtn">取消</span>
            </p>
        </div>

    </div>
    <!--删除常用联系人弹框 delete contact person box-->

    <!--"添加银行卡信息"/"新增联系人"~弹框 add bank card / add contact person box-->
    <div class="posAbsolute whiteBg displayNone zIndex100 overflowAuto minHei180 addBankConsBox" style="width:568px; height:520px;">
        <!--弹框头部-->
        <div class="wid100Per lightPurpleBg overflowHid">
            <div class="fl wid36Per blueBg3 font16 height46 lineHei46 posRelative textCenter whiteFont letterSpa1px overflowHid">
                <span>银行卡信息</span>
                <span class="displayBlock posAbsolute triangleBotRight2 right0 bottom"></span>
            </div>
            <span class="fr">
                  <img class="marRight20 cursorPoint marTop15 cloBanConBoxBtn" src="<%=static_path %>/img/icon/closeIcon.png">
              </span>
        </div>

        <!--弹框中部板块 add bank card information box center plate-->
        <div class="width422 marTop40 marLeft50 addBankInfBoxCen">
            <!--卡号-->
            <div class="height72 overflowHid">
                <div class="fl height40 lineHei40 textRight wid24Per marRight10Per">银行卡号：</div>
                <div class="fl textLeft overflowHid">
                    <p class="overflowHid">
                        <input type="text" class="fl lineHei38 height38 width258 lightGreyBor borRadius4 textInd10 bankCardInput" placeholder="收款人卡号" style="width:260px;">
                    </p>
                    <span class="font12 redFont lineHei20 bankCardErrorSpan"></span>
                </div>
                <div class="clear"></div>
            </div>
            <!--卡号-->

            <!--选择开户银行-->
            <div class="height72">
                <div class="fl wid24Per lineHei42 textRight textInd8 marRight10Per font14">开户银行：</div>
                <div class="fl posRelative height42">
                    <!--保存值-->
                    <div class="fl">
                        <p class="height40 width258 whiteBg borRadius4 lightGreyBor cursorPoint saveBankWall posRelative theBank saveOpenBankP">
                            <span class="fl height38 lineHei38 wid87Per textInd10 borRigDce darkGreyFont saveOpenBankSpan">点击选择</span>
                            <span class="fr height38 wid12Per posRelative"><i class="triangleDown"></i></span>
                        </p>
                        <p class="font12 redFont lineHei20 openBankErrorSpan"></p>
                    </div>
                    <!--保存值-->

                    <ul class="width258 posAbsolute marTop43 displayNone zIndex100 lightGreyBor whiteBg overflowAuto height250 openBankUl">
                        <!--开户银行下拉-->
                        <!--<li class="height34 lineHei34 borBotF1 lightBlueBg6 cursorPoint">
                              <span class="fl wid14Per height100Per textRight bankImg">
                                  <img class="width18 height18 marTop8" src="<%=static_path %>/img/icon/ccb.png">
                              </span>
                              <span class="fl wid84Per textInd15 textLeft bankName">建设银行</span>
                              <span class="clear"></span>
                          </li>-->
                    </ul>
                </div>
                <div class="clear"></div>
            </div>
            <!--选择开户银行-->

            <!--所在省市-->
            <div class="height72 displayNone provCityOuterWall">
                <div class="fl wid24Per textRight marRight10Per lineHei40">所在省市：</div>
                <div class="fl posRelative">
                    <!--保存值部分-->
                    <div class="fl">
                        <div class="height40 width258 borRadius4 lightGreyBor cursorPoint outSaveValWall">
                            <p class="fl height38 lineHei38 wid87Per textInd10 overflowHid borRigDce saveProCityWall"></p>
                            <span class="fr height38 wid12Per posRelative"><i class="triangleDown"></i></span>
                        </div>
                        <p class="font12 redFont lineHei20 proCityErrorSpan"></p>
                    </div>
                    <!--保存值部分-->

                    <!--加载下拉省市-->
                    <div class="width258 posAbsolute zIndex1 padBot5 marTop43 marBot10 lightGreyBor whiteBg overflowAuto displayNone dropdownWall" data-flag="0">
                        <ul class="lightGreyBg overflowHid textCenter overflowHid cursorPoint lineHei35 borBotC1 proCityTitWall">
                            <li class="fl wid27Per height35 borRightC1 selectedTabLi provinceTit" data-index="0">省份</li>
                            <li class="fl wid72Point5Per height35 defaultTabLi cityTit" data-index="1">城市</li>
                        </ul>

                        <ul class="overflowHid minHei10 marTop10 marLeft5 marRight5 proCityWall">
                            <!--Province 省份-->
                            <li class="wid100Per overflowHid lineHei26 provinceWall provinceAndCityLi" data-index="0">
                                <!-- 字母 letter-->
                                <!--加载省份-->
                            </li>
                            <!--Province 省份-->

                            <!--city 市-->
                            <li class="wid100Per overflowHid displayNone lineHei26 marBot8 cityWall provinceAndCityLi" data-index="1">
                                <ul class="fl textCenter overflowHid cursorPoint saveCityUl">
                                </ul>
                            </li>
                            <!--city 市-->
                        </ul>

                    </div>
                    <!--加载下拉省市-->
                </div>
                <div class="clear"></div>
            </div>
            <!--所在省市-->

            <!--开户支行-->
            <div class="height72 displayNone openBranchBankWall">
                <span class="fl wid24Per lineHei42 textRight textInd8 marRight10Per font14">开户支行：</span>
                <div class="fl posRelative">
                    <div class="fl">
                        <p class="height40 width258 borRadius4 lightGreyBor cursorPoint saveBranchBankP">
                            <span class="fl height38 lineHei38 wid87Per textInd10 borRigDce  darkGreyFont overflowHid dropdownSpan1 saveBranchBankSpan">点击选择</span>
                            <span class="fr height38 wid12Per posRelative"><i class="triangleDown"></i></span>
                        </p>
                        <p class="font12 redFont lineHei20 openBraBankErrorSpan"></p>
                    </div>

                    <ul class="width258 posAbsolute displayNone zIndex100 marTop43 lightGreyBor height140 idTypeUl whiteBg overXHid wordWrap saveBranchBankUl">
                        <!--开户支行下拉-->
                    </ul>
                </div>
                <div class="clear"></div>
            </div>
            <!--开户支行-->

            <!--确定-->
            <div class="height72 marTop20 overflowHid">
                <div class="fl height40 lineHei40 textRight wid24Per marRight10Per"></div>
                <div class="fl textLeft overflowHid">
                    <p class="overflowHid">
                        <input type="button"  value="确定" class="fl borRadius4 lineHei38 width178 textCenter cursorPoint font16 selectedNextStep boxConfirmBtn">
                    </p>
                </div>
                <div class="clear"></div>
            </div>
            <!--确定-->
        </div>
        <!--弹框中部板块-->
    </div>
    <!--"添加银行卡信息"/"新增联系人"~弹框 add bank card / add contact person box-->
</div>


<script type="text/javascript" src="<%=static_path %>/js/publicScript.js"></script>
<script type="text/javascript" src="<%=static_path %>/js/inputErrorTipsString.js"></script>
<script type="text/javascript" src="<%=static_path %>/js/inputValidation.js"></script>

<script type="text/javascript" src="<%=static_path %>/js/ContactPerson-2.js"></script>
<!--BankDropDown银行下拉， BankBranchDropDown.js支行下拉-->
<script type="text/javascript" src="<%=static_path %>/js/BankDropDown.js"></script>
<script type="text/javascript" src="<%=static_path %>/js/BankBranchDropDown.js"></script>
<script type="text/javascript" src="<%=static_path %>/js/TwoLevelLinkage.js"></script>

<script type="text/javascript">
    var serReturnErrorWall = $(".serverReturnErrorWall")[0];
    var sevBackUserBalance;      //保存返回的: 可用余额 (余额为单独ajax接口获取)

    //ajax获取账户可用余额
    $.ajax({
        type: "post",
        async: false,
        url: "<%=path%>/commonService/getAccountAvailableAmount",
        dataType: "json",
        success: function (data) {
            if (data.ok == true) {
                sevBackUserBalance = parseFloat(data.data);   //服务器返回的账户可用余额
                //console.log(sevBackUserBalance);
            }
        }
    });


    //定义对象saveValObj: 用于保存: "2小时到账 || 24小时到账"的返回值。打开页面默认读取2小时到账的数据
    var saveValObj = {
        sevBackOnceMinLimit : "",   //保存返回的: 单笔最小限额
        sevBackOnceLimit : "",      //保存返回的: 单笔最大限额(打开页面就要把最小和最大限额赋值给转账金额表单)
        dayRemainMoney : "",        //保存返回的: 当日剩余可转金额
        dayRemainCount : "",        //保存返回的: 当日剩余交易笔数
        serviceCharge : "",         //保存返回的: 服务费
        chargeType : "",            //保存返回的: 收费方式(0按笔，1按比例)
        minCharge : "",             //chargeType按比例收费时最小收费标准
        maxCharge : ""             //chargeType按比例收费时最大收费标准
    };


    var twoFee = $(".twoFee")[0],  //获取2小时到账的span
        twoMinFee = $(".twoMinFee")[0],
        twoMaxFee = $(".twoMaxFee")[0];
    var twentyFourFee = $(".twentyFourFee")[0], //获取24小时到账的span
        twentyFourMinFee = $(".twentyFourMinFee")[0],
        twentyFourMaxFee = $(".twentyFourMaxFee")[0];

    //给"收费规则"中: 2小时到账写入手续费,是按笔还是百分比显示根据chargeType来确定[收费方式(0按笔，1按比例)]
    $.ajax({
        type: "post",
        dataType: "json",
        async: false,
        data: {type: 3},
        url: "<%=path%>/commonService/getWithDrawTransferLimitConfig",
        success: function (data) {
            console.log(data);
            if (data.ok == true) {
                var sevBackData = JSON.parse(data.data);
                saveValObj.serviceCharge = sevBackData.chargeValue;                    //服务费
                saveValObj.chargeType = sevBackData.chargeType;                        //收费方式
                saveValObj.minCharge = sevBackData.minCharge;                        //chargeType按比例收费时最小收费标准
                saveValObj.maxCharge = sevBackData.maxCharge;                        //chargeType按比例收费时最大收费标准
            }

            if (saveValObj.chargeType == 0) {
                twoFee.innerHTML = saveValObj.serviceCharge + "元/笔";
                twoMinFee.innerHTML = "--";
                twoMaxFee.innerHTML = "--";
            } else if (saveValObj.chargeType == 1) {
                twoFee.innerHTML = parseFloat(saveValObj.serviceCharge) * 100 + "%";
                twoMinFee.innerHTML = String(saveValObj.minCharge) + "元/笔";
                twoMaxFee.innerHTML = String(saveValObj.maxCharge) + "元/笔";
            }
        }
    });

    //给"收费规则"中: 24小时到账写入手续费,是按笔还是百分比显示根据chargeType来确定[收费方式(0按笔，1按比例)]
    $.ajax({
        type: "post",
        dataType: "json",
        async: false,
        data: {type: 1},
        url: "<%=path%>/commonService/getWithDrawTransferLimitConfig",
        success: function (data) {
            if (data.ok == true) {
                var sevBackData = JSON.parse(data.data);
                saveValObj.dayRemainCount = sevBackData.dayRemainCount;                //当日剩余交易笔数
                saveValObj.serviceCharge = sevBackData.chargeValue;                    //服务费
                saveValObj.chargeType = sevBackData.chargeType;                        //收费方式
                saveValObj.minCharge = sevBackData.minCharge;                        //chargeType按比例收费时最小收费标准
                saveValObj.maxCharge = sevBackData.maxCharge;                        //chargeType按比例收费时最大收费标准
            }

            if(saveValObj.chargeType == 0){
                twentyFourFee.innerHTML = saveValObj.serviceCharge + "元/笔";
                twentyFourMinFee.innerHTML = "--";
                twentyFourMaxFee.innerHTML = "--";
            }else if(saveValObj.chargeType == 1){
                twentyFourFee.innerHTML = parseFloat(saveValObj.serviceCharge)*100 + "%";
                twentyFourMinFee.innerHTML = String(saveValObj.minCharge) + "元/笔";
                twentyFourMaxFee.innerHTML = String(saveValObj.maxCharge) + "元/笔";
            }
        }
    });



    //Two hours to arrive (2小时到账封装函数 ): ajax获取"2小时到账"的数据 //自执行
    twoArrive();
    function twoArrive(){
        $.ajax({
            type: "post",
            dataType: "json",
            async: false,
            data: {type: 3},  //type:3 为2小时转账
            url: "<%=path%>/commonService/getWithDrawTransferLimitConfig",
            success: function (data) {
                /*{ "chargeType":"1",      "chargeValue":0.2,
                 "code":"00000",            "dayMaxCount":200,
                 "dayMaxMoney":2000,        "dayRemainCount":200,
                 "dayRemainMoney":2000,     "maxCharge":0,
                 "minCharge":0,             "remark":"成功",
                 "singleMaxMoney":80,       "singleMinMoney":1,
                 "transferType":"1"}*/
                //console.log(data.data);
                if (data.ok == true) {
                    var sevBackData = JSON.parse(data.data);
                   /* console.log("******* ajax获取2小时到账的数据*********");
                    console.log(sevBackData);*/
                    saveValObj.sevBackOnceMinLimit = sevBackData.singleMinMoney;           //单笔最小金额
                    saveValObj.sevBackOnceLimit = sevBackData.singleMaxMoney;              //单笔最大交易金额

                    saveValObj.dayRemainMoney = sevBackData.dayRemainMoney;                //当天剩余可转金额

                    saveValObj.dayRemainCount = sevBackData.dayRemainCount;                //当日剩余交易笔数
                    saveValObj.serviceCharge = sevBackData.chargeValue;                    //服务费
                    saveValObj.chargeType = sevBackData.chargeType;                        //收费方式
                    saveValObj.minCharge = sevBackData.minCharge;                        //chargeType按比例收费时最小收费标准
                    saveValObj.maxCharge = sevBackData.maxCharge;                        //chargeType按比例收费时最大收费标准
                }
            }
        });
    }

    //Twenty four hours to arrive (24小时到账封装函数 ): ajax获取"24小时到账"的数据
    function twentyFourArr(){
        $.ajax({
            type: "post",
            dataType: "json",
            async: false,
            data: {type: 1}, //type:1 为普通转账(24小时到账)
            url: "<%=path%>/commonService/getWithDrawTransferLimitConfig",
            success: function (data) {
                /*{ "chargeType":"1",      "chargeValue":0.2,
                 "code":"00000",            "dayMaxCount":200,
                 "dayMaxMoney":2000,        "dayRemainCount":200,
                 "dayRemainMoney":2000,     "maxCharge":0,
                 "minCharge":0,             "remark":"成功",
                 "singleMaxMoney":80,       "singleMinMoney":1,
                 "transferType":"1"}*/
                //console.log(data.data);
                if (data.ok == true) {
                    var sevBackData = JSON.parse(data.data);
                    /*console.log("******* ajax获取24小时到账的数据*********");
                    console.log(sevBackData);*/
                    saveValObj.sevBackOnceMinLimit = sevBackData.singleMinMoney;           //单笔最小金额
                    saveValObj.sevBackOnceLimit = sevBackData.singleMaxMoney;              //单笔最大交易金额

                    saveValObj.dayRemainMoney = sevBackData.dayRemainMoney;                //当天剩余可转金额

                    saveValObj.dayRemainCount = sevBackData.dayRemainCount;                //当日剩余交易笔数
                    saveValObj.serviceCharge = sevBackData.chargeValue;                    //服务费
                    saveValObj.chargeType = sevBackData.chargeType;                        //收费方式
                    saveValObj.minCharge = sevBackData.minCharge;                        //chargeType按比例收费时最小收费标准
                    saveValObj.maxCharge = sevBackData.maxCharge;                        //chargeType按比例收费时最大收费标准
                }
            }
        });
    }



    /*---根据服务器返回的值给页面中 账户详情: 各个span赋值---*/
    //a1. 可用余额span
    var availableBalance = $(".availableBalance")[0];
    availableBalance.innerHTML = (parseFloat(sevBackUserBalance)).toFixed(2); //把服务器返回的账户可用余额赋值给
    //a2. 当日剩余可转金额
    var oneDayRemainMoney = $(".oneDayRemainMoney")[0];
    oneDayRemainMoney.innerHTML = (parseFloat(saveValObj.dayRemainMoney)).toFixed(2);

    //b1. 当前付款笔数span(默认为0笔): 此span的值为当用户鼠标离开"转账金额"表单时计算
    var curPayNumber = $(".curPayNumber")[0];
    curPayNumber.innerHTML = parseFloat(0);

    //c1. 服务费:
    var serviceChargeSpan = $(".serviceCharge")[0]; //默认写入的有00
    //c2. 当日剩余交易笔数 :
    var oneDayRemainPayNum = $(".oneDayRemainPayNum")[0];
    oneDayRemainPayNum.innerHTML = parseInt(saveValObj.dayRemainCount);


    //d1.付款总额span 根据每行中转账金额的多少动态变化
    var totalPayment = $(".totalPayment")[0];
    totalPayment.innerHTML = (parseFloat(0)).toFixed(2); //当打开页面进来时，首先把里面的值设置为数字0

    /*---根据服务器返回的值给页面中 账户详情: 各个span赋值---*/


    //动态添加行的wall(最外围包围框)
    var addPayeeWall = $(".addPayeeWall")[0];               // 动态增加收款人的包围框
    var addPayeeBtn = $(".addPayeeBtn")[0];                 // "增加收款人"按钮
    var batchImportBtn = $(".batchImportBtn")[0];           // "批量导入"按钮
    var downloadTemBtn = $(".downloadTemBtn")[0];           // "下载模板"按钮
    var batchImpFileWall = $(".batchImpFileWall")[0];       //点击批量导入按钮，显示的上传文件下拉框
    var nextStep = $(".nextStep")[0];                       //取得下一步按钮

    //全局变量,引用jsp路径
    var imgPath = "<%=static_path %>";


    //2小时到账--或--普通到账(切换)
    var transferTime = getClassName("transferTime")[0];
    EventUtil.addHandler(transferTime, "click", function(event){
        event = EventUtil.getEvent(event);
        var target = EventUtil.getTarget(event);
        var arriveTimeSpan = transferTime.getElementsByTagName("span");
        for(var i=0; i<arriveTimeSpan.length; i++){
            if(hasClass(arriveTimeSpan[i], "bankSelected") == true){
                arriveTimeSpan[i].className = removeClassFun(arriveTimeSpan[i], "bankSelected");
            }
        }
        if(target.tagName == "SPAN"){
            if(hasClass(target, "bankSelected") == false){
                target.className = addClassFun(target, "bankSelected");
            }
            calculateAmount(addPayeeWall);
        }
    });

    //"收费规则"鼠标滑动展示|隐藏
    var chargeRule = $(".chargeRule"),
        chargeTipBox = $(".chargeTipBox");
    chargeRule.mouseenter(function(){
        chargeTipBox.removeClass("displayNone");
    }).mouseleave(function(){
        chargeTipBox.addClass("displayNone");
    });



    /**-------------------常用联系人-----------------**/
    var dataArr;
    (function frequentContacts(){                         //常用联系人(frequent contacts)
        var contactPerWall = $(".contactPerWall")[0],     //取得常用联系人包围框
            contactPerP = $(".contactPerP")[0];           //常用联系人按钮的父级P
        $(function(){
            $.ajax({
                type: "post",
                async: false,
                url: "<%=path%>/contactPerson/getBankContactPerson",
                dataType: "json",
                data:{"territoryFlag" :"1"},
                success: function (data) {
                    if (data.ok == true) {
                        //一定要转载一下,这样获取到是json字符串
                        dataArr =JSON.parse(data.data);
                        //console.log(dataArr);
                        contactPersonEvent(dataArr);
                    }
                }
            });
        });
        function contactPersonEvent(data){
            var contactPerInstance = new ContactPerson(data, imgPath);//创建常用联系人实例
            contactPerInstance.createShowPlate(contactPerWall);       //1st: 创建常用联系人展示框contactPerWall
            contactPerInstance.createPerBox();                        //2nd: 创建contactPerBox
            contactPerInstance.createConPerUl();                      //3rd: 创建ul常用联系人列表
            contactPerInstance.createAddDelBtn();                     //4th: 创建添加删除按钮
            contactPerInstance.addStyleAndVal(addPayeeWall);          //5th: 点击li添加选中样式 + 把当前值写入到行中

            var contactPerShow = $(".contactPerShow")[0];    //取得上面创建的常用联系人展示框
            //点击展示和隐藏联系人下拉框
            EventUtil.addHandler(contactPerP, "click", function(){
                //取得"contactPerP的高度"和"contactPerShow的高度"
                var sum = parseInt(contactPerP.offsetHeight) + parseInt(contactPerShow.offsetHeight);
                if(contactPerWall.offsetHeight <= 34){
                    animate(contactPerWall, {height: sum});
                    animate(contactPerShow, {opacity: 1});
                }else{
                    animate(contactPerWall, {height: 34});
                    animate(contactPerShow, {opacity: 0});
                }
            });

            //取得搜索框整行
            var searchWall = $(".searchWall")[0];
            /* searchInput = searchWall.getElementsByTagName("input")[0],  //取得搜索框
             searchIcon = searchWall.getElementsByTagName("i")[0];      //取得搜索框图标*/

            //"删除常用联系人" 事件 + 弹框
            var saveDelConsLiArr = [];       //保存点击联系人下拉框中的"删除"按钮，删除的li
            var maskPopup = $(".maskPopup"); //取得全局遮罩层弹框

            var delConPerBox = $(".delConPerBox"),          //删除常用联系人弹框
                closeDelConBtn = $(".closeDelConBtn"),      //删除常用联系人弹框中的X号
                delContactPerBtn = $(".delContactPerBtn"),  //取得左侧"常用联系人"下拉框中的"删除"按钮
                saveDelConsUl = $(".saveDelConsUl");        //弹框中用来保存要删除的联系人li的ul
            var conDelBtn = $(".conDelBtn");                //删除常用联系人弹框中的"确定按钮"
            var canDelBtn = $(".canDelBtn");                //删除常用联系人弹框中的"取消按钮"

            delContactPerBtn.click(function (event) {
                popupDiv(maskPopup);                //最外围的全局遮罩层
                centerPopup(delConPerBox);          //中间的弹框居中函数
                maskPopup.show();
                delConPerBox.show();
                event.stopPropagation();
                /*-------取得要删除的li,推入到saveDelConsUl中------*/
                saveDelConsLiArr =  contactPerInstance.saveDelLi();   //6th: 把选中的li推入到saveDelConsLiArr数组中
                //console.log( saveDelConsLiArr);                     //打印现在saveDelConsLiArr中的项
                //console.log(saveDelConsLiArr);
                var i, len;
                //值大于零0才推入数组
                if(saveDelConsLiArr.length == 1 && saveDelConsLiArr[0].getAttribute("data-flag") == "R"){
                    saveDelConsUl[0].innerHTML = "";
                    var createOneLi = document.createElement("li");
                    createOneLi.setAttribute("data-flag","R");
                    createOneLi.className = "height34 lineHei34 wid96Per marginAuto  redFont  textCenter overflowHid";
                    createOneLi.appendChild(document.createTextNode("请至少选择一个收款人！"));
                    saveDelConsUl[0].appendChild(createOneLi);
                }else{
                    for(i=0,len=saveDelConsLiArr.length; i<len; i++){
                        //遍历saveDelConsLiArr数组，一项项推入到ul中
                        saveDelConsUl[0].appendChild(saveDelConsLiArr[i]);
                    }
                }
                /*-------取得要删除的li,推入到saveDelConsUl中------*/

                /*---删除联系人弹框中的 "确定"按钮 + "取消"按钮--*/
                conDelBtn.click(function(){
                    saveDelConsLiArr.length = 0;
                    saveDelConsUl[0].innerHTML = "";
                    closePopup();
                    //当下拉框中的li删除之后下拉框的高度方发生变化，这是再次获取高度，让外面的框高度也发生变化
                    //取得"contactPerP的高度"和"contactPerShow的高度"
                    var contactPerShow = $(".contactPerShow")[0];    //取得上面创建的常用联系人展示框
                    var sum = parseInt(contactPerP.offsetHeight) + parseInt(contactPerShow.offsetHeight);
                    animate(contactPerWall, {height: sum});
                });
                canDelBtn.click(function(){
                    //把上面的saveDelConsLiArr数组传入到rewriteValue中
                    contactPerInstance.rewriteValue(saveDelConsLiArr);
                    //取消之后,把弹框隐藏
                    closePopup();
                });
                closeDelConBtn.click(function(){
                    //把上面的saveDelConsLiArr数组传入到rewriteValue中
                    contactPerInstance.rewriteValue(saveDelConsLiArr);
                    //取消之后,把弹框隐藏
                    closePopup();
                });
                /*---删除联系人弹框中的 "确定"按钮 + "取消"按钮--*/
            });
            closeDelConBtn.click(function(){closePopup()});
            //maskPopup.click(function(){closePopup()});
            function closePopup(){
                maskPopup.css("display", "none");
                delConPerBox.css("display", "none");
            }
        }
    })();
    /**-------------------常用联系人-----------------**/


    var errorTipFont = $(".errorTipFont")[0];
    var eleParent = serReturnErrorWall.parentNode;
    var parentWidth = eleParent.offsetWidth;
    serReturnErrorWall.style.left = (parentWidth - serReturnErrorWall.offsetWidth)/2 + "px";

    var errorWallPosTop = getPosition(serReturnErrorWall).top;//取得当前错误提示框在页面中的垂直偏偏移量
    //因为超时调用需要执行两次调用才可以达到和间歇调用一样的效果，所以这个函数必须要放在setTimeout()中执行才可以
    function scrollBarRoll() {
        var errorWallTop = serReturnErrorWall.style.top; //取得当前错误提示框距离父级(relative)元素的垂直距离
        //如果scrollTo执行之前有滚动，那就先把清除等于0
        window.scrollTo(0, 0);
        if (parseInt(errorWallTop) > -6) { //当元素的高度大于-6px的时候，代表当前错误提示框是展示状态。
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            scrollTop = scrollTop - 12;
            window.scrollTo(0, scrollTop);
            if (parseInt(scrollTop) > parseInt(errorWallPosTop)) {
                setTimeout(scrollBarRoll, 0.1);
            }
        }
    }

    window.onload = function () {
        var rtueData= '${jsonReturn.msg}';
        if(rtueData != ""){
            basicAnimation(serReturnErrorWall, { top: -2});
            addErrorTips(errorTipFont, rtueData);
        }

        var closeErrorIcon = getClassName("closeErrorIcon")[0];
        EventUtil.addHandler(closeErrorIcon, "click", function(){
            basicAnimation(serReturnErrorWall, { top: -40});
            removeErrorTips(errorTipFont);
            rtueData = "";
        });

        /**-------取得元素 && 变色--------**/
            //给"增加收款人"，"批量导入"，"下载模板"三个按钮鼠标移入移开变色效果
        var threeBtnWall = $(".threeBtnWall")[0];
        //mouseover支持事件冒泡: 在鼠标指针位于一个元素外部，然后用户将其首次移入另一个元素边界之内时触发。不能通过键盘触发这个事件
        EventUtil.addHandler(threeBtnWall, "mouseover", function (event) {
            event = EventUtil.getEvent(event);
            var target = EventUtil.getTarget(event);
            if (target.tagName.toLowerCase() == "p") {
                if (hasClass(target, "lightDashedGreyBor") == true) {
                    target.className = removeClassFun(target, "lightDashedGreyBor");
                    target.className = addClassFun(target, "blueDashedBorder");
                }
                var fontIcon = getClassName("fontIcon", target);
                if (hasClass(fontIcon[0], "darkBlackFont") == true) {
                    fontIcon[0].className = removeClassFun(fontIcon[0], "darkBlackFont");
                    fontIcon[0].className = addClassFun(fontIcon[0], "blueFont");
                }
                var currentA = target.getElementsByTagName("a");
                if (hasClass(currentA[0], "blueFont") == false) {
                    currentA[0].className = addClassFun(currentA[0], "blueFont");
                }
                EventUtil.stopPropagation(event);
            }
            if (target.tagName.toLowerCase() == "i" || target.tagName.toLowerCase() == "a") {
                if (hasClass(target.parentNode, "lightDashedGreyBor") == true) {
                    target.parentNode.className = removeClassFun(target.parentNode, "lightDashedGreyBor");
                    target.parentNode.className = addClassFun(target.parentNode, "blueDashedBorder");
                }
                if (target.tagName.toLowerCase() == "i") {
                    if (hasClass(target, "darkBlackFont") == true) {
                        target.className = removeClassFun(target, "darkBlackFont");
                        target.className = addClassFun(target, "blueFont");
                    }
                    currentA = target.parentNode.getElementsByTagName("a");
                    if (hasClass(currentA[0], "blueFont") == false) {
                        currentA[0].className = addClassFun(currentA[0], "blueFont");
                    }

                }
                if (target.tagName.toLowerCase() == "a") {
                    if (hasClass(target, "blueFont") == false) {
                        target.className = addClassFun(target, "blueFont");
                    }
                    fontIcon = getClassName("fontIcon", target.parentNode);
                    if (hasClass(fontIcon[0], "darkBlackFont") == true) {
                        fontIcon[0].className = removeClassFun(fontIcon[0], "darkBlackFont");
                        fontIcon[0].className = addClassFun(fontIcon[0], "blueFont");
                    }
                }
                EventUtil.stopPropagation(event);
            }
        });
        EventUtil.addHandler(threeBtnWall, "mouseout", function (event) {
            event = EventUtil.getEvent(event);
            var target = EventUtil.getTarget(event);
            if (target.tagName.toLowerCase() == "p") {
                target.className = removeClassFun(target, "blueDashedBorder");
                target.className = addClassFun(target, "lightDashedGreyBor");
                var fontIcon = getClassName("fontIcon", target);
                if (hasClass(fontIcon[0], "blueFont") == true) {
                    fontIcon[0].className = removeClassFun(fontIcon[0], "blueFont");
                    fontIcon[0].className = addClassFun(fontIcon[0], "darkBlackFont");
                }
                var currentA = target.getElementsByTagName("a");
                if (hasClass(currentA[0], "blueFont") == true) {
                    currentA[0].className = removeClassFun(currentA[0], "blueFont");
                }
            }
            EventUtil.stopPropagation(event);
        });
        /**-------取得元素 && 变色--------**/


        //<1.> 打开页面立即动态创建出2行: 自执行
        (function create2Line() {
            //1.调用创建行的函数创建2行
            for (var j = 0; j < 2; j++) {
                createTransferModule(addPayeeWall);
            }
            //2.立即删除第一行的移除整行按钮(closed whole line button)
            //var getFirLineCloBtn = $(".delTransferBut")[0]; //取得页面中第一个close button按钮(get first line close button)
            //getFirLineCloBtn.parentNode.removeChild(getFirLineCloBtn); //js删除close button 按钮
        })();

        //<5.> 动态创建行函数 + "转账金额表单"设置自定义属性 + 滚动条自动下滚
        function createTransferModule(addPayeeWall) {
            //(1.)动态创建行函数 : createLineFun()
            //(3.)把文档片段插入到addPayeeWall中
            addPayeeWall.appendChild(createLineFun());
            //(4.)经过3创建行之后,给动态创建行中的"转账金额"表单设置自定义属性 + 同时在一个for循环之内实现给"收款人"表单设置自定义属性
            //var transferAmountInput = getClassName("transferAmountInput", addPayeeWall);
            setAttributeFun(addPayeeWall);
            //(6.)随着行数的增加，scrollTop也相应的增加一行的高度
            scrollBarAutoSlideDown(addPayeeWall);
        }


        /**--- addPayeeWall利用事件捕获确定当前target:提示错误+弹框+弹框确定写值+点击删除行+计算金额+设置属性+。。。一系列事件---**/
        EventUtil.addHandler(addPayeeWall, "click", function (event) {

            event = EventUtil.getEvent(event);
            var target = EventUtil.getTarget(event);
            //console.log("输出在addPayeeWall上click时转账金额表单的数量 " + curAllTransInputs.length);
            var curErrorSpan;
            //(1.)先隐藏服务器返回的错误 和 "收款人表单"/"转账金额表单" 下的错误清空
            hideErrorPopup();
            if (target.tagName.toLowerCase() == "input") {
                curErrorSpan = target.nextSibling;
                //备注下无错误提示span,所以先判断错误提示span是否存在
                if(curErrorSpan){
                    if (curErrorSpan.innerHTML != "") {
                        curErrorSpan.innerHTML = ""; //如果不为空就直接清空
                    }
                }
            }

            //(2.)如果当前target为bankCardP,利用事件冒泡点击弹出弹框
            if (target.tagName.toLowerCase() == "p" && hasClass(target, "bankCardP") == true) {
                //0.如果当前的bankCardP的下个同级元素bankCardErrSpan有错误的话，点击错误隐藏
                if(target.nextSibling.innerHTML != ""){
                    target.nextSibling.innerHTML = "";
                }

                //1st.首先判断当前bankCardP的data-flag的值是不是为0，如果为0就直接加载弹框。清除bankCardP下面的值，在弹框点击确定时。
                var curDataFlag = parseInt(target.getAttribute("data-flag"));
                if (curDataFlag == 0) {
                    //给当前target设置唯一标示符(GUID: global unique identifier),用于确定当前target为众行中的哪一个，在下步弹框确定之后再移除，点击弹框X号也要移除
                    target.setAttribute("data-guid", "GUID");
                    bankCardInfBox(target);
                }
            }
            //2-2.如果当前target为点击右边常用联系人动态添加进来的span,利用addPayeeWall实时捕获直接找到添加进来的span(这里走了弯路)
            if (target.tagName.toLowerCase() == "span" && hasClass(target.parentNode, "bankCardP") == true && parseInt(target.parentNode.getAttribute("data-flag")) == 1) {
                target.parentNode.setAttribute("data-guid", "GUID");
                bankCardInfBox(target.parentNode); //这个参数target至关重要，函数之间互传3步
            }

            //(3.)点击行末尾的 叉号 删除当前行 + 重新计算金额 + 重新给"转账人"和"转账金额"表单设置自定义属性
            if (target.tagName.toLowerCase() == "label" && hasClass(target, "delTransferBut") == true) {
                //(1.)删除整行
                if (target.parentNode.parentNode.parentNode) { //如果不写这个if判断只写里面的这一行浏览器报错
                    target.parentNode.parentNode.parentNode.removeChild(target.parentNode.parentNode);
                }
                //调用计算金额函数
                calculateAmount(addPayeeWall);
                //删除之后遍历剩余的transferAmountInput和addPayeeWall然后设置自定义属性
                setAttributeFun(addPayeeWall);
                //点击X号删除行的同时，右侧常用联系人中相对应的样式也移除
                removeSelStyle(target);
            }

            //focus事件补充的是上面if else事件不能之处，比如客户在当前表单单击鼠标右键选择值，清空之后下面错误提示还在的问题
            EventUtil.addHandler(target, "focus", function (event) {
                hideErrorPopup(errorTips);
                if(curErrorSpan){
                    if (curErrorSpan.innerHTML != "") {
                        curErrorSpan.innerHTML = ""; //如果不为空就直接清空
                    }
                }
            });

            //"转账金额表单"blur事件(内部包含:a.验证金额的判断。 b.实时金额 和 付款总金额的判断)
            //说明:虽然blur事件虽然不冒泡，但是在"事件捕获阶段"可以侦听到,此处正是利用了这一点。
            EventUtil.addHandler(target, "blur", function (event) {
                event = EventUtil.getEvent(event);
                var target = EventUtil.getTarget(event);
                if (target.tagName.toLowerCase() == "input" && hasClass(target, "transferAmountInput") == true) {
                    var curErrorSpan = target.nextSibling;
                    //a.验证金额的判断
                    singleVerifyTraAmount(target, curErrorSpan, nextStep); //调用<public-2.>"转账金额表单"验证函数

                    //b.调用计算 "手续费+笔数+总金额" 函数
                    calculateAmount(addPayeeWall);

                    //c.如果上面的一步函数执行完毕之后当前input的value还是为空那就不做校验直接退出当前对象
                    if (target.value != "") {
                        moneyQuota(target, curErrorSpan, saveValObj.sevBackOnceMinLimit, saveValObj.sevBackOnceLimit); //调用<public-3.>转账限额判断函数
                        //经过上面的金额验后，错误框有提示错误就直接返回，不允许走下面的事件
                        if (curErrorSpan.innerHTML != "") {
                            return null;
                        } else {
                        }
                    } else { //singleVerifyTraAmount()执行完之后，转账金额表单中没有填写，直接退出事件
                        return null;
                    }
                }
            });
        });

        //blur事件目的: 鼠标移开addPayeeWall时，计算出转账笔数、利息、和 总金额超出了给出错误提示
        EventUtil.addHandler(addPayeeWall,"blur", function(){
            calculateAmount(addPayeeWall);
        });
        /**--- addPayeeWall利用事件捕获确定当前target:提示错误+弹框+弹框确定写值+点击删除行+计算金额+设置属性+。。。一系列事件---**/


        //<2.> 点击“增加收款人”按钮--动态创建行 (add payee button)
        EventUtil.addHandler(addPayeeBtn, "click", function () {
            //1. 调用动态创建行函数
            createTransferModule(addPayeeWall);
        });


        //<6.> 点击确定提交按钮事件
        EventUtil.addHandler(nextStep, "click", function () {
            //1).第一个判断是验证所有定义了样式为theInput的表单有没有填写，若果没有填写就根据奇偶来为依据，来添加错误提示
            var theInput = $(".theInput"); //取得所有的theInput表单
            var i, len;
            var batchTraAllData = ""; //定义用于保存填写的全部正确的数据的变量
            var saveInputValArr = [];  //保存theInput的value值数组
            for(i=0, len= theInput.length; i<len; i++){
                if(theInput[i].value != ""){ //只有当theInput的值不为空的时候才推到数组中
                    saveInputValArr.push(theInput[i].value);
                }
            }
            //1).判断走完上面的for循环saveInputValArr(保存theInput的value值数组)为空的话，弹出下拉框错误提示
            if(saveInputValArr.length == 0){
                //如果错误信息没有在当前窗口，就回滚页面让错误弹框展示
                setTimeout(scrollBarRoll, 100);
                var tips = "请至少填写一列收款人信息";
                //展示错误
                basicAnimation(serReturnErrorWall, { top: -2});
                addErrorTips(errorTipFont, tips);
                return null;  //走到这步弹出了上面的错误提示就直接跳出函数,不再走下面的else
            } else{
                //2).判断一行中只填写"转账人"或"转账金额"一个表单时，提示他填写另外一个表单
                for(i=0, len= theInput.length; i<len; i++){
                    var curErrorSpan = theInput[i].nextSibling; //取得当前input的同级错误提示span(即:errorSpan)
                    if (i % 2 != 0) { //因为i是从0开始 所以奇数是"转账金额"表单
                        //$1: 判断当前"转账金额"表单的上个"收款人"表单不为空的情况
                        if(theInput[i].parentNode.previousSibling.childNodes[0].value != ""){
                            //console.log("转账金额表单前面的收款人值是 "  + theInput[i].parentNode.previousSibling.childNodes[0].value);
                            //$2: 调用"转账金额表单"的第一道验证函数，判断是不是一个正确的数值
                            submitVerifyTraAmount(theInput[i], curErrorSpan, nextStep);
                            //假如走完上面的验证errorSpan中有错误提示的话就直接返回错误提示，否则接着走下面的判断金额
                            if (curErrorSpan.innerHTML != "") {
                                //如果错误信息没有在当前窗口，就回滚页面让错误弹框展示
                                setTimeout(scrollBarRoll, 200);
                                basicAnimation(serReturnErrorWall, {top: 0});
                                tips = "请查看页面中的错误提示！";
                                addErrorTips(errorTipFont, tips);
                                return null;
                            }else{
                                //$3: 通过2步后,判断当前金额是不是小于或大于最小和最大限额,如果是就直接跳出函数
                                moneyQuota(theInput[i], curErrorSpan, saveValObj.sevBackOnceMinLimit, saveValObj.sevBackOnceLimit);
                                if(curErrorSpan.innerHTML != ""){
                                    //如果错误信息没有在当前窗口，就回滚页面让错误弹框展示
                                    setTimeout(scrollBarRoll, 200);
                                    basicAnimation(serReturnErrorWall, {top: 0});
                                    tips = "请查看页面中的错误提示！";
                                    addErrorTips(errorTipFont, tips);
                                    return null;
                                }else{
                                }
                            }
                        }else{}
                    } else if (i % 2 == 0) { //偶数是"收款人"表单
                        //此处判断处于同一行的 "转账金额表单"是不是为空，只有当转账金额表单不为空的时候才做判断
                        curErrorSpan = theInput[i].nextSibling; //取得当前input的同级错误提示span(即:errorSpan)
                        if(theInput[i + 1].value != ""){
                            if(theInput[i].value == ""){
                                //如果错误信息没有在当前窗口，就回滚页面让错误弹框展示
                                setTimeout(scrollBarRoll, 200);
                                basicAnimation(serReturnErrorWall, {top: 0});
                                tips = "请查看页面中的错误提示！";
                                addErrorTips(errorTipFont, tips);
                                curErrorSpan.innerHTML = "收款人账户不能为空";
                                return null;
                            }else{

                            }
                        }
                    }
                }
            }

            //2).1st判断了包含theInput的表单,此时判断中间的"银行卡信息(bankCardP)"
            var bankCardP = getClassName("bankCardP", addPayeeWall);
            var bankCardErrSpan = getClassName("bankCardErrSpan", addPayeeWall);
            for(var i=0; i<bankCardP.length; i++){
                if(bankCardP[i].getAttribute("data-flag") == 0){
                    //如果错误信息没有在当前窗口，就回滚页面让错误弹框展示
                    setTimeout(scrollBarRoll, 200);
                    basicAnimation(serReturnErrorWall, {top: 0});
                    tips = "请检查未填写的银行卡信息！";
                    addErrorTips(errorTipFont, tips);
                    return null;
                }
            }

            //取得到账时间的P标签
            var transferTime = getClassName("transferTime")[0];
            var arriveTimeSpan =  transferTime.getElementsByTagName("span");
            var processType;
            //1,2都通过后--遍历动态创建的行(dynamicCreateLine)找到每行下的"input" 和 "bankCardP"获取值传给后台
            var dynCreateLine= $(".dynamicCreateLine");
            for(var j=0, len2 =dynCreateLine.length; j<len2; j++) {
                var curLineInput = dynCreateLine[j].getElementsByTagName("input");
                var name = curLineInput[0].value;
                var amount = curLineInput[1].value;
                var remark = curLineInput[2].value;
                //找到bankCardP下的bankName和cardNum
                var curBankCardP = getClassName("bankCardP", dynCreateLine[j])[0];
                //银行名+银行bankCode
                var curBankName = getClassName("bankName", curBankCardP)[0];
                var bankCodeAttr = curBankName.getAttribute("data-code");

                //银行卡号+provinceId+cityId+branchId
                var curCardNum = getClassName("cardNum", curBankCardP)[0];
                var curBankNumAttr = curCardNum.getAttribute("data-number");
                var proCodeAttr = curCardNum.getAttribute("data-province-code");
                var cityCodeAttr = curCardNum.getAttribute("data-city-code");
                var branchCodeAttr = curCardNum.getAttribute("data-branch-code");

                //这里判断"到账时间"
                if(hasClass(arriveTimeSpan[0], "bankSelected") == true){
                    processType = arriveTimeSpan[0].getAttribute("data-type");
                }else{
                    processType = arriveTimeSpan[1].getAttribute("data-type");
                }

                if (name != "" && amount != "") {
                    batchTraAllData = batchTraAllData +
                        "receiveName:" + name +
                        ",bankCode:" + bankCodeAttr +
                        ",bankAccount:" + curBankNumAttr +
                        ",cityId:" + cityCodeAttr +
                        ",provinceId:" + proCodeAttr +
                        ",uniteBankId:" + branchCodeAttr +
                        ",transferMoney:" + amount +
                        ",remark:" + remark +
                        ",processType:" + processType + ";"
                }
            }
            // console.log(batchTraAllData);
            //4).利用String的slice()方法，创建一个batchTraAllData字符串去掉最后一个分号(;)的副本，把此副本传给后台。
            var sliceAllData = batchTraAllData.slice(0, -1);
            //console.log(sliceAllData);

            //5).把第4步的sliceAllData值，赋值给隐藏域input
            var saveAllDataInput = $(".saveAllDataInput")[0];
            saveAllDataInput.value = sliceAllData;
            //最后一步把当前按钮改为提交按钮
            this.type = "submit";
        });

        /**------------------批量导入-start------------------**/

        /*-- 上传控件-start --*/
        //statusFlag(状态标记):此变量的作用是判断在点击"立即上传"按钮之前是不是已经选择了本地要上传的文件
        //var statusFlag = 0;
        var serverBackUserArr; //此变量保存点击上传控件后，服务器得到数据转换后返回用户填写的对方的"姓名，银行卡号，开户行"数据(在上传插件的onUploadSuccess中被赋值)
        /*-- 上传控件-start --*/

        var options = {
            'auto': false,
            'successTimeout': 99999,
            'swf': "<%=path %>/static/uploadify/uploadify.swf",
            'fileObjName': 'file',
            'uploader': '<%=path %>/transferToMoreBank/uploadTransferToMoreBankTemplate',
            'width': '162',
            'debug' : false,  //true为启动试调，false为关闭试调(火狐和IE下上传失败就是用debug调试好的)
            'height': '34',
            'fileTypeDesc': '支持的格式：',
            'fileTypeExts': '*.csv',
            'fileSizeLimit': '3MB',
            'multi': false,
            'overrideEvents': ['onSelectError', 'onUploadError', 'onDialogClose'],
            'onSelectError': function (file, errorCode, errorMsg) {
                switch (errorCode) {
                    case -100:
                        alert("上传的文件数量已经超出系统限制的1个文件！");//上传的文件数量已经超出系统限制的1个文件！
                        break;
                    case -110:
                        var str = "文件 {0} 大小超出系统限制的{1}MB大小！";
                        str = str.replace("{0}", "[" + file.name + "]");
                        str = str.replace("{1}", "[" + 5 + "]");
                        alert("文件 [" + file.name + "] 大小超出系统限制的5MB大小！"); //文件 ["+file.name+"] 大小超出系统限制的3MB大小！
                        break;
                    case -120:
                        var str = "文件 {0}大小异常！";
                        str = str.replace("{0}", "[" + file.name + "]");
                        alert("文件 [" + file.name + "] 大小异常！"); //文件 ["+file.name+"] 大小异常！
                        break;
                    case -130:
                        var str = "文件 {0}类型不正确！";
                        str = str.replace("{0}", "[" + file.name + "]");
                        alert(" 文件 [" + file.name + "] 类型不正确！");// 文件 ["+file.name+"] 类型不正确！
                        break;
                }
            },
            'onFallback': function () {
                tips = "您未安装flash无法完成批量上传: &nbsp;&nbsp;(1)安装后再试！&nbsp;&nbsp;(2)从'常用联系人'上传！";
                basicAnimation(serReturnErrorWall, {top: 0});
                addErrorTips(errorTipFont, tips);
                setTimeout(function(){
                    basicAnimation(serReturnErrorWall, { top: -40});
                    removeErrorTips(errorTipFont);
                }, 5000);
            },
            'onQueueComplete': function(){},
            'onUploadStart' : function(){},
            'onUploadError': function (file, errorCode, errorMsg) {
                //console.log(errorCode);
                switch (errorCode) {
                    case -240:
                        break;
                }
                console.log("上传失败");
                $('#' + file.id).find('.data').html('上传失败');
            },
            'onUploadSuccess': function(file, data, response){
                var allData = JSON.parse(data);  //上传成功之后，服务器返回的值
                var theData = allData.data;
                //console.log(theData);
                serverBackUserArr = theData.csvObjList;
                //console.log(serverBackUserArr);
                setTimeout(delayLoading, 500);
                function delayLoading() {
                    /*1st. 如果addPayWall下没有payeeInput存在。
                     2nd. 如果addPayeeWall下已经有payeeInput, 先判断已经有的行中是不是为空，为空就删除整行。不为空就判断是不是和要导入的数据有重复
                     如果有重复就删除重复数据后再创建行+写值，没有重复就直接写值*/
                    var addPayeeWall = $(".addPayeeWall")[0];
                    var payeeInput = getClassName("payeeInput", addPayeeWall);
                    var bankCardP = getClassName("bankCardP", addPayeeWall);
                    //console.log(payeeInput.length);
                    if (payeeInput.length == 0) {
                        //循环serverBackUserArr数据的长度，动态生成行
                        var i, len;
                        //第一步动态创建行
                        for (i = 0, len = serverBackUserArr.length; i < len; i++) {
                            var saveCreLine = createLineFun();         //调用创建行函数
                            /*console.log(saveCreateLine);
                             console.log(saveCreateLine.childNodes[0].className);*/
                            var getCurrentLine = saveCreLine.childNodes[0]; //取得上步创建的行(class="dynamicCreateLine")
                            //console.log(getCurrentLine.className);
                            //console.log(getClassName("payeeInput", getCurLine)[0].className);
                            batchTraValFun(getCurrentLine, serverBackUserArr, i); //给bankCardP写入span + innerHTML
                            addPayeeWall.appendChild(saveCreLine);
                        }
                        //直接调用公共的->设置属性方法
                        setAttributeFun(addPayeeWall);
                        return null;
                    } else if (payeeInput.length > 0) {
                        var j, len2;
                        var saveDelLineArr = [];
                        //1st.移除每个空行
                        for (j = 0, len2 = bankCardP.length; j < len2; j++) {
                            if (bankCardP[j].getAttribute("data-flag") == 0) {
                                //获取到要删除的行，推入数组
                                saveDelLineArr.push(bankCardP[j].parentNode.parentNode);
                            }
                        }
                        //遍历数组中保存的每个空行元素,然后利用removeChild移除每个空行
                        for (var x = 0; x < saveDelLineArr.length; x++) {
                            addPayeeWall.removeChild(saveDelLineArr[x]);
                        }

                        /*2nd.经过1st之后addPayeeWall中只有2种情况:
                         (1.)已经没有行: 如果是就立即创建行+写值;
                         (2.)剩余已经填写了收款人的行：判断里面有没有和要导入的模板数据有重复的，如果有重复就删除重复*/
                        bankCardP = getClassName("bankCardP", addPayeeWall); //经过上面2个for循环之后取得当前存的行下的bankCardP元素
                        for (var z = 0; z < serverBackUserArr.length; z++) {
                            //(1.)已经有行就判断行中值+写值;
                            if (bankCardP.length > 0) {
                                //已经有行存在，判断和要导入的模板数据是否有重复，如果有重复就删除重复
                                var saveRepLineArr = [];     //保存下面批量导入时，和导入数据发生重复的行
                                for (var y = 0; y < bankCardP.length; y++) {
                                    //判断条件为: 每行中class为cardNum的元素的data-number是不是和要批量导入的数据中的bankAccount相等
                                    if (parseInt(bankCardP[y].lastChild.getAttribute("data-number")) == parseInt(serverBackUserArr[z].bankAccount)) {
                                        //console.log(bankCardP[y].lastChild.getAttribute("data-number"));
                                        var tips = "提示：批量导入的收款人会覆盖当前页面已经填写的相同收款人。";
                                        //滚动条回滚函数
                                        setTimeout(scrollBarRoll, 100);
                                        //调用动画弹出红色下拉框 + tips提示
                                        basicAnimation(serReturnErrorWall, { top: -2});
                                        addErrorTips(errorTipFont, tips);
                                        saveRepLineArr.push(bankCardP[y].parentNode.parentNode);
                                    }
                                }
                                //延时5s后把红色下拉弹框隐藏，并清除错误提示
                                setTimeout(clearBox, 6000);
                                function clearBox(){
                                    basicAnimation(serReturnErrorWall, { top: -40});
                                    removeErrorTips(errorTipFont);
                                }
                                //console.log(saveRepLineArr);
                                if (saveRepLineArr.length > 0) {
                                    for (var l = 0; l < saveRepLineArr.length; l++) {
                                        if(saveRepLineArr[l].parentNode){
                                            saveRepLineArr[l].parentNode.removeChild(saveRepLineArr[l]);
                                        }
                                    }
                                }
                                //console.log(saveRepLineArr);
                            }
                            //动态创建行 + 写值
                            var saveCreateLine = createLineFun();         //调用创建行函数
                            var getCurLine = saveCreateLine.childNodes[0]; //取得上步创建的行(class="dynamicCreateLine")
                            //console.log(getClassName("payeeInput", getCurLine)[0].className);
                            batchTraValFun(getCurLine, serverBackUserArr, z);
                            addPayeeWall.appendChild(saveCreateLine);
                            //直接调用公共的->设置属性方法
                            setAttributeFun(addPayeeWall);
                        }

                        /*3rd.经过2nd创建行+写值后，取得此时addPayeeWall下所有的行，并同时取得右侧contactPerUl下所有的li，
                         分别找到data-number和data-account然后做对比，如果相等并且常用联系人li没有添加选中样式，那就添加选中样式，且小圆点(空心->实心)*/
                        bankCardP = getClassName("bankCardP", addPayeeWall);
                        var aContactsLi = getClassName("contactPerUl")[0].getElementsByTagName("li");
                        var m, n, length1, length2;
                        for(m=0, length1= bankCardP.length; m < length1; m++){
                            for(n=0, length2= aContactsLi.length; n<length2; n++){
                                if(aContactsLi[n].hasOwnProperty("data-account")){
                                    var dataAccAttr = getClassName("cardNum", aContactsLi[n])[0].getAttribute("data-account");
                                    if(parseInt(dataAccAttr) == parseInt(bankCardP[m].lastChild.getAttribute("data-number"))){
                                        //如果当前li不是选中状态就添加选中
                                        if(hasClass(aContactsLi[n], "lightBlueBg6") == false){
                                            aContactsLi[n].className = addClassFun(aContactsLi[n], "lightBlueBg6");
                                            //空心到实心
                                            hollowToDots(aContactsLi[n].firstChild.childNodes[0]);
                                        }
                                    }
                                }
                            }
                        }
                    }

                    //调用计算 "手续费+笔数+总金额" 函数
                    calculateAmount(addPayeeWall);

                    //最后写入值之后，隐藏上传文件的下拉框
                    animate(batchImpFileWall, {height: 0});

                    if(theData.impResult == ""){
                        //成功之后让"确定转账"按钮变色
                        btnChangeBg(nextStep);
                    }else{
                        //如果服务器有错误返回: 滚动条回滚 + 错误展示
                        setTimeout(scrollBarRoll, 100);
                        //调用动画弹出红色下拉框 + tips提示
                        basicAnimation(serReturnErrorWall, { top: -2});
                        addErrorTips(errorTipFont, theData.impResult);
                        return null;
                    }
                }
                //console.log(theData.ok);
                $('#' + file.id).find('.data').html('上传成功');
            }
        };
        $("#importFile").uploadify(options);
        /*** 上传控件-over ***/

        var confirmBtn = $(".confirmBtn")[0];       //确定导入按钮
        var cancelBtn = $(".cancelBtn")[0];         //取消导入按钮

        //点击"批量导入"显示下拉框
        EventUtil.addHandler(batchImportBtn, "click", function(){
            //显示上传文件的下拉框
            animate(batchImpFileWall, {height: 158});
        });

        //立即导入按钮
        EventUtil.addHandler(confirmBtn, "click", function (event) {
            event = EventUtil.getEvent(event);
            $("#importFile").uploadify("upload");
            EventUtil.stopPropagation(event);
        });

        //取消导入按钮
        EventUtil.addHandler(cancelBtn, "click", function(){
            //1.如果错误弹框有显示，首先隐藏错误弹框
            basicAnimation(serReturnErrorWall, { top: -40});
            removeErrorTips(errorTipFont);
            //2.取消选择的本地文件
            $('#importFile').uploadify('cancel');
            //3. 收起上传文件的下拉框
            animate(batchImpFileWall, {height: 0});
        });

        /**------------------批量导入-over------------------**/
    };

    var moneyNumErrorTips = {
        largeAvailable : "抱歉，付款总额大于当前可用余额。",
        largeTodRemain : "抱歉，付款总额大于当日剩余可转金额。",
        largeTodMax : "抱歉，付款总额大于当日限额。",
        largeRemainTimes : "抱歉，转账笔数超过当日剩余交易笔数。"
    };


    //计算金额+服务费+付款笔数+总额
    function calculateAmount(addPayeeWall) {
        var saveMoneyArr = [];           //定义数组，保存未加收服务费之前的的金额
        var serChargeVar;                //定义保存服务费的变量

        //1st:获取当前函数执行时的转账金额表单数量
        var curAllTransInputs = getClassName("transferAmountInput", addPayeeWall);

        //2-0. 首先判断当前转账是"2小时到账 / 24小时到账"，根据不同的到账事件判得出不同的 "最小-最大限额"
        //取得"/"的data-type,在3rd中做判断使用
        var arriveTimeSpan =  transferTime.getElementsByTagName("span");
        var processType;
        if(hasClass(arriveTimeSpan[0], "bankSelected") == true){
            processType = arriveTimeSpan[0].getAttribute("data-type"); //2小时到账 data-type = 1
        }else{
            processType = arriveTimeSpan[1].getAttribute("data-type"); //24小时到账 data-type = 0
        }

        //2nd.循环1st得到的转账金额表单，取得元素的值推入到saveMoneyArr中
        for (var i = 0; i < curAllTransInputs.length; i++) {
            //遍历完把值推入到数组中: a.不能为空。b.不小于单笔最小金额。 c.不大于单笔最大金额
            var curInputVal = trim(curAllTransInputs[i].value); //如果输入的值有空格，就首先去除前后空格
            if (curInputVal != "" && curInputVal >= saveValObj.sevBackOnceMinLimit && curInputVal <= saveValObj.sevBackOnceLimit) {
                saveMoneyArr.push(curInputVal);
            }else{
            }
        }
        //把数组的长度赋值给"付款笔数span"
        curPayNumber.innerHTML = parseInt(saveMoneyArr.length);
        //console.log(saveMoneyArr);

        //3rd.定义一个save money variable(保存未加收手续费之前的转账金额)
        //循环saveMoneyArr数组，然后把其中保存的值相加，赋值给saveMoneyVar
        var saveMoneyVar = parseFloat(0);
        var saveChargeArr = [];    //定义一个保存每行转账金额表单的手续费数组，
        for (var j = 0; j < saveMoneyArr.length; j++) {
            //第一计算出批量填写的金额不加手续费
            saveMoneyVar += parseFloat(saveMoneyArr[j]);

            // 第二单独计算出当前笔数的手续费，计算服务费分2小时和24小时:
            //在计算汇率之前,先要判断页面中选的是哪种到账方式
            if(processType == 1){ //两小时到账
                //判断2小时到账是 "按笔"还是"按比例"
                twoArrive();
                calChargeFun(saveValObj, saveMoneyArr[j]);
            }else if(processType == 0){
                //判断24小时到账是 "按笔"还是"按比例"
                twentyFourArr();
                calChargeFun(saveValObj, saveMoneyArr[j]);
            }
        }
        function calChargeFun(saveValObj, curEle){
            var fee;
            console.log("输出服务器返回的服务费率: " + saveValObj.serviceCharge);
            if(saveValObj.chargeType == 0){
               //0是按笔收费，按笔收费直接把每笔手续费赋值给fee
                fee = parseFloat(saveValObj.serviceCharge);
            }else if(saveValObj.chargeType == 1){
                //1是按比例收费，按比例收费需要计算
                fee = parseFloat(dotSlice((parseFloat(curEle) * parseFloat((saveValObj.serviceCharge)))));
                if(parseFloat(fee) < parseFloat(saveValObj.minCharge)){ //小于最小手续费标准取 minCharge
                    fee = parseFloat(saveValObj.minCharge);
                }else if(parseFloat(fee) > parseFloat(saveValObj.maxCharge)){ //大于最大续费标准取 maxCharge
                    fee = parseFloat(saveValObj.maxCharge);
                }
            }
            saveChargeArr.push(fee);  //得到当前手续费后，把手续费推到保存手续费的数组中
            return saveChargeArr;
        }

        var getAllCharge = parseFloat(0);
        //然后遍历上面的saveChargeArr数组，项数相加把和赋值给serviceChargeSpan
        for(var i=0; i<saveChargeArr.length; i++){
            console.log(saveChargeArr[i]);
            getAllCharge += parseFloat(saveChargeArr[i]);
        }
        console.log("输出计算后的手续费 " + getAllCharge);
        if(serviceChargeSpan.innerHTML != ""){
            serviceChargeSpan.innerHTML = "";
        }
        serviceChargeSpan.innerHTML = parseFloat(dotSlice(getAllCharge));

        //4th. 计算付款总金额
        var tem = parseFloat(saveMoneyVar) + parseFloat(getAllCharge);
        totalPayment.innerHTML = dotSlice(tem);

        var totalPayHtml = parseFloat(totalPayment.innerHTML);
        var availableMoney = parseFloat(availableBalance.innerHTML);    //可用余额span
        //console.log("availableMoney" + availableMoney);
        var todayRemainMoney = parseFloat(oneDayRemainMoney.innerHTML);  //当日剩余可转金额span

        //5th.调用比较数值大小的函数
        compareNumSize(totalPayHtml, availableMoney, todayRemainMoney);
        //6th.调用比较"付款笔数"的函数
        var curPayNum  = parseInt(saveMoneyArr.length);                     //取得当前付款笔数
        var todayRemainPayNum  = parseInt(oneDayRemainPayNum.innerHTML);    //当日剩余交易笔数
        comparePayTimes(curPayNum, todayRemainPayNum);
        //7th.如果5th和6th中有错误出现，点击下拉弹框中的叉号(closeErrorIcon)就把弹框隐藏并清除里面的错误
        var closeErrorIcon = $(".closeErrorIcon")[0];
        EventUtil.addHandler(closeErrorIcon, "click", function(){
            hideErrorPopup();
        });

        //B1.把saveMoneyArr数组的长度赋值给"付款笔数(curPayNumber)"span
        curPayNumber.innerHTML = parseFloat(saveMoneyArr.length);
        comparePayTimes(curPayNum, todayRemainPayNum);

    }

    //public-4 封装"付款总额span"中的值 && "可用余额span"||"当日剩余可转金额span"||"当日限额span"比较大小的函数
    function compareNumSize(totalMoney, availableMoney, todayRemainMoney){
        var tips;
        if(parseFloat(totalMoney) > parseFloat(availableMoney)){
            tips = moneyNumErrorTips.largeAvailable;
            //如果错误信息没有在当前窗口，就回滚页面让错误弹框展示
            setTimeout(scrollBarRoll, 200);
            basicAnimation(serReturnErrorWall, {top: 0});
            addErrorTips(errorTipFont, tips);
        }else if(parseFloat(totalMoney) > parseFloat(todayRemainMoney)){
            tips = moneyNumErrorTips.largeTodRemain;
            //如果错误信息没有在当前窗口，就回滚页面让错误弹框展示
            setTimeout(scrollBarRoll, 200);
            basicAnimation(serReturnErrorWall, {top: 0});
            addErrorTips(errorTipFont, tips);
        }
        return null;
    }

    //付款笔数和"单日最大交易笔数"/"单日剩余交易笔数"比较函数
    function comparePayTimes(curPayNum, todayRemainPayNum){
        var tips;
        if(parseInt(curPayNum) > parseInt(todayRemainPayNum)){
            tips = moneyNumErrorTips.largeRemainTimes;
            //如果错误信息没有在当前窗口，就回滚页面让错误弹框展示
            setTimeout(scrollBarRoll, 200);
            basicAnimation(serReturnErrorWall, { top: -2});
            addErrorTips(errorTipFont, tips);
        }
        return null;
    }

    //二次封装展示/隐藏下拉弹框
    function hideErrorPopup(errorTips){
        var errorTipFont = $(".errorTipFont")[0];
        var eleParent = serReturnErrorWall.parentNode;
        var parentWidth = eleParent.offsetWidth;
        serReturnErrorWall.style.left = (parentWidth - serReturnErrorWall.offsetWidth)/2 + "px";
        //1).第一步首先判断拉下弹框是不是显示状态,如果是就在点击的同时把下拉隐藏并清空里面的值
        var errorWallTop = serReturnErrorWall.style.top; //取得当前错误提示框距离父级(relative)元素的垂直距离
        if(parseInt(errorWallTop) >= -2) { //当元素的高度大于-6px的时候，代表当前错误提示框是展示状态。
            //隐藏下拉弹框错误
            basicAnimation(serReturnErrorWall, { top: -40});
            removeErrorTips(errorTipFont);
            if(errorTips !="" || errorTips != undefined){
                errorTips = "";
            }
        }
    }

    //动态创建行函数(记得函数名不要和其他变量名重复)
    function createLineFun(){
        //(2.)把创建的行添加到文档片段中
        var fragment = document.createDocumentFragment();
        var dynamicCreateEle = document.createElement("div");
        dynamicCreateEle.className = "dynamicCreateLine  overflowHid";

        //第1个P标签
        var firstP = document.createElement("p"),
            firstInput = document.createElement("input");
        firstP.className = "fl overflowHid";
        firstInput.className = "displayBlock height38 lineHei38 whiteBg width126 lightGreyBor borRadius4 textInd10 marRight15 theInput payeeInput";
        firstInput.setAttribute("maxlength", "100");
        firstInput.setAttribute("type", "text");
        var firstSpan = document.createElement("span");
        firstSpan.className = "displayBlock width126 redFont lineHei20 font12 minHei28 textInd2 redFont marRight15 errorSpan payeeErrSpan";
        firstP.appendChild(firstInput);
        firstP.appendChild(firstSpan);
        dynamicCreateEle.appendChild(firstP);

        //第2个P标签 (银行卡信息)
        var secondDiv = document.createElement("div"),
            secFirstP = document.createElement("p");
        secondDiv.className = "fl overflowHid";
        secFirstP.className = "displayBlock height38 lineHei38 width186 whiteBg lightGreyBor borRadius4 textCenter marRight15 cursorPoint darkGreyFont2 overflowHid bankCardP";
        secFirstP.setAttribute("data-flag", 0);
        secFirstP.innerHTML = "—— 请选择 ——";
        var secSecondSpan = document.createElement("span");
        secSecondSpan.className = "displayBlock width186 redFont lineHei20 font12 minHei28 textInd2 redFont marRight15 errorSpan bankCardErrSpan";
        secondDiv.appendChild(secFirstP);
        secondDiv.appendChild(secSecondSpan);
        dynamicCreateEle.appendChild(secondDiv);

        //第3个P标签
        var thirdP = document.createElement("p"),
            thirdInput = document.createElement("input");
        thirdP.className = "fl overflowHid";
        thirdInput.className = "displayBlock height38 lineHei38 width168 lightGreyBor borRadius4 textInd10 marRight15 theInput transferAmountInput";
        thirdInput.setAttribute("maxlength", "20");
        var thirdSpan = document.createElement("span");
        thirdSpan.className = "displayBlock width168 redFont lineHei20 font12 minHei28 textInd2 redFont marRight15 errorSpan traAmountErrSpan";
        thirdP.appendChild(thirdInput);
        thirdP.appendChild(thirdSpan);
        dynamicCreateEle.appendChild(thirdP);

        //第4个P标签
        var fourthP = document.createElement("p"),
            fourthInput = document.createElement("input");
        fourthP.className = "fl overflowHid";
        fourthInput.className = "displayBlock height38 lineHei38 width168 lightGreyBor borRadius4 textInd10 remark";
        fourthInput.setAttribute("maxlength", 500);
        fourthInput.placeholder = "选填，对方可看到";
        fourthP.appendChild(fourthInput);
        dynamicCreateEle.appendChild(fourthP);

        //第4个P标签

        //第5个P标签 (X号)
        var fifthP = document.createElement("p"),
            fifthSpan =  document.createElement("label");
        fifthP.className = "fl overflowHid";
        fifthSpan.className = "fl width20 height20 marTop12 contactCloseBut marLeft12 cursorPoint delTransferBut";
        fifthP.appendChild(fifthSpan);
        dynamicCreateEle.appendChild(fifthP);
        fragment.appendChild(dynamicCreateEle);
        return fragment;
    }

    //动态创建行后给行内的元素设置属性
    function setAttributeFun(addPayeeWall){
        var i, len;
        var amount = "单笔限额" + saveValObj.sevBackOnceMinLimit + "~" + saveValObj.sevBackOnceLimit + "元";
        var curAllTransInputs = getClassName("transferAmountInput", addPayeeWall);
        var curAllPayeeInputs = getClassName("payeeInput", addPayeeWall);
        //因为每次实时更新transferAmountInput和payeeInput都是一样多的，所以公用一个for循环
        for(i=0,len=curAllTransInputs.length; i<len; i++){
            /*转账金额表单设置属性有: data-index, data-onceMinLimit, data-onceLimit, placeholder*/
            if(curAllTransInputs[i].hasAttribute("data-index")){
                //if为如果已经有了data-index属性，1st清除,2nd再次设置[这种情况是出现在点击X号删除行时用到]
                curAllTransInputs[i].removeAttribute("data-index");
                curAllTransInputs[i].setAttribute("data-index", (i+1));
            }else{
                //else为如果data-index还不存在
                curAllTransInputs[i].setAttribute("data-index", (i+1));                  //设置data-index
            }
            //这三个属性固定读取服务器返回的数据，不写在判断条件内
            curAllTransInputs[i].setAttribute("data-onceMinLimit", saveValObj.sevBackOnceMinLimit); //serverBack最小限额
            curAllTransInputs[i].setAttribute("data-onceLimit", saveValObj.sevBackOnceLimit);       //serverBack最大限额
            curAllTransInputs[i].setAttribute("placeholder", amount);                    //设置placeholder属性

            /*收款人表单设置属性: data-index, placeholder*/
            if(curAllPayeeInputs[i].hasAttribute("data-index")){
                //if为如果已经有了data-index属性，1st清除,2nd再次设置[这种情况是出现在点击X号删除行时用到]
                curAllPayeeInputs[i].removeAttribute("data-index");
                curAllPayeeInputs[i].setAttribute("data-index", (i+1));
            }else{
                curAllPayeeInputs[i].setAttribute("data-index", (i+1));                  //设置data-index
            }
            curAllPayeeInputs[i].setAttribute("placeholder", ((i+1) + ".收款人姓名"));
        }

    }

    //动态创建行之后滚动条自动下滚事件
    function scrollBarAutoSlideDown(addPayeeWall){  //scroll bar auto slide down 滚动条自动下滑事件
        var dynamicCreateLine = getClassName("dynamicCreateLine", addPayeeWall);
        var j, lineNum;
        for(j=0, lineNum = dynamicCreateLine.length; j<lineNum; j++) {
            //因为打开页面就创建了2行，默认两行不能让滚动条下滚,所以j>1
            if(j>1){
                //取得"文档的总高度"，"可视窗口的高度"
                var documentHeight = Math.max(document.documentElement.clientHeight, document.body.scrollHeight, document.documentElement.scrollHeight);
                var windowHeight = window.innerHeight;
                var scrollTop = documentHeight - windowHeight; //取得当前页面中的scrollTop值
                //console.log("当前页面的scrollTop值为 " + scrollTop);
                window.scrollTo(0, parseInt(scrollTop += 66));
            }
        }
    }

    //点击X号删除行的同时，右侧常用联系人中相对应的样式也移除
    function removeSelStyle(ele){
        /*找到当前元素所在的行，判断bankCardP的data-flag是否等于1，如果是找到其下的cardNum的值，在移除行的同时，
         拿cardNum的值和右侧联系人中cardNum元素的属性data-account的最后四位和前值比较，如果相等就把当前
         选中的常用联系人li的样式移除添加默认样式，第一个子元素的圆点由(实心->空心)*/
        var curGrandFather = ele.parentNode.parentNode;
        //console.log(curGrandFather.className);
        var curBankCardP = getClassName("bankCardP", curGrandFather);
        //console.log(curBankCardP[0].lastChild.innerHTML);
        var curCardNumHtml = curBankCardP[0].lastChild.innerHTML;
        var contactPerUl = $(".contactPerUl")[0];
        var contactsLi = contactPerUl.getElementsByTagName("li");
        for(var s=0; s<contactsLi.length; s++){
            if(hasClass(contactsLi[s], "lightBlueBg6") == true){
                if(contactsLi[s].hasOwnProperty("data-account")){
                    var curDataAccount = contactsLi[s].lastChild.getAttribute("data-account");
                    if(curCardNumHtml == (curDataAccount.slice(curDataAccount.length-4, curDataAccount.length))){
                        //首先移除li的选中背景
                        contactsLi[s].className = removeClassFun(contactsLi[s], "lightBlueBg6");
                        //其次把实心圆改为空心圆
                        var circleTag = contactsLi[s].firstChild.childNodes[0];
                        dotsToHollow(circleTag);
                    }
                }
            }
        }
    }


    //点击"立即导入"批量导入值封装
    function batchTraValFun(ele, dataArr,index){
        //2nd. 给1st创建的行写值
        var payeeInput =getClassName("payeeInput", ele);
        var bankCardP = getClassName("bankCardP", ele);
        var transferAmountInput =  getClassName("transferAmountInput", ele);
        var remark = getClassName("remark", ele);
        payeeInput[0].value = dataArr[index].receiveName;
        //首先把单签bankCardP标签里面的值清空
        bankCardP[0].innerHTML = "";
        //然后写值
        var consArgObj = {
            getDataCode: dataArr[index].bankCode,
            bankNameHtml:dataArr[index].bankName,
            getDataAccount:dataArr[index].bankAccount
        };
        createBankCardSpan(bankCardP[0], consArgObj);
        //3.创建完3个span之后，把data-flag设置为1
        bankCardP[0].setAttribute("data-flag",1);
        transferAmountInput[0].value = dataArr[index].transferMoney;
        remark[0].value = dataArr[index].remark;
    }

    //单个"转账金额表单"验证函数: (也就是说这个验证只在单个"转账金额表单"失去焦点事件时验证，和提交验证的区别是，这里不验证为空的情况)
    // 需要注意的是这里的错误提示是调用的inputErrorTipsString.js的，btnChangeBg()调用的inputValidation.js
    function singleVerifyTraAmount(curInput, curErrorSpan, nextStepBut){
        var curInputVal = curInput.value;
        curInputVal = curInputVal.replace(/^\s+|\s+$/g,"");
        if (isAmount.test(curInputVal) &&  curInputVal != 0 ) {
            btnChangeBg(nextStepBut);
        }else if (curInputVal == "") {
            return null; //为空的时候直接返回
        }else if (curInputVal != isAmount.test(curInputVal)  || /^0+(\.0*)?$/.test(curInputVal)) {
            curErrorSpan.innerHTML = errorTips.transferAmountInpErr[0].transferAmountNotCorrect;
            return null;
        }
    }

    //点击提交按钮时验证"转账金额表单"的函数，但是这个函数却在"收款人表单"中填写值，但"转账金额"没有填写时才被调用
    function submitVerifyTraAmount(curInput, curErrorSpan, nextStepBut) {
        var curInputVal = curInput.value;
        curInputVal = curInputVal.replace(/^\s+|\s+$/g, "");
        if (isAmount.test(curInputVal) && curInputVal != 0) {
            btnChangeBg(nextStepBut);
        } else if (curInputVal == "") {
            curErrorSpan.innerHTML = errorTips.transferAmountInpErr[2].transferAmountCantEmpty;
            return null;
        } else if (curInputVal != isAmount.test(curInputVal) || /^0+(\.0*)?$/.test(curInputVal)) {
            curErrorSpan.innerHTML = errorTips.transferAmountInpErr[0].transferAmountNotCorrect;
            return null;
        }
    }

    //转账限额判断函数
    function moneyQuota(curInput, curErrorSpan,sevBackOnceMinLimit, sevBackOnceLimit){
        //quota /ˈkwəutə/ n 限额 定量
        //onceRecMinAmount单日最小限额, onceLimit：单次限额， singleDayLimit: 单日限额， maxRecTimes:  单日最多充值次数
        var curInputVal = curInput.value,
            onceMinAmount = parseFloat(sevBackOnceMinLimit),
            onceMaxAmount = parseFloat(sevBackOnceLimit);
        if(curInputVal < onceMinAmount){
            curErrorSpan.innerHTML = "转账金额小于单笔最小限额";
            return null;
        } else if(curInputVal > onceMaxAmount){ //此处onceLimitHtml返回
            curErrorSpan.innerHTML = "转账金额大于单笔限额";
            return null;
        }
    }




    /**------弹框+下拉+验证------**/
        //银行卡信息: 点击弹框出现 + 点击X号关闭
    var cloBanConBoxBtn = $(".cloBanConBoxBtn")[0];     // 取得关闭 "添加银行卡信息"/"新增联系人"弹框的X号
    var addBankConsBox = $(".addBankConsBox");          // 取得 "选择"和"新增"联系人弹框
    var maskPopup = $(".maskPopup");
    function bankCardInfBox(passTarget){
        //取得全局遮罩层弹框
        popupDiv(maskPopup);  //最外围的全局遮罩层
        centerPopup(addBankConsBox); //中间的弹框居中函数
        maskPopup.show();
        addBankConsBox.show();

        //0.取得弹框中的各个表单
        var bankCardInput = getClassName("bankCardInput")[0];            //银行卡号
        var saveOpenBankSpan = $(".saveOpenBankSpan")[0];               //开户银行
        var saveProCityWall = getClassName("saveProCityWall")[0];        //所在省市
        var saveBranchBankSpan = getClassName("saveBranchBankSpan")[0];  //开户支行
        var provCityOuterWall = getClassName("provCityOuterWall")[0];    //省市最外围的包围框
        var openBranchBankWall = getClassName("openBranchBankWall")[0];  //开户支行最外围的包围框

        //1st.点击出现弹框的同时,如果里面的表单和span已经有值就把所有值清空。
        bankCardInput.value = "";
        saveProCityWall.innerHTML = "";
        if(hasClass(saveOpenBankSpan, "darkGreyFont") == false){
            saveOpenBankSpan.className = addClassFun(saveOpenBankSpan, "darkGreyFont");
        }
        saveOpenBankSpan.innerHTML = "点击选择";
        if(hasClass(saveBranchBankSpan, "darkGreyFont") == false){
            saveBranchBankSpan.className = addClassFun(saveBranchBankSpan, "darkGreyFont");
        }
        saveBranchBankSpan.innerHTML = "点击选择";
        if(hasClass(provCityOuterWall, "displayNone") == false){
            provCityOuterWall.className = addClassFun(provCityOuterWall, "displayNone");
        }
        if(hasClass(openBranchBankWall, "displayNone") == false){
            openBranchBankWall.className = addClassFun(openBranchBankWall, "displayNone");
        }
        //2nd.如果data-flag=0就不做操作
        if(passTarget.getAttribute("data-flag") == 0){
            //如果target的data-flag=0就代表当前target里没有值，不需要重新写入到弹框
        }
        //3rd.如果data-flag=1就把bankCardP中的值写入到弹框
        if(passTarget.getAttribute("data-flag") == 1){
            //1st 取得当前bankCardP下的后两个span的值和自定义属性
            var bankName= getClassName("bankName", passTarget)[0],
                bankNameHtml = bankName.innerHTML,
                bankCode = bankName.getAttribute("data-code");
            var cardNum = getClassName("cardNum", passTarget)[0],
                dataNumber = cardNum.getAttribute("data-number"),
                dataProCode = cardNum.getAttribute("data-province-code"),
                dataProName = cardNum.getAttribute("data-province-Name"),
                dataCityCode = cardNum.getAttribute("data-city-code"),
                dataCityName = cardNum.getAttribute("data-city-name"),
                dataProcityFlag = cardNum.getAttribute("data-procity-flag"),
                dataBranchCode = cardNum.getAttribute("data-branch-code"),
                dataBranchName = cardNum.getAttribute("data-branch-name"),
                dataBranchFlag = cardNum. getAttribute("data-branch-flag");
            //2nd 给弹框赋值
            bankCardInput.value = dataNumber; //银行卡号写值

            saveOpenBankSpan.innerHTML = bankNameHtml;  //开户银行写值
            saveOpenBankSpan.setAttribute("data-bank-code", bankCode);
            if(hasClass(saveOpenBankSpan,"darkGreyFont")){
                saveOpenBankSpan.className = removeClassFun(saveOpenBankSpan, 'darkGreyFont');
            }

            //console.log("此处输出dataProName" + dataProName);
            if(dataProcityFlag == 1){
                if(hasClass(provCityOuterWall, "displayNone")){
                    provCityOuterWall.className = removeClassFun(provCityOuterWall, "displayNone");
                }
                saveProCityWall.appendChild(creProCitySpan(dataProCode, dataProName, dataCityCode, dataCityName));
            }
            if(dataBranchFlag == 1){
                if(hasClass(openBranchBankWall, "displayNone")){
                    openBranchBankWall.className = removeClassFun(openBranchBankWall, "displayNone");
                }
                if(saveBranchBankSpan.innerHTML != "点击选择"){
                    if(hasClass(saveBranchBankSpan,"darkGreyFont")){
                        saveBranchBankSpan.className = removeClassFun(saveBranchBankSpan, 'darkGreyFont');
                    }
                }
                saveBranchBankSpan.innerHTML = dataBranchName;
                saveBranchBankSpan.setAttribute("data-branch-code", dataBranchCode);
            }
        }
        /*关闭 "添加银行卡信息"/"新增联系人"弹框的X号: 因为在点击当前bankCardP的时候设置了data-guid属性，所以即使在打开
         什么都没填的时候，点击X号关闭也要移除data-guid属性*/
        EventUtil.addHandler(cloBanConBoxBtn, "click", function(){
            maskPopup.css("display", "none");
            addBankConsBox.css("display", "none");
            //重要一步:把passTarget的data-guid(唯一标示符)移除
            passTarget.removeAttribute("data-guid");
        });
        var boxConfirmBtn =  $(".boxConfirmBtn")[0];

        //取得确定按钮: 写入值
        boxConfirmBtnFun(passTarget);
    }

    //开户银行下拉事件 + 所在省市下拉事件 + 开户支行下拉事件 + 验证

    //卡号
    var bankCardInput = getClassName("bankCardInput")[0];
    var bankCardErrorSpan = getClassName("bankCardErrorSpan")[0];
    var bankCardReg =  /^[a-zA-Z0-9]+$/;

    //"开户银行",
    var saveOpenBankP = $(".saveOpenBankP")[0],
        saveOpenBankSpan = $(".saveOpenBankSpan")[0],
        openBankUl = $(".openBankUl")[0];

    //"所在省市"
    var outSaveValWall = getClassName("outSaveValWall")[0],
        saveProCityWall = getClassName("saveProCityWall")[0],
        dropdownWall = getClassName("dropdownWall")[0],
        proCityTitWall = getClassName("proCityTitWall")[0], //取得上部分切换的ul
        provinceWall = getClassName("provinceWall")[0],     //取得第二部分切换时存储省份的li
        cityWall = getClassName("cityWall")[0],             //取得第二部分切换时存储城市的li
        saveCityUl = getClassName("saveCityUl")[0];         //取得切换时第二部分市区li下面用来保存不同省份市区的ul


    /*弹框确定按钮~验证事件*/
    var addBankInfBoxCen = getClassName("addBankInfBoxCen")[0];        //取的弹框中部板块
    var provCityOuterWall = getClassName("provCityOuterWall")[0],      //所在省市整块包围框
        openBranchBankWall = getClassName("openBranchBankWall")[0];    //开户支行整块包围框
    var openBankErrorSpan = getClassName("openBankErrorSpan")[0],        //保存开户银行错误提示
        proCityErrorSpan = getClassName("proCityErrorSpan")[0];        //保存省市错误提示


    /*------开户银行事件~start-------*/
    var bankData;     //存储服务器返回的所有银行数据
    //1st.取的所有银行数据
    $.ajax({
        type: "post",
        dataType: "json",
        async: false,
        url: "<%=path%>/commonService/getTransferBankList",
        success: function (data) {
            //console.log(data);
            if (data.ok == true) {
                bankData = JSON.parse(data.data);
                if(bankData instanceof Array){
                    //console.log(bankData);
                }
            }
        }
    });

    var straightBank;  //存储服务器返回的所有直企银行
    //2nd.直企银联数据
    $.ajax({
        type: "post",
        dataType: "json",
        async: false,
        url: "<%=path%>/commonService/getBankGateWay",
        success: function (data) {
            //console.log(data);
            if (data.ok == true) {
                straightBank = JSON.parse(data.data);
                if(straightBank instanceof Array){
                    //console.log(straightBank);
                }
            }
        }
    });

    var bankCode = [];   //支持的所有银行的bankCode
    for(var i=0; i<bankData.length; i++){
        bankCode.push(bankData[i].bankCode);
    }
    //console.log(bankCode);

    var corBankCode = [];  //保存直企银行bankCode(合作银行 corporation bank)
    for(var j=0; j<straightBank.length; j++){
        corBankCode.push(straightBank[j].bankCode);
    }

    //3.取得不是合作银行的bankCode (Not corporation bank)
    var notCorBankCode = [];
    var temp1 = [];   //临时数组 temporary
    for(var i=0; i<corBankCode.length; i++){
        temp1[corBankCode[i]] = true;
    }
    //console.log(temp1);
    for(var i=0; i<bankCode.length; i++){
        if(temp1[bankCode[i]] != true){
            notCorBankCode.push(bankCode[i]);
        }
    }
    //console.log(notCorBankCode);
    EventUtil.addHandler(saveOpenBankP, "click", function (event) {
        event = EventUtil.getEvent(event);
        var bankDropdownIns = new BankDropDown(bankData, openBankUl);
        bankDropdownIns.createLi(imgPath);
        //点击下拉li把值写入saveOpenBankSpan中,  notCorBankCode非合作银行数组，addBankConsBox银行卡信息弹框
        bankDropdownIns.saveDropdownLi(addBankInfBoxCen,saveOpenBankSpan, corBankCode, notCorBankCode, provCityOuterWall, openBranchBankWall, bankCardInput);
        bankDropdownIns.dropdownShowHide(event);
        EventUtil.stopPropagation(event);
    });

    var theBody = document.documentElement || document.body;
    EventUtil.addHandler(theBody, "click", function () {
        //bankDropdownIns.bodyClickHideDropdown();
    });
    /*------开户银行事件~over-------*/

    /*------卡号------*/
    EventUtil.addHandler(bankCardInput, "click", function(){
        if(bankCardErrorSpan.innerHTML != ""){
            bankCardErrorSpan.innerHTML = "";
        }
    });
    EventUtil.addHandler(bankCardInput, "blur", function(event){
        event = EventUtil.getEvent(event);
        var target = EventUtil.getTarget(event);
        //console.log(target.value.length);
        if(bankCardReg.test(target.value) && parseInt(target.value.length) < 50){

        }else if(target.value == ""){
            return null;
        }else if(target.value != bankCardReg.test(target.value) || parseInt(target.value.length) >= 23){
            bankCardErrorSpan.innerHTML = "请输入正确的银行卡号";
            return null;
        }

        //直企银行: "bankCode为建设银行" + "bankCardInput的value长度等于20"
        //建行20位卡号范本:22001674501052525463
        var saveOpenBankSpan = $(".saveOpenBankSpan")[0];
        if(saveOpenBankSpan.innerHTML != ""){
            if(saveOpenBankSpan.getAttribute("data-bank-code") == "CCB" && target.value.length == 20){
                if (hasClass(provCityOuterWall, "displayNone") == true) {
                    provCityOuterWall.className = removeClassFun(provCityOuterWall, "displayNone");
                }
                /* if(hasClass(openBranchBankWall, "displayNone") == true){
                    openBranchBankWall.className = removeClassFun(openBranchBankWall, "displayNone");
                } */
            }
            if(saveOpenBankSpan.getAttribute("data-bank-code") == "ECITIC" || saveOpenBankSpan.getAttribute("data-bank-code") == "CIB"){
                if (hasClass(provCityOuterWall, "displayNone") == true) {
                    provCityOuterWall.className = removeClassFun(provCityOuterWall, "displayNone");
                }
            }
        }
    });
    //自动识别银行，下个版本再加: 代码被封装在BankDropDown.js中无法复用
    /*EventUtil.addHandler(bankCardInput, "keyup", function(event){
     event = EventUtil.getEvent(event);
     var target = EventUtil.getTarget(event);
     var cardBin;
     $.ajax({
     type: "post",
     dataType: "json",
     async: false,
     data: {bankCard: target.value},
     url: "<%--<%=path%>--%>/commonService/getCardBinByBankCard",
     success: function (data) {
     if (data.ok == true) {
     cardBin = data.data;
     console.log(cardBin);
     }
     }
     });
     var allBankName = getClassName("bankName", openBankUl);
     for(var i=0; i<allBankName.length; i++){
     if(allBankName[i].getAttribute("data-bank-code") == cardBin.replace(/\"/g, "")) {
     }
     });*/
    /*------卡号------*/



    /*------所在省市~start (一定不能把这些调用写在上面的bankCardInfBox函数中，要不然会出现事件积累)------*/
    var provinceCity; //省市数据
    $.ajax({
        type: "post",
        dataType: "json",
        async: false,
        url: "<%=path%>/commonService/getProvinceCityJsonForNativeTab",
        success: function (data) {
            if (data.ok == true) {
                provinceCity = data.data;
            }
        }
    });

    var proCityLinkage = new TwoLevelLinkage(provinceCity, dropdownWall); //创建TwoLevelLinkage构造函数的实例
    //单独调用弹出框中的 "省市下拉" 显示和隐藏的方法(避免在银行卡信息弹框(bankCardInfBox)中调用出现重复执行的问题)
    proCityLinkage.dropdownShowHide(outSaveValWall, dropdownWall);
    proCityLinkage.createProvince(provinceWall);              //调用createProvince()方法: 根据json数据循环创建省份
    proCityLinkage.createCity(saveCityUl);
    var titleLi = proCityTitWall.getElementsByTagName("li");  //获取标题的 “省份” 和 “城市”两个li
    proCityLinkage.changeTab(titleLi);                        //调用changeTab()方法实现切换效果
    //点击不同的省份加载不同的市
    proCityLinkage.clickProShowCity(saveProCityWall, proCityTitWall, provinceWall, cityWall, saveCityUl);
    /*--------所在省市~over---------*/



    /*----------支行下拉~START----------*/
    //BankBranchDropDown.js
    var saveBranchBankP = getClassName("saveBranchBankP")[0];
    var saveBranchBankSpan = getClassName("saveBranchBankSpan")[0];
    var saveBranchBankUl = getClassName("saveBranchBankUl")[0];
    var openBraBankErrorSpan = getClassName("openBraBankErrorSpan")[0];  //保存开户支行错误提示
    EventUtil.addHandler(saveBranchBankP, "click", function (event) {

        //取得上面两行中填写的: "开户银行的/data-bank-code" 和 "所在省市: 省/provincecode, 市/citycode"
        var getBankCode = saveOpenBankSpan.getAttribute("data-bank-code");
        if (saveProCityWall.innerHTML == "") {
            openBraBankErrorSpan.innerHTML = "请先选择省市";
        }else{
            var saveProValSpan = getClassName("saveProValSpan", saveProCityWall)[0],         //取得保存省份的span
                saveCityValSpan = getClassName("saveCityValSpan", saveProCityWall)[0];       //取得保存城市的span
            var provinceCode = saveProValSpan.getAttribute("provinceCode");
            var cityCode = saveCityValSpan.getAttribute("cityCode");

            var branchData;  //保存支行数据
            $.ajax({
                type: "post",
                dataType: "json",
                async: false,
                data: {"bankCode": getBankCode, "cityId": cityCode},
                url: "<%=path%>/commonService/getAllSubbranchByCityIdAndBankCode",
                success: function(data){
                    //console.log(data.data);
                    if(data.ok == true){
                        branchData = data.data;
                    }
                }
            });

            var dropdownInstance = new Dropdown(branchData, saveBranchBankUl);//创建加载支行实例
            dropdownInstance.createEle(saveBranchBankSpan);
            dropdownInstance.defaultStyle();
            dropdownInstance.dropdownShowHide(event);
            EventUtil.addHandler(saveBranchBankUl, "click", function (event) {
                dropdownInstance.saveDropdownLi(event, saveBranchBankSpan);
            });
            EventUtil.addHandler(theBody, "click", function () {
                dropdownInstance.bodyClickHideDropdown();
            });
        }
    });
    /*----------支行下拉~OVER----------*/


    //取得弹框中部板块div,绑定mouseover事件，利用事件冒泡当鼠标移动到每行值上时，如果错误提示有错误就清除
    EventUtil.addHandler(addBankInfBoxCen, "mouseover", function(event){
        event = EventUtil.getEvent(event);
        var target = EventUtil.getTarget(event);
        if(hasClass(target, "bankCardInput") == true){
            bankCardErrorSpan.innerHTML = "";
        }
        if(hasClass(target, "saveOpenBankSpan") == true){
            openBankErrorSpan.innerHTML = "";
        }
        if(hasClass(target, "provCityOuterWall") == true || hasClass(target, "saveOpenBankSpan") == true || hasClass(target, "saveCityValSpan") == true ){
            proCityErrorSpan.innerHTML = "";
        }
        if(hasClass(target, "saveBranchBankSpan")== true){
            openBraBankErrorSpan.innerHTML = "";
        }
    });

    var boxConfirmBtn = getClassName("boxConfirmBtn")[0];  //取得弹框中的"确定"按钮
    function boxConfirmBtnFun(passTarget){
        EventUtil.addHandler(boxConfirmBtn, "click", function (event) {
            //1st-1.银行卡
            if (bankCardInput.value == "") {
                bankCardErrorSpan.innerHTML = "请填写银行卡号";
            }
            //1st-2.开户银行
            if (saveOpenBankSpan.innerHTML == "" || saveOpenBankSpan.innerHTML == "点击选择") {
                openBankErrorSpan.innerHTML = "开户银行不能为空";
            }
            //1st-3.所在省市
            if(hasClass(provCityOuterWall, "displayNone") == false){
                //1.错误提示
                if (saveProCityWall.childNodes.length == 0) {
                    proCityErrorSpan.innerHTML = "请选择银行卡开户省市";
                }else{
                    if (parseInt(saveProCityWall.childNodes.length) < 3 ) {
                        proCityErrorSpan.innerHTML = "请选择完整的开户省市";
                    }
                }
            }
            //1st-4.开户支行
            if(hasClass(openBranchBankWall, "displayNone") == false){
                if (saveBranchBankSpan.innerHTML == ""){
                    openBraBankErrorSpan.innerHTML = "请填选择银行卡开户支行";
                }
            }

            //2nd.经过了第一步判断之后给错误提示，此时再次做出判断: 如果保存错误的span中都没有值，就调用创建span+写值的函数到当前的bankCardP，然后关闭弹框
            if(bankCardErrorSpan.innerHTML == "" && openBankErrorSpan.innerHTML == "" && proCityErrorSpan.innerHTML == "" && openBraBankErrorSpan.innerHTML == ""){
                //(1.)首先取得要传入的数据: 1>银行卡号 2>开户银行名称+data-bank-code, 3>所在省市:省份名+provinceCode,城市名+cityCode, 4>所在支行:支行名+data-branch-code
                var getBankCardVal = bankCardInput.value;                       //取得上面表单中的银行卡号
                var getBankCode = saveOpenBankSpan.getAttribute("data-bank-code");   //取得银行卡的data-bank-code
                var getBankName = saveOpenBankSpan.innerHTML;                   //取得银行卡名
                var consArgObj = {
                    getDataAccount:getBankCardVal,
                    getDataCode: getBankCode,
                    bankNameHtml:getBankName
                };
                //(2.)调用创建span的函数+写值 =>推入到当前bankCardP中(推入之前记得先清空);
                //为了确定当前target为当前行数中的哪一个，所以首先判断当前target有没有data-guid(唯一标示符)属性
                if(passTarget.getAttribute("data-guid") == "GUID"){
                    if(passTarget.innerHTML != ""){
                        passTarget.innerHTML = "";
                        createBankCardSpan(passTarget, consArgObj);
                        //(3.)上一步已经把3个span插入到bankCardP中，现在找到其下class为cardNum的span，如果当前当弹框中有 "所在省市"/"开户支行" 父级出现时
                        //把省市id(provinceCode, cityCode)和支行id()赋给给cardNum的自定义属性: data-province-code, data-city-code 和 data-branch-code
                        //把省市的值，支行的值，赋值给cardNum的自定义属性: data-province-name, data-city-name, 和 data-branch-name
                        var getCurCardNum = getClassName("cardNum", passTarget)[0];
                        if(hasClass(provCityOuterWall, "displayNone") == false){
                            var proValSpan = getClassName("saveProValSpan", saveProCityWall)[0];
                            var getProCode= proValSpan.getAttribute("provinceCode");
                            var getProName= proValSpan.innerHTML;
                            var cityValSpan = getClassName("saveCityValSpan", saveProCityWall)[0];
                            var getCityCode= cityValSpan.getAttribute("cityCode");
                            var getCityName = cityValSpan.innerHTML;
                            getCurCardNum.setAttribute("data-province-code", getProCode);
                            getCurCardNum.setAttribute("data-province-name", getProName);
                            getCurCardNum.setAttribute("data-city-code", getCityCode);
                            getCurCardNum.setAttribute("data-city-name", getCityName);
                            if(getCurCardNum.getAttribute("data-proCity-flag") == 0){
                                getCurCardNum.setAttribute("data-proCity-flag", 1);
                            }
                        }
                        //(4.)如果openBranchBankWall出现， dat-branchCode支行属性
                        if(hasClass(openBranchBankWall, "displayNone") == false){
                            var branchSpan = getClassName("saveBranchBankSpan", saveBranchBankP)[0];
                            var getBranchBankCode = branchSpan.getAttribute("data-branch-code");
                            var getBranchBankName = branchSpan.innerHTML;
                            getCurCardNum.setAttribute("data-branch-code", getBranchBankCode);
                            getCurCardNum.setAttribute("data-branch-name", getBranchBankName);
                            if(getCurCardNum.getAttribute("data-branch-flag") == 0){
                                getCurCardNum.setAttribute("data-branch-flag", 1);
                            }
                        }
                        if(passTarget.getAttribute("data-flag") == 0){
                            passTarget.setAttribute("data-flag",1);
                        }
                    }
                    /*   //最后一步就是把当前target的父级的同级上个元素的子元素payeeInput表单如果有值就清空
                     var curPayeeInput = passTarget.parentNode.previousSibling.firstChild;
                     if(curPayeeInput.value != ""){
                     curPayeeInput.value = "";
                     }*/
                }
                //重要一步，上面给当前target(bankCarP)写完值之后，把data-guid(唯一标示符)移除
                passTarget.removeAttribute("data-guid");

                //(4.)写入之后把当前弹框关闭
                maskPopup.css("display", "none");
                addBankConsBox.css("display", "none");
                return null;
            }
            //console.log(passTarget.getAttribute("data-flag"));
        });
    }
    /*弹框确定按钮~验证事件*/

    //单独创建"省、/、市"三个span + 写值 + 设置属性
    function creProCitySpan(proCode, proName, cityCode, cityName){
        var fragment = document.createDocumentFragment();
        var proSpan = document.createElement("span");
        proSpan.className = "saveProValSpan";
        proSpan.setAttribute("provinceCode", proCode);
        proSpan.innerHTML = proName;
        fragment.appendChild(proSpan);
        var slashSpan = document.createElement("span");
        slashSpan.className = "marLeft5 lightGreyFont theSlash";
        slashSpan.appendChild(document.createTextNode("/"));
        fragment.appendChild(slashSpan);
        var citySpan = document.createElement("span");
        citySpan.className = "marLeft5 saveCityValSpan";
        citySpan.setAttribute("cityCode", cityCode);
        citySpan.setAttribute("parentCode", proCode);
        citySpan.innerHTML = cityName;
        fragment.appendChild(citySpan);
        return fragment;
    }
    /**------弹框+下拉+验证------**/

</script>
</body>
</html>

