/**
 * 批量转账到银行卡"主体中间模块"
 * batch-main-module
 */


// 定义对象saveValObj: 用于保存"2小时到账"的返回值。打开页面默认读取2小时到账的数据
var saveValObj         =    {
    sevBackOnceMinLimit : "",   //保存返回的: 单笔最小限额
    sevBackOnceLimit : "",      //保存返回的: 单笔最大限额(打开页面就要把最小和最大限额赋值给转账金额表单)
    dayRemainMoney : "",        //保存返回的: 当日剩余可转金额
    dayRemainCount : "",        //保存返回的: 当日剩余交易笔数

    serviceCharge : "",         //保存返回的: 服务费
    chargeType : "",            //保存返回的: 收费方式(0按笔，1按比例)
    minCharge : "",             //chargeType按比例收费时最小收费标准
    maxCharge : ""              //chargeType按比例收费时最大收费标准
};

// 定义对象 saveTwentyFourObj: 用于保存24小时到账的手续费
var saveTwentyFourObj  =    {
    serviceCharge : "",         //保存返回的: 服务费
    chargeType : "",            //保存返回的: 收费方式(0按笔，1按比例)
    minCharge : "",             //chargeType按比例收费时最小收费标准
    maxCharge : ""              //chargeType按比例收费时最大收费标准
};

var ErrorTips          =    {
    //"转账金额"表单(transfer amount input) - 错误提示
    transferAmountInpErr:[
        {transferAmountNotCorrect:"请输入正确的转账金额"},        // transfer amount is not  correct
        {transferCantGreaterBalance:"转账金额大于余额"},         // The transfer amount can not be greater than the balance
        {transferAmountCantEmpty:"转账金额不能为空"},            // transfer amount can not be empty
        {tranIsLessThanMinAmount:"转账金额小于单笔最小限额"},     // The transfer amount is less than the minimum amount
        {tranIsGreaterMaxAmount:"转账金额大于单笔最大限额"}      // The transfer amount is greater than the single maximum amount
    ]
};

// 当页面有一个表单书写正确就在inputBlur函数中调用，切换提交按钮的背景色
function btnChangeBg(nextStep) {
    var btnFlag = "false"; //用来判断"下一步按钮/确定按钮"背景是不是已经变换样式的标记
    if (btnFlag === "false") {
        if (hasClass("next-btn-default", nextStep)) {
            nextStep.className = removeClass("next-btn-default",nextStep);
            nextStep.className = addClass("next-btn-selected",nextStep);
            btnFlag = true;
            return null;
        }
    }else if(btnFlag === "true"){
        return null;
    }
}

var moneyNumErrorTips  =    {
    largeAvailable : "抱歉，付款总额大于当前可用余额。",
    largeTodRemain : "抱歉，付款总额大于当日剩余可转金额。",
    largeTodMax : "抱歉，付款总额大于当日限额。",
    largeRemainTimes : "抱歉，转账笔数超过当日剩余交易笔数。"
};

// 超时调用5s后，红色错误弹框隐藏
function clearBox() {
    mainModuleConfigMap.hideServerErrorBox();
}

