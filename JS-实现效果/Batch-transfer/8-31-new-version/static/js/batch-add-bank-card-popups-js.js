/**
 * 添加"银行卡信息"弹框模块--js
 * ------
 * add bank card popups module
 */

// 用来保存"所有银行"中哪些是"直企银联(即合作银联)"和"非直企银联"
var saveKindOfBankCode = {
    bankCode:               "",
    straightBankCode:       "",
    notStraightBankCode:    ""
};

var oPopupsHeadTips = {
    bankCardInf: "银行卡信息",
    addFrequentConPer: "添加常用联系人"
};


var popupsConfigMap = {

    // 展示全局弹框和"添加银行卡信息"弹框
    fnShowPopups:               function(){
        // 给黑色全屏窗口设置宽和高--调用写在外调的js中全屏弹框的高度不够，没找到原因
        // 取得中部的--添加"银行卡信息"弹框
        if(hasClass("dis-none", eleConfigMap.fullScreenPopups)){
            eleConfigMap.fullScreenPopups.className = removeClass("dis-none", eleConfigMap.fullScreenPopups);
            eleConfigMap.addBankCardPopups.className = removeClass("dis-none", eleConfigMap.addBankCardPopups);
        }
        // "'黑色全屏'函数/'添加银行卡信息弹框'函数"定义在global-function中
        hundredPercentScreen(eleConfigMap.fullScreenPopups);
        // 提示: 原生js找不到设置了display:none的元素，在窗口调用居函数时，元素必须显示
        fnPopupsCenter(eleConfigMap.addBankCardPopups);
    },

    // 点击"添加银行卡信息"弹框中的X号(popups-close-btn)关闭弹框
    fnClosePopups:              function(){
        if(hasClass("dis-none", eleConfigMap.fullScreenPopups) == false){
            eleConfigMap.fullScreenPopups.className = addClass("dis-none", eleConfigMap.fullScreenPopups);
            eleConfigMap.addBankCardPopups.className = addClass("dis-none", eleConfigMap.addBankCardPopups);
        }
    },

    // 下拉模块显示和隐藏
    fnShowHideModule:           function(theModule){
        if (hasClass("dis-none", theModule)) {
            theModule.className = removeClass("dis-none", theModule);
            return null;
        }else{
            theModule.className = addClass("dis-none", theModule);
            return null;
        }
    },

    // ajax获取"开户银行"json数据
    fnAjaxGetAllBankJson:       function(java_file_path){
       /* $.ajax({
            type:       "post",
            dataType:   "json",
            async:      false,
            url:        java_file_path + "/commonService/getTransferBankList",
            success:    function (data) {
                //console.log(data);
                if (data.ok == true) {
                    this.oAllBankJson = JSON.parse(data.data);
                    if(oAllBankJson instanceof Array){
                        //console.log(bankData);
                    }
                    return oAllBankJson;
                }
            }
        });*/
       this.oAllBankJson = openBankJson.data;
       //console.log(oAllBankJson);
       return this.oAllBankJson;
    },

    // ajax获取"直企银行"json数据
    fnAjaxGetStraightBankJson:  function(java_file_path){
        var straightBank;  //存储服务器返回的所有直企银行
        /*//2nd.直企银联数据
        $.ajax({
            type: "post",
            dataType: "json",
            async: false,
            url: java_file_path +"/commonService/getBankGateWay",
            success: function (data) {
                //console.log(data);
                if (data.ok === true) {
                    straightBank = JSON.parse(data.data);
                }
            }
        });*/
        straightBank = straightBankJson.data;
        return straightBank;
    },


    // 创建开户银行
    fnCreateBankLi:             function(){
        var fragment = document.createDocumentFragment();
        for(var i=0; i<this.oAllBankJson.length; i++){
            var everyBankLi = document.createElement("li");
            everyBankLi.className = "over-hid";
            var bankIconSpan = document.createElement("span");
            bankIconSpan.className = "open-bank-icon-span";
            var bankIconImg = document.createElement("img");
            bankIconImg.setAttribute("src", "static"+ "/img/icon/" + this.oAllBankJson[i].bankCode + ".png");
            bankIconSpan.appendChild(bankIconImg);
            var bankName = document.createElement("span");
            bankName.className="open-bank-name";
            bankName.setAttribute("data-bank-code", this.oAllBankJson[i].bankCode);
            bankName.innerHTML = this.oAllBankJson[i].name;
            everyBankLi.appendChild(bankIconSpan);
            everyBankLi.appendChild(bankName);
            fragment.appendChild(everyBankLi);
        }
        return fragment;
    },


    // 区分"所有银行"中哪些是"直企银联(即合作银联)"和"非直企银联"。把最后获取的数组赋值给自定义对象
    fnDistinguishBankCode:      function(java_file_path){
        // 2-1.调用取得"所有银行卡json"的ajax + "直企银行json"的ajax
        var allBankJson = popupsConfigMap.fnAjaxGetAllBankJson(java_file_path);
        var allStraightBankJson = popupsConfigMap.fnAjaxGetStraightBankJson(java_file_path);

        var bankCode = [];              // 保存所有银行的bankCode
        for(var i=0; i<allBankJson.length; i++){
            bankCode.push(allBankJson[i].bankCode);
        }
        // console.log(bankCode);

        var straightBankCode = [];      // 保存直企银行bankCode
        for(var j=0; j<allStraightBankJson.length; j++){
            straightBankCode.push(allStraightBankJson[j].bankCode);
        }
        // console.log(straightBankCode);

        var notStraightBankCode = [];   // 保存不是直企银行的bankCode
        var tempArr = [];               // 自定义的临时数组
        for(var x=0; x<straightBankCode.length; x++){
            tempArr[straightBankCode[x]] = true;
        }
        // console.log(tempArr);

        for(var z=0; z<bankCode.length; z++){
            if(tempArr[bankCode[z]] !== true){
                notStraightBankCode.push(bankCode[z]);
            }
        }
        // console.log(notStraightBankCode);

        saveKindOfBankCode.bankCode=            bankCode;
        saveKindOfBankCode.straightBankCode=    straightBankCode;
        saveKindOfBankCode.notStraightBankCode= notStraightBankCode;
    },


    // 根据"银行卡号"和"开户银行"判断"所在省市"是否显示
    fnIfShowProCity:            function(java_file_path){
        this.fnDistinguishBankCode(java_file_path);
        // console.log(saveKindOfBankCode.straightBankCode);
        var saveBankSpan = eleConfigMap.saveOpenBankSpan;
        if(saveBankSpan.innerHTML !== ""){
            var saveBankSpanCode = saveBankSpan.getAttribute("data-bank-code");
            // a.如果saveBankSpanCode等于非直企银联的值就让省份显示
            var notStraightBankCode = saveKindOfBankCode.notStraightBankCode;
            for(var i=0, len=notStraightBankCode.length; i<len; i++){
                if(saveBankSpanCode === notStraightBankCode[i]){
                    if ($provCityModule.hasClass("dis-none")) {
                        $provCityModule.removeClass("dis-none");
                    }
                }
            }

            // b.3个特殊银行单独判断
            if(saveBankSpanCode === "CBB" || saveBankSpanCode === "RCB" || saveBankSpanCode === "VTB"){
                if(hasClass("dis-none", eleConfigMap.openBranchBankModule)){
                    eleConfigMap.openBranchBankModule.className = removeClass("dis-none", eleConfigMap.openBranchBankModule);
                }
            }

            // c.直企银行: "bankCode为建设银行" + "bankCardInput的value长度等于20"
            // 建行20位卡号范本:22001674501052525463
            if(saveBankSpanCode === "CCB" && eleConfigMap.bankCardInput.value.length === 20){
                if ($provCityModule.hasClass("dis-none")) {
                    $provCityModule.removeClass("dis-none");
                }
            }
            // d.中信/兴业也需要显示省份
            if(saveBankSpanCode === "ECITIC" || saveBankSpanCode === "CIB"){
                if ($provCityModule.hasClass("dis-none")) {
                    $provCityModule.removeClass("dis-none");
                }
            }
        }
    },


    // ajax获取"开户支行"json数据
    fnAjaxGetOpenBranchJson:    function(java_file_path, bankCode, cityCode){
        var oOpenBranchJson;
       /* $.ajax({
            type: "post",
            dataType: "json",
            async: false,
            data: {"bankCode": bankCode, "cityId": cityCode},
            url:  java_file_path + "/commonService/getAllSubbranchByCityIdAndBankCode",
            success: function(data){
                //console.log(data.data);
                if(data.ok === true){
                    oOpenBranchJson = data.data;
                }
            }
        });*/
        oOpenBranchJson = openBranchBankJson.data;
        return oOpenBranchJson;
    },

    // 创建开户支行
    fnCreateOpenBranchLi:       function(java_file_path, bankCode, cityCode){
        var oOpenBranchJson = this.fnAjaxGetOpenBranchJson(java_file_path, bankCode, cityCode);
        if(typeof(oOpenBranchJson) === "string"){
            oOpenBranchJson = JSON.parse(oOpenBranchJson);
        }
        var fragment = document.createDocumentFragment();
        //  <li class="prov-or-city-default" data-province-code="11">北京市</li>

        if (oOpenBranchJson === null || oOpenBranchJson === "" || oOpenBranchJson.length === 0) {
            eleConfigMap.branchErrorSpan.innerHTML = "抱歉，此地区不支持转账。";
            return null;
        }

        for(var i=0; i<oOpenBranchJson.length; i++){
            var everyBranchBankLi = document.createElement("li");
            everyBranchBankLi.className = "prov-or-city-default";
            everyBranchBankLi.setAttribute("data-index", i);
            everyBranchBankLi.setAttribute("data-branch-id", oOpenBranchJson[i].branchsId);
            everyBranchBankLi.setAttribute("data-current-id", oOpenBranchJson[i].id);
            everyBranchBankLi.innerHTML = oOpenBranchJson[i].name;
            fragment.appendChild(everyBranchBankLi);
        }
        return fragment;
    },


    // 弹框"确定按钮"变色事件
    fnBtnChangeBg:              function(){
        var tips = "点击选择";
        // 银行卡号
        if(eleConfigMap.bankCardInput.value !== "" && eleConfigMap.bankCardErrorSpan.innerHTML === ""){
        }else{
            return null;
        }
        // 开户银行
        if(eleConfigMap.saveOpenBankSpan.innerHTML !== tips && eleConfigMap.openBankErrorSpan.innerHTML === ""){
        }else{
            return null;
        }
        // 如果所在省市~~show
        if(hasClass("dis-none", $provCityModule[0]) === false){
            if(eleConfigMap.saveProvCityP.innerHTML !== tips && eleConfigMap.provCityErrorSpan.innerHTML === ""){
            }else{
                return null;
            }
        }
        // 开户支行 ~~ show
        if(hasClass("dis-none", eleConfigMap.openBranchBankModule) === false){
            if(eleConfigMap.saveBranchBankSpan.innerHTML !== tips &&  eleConfigMap.branchErrorSpan.innerHTML === ""){
            }else{
                return null;
            }
        }

        // 如果此时弹框确定按钮有默认的
        if(hasClass("next-btn-default", eleConfigMap.popupsConfirmBtn)){
            eleConfigMap.popupsConfirmBtn.className = removeClass("next-btn-default", eleConfigMap.popupsConfirmBtn);
            eleConfigMap.popupsConfirmBtn.className = addClass("next-btn-selected", eleConfigMap.popupsConfirmBtn);
        }
    },

    // 弹框"确定按钮"click事件
    fnBtnClick:                 function(passTarget, java_file_path, java_img_path){

        var tips = "点击选择";
        // 保存弹框中的值和需要的自定义属性对象
        var oValueAttr = {};

        // 收款人姓名
        var popupsCardNameMod = eleConfigMap.popupsCardNameModule;
        if(parseInt(popupsCardNameMod.getAttribute("data-click-flag")) === 1){
            if(eleConfigMap.cardNameInput.value === ""){
                eleConfigMap.cardNameErrorSpan.innerHTML = "请输入收款人姓名";
            }else{
                oValueAttr.cardNameValue = eleConfigMap.cardNameInput.value;
            }
        }

        // 银行卡号
        if(eleConfigMap.bankCardInput.value === ""){
            eleConfigMap.bankCardErrorSpan.innerHTML = "请输入银行卡号";
        }else{
            oValueAttr.bankCardInputVal=   eleConfigMap.bankCardInput.value;
        }

        // 开户银行
        if(eleConfigMap.saveOpenBankSpan.innerHTML === tips){
            eleConfigMap.openBankErrorSpan.innerHTML = "请选择开户银行";
        }else{
            oValueAttr.openBankSpanHtml=   eleConfigMap.saveOpenBankSpan.innerHTML;
            oValueAttr.bankCode=           eleConfigMap.saveOpenBankSpan.getAttribute("data-bank-code")
        }

        // 所在省市
        if(hasClass("dis-none", $provCityModule[0]) === false){
            if(eleConfigMap.saveProvCityP.innerHTML === tips){
                eleConfigMap.provCityErrorSpan.innerHTML = "请选择省市";
            }else{
                var saveProvValSpan     =   $(".save-prov-val-span")[0];    // 保存省份值span
                var saveCityValSpan     =   $(".save-city-val-span")[0];    // 保存城市值span

                oValueAttr.provValSpanHtml =  saveProvValSpan.innerHTML;
                oValueAttr.provinceCode    =  saveProvValSpan.getAttribute("data-province-code");
                oValueAttr.cityValSpanHtml =  saveCityValSpan.innerHTML;
                oValueAttr.cityCode=          saveCityValSpan.getAttribute("data-city-code");
            }
        }

        // 开户支行
        if(hasClass("dis-none", eleConfigMap.openBranchBankModule) === false){
            var saveBranchBankSpan  =   $(".save-branch-bank-span")[0];

            oValueAttr.branchBankSpanHtml= saveBranchBankSpan.innerHTML;
            oValueAttr.dataBranchId=       saveBranchBankSpan.getAttribute("data-branch-id");

            if(eleConfigMap.saveBranchBankSpan.innerHTML === tips){
                eleConfigMap.branchErrorSpan.innerHTML = "请选择支行";
            }
        }

        // 所在分组
        var popupsGroupModule = eleConfigMap.popupsAddGroupModule;
        var fiveGroupP =        eleConfigMap.fiveGroupP;
        var fiveIcon   =        $(".popups-five-group-wall i");
        if(parseInt(popupsGroupModule.getAttribute("data-click-flag")) === 1){
            for(var i=0; i<fiveIcon.length; i++){
                if(parseInt(fiveIcon[i].getAttribute("data-icon-flag")) === 1){
                    oValueAttr.currentSelectGroupP = parseInt(fiveGroupP[i].getAttribute("data-group-flag"));
                }
            }
        }

        // 这2个是固定的直接加上
        oValueAttr.territoryFlag = 1;
        oValueAttr.transferType = 1;


        // 经过上面几个步骤之后，现在oValueAttr是这样的
        /*
         var oValueAttr = {

         // 收款人姓名
         cardNameValue = eleConfigMap.cardNameInput.value;

         // 银行卡号
         bankCardInputVal:   eleConfigMap.bankCardInput.value,
         // 开户银行
         openBankSpanHtml:   eleConfigMap.saveOpenBankSpan.innerHTML,
         bankCode:           eleConfigMap.saveOpenBankSpan.getAttribute("data-bank-code")
         // 所在省市 (存在or不存在)
         provValSpanHtml =  saveProvValSpan.innerHTML;
         provinceCode    =  saveProvValSpan.getAttribute("data-province-code");
         cityValSpanHtml =  saveCityValSpan.innerHTML;
         cityCode=          saveCityValSpan.getAttribute("data-city-code");
         // 开户支行 (存在or不存在)
         branchBankSpanHtml= saveBranchBankSpan.innerHTML;
         dataBranchId=       saveBranchBankSpan.getAttribute("data-branch-id");

         // 所在分组
         currentSelectGroupP = parseInt(fiveGroupP[i].getAttribute("data-group-flag"));

         oValueAttr.territoryFlag = 1;
         oValueAttr.transferType = 1;
         };
         */
        // console.log("输出此时oValueAttr保存的值为:");
        // console.log(oValueAttr);

        // 定义保存弹框中的错误Array
        var saveErrorArr = [];
        for(var i=0, len=eleConfigMap.$popupsErrorSpan.length; i<len; i++){
            if(eleConfigMap.$popupsErrorSpan[i].innerHTML !== ""){
                saveErrorArr.push(eleConfigMap.$popupsErrorSpan[i].innerHTML);
            }
        }
        if(saveErrorArr.length === 0){
            // ** if判断为"银行卡信息"弹框， else if为右侧"添加常用联系人"弹框 **

            // 第一步判断为当前target是不是有唯一标识符data-guid。切记
            if(passTarget.getAttribute("data-guid") === "GUID" && passTarget.tagName.toLowerCase() === "p"){
                // "银行卡信息"弹框
                if(passTarget.innerHTML !== ""){
                    passTarget.innerHTML = "";
                    /** 动态创建"银行卡信息"下的3个span + 写值 **/
                    passTarget.appendChild(mainModuleConfigMap.createBankCardInfSpan(oValueAttr, java_img_path));

                    // 取得上面创建的三个span添加ScrollReveal效果
                    var getCreateThreeSpan = passTarget.getElementsByTagName("span");
                    for (var j = 0; j < getCreateThreeSpan.length; j++) {
                        sr.reveal(getCreateThreeSpan[j], {
                            origin: "bottom",
                            distance: "16px",
                            opacity: 0,
                            scale: 1,
                            delay: 150,
                            easing: "ease-in-out",
                            reset: false,
                            duration: 200
                        });
                    }
                }

                // 移除唯一标识符把创建了三个span的当前p标签的data-flag设置为1
                passTarget.removeAttribute("data-guid");
                if(parseInt(passTarget.getAttribute("data-flag")) === 0){
                    passTarget.setAttribute("data-flag",1);
                }

            }else if(passTarget.parentNode.previousSibling.tagName.toLowerCase() === "ul"){
                // 右侧"添加常用联系人"弹框

                // 把当前新建联系人写入到相应分组下的ul中
                rightTransferConfigMap.fnCreateSingleFrePerHtml(passTarget, oValueAttr, java_img_path);

                // 保存添加联系人回传ajax到服务器，然后得到更新后的常用联系人数据，重新写值
                rightTransferConfigMap.getUpdateConPerAndWrite(passTarget, oValueAttr, java_file_path, java_img_path);
            }

            popupsConfigMap.fnClosePopups();

            return null;
        }
    },

    // 弹框显示时获取target下span的值赋值给对应的行
    fnSetValAttr:               function(passTarget){
        var bankNameSpan =  getClassName("bank-name", passTarget)[0],
            cardNum =       getClassName("card-num", passTarget)[0];
        var oThreeSpan = {
            dataBankCode:       bankNameSpan.getAttribute("data-bank-code"),
            bankName:           bankNameSpan.innerHTML,
            dataNumber:         cardNum.getAttribute("data-card-number"),
            dataProvinceCode:   cardNum.getAttribute("data-province-code"),
            dataProvinceName:   cardNum.getAttribute("data-province-name"),
            dataCityCode:       cardNum.getAttribute("data-city-code"),
            dataCityName:       cardNum.getAttribute("data-city-name"),
            dataProcityFlag:    cardNum.getAttribute("data-procity-flag"),
            dataBranchCode:     cardNum.getAttribute("data-branch-code"),
            dataBranchName:     cardNum.getAttribute("data-branch-name"),
            dataBranchFlag:     cardNum.getAttribute("data-branch-flag")
        };

        eleConfigMap.bankCardInput.value            =  oThreeSpan.dataNumber;
        eleConfigMap.saveOpenBankSpan.innerHTML   =  oThreeSpan.bankName;
        eleConfigMap.saveOpenBankSpan.setAttribute("data-bank-code", oThreeSpan.dataBankCode);

        if (eleConfigMap.saveProvCityP !== "") {
            eleConfigMap.saveProvCityP.innerHTML = "";
            eleConfigMap.saveProvCityP.appendChild(createProvCitySpan(oThreeSpan));
        }

        // 创建省市span+写值+设置属性
        function createProvCitySpan(oThreeSpan){
            var fragment = document.createDocumentFragment();

            var saveProvValSpan = document.createElement("span");
            saveProvValSpan.className = "save-prov-val-span";
            saveProvValSpan.setAttribute("data-province-code", oThreeSpan.dataProvinceCode);
            saveProvValSpan.innerHTML = oThreeSpan.dataProvinceName;

            // 创建"斜杠(slash)span"
            var insertSlash = document.createElement("span");
            insertSlash.className = "insert-slash";
            insertSlash.appendChild(document.createTextNode("/"));

            var saveCityValSpan = document.createElement("span");
            saveCityValSpan.className = "save-city-val-span";
            saveCityValSpan.innerHTML = oThreeSpan.dataCityName;
            saveCityValSpan.setAttribute("data-city-code", oThreeSpan.dataCityCode);
            saveCityValSpan.setAttribute("data-parent-code", oThreeSpan.dataProvinceCode);
            fragment.appendChild(saveProvValSpan);
            fragment.appendChild(insertSlash);
            fragment.appendChild(saveCityValSpan);

            return fragment;
        }

        // 支行
        if (eleConfigMap.saveBranchBankSpan !== "") {
            eleConfigMap.saveBranchBankSpan.innerHTML = "";
            eleConfigMap.saveBranchBankSpan.innerHTML = oThreeSpan.dataBranchName;
            eleConfigMap.saveBranchBankSpan.setAttribute("data-branch-code", oThreeSpan.dataBranchCode);
            eleConfigMap.saveBranchBankSpan.setAttribute("data-procity-flag", oThreeSpan.dataProcityFlag);
            eleConfigMap.saveBranchBankSpan.setAttribute("data-branch-flag", oThreeSpan.dataBranchFlag);
        }
    },

    // 清楚弹框里的值和自定义属性
    fnClearPopupsVal:           function(){
        var tips = "点击选择";
        eleConfigMap.cardNameInput.value = "";
        eleConfigMap.bankCardInput.value = "";
        eleConfigMap.saveOpenBankSpan.innerHTML = tips;
        eleConfigMap.saveOpenBankSpan.setAttribute("data-bank-code", "null");
        eleConfigMap.saveProvCityP.innerHTML = tips;
        eleConfigMap.saveBranchBankSpan.innerHTML = tips;
        eleConfigMap.saveBranchBankSpan.setAttribute("data-branch-id", "null");
    },

    // 如果 "姓名"行/"分组"行 显示就隐藏
    fnHidNameGroupMod:          function(){
        var popupsCardNameMod = eleConfigMap.popupsCardNameModule;
        if(parseInt(popupsCardNameMod.getAttribute("data-click-flag")) === 1){
            popupsCardNameMod.className = addClass("dis-none", popupsCardNameMod);
            popupsCardNameMod.setAttribute("data-click-flag", 0);
        }
        var popupsGroupMod =  eleConfigMap.popupsAddGroupModule;
        if(parseInt(popupsGroupMod.getAttribute("data-click-flag")) === 1){
            popupsGroupMod.className = addClass("dis-none", popupsGroupMod);
            popupsGroupMod.setAttribute("data-click-flag", 0);
        }
    },

    // 如果 "姓名/分组"行是隐藏的就显示
    fnShowNameGroupMod:         function(){
        var popupsCardNameMod = eleConfigMap.popupsCardNameModule;
        if(parseInt(popupsCardNameMod.getAttribute("data-click-flag")) === 0){
            popupsCardNameMod.className = removeClass("dis-none", popupsCardNameMod);
            popupsCardNameMod.setAttribute("data-click-flag", 1);
        }
        var popupsGroupMod =  eleConfigMap.popupsAddGroupModule;
        if(parseInt(popupsGroupMod.getAttribute("data-click-flag")) === 0){
            popupsGroupMod.className = removeClass("dis-none", popupsGroupMod);
            popupsGroupMod.setAttribute("data-click-flag", 1);
        }
    },

    // 把弹框中的"5个分组"全部设为未选中状态，在根据点击把当前点击的设置为选中
    fnPopupsGroupSetSel:       function(index){
        var fiveGroupP =  eleConfigMap.fiveGroupP;
        var i = 0,
            len = fiveGroupP.length;
        for(; i<len; i++){
            if(hasClass("blue-font", fiveGroupP[i])){
                fiveGroupP[i].className = removeClass("blue-font", fiveGroupP[i]);
                var curITag = fiveGroupP[i].getElementsByTagName("i")[0];
                if(parseInt(curITag.getAttribute("data-icon-flag")) === 1){
                    curITag.className = removeClass("fa-check-circle", curITag);
                    curITag.className = addClass("fa-circle-o", curITag);
                    curITag.setAttribute("data-icon-flag", 0);
                }
            }
        }

        fiveGroupP[index].className = addClass("blue-font", fiveGroupP[index]);
        var curChildI = fiveGroupP[index].getElementsByTagName("i")[0];
        curChildI.className = removeClass("fa-circle-o", curChildI);
        curChildI.className = addClass("fa-check-circle", curChildI);
        curChildI.setAttribute("data-icon-flag", 1);
    },

};