// 批量转账到银行卡: main module (主模块)
var mainModuleConfigMap = {

    // 判断浏览器
    fnJudgeBrowser:  function(){
        var browser = {
            ie: 0,
            firefox: 0,
            safari: 0,
            konq: 0,
            opera: 0,
            chrome: 0,

            //specific version
            ver: null
        };
        var ua = window.navigator.userAgent;
        if(/MSIE ([^;]+)/.test(ua)){
            browser.ver = RegExp["$1"];
            browser.ie = parseFloat(browser.ver);
            // console.log(browser.ver);
            var IEBrowser = parseInt(browser.ie);
            if( IEBrowser === 6 || IEBrowser === 7 || IEBrowser === 8 || IEBrowser === 9){
                var tips = '提示: 您的浏览器版本过低，请使用 "谷歌/火狐/IE10+/360/搜狗/QQ" 浏览器！';
                //如果错误信息没有在当前窗口，就回滚页面让错误弹框展示
                mainModuleConfigMap.scrollBarRoll();
                basicAnimation(eleConfigMap.serErrorBox, {height: 40}, 2);
                eleConfigMap.errorTipsFont.innerHTML = tips;

                // 延时6s后把红色下拉弹框隐藏，并清除错误提示
                setTimeout(clearBox, 6000);
                function clearBox() {
                    mainModuleConfigMap.hideServerErrorBox();
                }
            }
        }

    },


    isAmount :   /^(([1-9]{1}\d*)|([0]{1}))(\.(\d){1,2})?$/,    //校验金额

    /**
     * 1.ajax调用用户可用余额
     * @return {String}
     */
    ajaxGetAvailableMoney:          function(java_file_path){
        var userAvailableMoney;
        /*  $.ajax({
         type: "post",
         dataType: "json",
         async: false,
         url: java_file_path + "/commonService/getAccountAvailableAmount",
         success: function (data) {
         if(data.ok === true){
         userAvailableMoney = data.data;
         }
         }
         });*/
        userAvailableMoney = availableBalance.data;
        return userAvailableMoney;
    },

    /**
     * 2-1.ajax调用2小时到账数据
     * @return {String}
     */
    ajaxGetTwoHourArrJson:          function(java_file_path){
        var twoHourArriveData;
        /*$.ajax({
         type: "post",
         dataType: "json",
         async: false,
         data: {type: 3},
         url: java_file_path + "/commonService/getWithDrawTransferLimitConfig",
         success: function (data) {
         if(data.ok === true){
         if(typeof(data.data) === "string"){
         twoHourArriveData = JSON.parse(data.data);
         }else{
         twoHourArriveData = data.data;
         }
         // 这4个个数据不区分2/24小时，所以只在此调用一次
         saveValObj.sevBackOnceMinLimit = twoHourArriveData.singleMinMoney;           //单笔最小金额
         saveValObj.sevBackOnceLimit = twoHourArriveData.singleMaxMoney;              //单笔最大交易金额
         saveValObj.dayRemainMoney = twoHourArriveData.dayRemainMoney;                //当天剩余可转金额
         saveValObj.dayRemainCount = twoHourArriveData.dayRemainCount;                //当日剩余交易笔数


         saveValObj.serviceCharge = twoHourArriveData.chargeValue;                    //服务费
         saveValObj.chargeType = twoHourArriveData.chargeType;                        //收费方式
         saveValObj.minCharge = twoHourArriveData.minCharge;                          //chargeType按比例收费时最小收费标准
         saveValObj.maxCharge = twoHourArriveData.maxCharge;                          //chargeType按比例收费时最大收费标准
         }
         }
         });*/
        if(typeof(twoHourArriveJson.data) === "string"){
            twoHourArriveData = JSON.parse(twoHourArriveJson.data);
        }else{
            twoHourArriveData = twoHourArriveJson.data;
        }
        // 这4个个数据不区分2/24小时，所以只在此调用一次
        saveValObj.sevBackOnceMinLimit = twoHourArriveData.singleMinMoney;           //单笔最小金额
        saveValObj.sevBackOnceLimit = twoHourArriveData.singleMaxMoney;              //单笔最大交易金额
        saveValObj.dayRemainMoney = twoHourArriveData.dayRemainMoney;                //当天剩余可转金额
        saveValObj.dayRemainCount = twoHourArriveData.dayRemainCount;                //当日剩余交易笔数


        saveValObj.serviceCharge = twoHourArriveData.chargeValue;                    //服务费
        saveValObj.chargeType = twoHourArriveData.chargeType;                        //收费方式
        saveValObj.minCharge = twoHourArriveData.minCharge;                          //chargeType按比例收费时最小收费标准
        saveValObj.maxCharge = twoHourArriveData.maxCharge;                          //chargeType按比例收费时最大收费标准
    },

    /**
     * 2-2.ajax调用24小时到账数据
     * @return {String}
     */
    ajaxGetTwentyFourHourArrJson:   function(java_file_path){
        var twentyFourHourArriveData;
        /*$.ajax({
         type: "post",
         dataType: "json",
         async: false,
         data: {type: 1},
         url: java_file_path + "/commonService/getWithDrawTransferLimitConfig",
         success: function (data) {
         if(data.ok === true){
         if(typeof(data.data) === "string"){
         twentyFourHourArriveData = JSON.parse(data.data);
         }else{
         twentyFourHourArriveData = data.data;
         }
         saveTwentyFourObj.serviceCharge = twentyFourHourArriveData.chargeValue;                    //服务费
         saveTwentyFourObj.chargeType = twentyFourHourArriveData.chargeType;                        //收费方式
         saveTwentyFourObj.minCharge = twentyFourHourArriveData.minCharge;                          //chargeType按比例收费时最小收费标准
         saveTwentyFourObj.maxCharge = twentyFourHourArriveData.maxCharge;                          //chargeType按比例收费时最大收费标准
         }
         }
         });*/

        if(typeof(twentyFourHourArriveJson.data) === "string"){
            twentyFourHourArriveData = JSON.parse(twentyFourHourArriveJson.data);
        }else{
            twentyFourHourArriveData = twentyFourHourArriveJson.data;
        }
        saveTwentyFourObj.serviceCharge = twentyFourHourArriveData.chargeValue;                    //服务费
        saveTwentyFourObj.chargeType = twentyFourHourArriveData.chargeType;                        //收费方式
        saveTwentyFourObj.minCharge = twentyFourHourArriveData.minCharge;                          //chargeType按比例收费时最小收费标准
        saveTwentyFourObj.maxCharge = twentyFourHourArriveData.maxCharge;                          //chargeType按比例收费时最大收费标准

    },


    /**
     * 3-1.给页面下部的"账户详情中的span"和"2小时到账span"赋值
     * @return {Null}
     */
    fnSetAccountInformationSpan:    function(java_file_path){
        this.ajaxGetTwoHourArrJson(java_file_path);

        // ajax赋值给的变量是当前函数中的自定义变量,只是引用上面ajax中的返回值。
        var userAvailableMoney = this.ajaxGetAvailableMoney(java_file_path);

        // a1.可用余额span
        if(typeof(userAvailableMoney) === "string"){
            userAvailableMoney= JSON.parse(userAvailableMoney);
        }
        eleConfigMap.availableBalanceSpan.innerHTML = (parseFloat(userAvailableMoney)).toFixed(2); //把服务器返回的账户可用余额赋值给

        //a2.当日剩余可转金额
        eleConfigMap.oneDayRemainPayMoneySpan.innerHTML = (parseFloat(saveValObj.dayRemainMoney)).toFixed(2);

        // b1.当前付款笔数span(默认为0笔): 此span的值为当用户鼠标离开"转账金额"表单时计算
        eleConfigMap.curPayNumberSpan.innerHTML = parseFloat(0);

        // b2.当日剩余交易笔数 :
        eleConfigMap.oneDayRemainPayNumSpan.innerHTML = parseInt(saveValObj.dayRemainCount);

        // c1.服务费:
        var twoFee = $(".two-hour-fee")[0],
            twoMinFee = $(".two-hour-min-fee")[0],
            twoMaxFee = $(".two-hour-max-fee")[0];
        var serviceChargeSpan = $(".service-charge")[0]; //默认写入的有00
        // c2.收费规则 : 2小时到账
        if (parseInt(saveValObj.chargeType) === 0) {
            twoFee.innerHTML = saveValObj.serviceCharge + "元/笔";
            twoMinFee.innerHTML = "--";
            twoMaxFee.innerHTML = "--";
        } else if (parseInt(saveValObj.chargeType) === 1) {
            twoFee.innerHTML = parseFloat(saveValObj.serviceCharge) * 100 + "%";
            twoMinFee.innerHTML = String(saveValObj.minCharge) + "元/笔";
            twoMaxFee.innerHTML = String(saveValObj.maxCharge) + "元/笔";
        }

        // d1.付款总额span
        eleConfigMap.totalPaymentSpan.innerHTML = (parseFloat(0)).toFixed(2); //当打开页面进来时，首先把里面的值设置为数字0

    },

    /**
     * 3-2. 给收费规则中 "24小时到账"的3个span赋值
     */
    fnTwentyFourChargeSpan:         function(java_file_path){
        this.ajaxGetTwentyFourHourArrJson(java_file_path);
        var twentyFourFee = $(".twenty-hour-four-fee")[0], //获取24小时到账的span
            twentyFourMinFee = $(".twenty-hour-four-min-Fee")[0],
            twentyFourMaxFee = $(".twenty-hour-four-max-fee")[0];
        if(parseInt(saveTwentyFourObj.chargeType) === 0){
            twentyFourFee.innerHTML = saveTwentyFourObj.serviceCharge + "元/笔";
            twentyFourMinFee.innerHTML = "--";
            twentyFourMaxFee.innerHTML = "--";
        }else if(parseInt(saveTwentyFourObj.chargeType) === 1){
            twentyFourFee.innerHTML = parseFloat(saveTwentyFourObj.serviceCharge)*100 + "%";
            twentyFourMinFee.innerHTML = String(saveTwentyFourObj.minCharge) + "元/笔";
            twentyFourMaxFee.innerHTML = String(saveTwentyFourObj.maxCharge) + "元/笔";
        }
    },




    /**
     * 4-1.动态创建行方法
     */
    createLineMethod:               function(){
        var fragment = document.createDocumentFragment();
        var dynamicCreateLine = document.createElement("div");
        dynamicCreateLine.className = "dynamic-create-line over-hid";
        dynamicCreateLine.innerHTML +=
            '<div class="payee-div">' +
            '<input class="theInput payee-input" maxlength="100" type="text">' +
            '<span class="errorSpan payee-error-span"></span>' +
            '</div>' +
            '<div class="bank-card-div">' +
            '<p class="bank-card-p" data-flag="0">—— 请选择 ——</p>' +
            '<span class="errorSpan bank-card-error-span"></span>'+
            '</div>' +
            '<div class="transfer-amount-div">' +
            '<input class="theInput transfer-amount-input" type="text" maxlength="20" data-onceminlimit="100" data-oncelimit="100000">' +
            '<span class="errorSpan transfer-error-span"></span>' +
            '</div>' +
            '<div class="remark-div">' +
            '<input class="remark" maxlength="500" placeholder="选填，对方可看到">' +
            '</div>' +
            '<div class="del-line-btn-div">' +
            '<label class="del-line-icon"></label>' +
            '</div>';

        fragment.appendChild(dynamicCreateLine);
        return fragment;
    },

    /**
     * 4-2.给动态创建的行添加需要的属性
     */
    // 4个模块需要设置的自定义属性有: 1."姓名/转账金额"表单: data-index 和 placeholder
    setPropertyForLine:             function(addPayeeWall){
        var aCurPayeeInput = getClassName("payee-input", addPayeeWall);
        var aTraAmountInput = getClassName("transfer-amount-input", addPayeeWall);
        var payeePh = ".收款人姓名";
        var amount = "单笔限额" + saveValObj.sevBackOnceMinLimit + "~" + saveValObj.sevBackOnceLimit + "元";
        for(var i=0, len=aCurPayeeInput.length; i<len; i++){
            aCurPayeeInput[i].setAttribute("data-index", i);
            aCurPayeeInput[i].setAttribute("placeholder", (i+1) + payeePh);
            aTraAmountInput[i].setAttribute("placeholder", amount);
            aTraAmountInput[i].setAttribute("data-index", i);
        }
    },
    /** 4-3.动态创建行之后点击"X号"删除行: [方法为空,表示直接在页面中创建] **/



    // "增加收款人/批量导入/下载模板" 滑动上/走效果: [页面中直接创建]

    // "批量上传"json数据是用插件上传后服务器直接返回，因此不用ajax调用

    // 动态创建行之后滚动条自动下滚事件 + ScrollReveal动画效果
    scrollBarAutoSlideDown:         function(addPayeeWall){
        var dynCreateLine = getClassName("dynamic-create-line", addPayeeWall);
        //console.log(dynCreateLine.length);
        // 取得倒数第三个元素的索引(get countdown to the third): 主要是当笔记本屏幕小时尽量多显示元素
        if(dynCreateLine.length > 1 && dynCreateLine < 3){
            var getCountdownToFirstIndex = dynCreateLine.length - 1 ;
            window.scrollTo(0, (getPosition(dynCreateLine[getCountdownToFirstIndex]).top));
        }
        if(dynCreateLine.length >= 3){
            var getCountdownToThirdIndex = dynCreateLine.length - 3 ;
            window.scrollTo(0, (getPosition(dynCreateLine[getCountdownToThirdIndex]).top));
        }
        // +
        // +
        // +
        /* ScrollReveal动画滑出效果 */
        // 得到倒数第一个元素的索引
        var secondToLast = dynCreateLine.length - 1 ;
        sr.reveal(dynCreateLine[secondToLast], {
            origin:     "bottom",
            distance:   "30px",
            opacity:    0.8,
            scale:      1,
            delay:      0,
            easing:     "ease-in-out",
            reset:      false,
            duration:   150
        });
    },




    // "2小时/24小时到账"切换效果: [页面中直接创建]

    /**
     * 封装隐藏服务器显示框
     */
    hideServerErrorBox:             function(){
        if(eleConfigMap.serErrorBox.offsetHeight > 0){
            eleConfigMap.errorTipsFont.innerHTML = "";
            basicAnimation(eleConfigMap.serErrorBox, {height: 0}, 2)
        }
    },

    /**
     * 动态创建"银行卡信息"下的span
     */
    createBankCardInfSpan:          function(oValueAttr, java_img_path){
        var fragment = document.createDocumentFragment();
        var firstSpan = document.createElement("span");
        firstSpan.className = "bank-img";
        var firstSpanImg = document.createElement("img");
        firstSpanImg.setAttribute("src", java_img_path +"/img/icon/" + oValueAttr.bankCode.toLowerCase() + ".png");
        //firstSpanImg.setAttribute("src", java_img_path + "/img/icon/" + oValueAttr.bankCode + ".png");
        firstSpan.appendChild(firstSpanImg);
        var secondSpan = document.createElement("span");
        secondSpan.className = "bank-name";
        secondSpan.appendChild(document.createTextNode(oValueAttr.openBankSpanHtml));
        secondSpan.setAttribute("data-bank-code", oValueAttr.bankCode);
        var thirdSpan = document.createElement("span");
        thirdSpan.className = "card-num";
        thirdSpan.appendChild(document.createTextNode(oValueAttr.bankCardInputVal.substr(oValueAttr.bankCardInputVal.length-4, oValueAttr.bankCardInputVal.length )));
        thirdSpan.setAttribute("data-card-number",      oValueAttr.bankCardInputVal);
        thirdSpan.setAttribute("data-province-code",    oValueAttr.provinceCode);
        thirdSpan.setAttribute("data-province-name",    oValueAttr.provValSpanHtml);
        thirdSpan.setAttribute("data-city-code",        oValueAttr.cityCode);
        thirdSpan.setAttribute("data-city-name",        oValueAttr.cityValSpanHtml);
        thirdSpan.setAttribute("data-branch-code",      oValueAttr.dataBranchId);
        thirdSpan.setAttribute("data-branch-name",      oValueAttr.branchBankSpanHtml);

        fragment.appendChild(firstSpan);
        fragment.appendChild(secondSpan);
        fragment.appendChild(thirdSpan);

        return fragment;
    },

    /**
     * 验证金额是不是数字的判断
     */
    verifyTransAmount:              function(curInput, curErrorSpan, nextStepBut) {
        var curInputVal = curInput.value;
        curInputVal = curInputVal.replace(/^\s+|\s+$/g, "");
        if (this.isAmount.test(curInputVal) && curInputVal !== 0) {
            btnChangeBg(nextStepBut);
        } else if (curInputVal === "") {
            return null; //为空的时候直接返回
        } else if (curInputVal !== this.isAmount.test(curInputVal) || /^0+(\.0*)?$/.test(curInputVal)) {
            curErrorSpan.innerHTML = ErrorTips.transferAmountInpErr[0].transferAmountNotCorrect;
            return null;
        }
    },

    /**
     * 转账限额判断
     */
    moneyQuota:                     function(curInput, curErrorSpan){
        var curInputVal = curInput.value,
            onceMinAmount = parseFloat(saveValObj.sevBackOnceMinLimit),
            onceMaxAmount = parseFloat(saveValObj.sevBackOnceLimit);
        if(curInputVal === ""){
            return null;
        }else if(curInputVal < onceMinAmount){
            curErrorSpan.innerHTML = ErrorTips.transferAmountInpErr[3].tranIsLessThanMinAmount;
            return null;
        } else if(curInputVal > onceMaxAmount){ //此处onceLimitHtml返回
            curErrorSpan.innerHTML = ErrorTips.transferAmountInpErr[4].tranIsGreaterMaxAmount;
            return null;
        }
    },

    /**
     * 计算 "手续费+笔数+总金额"
     */
    calculateAmount:                function(addPayeeWall, java_file_path){
        var saveMoneyArr = [];           //定义数组，保存未加收服务费之前的的金额

        //1st:获取当前函数执行时的转账金额表单数量
        var curAllTransInputs = getClassName("transfer-amount-input", addPayeeWall);

        //2-0. 首先判断当前转账是"2小时/24小时到账", 取得"/"的data-type,在3rd中做判断使用
        var arriveTimeSpan = eleConfigMap.$transferTime;
        var processType;            // 到账类型
        if(parseInt(arriveTimeSpan[0].getAttribute("data-selected-flag")) === 1){
            //console.log("2小时到账的data-transfer-flag = 1");
            processType = arriveTimeSpan[0].getAttribute("data-type"); //2小时到账 data-type = 1
        }else if(parseInt(arriveTimeSpan[1].getAttribute("data-selected-flag")) === 1){
            //console.log("24小时到账的flag = 1");
            processType = arriveTimeSpan[1].getAttribute("data-type"); //24小时到账 data-type = 0
        }

        //2nd.循环1st得到的转账金额表单，取得元素的值推入到saveMoneyArr中
        for (var i = 0; i < curAllTransInputs.length; i++) {
            //遍历完把值推入到数组中: a.不能为空。b.不小于单笔最小金额。 c.不大于单笔最大金额
            var curInputVal = trim(curAllTransInputs[i].value); //如果输入的值有空格，就首先去除前后空格
            if (curInputVal !== "" && curInputVal >= saveValObj.sevBackOnceMinLimit && curInputVal <= saveValObj.sevBackOnceLimit) {
                saveMoneyArr.push(curInputVal);
            }else{
                // 如果为其他的情况也不能退出，当前是一下找到所有的转账金额表单，如果有错误就给出部分提示

            }
        }
        //把数组的长度赋值给"付款笔数span"
        eleConfigMap.curPayNumberSpan.innerHTML = parseInt(saveMoneyArr.length);
        //console.log(saveMoneyArr);

        //3rd.定义一个save money variable(保存未加收手续费之前的转账金额)
        //循环saveMoneyArr数组，然后把其中保存的值相加，赋值给saveMoneyVar
        var saveMoneyVar = parseFloat(0);
        var saveChargeArr = [];    //定义一个保存每行转账金额表单的手续费数组，
        for (var j = 0; j < saveMoneyArr.length; j++) {
            // 1.计算出已填写的金额不加手续费
            saveMoneyVar += parseFloat(saveMoneyArr[j]);

            // 2.计算手续费分"2小时/24小时":在计算汇率之前,先要判断页面中选的是哪种到账方式
            var saveTwoKindChargeObj = {
                serviceCharge :     "",
                chargeType :        "",
                minCharge :         "",
                maxCharge :         ""
            };

            // 说明:此处调用"2小时/24小时的ajax"页面不停的请求导致页面卡顿，所以直接获得上面2个对象值
            if(parseInt(processType) === 1){ //两小时到账
                saveTwoKindChargeObj.serviceCharge = saveValObj.serviceCharge;
                saveTwoKindChargeObj.chargeType = saveValObj.chargeType;
                saveTwoKindChargeObj.minCharge = saveValObj.minCharge;
                saveTwoKindChargeObj.maxCharge = saveValObj.maxCharge;
            }else if(parseInt(processType) === 0){
                saveTwoKindChargeObj.serviceCharge = saveTwentyFourObj.serviceCharge;
                saveTwoKindChargeObj.chargeType = saveTwentyFourObj.chargeType;
                saveTwoKindChargeObj.minCharge = saveTwentyFourObj.minCharge;
                saveTwoKindChargeObj.maxCharge = saveTwentyFourObj.maxCharge;
            }
            console.log(saveTwoKindChargeObj);
            calChargeFun(saveTwoKindChargeObj, saveMoneyArr[j]);
        }

        function calChargeFun(saveTwoKindChargeObj, curEle){
            var fee;
            // console.log("输出服务器返回的服务费率: " + saveValObj.serviceCharge);
            if(parseInt(saveTwoKindChargeObj.chargeType) === 0){
                // 0是按笔收费，按笔收费直接把每笔手续费赋值给fee
                fee = parseFloat(saveTwoKindChargeObj.serviceCharge);
            }else if(parseInt(saveTwoKindChargeObj.chargeType) === 1){
                // 1是按比例收费，按比例收费需要计算
                fee = parseFloat(dotAfterTwo((parseFloat(curEle) * parseFloat((saveTwoKindChargeObj.serviceCharge)))));
                if(parseFloat(fee) < parseFloat(saveTwoKindChargeObj.minCharge)){ //小于最小手续费标准取 minCharge
                    fee = parseFloat(saveTwoKindChargeObj.minCharge);
                }else if(parseFloat(fee) > parseFloat(saveTwoKindChargeObj.maxCharge)){ //大于最大续费标准取 maxCharge
                    fee = parseFloat(saveTwoKindChargeObj.maxCharge);
                }
            }
            saveChargeArr.push(fee);        // 得到当前手续费后，把手续费推到保存手续费的数组中
            return saveChargeArr;
        }

        var getAllCharge = parseFloat(0);   //  保存计算后的手续费
        // 然后遍历上面的saveChargeArr数组，项数相加把和赋值给serviceChargeSpan
        for(var x=0; x<saveChargeArr.length; x++){
            //console.log(saveChargeArr[x]);
            getAllCharge += parseFloat(saveChargeArr[x]);
        }
        // console.log("输出计算后的手续费 " + getAllCharge);

        // 如果手续费span的值不为空就清空
        if(eleConfigMap.serviceChargeSpan.innerHTML !== ""){
            eleConfigMap.serviceChargeSpan.innerHTML = "";
        }
        eleConfigMap.serviceChargeSpan.innerHTML = parseFloat(dotAfterTwo(getAllCharge));

        //4th. 计算付款总金额
        var tem = parseFloat(saveMoneyVar) + parseFloat(getAllCharge);
        eleConfigMap.totalPaymentSpan.innerHTML = dotAfterTwo(tem);

        var totalPayHtml = parseFloat(eleConfigMap.totalPaymentSpan.innerHTML);              // 取得上面得到的付款总额
        var availableMoney = parseFloat(eleConfigMap.availableBalanceSpan.innerHTML);        // 可用余额span
        var todayRemainMoney = parseFloat(eleConfigMap.oneDayRemainPayMoneySpan.innerHTML);  // 当日剩余可转金额span

        //5th.调用比较金额数值大小的函数
        this.compareMoneySize(totalPayHtml, availableMoney, todayRemainMoney);

        //6th.调用比较"付款笔数"的函数
        var curPayNum  = parseInt(saveMoneyArr.length);                     //取得当前付款笔数
        var todayRemainPayNum  = parseInt(eleConfigMap.oneDayRemainPayNumSpan.innerHTML);    //当日剩余交易笔数
        this.comparePayTimes(curPayNum, todayRemainPayNum);

        //7th.如果5th和6th中有错误出现，点击下拉弹框中的叉号(closeErrorIcon)就把弹框隐藏并清除里面的错误
        EventUtil.addHandler(eleConfigMap.serErrorIcon, "click", function(){
            mainModuleConfigMap.hideServerErrorBox();
        });

        //8th.把saveMoneyArr数组的长度赋值给"付款笔数(curPayNumber)"span
        eleConfigMap.curPayNumberSpan.innerHTML = parseFloat(saveMoneyArr.length);

    },


    /**
     * 比较 "总金额 / 可用余额 / 当日剩余可转金额" 的函数
     */
    compareMoneySize:               function(totalMoney, availableMoney, todayRemainMoney){
        var tips;
        if(parseFloat(totalMoney) > parseFloat(availableMoney)){
            tips = moneyNumErrorTips.largeAvailable;
            //如果错误信息没有在当前窗口，就回滚页面让错误弹框展示
            this.scrollBarRoll();
            basicAnimation(eleConfigMap.serErrorBox, {height: 40}, 2);
            eleConfigMap.errorTipsFont.innerHTML = tips;

        }else if(parseFloat(totalMoney) > parseFloat(todayRemainMoney)){
            tips = moneyNumErrorTips.largeTodRemain;
            this.scrollBarRoll();
            basicAnimation(eleConfigMap.serErrorBox, {height: 40}, 2);
            eleConfigMap.errorTipsFont.innerHTML = tips;
        }
        // 延时5s后把红色下拉弹框隐藏，并清除错误提示
        setTimeout(clearBox, 5000);
        return null;
    },

    /**
     * 滚动条上滚函数
     */
    scrollBarRoll:                  function(){
        // 取得错误弹框在页面中的偏移量
        var serErrorBoxPosition = getPosition(eleConfigMap.serErrorBox).top;
        // 如果scrollTo执行之前有滚动，那就先把清除等于0
        // window.scrollTo(0, 0);
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        if(parseInt(scrollTop - 12) > parseInt(serErrorBoxPosition)){
            window.scrollTo(0, serErrorBoxPosition - 68);
        }
    },

    /**
     * 付款笔数和"单日最大交易笔数"/"单日剩余交易笔数"比较函数
     */
    comparePayTimes:                function(curPayNum, todayRemainPayNum){
        var tips;
        if(parseInt(curPayNum) > parseInt(todayRemainPayNum)){
            tips = moneyNumErrorTips.largeRemainTimes;
            // 如果错误信息没有在当前窗口，就回滚页面让错误弹框展示
            this.scrollBarRoll();
            basicAnimation(eleConfigMap.serErrorBox, {height: 40}, 2);
            eleConfigMap.errorTipsFont.innerHTML = tips;
        }

        // 延时5s后把红色下拉弹框隐藏，并清除错误提示
        setTimeout(clearBox, 5000);

        return null;
    },


    // 右侧 "最近转账人/常用联系人"如果有和当前删除行相同的收款人并且处于选中状态，就移除选中
    fnRemoveLiSelStyle:             function(cur){

        // "最近转账人"
        var recentTransLi = $(".recent-transfer-ul li");                // 最近转账人 ul下的所有li
        var i =0,
            len = recentTransLi.length;

        // "常用联系人"模块 --5个分组下的所有li
        var fiveGroupWall = eleConfigMap.fiveGroupWall;
        var groupAllLis = fiveGroupWall.getElementsByTagName("li");
        var j = 0,
            len2 = groupAllLis.length;


        var curDynLine = cur.parentNode.parentNode;
        var curBankCardP = getClassName("bank-card-p", curDynLine)[0];
        var cardNumSpan = getClassName("card-num", curBankCardP)[0];
        // 找到当前行中的card-num的data-card-number上保存的银行卡号
        var dataCardNum = parseInt(cardNumSpan.getAttribute("data-card-number"));

        if(parseInt(curBankCardP.getAttribute("data-flag")) === 1){
            for(; i < len; i++){
                if(parseInt(recentTransLi[i].getAttribute("data-selected-flag")) === 1){
                    var recTranIconTag      =   getClassName("recent-transfer-icon", recentTransLi[i])[0];
                    var recTranCardNumSpan  =   getClassName("recent-trans-card-num", recentTransLi[i])[0];
                    if(dataCardNum === parseInt(recTranCardNumSpan.getAttribute("data-bank-account"))){
                        recentTransLi[i].className = removeClass("right-module-li-selected", recentTransLi[i]);
                        recentTransLi[i].setAttribute("data-selected-flag", 0);

                        if(parseInt(recTranIconTag.getAttribute("data-icon-flag")) === 1){
                            recTranIconTag.className = removeClass("fa-check-square-o",recTranIconTag);
                            recTranIconTag.className = addClass("fa-square-o",recTranIconTag);
                            recTranIconTag.setAttribute("data-icon-flag", 0);
                        }
                    }
                }
            }

            for(; j < len2; j++){
                if(parseInt(groupAllLis[j].getAttribute("data-selected-flag")) === 1 &&
                    parseInt(groupAllLis[i].getAttribute("data-under-first-span-flag")) === 0){
                    var freConCardNumSpan = getClassName("frequent-contact-card-num", groupAllLis[j])[0];
                    if(dataCardNum === parseInt(freConCardNumSpan.getAttribute("data-bank-account"))){
                        groupAllLis[j].className = removeClass("right-module-li-selected", groupAllLis[j]);
                        groupAllLis[j].setAttribute("data-selected-flag", 0);
                    }
                }
            }
        }else{
            return null;
        }
    },



    // 批量上传函数
    fnBatchUpload:                  function(batchUploadJson, java_img_path){
        var addPayeeWall = eleConfigMap.addPayeeWall;
        var bankCardP = getClassName("bank-card-p", addPayeeWall);

        var i = 0,
            len = batchUploadJson.length; // payeeArr收款人数组，可能为单个li || 点击全选按钮写入的一批li
        var saveCreLine = null;
        var getCurCreateLine = null;
        // 如果页面中不存在bank-card-p就直接创建行
        if (bankCardP.length === 0) {
            for (; i < len; i++) {
                this.batchUploadReuseModule(batchUploadJson[i], saveCreLine, getCurCreateLine, addPayeeWall);
            }
            return null;
        } else if (bankCardP.length > 0) {
            var j = 0,
                len2 = bankCardP.length;
            // 1st.移除每个空行
            var saveDelLineArr = [];     //保存下面批量导入时，和导入数据发生重复的行
            for (; j < len2; j++) {
                if (parseInt(bankCardP[j].getAttribute("data-flag")) === 0) {
                    //获取到要删除的行，推入数组
                    saveDelLineArr.push(bankCardP[j].parentNode.parentNode);
                }
            }
            //遍历数组中保存的每个空行元素,然后利用removeChild移除每个空行
            for (var x = 0; x < saveDelLineArr.length; x++) {
                addPayeeWall.removeChild(saveDelLineArr[x]);
            }

            // 2nd.经过1st之后addPayeeWall中只有2种情况:
            // (1.)已经没有行: 如果是就立即创建行+写值;
            // (2.)剩余已经填写了收款人的行：判断里面有没有和要"写入/导入"的数据有重复的，如果有重复就删除重复*/
            // 再次取得经过 1st + 2sd 后，当前addPayeeWall下剩余的bankCardP
            bankCardP = getClassName("bank-card-p", addPayeeWall);
            // 2nd-(1)当前已经没有行存在
            if(bankCardP.length === 0){
                for (; i < len; i++) {
                    this.batchUploadReuseModule(batchUploadJson[i], saveCreLine, getCurCreateLine, addPayeeWall);
                }
                return null;
            } else {
                // 2nd-(2) 当前还有剩余行存在

                // 1.删除重复的行
                for(; i < len; i++) {
                    var uploadJsonObj = {
                        // 收款人姓名
                        cardNameValue:      batchUploadJson[i].receiveName,
                        // 银行卡号 + 开户银行 + bankCode
                        bankCardInputVal:   batchUploadJson[i].bankAccount,
                        openBankSpanHtml:   batchUploadJson[i].bankName,
                        bankCode:           batchUploadJson[i].bankCode,
                        // 所在省市 (存在or不存在)
                        provValSpanHtml:    null,
                        provinceCode:       null,
                        cityValSpanHtml:    null,
                        cityCode:           null,
                        // 开户支行 (存在or不存在)
                        dataBranchId:       null,
                        branchBankSpanHtml: null,
                        // 所在分组
                        currentSelectGroupP: null,
                        /* territoryFlag 和 transferType 不需要*/

                        // 转账金额 + remark
                        transferMoney:  batchUploadJson[i].transferMoney,
                        remark:         batchUploadJson[i].remark
                    };
                    // 调用删除重复行的函数
                    rightTransferConfigMap.fnRemoveRepeatLine(bankCardP, uploadJsonObj);
                }

                // 2.从新再次for循环写值
                for (var z=0; z < batchUploadJson.length; z++) {
                    // console.log(batchUploadJson.length);
                    this.batchUploadReuseModule(batchUploadJson[z], saveCreLine, getCurCreateLine, addPayeeWall);
                }

            }
            return null;
        }
    },
    // 批量上传复用模块
    batchUploadReuseModule:         function(curJson, saveCreLine, getCurCreateLine, addPayeeWall){

        // 保存当前json值得obj
        var uploadJsonObj = {
            // 收款人姓名
            cardNameValue:      curJson.receiveName,
            // 银行卡号 + 开户银行 + bankCode
            bankCardInputVal:   curJson.bankAccount,
            openBankSpanHtml:   curJson.bankName,
            bankCode:           curJson.bankCode,
            // 所在省市 (存在or不存在)
            provValSpanHtml:    null,
            provinceCode:       null,
            cityValSpanHtml:    null,
            cityCode:           null,
            // 开户支行 (存在or不存在)
            dataBranchId:       null,
            branchBankSpanHtml: null,
            // 所在分组
            currentSelectGroupP: null,
            /* territoryFlag 和 transferType 不需要*/

            // 转账金额 + remark
            transferMoney:  curJson.transferMoney,
            remark:         curJson.remark
        };

        // 0.调用创建行的函数
        saveCreLine = mainModuleConfigMap.createLineMethod();
        // 取得上步创建的行(class="dynamic-create-line")
        getCurCreateLine = saveCreLine.childNodes[0];
        // 1.为点击/导入创建的行设置值和属性
        rightTransferConfigMap.fnForClickCreLineSetVal(getCurCreateLine, uploadJsonObj, java_img_path);
        // 2.为行设置完值和自定义属性之后把当前创建的行插入到 addPayeeWall中
        addPayeeWall.appendChild(saveCreLine);
        // 3.给创建的行设置需要的公共属性
        mainModuleConfigMap.setPropertyForLine(addPayeeWall);
    },

};


