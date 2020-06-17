/**
 * 右侧 "最近转账人"模块
 * ------
 * recent transfer module
 */

/** 保存ajax获取的"最近转账人"对象变量 **/
/*var oSaveRecTrasferPer = {
 bankAccountName:  "",
 bankCard:         "",
 bankCardEndFour:  "",
 bankCode:         "",
 bankName:         "",
 bankNameStartSix: "",
 cityId:           "",
 cityName:         "",
 provinceId:       "",
 provinceName:     "",
 uniteBankId:      "",
 uniteBankName:    ""
 };*/



var rightTransferConfigMap = {

    /**
     * ajax调取"最近转账人"json数据
     */
    ajaxGetRecentTransferPer:       function(java_file_path){
        var oRecentTransferJson;
        /* $.ajax({
         type: "post",
         async: false,
         url: java_file_path +"/contactPerson/getBankContactPerson",
         dataType: "json",
         data:{"territoryFlag" :"1"},
         success: function (data) {
         if (data.ok === true) {
         //一定要转载一下,这样获取到是json字符串
         oRecentTransferJson =JSON.parse(data.data);
         }
         }
         });*/
        oRecentTransferJson = recentTransferPerJson.data;
        return oRecentTransferJson;
    },

    // 创建"最近转账人"的li方法 create recent transfer person li
    fnCreateRecTransPerLi:          function(writeHtmlWall, oRecentTransferJson, java_img_path){
        var fragment = document.createDocumentFragment();
        //默认把ul下所有的数据清空
        if(writeHtmlWall.innerHTML !== ""){
            writeHtmlWall.innerHTML = ""
        }
        //如果调用"常用联系人json为空"给出提示
        if(oRecentTransferJson === ""){
            var createOneLi = document.createElement("li");
            createOneLi.setAttribute("data-none-flag","true");
            createOneLi.className= "text-center";
            createOneLi.appendChild(document.createTextNode("您还未有常用联系人"));
            fragment.appendChild(createOneLi);
        }else {
            //循环创建li
            for(var i=0, len= oRecentTransferJson.length; i<len; i++){
                var recentTransferLi = document.createElement("li");
                recentTransferLi.setAttribute("data-index", i);
                recentTransferLi.setAttribute("data-selected-flag", 0);

                //1td.span
                var firstSpan = document.createElement("span");
                firstSpan.className = "public-font-icon-span";
                var iTag = document.createElement("i");
                iTag.className = "fa fa-square-o recent-transfer-icon";
                iTag.setAttribute("aria-hidden", "true");
                iTag.setAttribute("data-icon-flag", 0); // 用于做全选和取消全选的判断依据
                firstSpan.appendChild(iTag);

                //2td.span
                var secondSpan = document.createElement("span");
                secondSpan.className = "public-name-span recent-trans-contacts-name";
                secondSpan.appendChild(document.createTextNode(oRecentTransferJson[i].bankAccountName));

                //3td.span
                var thirdSpan = document.createElement("span");
                thirdSpan.className = "public-bank-img-span recent-trans-bank-img";
                var transBankImg = document.createElement("img");
                transBankImg.setAttribute("src", java_img_path +"/img/icon/" + (oRecentTransferJson[i].bankCode).toLowerCase() + ".png");
                thirdSpan.appendChild(transBankImg);
                //4td.span
                var fourthSpan = document.createElement("span");
                fourthSpan.className = "public-bank-name-span recent-trans-bank-name";
                fourthSpan.appendChild(document.createTextNode(oRecentTransferJson[i].bankName));
                fourthSpan.setAttribute("data-bank-code", oRecentTransferJson[i].bankCode);
                //5td.span
                var fifthSpan = document.createElement("span");
                fifthSpan.className = "public-card-num-span recent-trans-card-num";
                fifthSpan.appendChild(document.createTextNode("(" + oRecentTransferJson[i].bankCardEndFour +")"));
                fifthSpan.setAttribute("data-bank-account", oRecentTransferJson[i].bankCard);
                fifthSpan.setAttribute("data-province-code", oRecentTransferJson[i].provinceId);
                fifthSpan.setAttribute("data-province-name", oRecentTransferJson[i].provinceName);
                fifthSpan.setAttribute("data-city-code", oRecentTransferJson[i].cityId);
                fifthSpan.setAttribute("data-city-name", oRecentTransferJson[i].cityName);
                fifthSpan.setAttribute("data-branch-code", oRecentTransferJson[i].uniteBankId);
                fifthSpan.setAttribute("data-branch-name", oRecentTransferJson[i].uniteBankName);

                recentTransferLi.appendChild(firstSpan);
                recentTransferLi.appendChild(secondSpan);
                recentTransferLi.appendChild(thirdSpan);
                recentTransferLi.appendChild(fourthSpan);
                recentTransferLi.appendChild(fifthSpan);
                fragment.appendChild(recentTransferLi); //li推入到fragment中
            }
        }
        writeHtmlWall.appendChild(fragment);
    },


    // 右侧 "最近转账人/常用联系人"下拉展示/隐藏 + 字体图标变换显示和隐藏
    fnRightPubDropDownStyle:        function(current){
        for(var i=0; i<eleConfigMap.$rightPublicPWall.length; i++){
            if(hasClass("public-p-wall-clicked",eleConfigMap.$rightPublicPWall[i])){
                eleConfigMap.$rightPublicPWall[i].className = removeClass("public-p-wall-clicked", eleConfigMap.$rightPublicPWall[i]);
            }
        }
        // 给当前点击的元素添加背景变深class
        current.className = addClass("public-p-wall-clicked", current);

        // "向上/下"箭头icon图标 + 向上的三角icon图标
        if(hasClass("recent-transfer-per-div", current)){
            doubleUse(0);
        }else{
            doubleUse(1);
        }
        function doubleUse(num){
            if(hasClass("fa-chevron-up", eleConfigMap.$arrowIconI[num])){
                eleConfigMap.$arrowIconI[num].className = removeClass("fa-chevron-up", eleConfigMap.$arrowIconI[num]);
                eleConfigMap.$arrowIconI[num].className = addClass("fa-chevron-down", eleConfigMap.$arrowIconI[num]);
                if(hasClass("dis-none", eleConfigMap.$upTriangle[num]) === false){
                    eleConfigMap.$upTriangle[num].className = addClass("dis-none", eleConfigMap.$upTriangle[num]);
                }else{
                    eleConfigMap.$upTriangle[num].className = removeClass("dis-none", eleConfigMap.$upTriangle[num]);
                }
            }else{
                eleConfigMap.$arrowIconI[num].className = removeClass("fa-chevron-down", eleConfigMap.$arrowIconI[num]);
                eleConfigMap.$arrowIconI[num].className = addClass("fa-chevron-up", eleConfigMap.$arrowIconI[num]);
                if(hasClass("dis-none", eleConfigMap.$upTriangle[num]) === false){
                    eleConfigMap.$upTriangle[num].className = addClass("dis-none", eleConfigMap.$upTriangle[num]);
                }else{
                    eleConfigMap.$upTriangle[num].className = removeClass("dis-none", eleConfigMap.$upTriangle[num]);
                }
            }
        }
    },

    // opacity如果为0就变为一
    fnShowOpacity:                  function(){
        if(eleConfigMap.frequentContactsMod.offsetHeight === 0){
            eleConfigMap.frequentContactsMod.style.height = 600 + "px";
        }else{
            eleConfigMap.frequentContactsMod.style.height = 0 + "px";
        }
    },


    // 单个li"选中/取消"样式切换
    fnSingleLiSwitchStyle:          function(ele, objLi){
        /* {
         objLi.judgmentAttr == "data-selected-flag",
         objLi.eleAddDelStyle == "right-module-li-selected",

         objLi.judAttrNumOne == 0,
         objLi.judAttrNumTwo == 1,

         objLi.childAddDelSty1 == "fa-square-o",
         objLi.childAddDelSty2 == "fa-check-square-o",
         objLi.childEleJudAttr == "data-icon-flag",
         }*/

        var curEleChildIcon = ele.getElementsByTagName("i")[0];
        if(parseInt(ele.getAttribute(objLi.judgmentAttr)) === objLi.judAttrNumOne){
            ele.className = addClass(objLi.eleAddDelStyle, ele);
            ele.setAttribute(objLi.judgmentAttr, objLi.judAttrNumTwo);

            if(parseInt(curEleChildIcon.getAttribute(objLi.childEleJudAttr)) === objLi.judAttrNumOne){
                curEleChildIcon.className = removeClass(objLi.childAddDelSty1,curEleChildIcon);
                curEleChildIcon.className = addClass(objLi.childAddDelSty2,curEleChildIcon);
                curEleChildIcon.setAttribute(objLi.childEleJudAttr, objLi.judAttrNumTwo);
            }
        }else if(parseInt(ele.getAttribute(objLi.judgmentAttr)) === objLi.judAttrNumTwo){
            ele.className = removeClass("right-module-li-selected", ele);
            ele.setAttribute(objLi.judgmentAttr, objLi.judAttrNumOne);

            // icon图标设为默认
            if(parseInt(curEleChildIcon.getAttribute(objLi.childEleJudAttr)) === objLi.judAttrNumTwo){
                curEleChildIcon.className = removeClass(objLi.childAddDelSty2,curEleChildIcon);
                curEleChildIcon.className = addClass(objLi.childAddDelSty1,curEleChildIcon);
                curEleChildIcon.setAttribute(objLi.childEleJudAttr, objLi.judAttrNumOne);
            }
        }
    },

    // "全选/取消全选"按钮，li样式"选中/取消选中"切换
    fnDefaultSelectedSwitch:        function(obj){
        /*{
         ele:                recentTransLi,
         judgmentAttr:       "data-selected-flag",

         eleAddOrMovStyle:   "right-module-li-selected",

         judAttrEqualNum:     0,
         judAftSetAttrNum:    1,

         childEleRemoveSty:  "fa-square-o",
         childEleAddSty:     "fa-check-square-o",
         childEleJudAttr:    "data-icon-flag"
         }*/

        var i =0,
            len = obj.ele.length;
        for (; i < len; i++) {
            var curEleChildIcon = obj.ele[i].getElementsByTagName("i")[0];
            if (parseInt(obj.ele[i].getAttribute(obj.judgmentAttr)) === obj.judAttrEqualNum ) {
                // li添加选中样式
                if(hasClass(obj.eleAddOrMovStyle, obj.ele[i])){
                    obj.ele[i].className = removeClass(obj.eleAddOrMovStyle, obj.ele[i]);
                }else{
                    obj.ele[i].className = addClass(obj.eleAddOrMovStyle, obj.ele[i]);
                }
                obj.ele[i].setAttribute(obj.judgmentAttr, obj.judAftSetAttrNum);

                // icon图标变为选中
                if(parseInt(curEleChildIcon.getAttribute(obj.childEleJudAttr)) === obj.judAttrEqualNum ){
                    curEleChildIcon.className = removeClass(obj.childEleRemoveSty,curEleChildIcon);
                    curEleChildIcon.className = addClass(obj.childEleAddSty,curEleChildIcon);
                    curEleChildIcon.setAttribute(obj.childEleJudAttr, obj.judAftSetAttrNum);
                }
            }
        }
    },




    /**
     * ajax调取"常用联系人"json数据
     */
    ajaxGetFrequentContactPer:      function(java_file_path){
        var frequentContactPerJson;
        /*$.ajax({
         type: "post",
         dataType: "json",
         async: false,
         data:{"transferType" :"1"},
         url:  java_file_path + "/frequentContact/queryFrequentContactList",
         success: function(data){
         /!*console.log("获取常用联系人json数据为");
         console.log(data.data);*!/
         if(data.ok === true){
         frequentContactPerJson = data.data.frequentContactList;
         //console.log(data.data.frequentContactList);
         }
         }
         });*/
        frequentContactPerJson = frequentContactsPersonJson;
        return frequentContactPerJson;
    },

    // 创建"常用联系人"下拉中的5个组
    fnCreateGroupHtml:              function(groupName, index){

        var fragment = document.createDocumentFragment();
        var publicGroupMod = document.createElement("div");
        publicGroupMod.className = "public-group-module";
        if(publicGroupMod.innerHTML !== ""){
            publicGroupMod.innerHTML = ""
        }
        publicGroupMod.innerHTML +=
            '<p class="group-header-long-btn">' +
            '<span>' + groupName +'</span>' +
            '<i class="fa fa-angle-right fa-lg group-header-btn-icon" aria-hidden="true" data-switch-flag="0"></i>' +
            '</p>' +

            '<div class="public-group-drop-down">' +
            '<ul class="group-drop-down-ul" data-ul-group-type ='+ index +'></ul>' +

            '<p class="group-add-edit-btn-wall">' +
            '<span class="add-freq-per-btn">' +
            '<i class="fa fa-plus mar-rig-5" aria-hidden="true"></i>添加联系人' +
            '</span>' +
            '<span class="edit-freq-per-btn">' +
            '<i class="fa fa-pencil mar-rig-5" aria-hidden="true"></i>编辑 ' +
            '</span>' +
            '<span class="complete-freq-per-span dis-none">' +
            '<i class="fa fa-check mar-rig-5" aria-hidden="true"></i>完成 ' +
            '</span>' +
            '</p>' +

            '<div class="four-function-btn-wall dis-none">' +
            '<p class="group-four-edit-btn-wall">' +
            '<span class="selected-all-btn">全选</span>' +
            '<span class="cancel-all-selected-btn">取消全选</span>' +
            '<span class="remove-btn">删除</span>' +
            '<span class="move-grouping">移动分组</span>' +
            '</p>' +
            '</div>' +
            '<hr>' +
            '</div>';
        fragment.appendChild(publicGroupMod);
        return fragment;
    },

    // 创建5个ul下对应的li
    fnCreateFiveGroupLiHtml:        function(java_file_path, java_img_path, saveFiveGroupLiArr) {

        // 保存ajax调用的常用联系人json: frequent contact person json
        var freConPerJson = this.ajaxGetFrequentContactPer(java_file_path);

        if(typeof(freConPerJson) === "string"){
            freConPerJson = JSON.parse(freConPerJson);
        }

        var groupLi;
        // 如果常用联系人json为空的情况
        if (freConPerJson === "") {
            for(var i=0; i<5; i++){
                groupLi = document.createElement("li");
                groupLi.setAttribute("data-index", i);
                groupLi.setAttribute("data-selected-flag", 0);
                groupLi.appendChild(document.createTextNode("您还未有常用联系人"));
                saveFiveGroupLiArr.push(groupLi);
            }
        } else {
            for(var i=0, len= freConPerJson.length; i<len; i++){
                groupLi = document.createElement("li");
                groupLi.setAttribute("data-index", i);
                groupLi.setAttribute("data-li-group-type", freConPerJson[i].contactGroup);
                groupLi.setAttribute("data-selected-flag", 0);
                groupLi.setAttribute("data-under-first-span-flag", 0);

                //1td.span
                var firstSpan = document.createElement("span");
                firstSpan.className = "public-font-icon-span dis-none";
                firstSpan.setAttribute("data-show-hid-flag", 0);
                var iTag = document.createElement("i");
                iTag.className = "fa fa-square-o frequent-contact-icon";
                iTag.setAttribute("aria-hidden", "true");
                iTag.setAttribute("data-icon-flag", 0); // 用于做全选和取消全选的判断依据
                firstSpan.appendChild(iTag);

                //2td.span
                var secondSpan = document.createElement("span");
                secondSpan.className = "public-name-span frequent-contact-name-span";
                secondSpan.appendChild(document.createTextNode(freConPerJson[i].receiveBankAcctName));

                //3td.span
                var thirdSpan = document.createElement("span");
                thirdSpan.className = "public-bank-img-span frequent-contact-img-span";
                var bankImg = document.createElement("img");
                bankImg.setAttribute("src", java_img_path +"/img/icon/" + (freConPerJson[i].receiveBankCode).toLowerCase() + ".png");
                thirdSpan.appendChild(bankImg);
                //4td.span
                var fourthSpan = document.createElement("span");
                fourthSpan.className = "public-bank-name-span frequent-contact-bank-name";
                fourthSpan.appendChild(document.createTextNode(freConPerJson[i].receiveBankName));
                fourthSpan.setAttribute("data-bank-code", freConPerJson[i].receiveBankCode);
                //5td.span
                var fifthSpan = document.createElement("span");
                fifthSpan.className = "public-card-num-span frequent-contact-card-num";
                var getAccount = freConPerJson[i].receiveBankAcct;
                var getAccountLastFour = getAccount.substring(getAccount.length - 4, getAccount.length);
                fifthSpan.appendChild(document.createTextNode("(" + getAccountLastFour +")"));
                fifthSpan.setAttribute("data-bank-account",     freConPerJson[i].receiveBankAcct);
                fifthSpan.setAttribute("data-province-code",    freConPerJson[i].provinceId);
                fifthSpan.setAttribute("data-province-name",    freConPerJson[i].provinceName);
                fifthSpan.setAttribute("data-city-code",        freConPerJson[i].cityId);
                fifthSpan.setAttribute("data-city-name",        freConPerJson[i].cityName);
                fifthSpan.setAttribute("data-branch-code",      freConPerJson[i].receiveBankSubbranch);
                fifthSpan.setAttribute("data-territory-flag",   freConPerJson[i].territoryFlag);
                fifthSpan.setAttribute("data-transfer-type",    freConPerJson[i].transferType);

                groupLi.appendChild(firstSpan);
                groupLi.appendChild(secondSpan);
                groupLi.appendChild(thirdSpan);
                groupLi.appendChild(fourthSpan);
                groupLi.appendChild(fifthSpan);

                saveFiveGroupLiArr.push(groupLi);
            }

        }
        return saveFiveGroupLiArr;
    },

    /**
     *  点击"添加常用联系人"后弹框出现，单独创建联系人的方法
     */
    fnCreateSingleFrePerHtml: function (passTarget, oValueAttr, java_img_path) {

        // 此处为后台忠飒大神提供的判断方法，当时的思路是怎么退出整个方法，而没想到只在方法内做判断就可以了
        if (passTarget.getAttribute("data-add-per-btn-flag") === "false") {
            return;
        }
        passTarget.setAttribute("data-add-per-btn-flag", "false");

        /*if(VV=="FALSE"){
        RETURN;
        }
        VV =FALSE;*/

        // 把当前新建联系人写入到相应分组下的ul中
        var fragment = document.createDocumentFragment();
        var creSingleLi = document.createElement("li");
        creSingleLi.setAttribute("data-li-group-type", oValueAttr.currentSelectGroupP);
        creSingleLi.setAttribute("data-selected-flag", "0");
        creSingleLi.setAttribute("data-under-first-span-flag", "0");

        creSingleLi.innerHTML +=
            '<span class="public-font-icon-span dis-none" data-show-hid-flag="0" >' +
                '<i class="fa fa-square-o frequent-contact-icon" aria-hidden="true" data-icon-flag=0></i>' +
            '</span>' +
            '<span class="public-name-span frequent-contact-name-span">' + oValueAttr.cardNameValue + '</span>' +
            '<span class="public-bank-img-span frequent-contact-img-span">' +
                '<img src="' + java_img_path + '/img/icon/' + (oValueAttr.bankCode).toLowerCase() + '.png">' +
            '</span>' +
            '<span class="public-bank-name-span frequent-contact-bank-name" data-bank-code=' + oValueAttr.bankCode + '>' + oValueAttr.openBankSpanHtml + '</span>' +
            '<span class="public-card-num-span frequent-contact-card-num" data-bank-account =' + ' "' + oValueAttr.bankCardInputVal +  '" ' +
                            ' data-province-code =' + '"' + oValueAttr.provinceCode +  '"' +
                            ' data-province-name=' + '"' + oValueAttr.provValSpanHtml +  '"' +
                            ' data-city-code =' + '"' + oValueAttr.cityCode +  '"' +
                            ' data-city-name =' + '"' + oValueAttr.cityValSpanHtml +  '"' +
                            ' data-branch-code =' + '"' + oValueAttr.dataBranchId +  '"' +
                            ' data-territory-flag = 1' + 'data-transfer-type=1' + '>' +
                oValueAttr.bankCardInputVal.substring(oValueAttr.bankCardInputVal.length - 4, oValueAttr.bankCardInputVal.length) +
            '</span>';

        fragment.appendChild(creSingleLi);

        // 插入之后立马执行scrollReveal效果
        sr.reveal(creSingleLi, {
            origin: "bottom",
            distance: "30px",
            opacity: 0,
            scale: 1,
            delay: 200,
            easing: "ease-in-out",
            reset: false,
            duration: 280
        });


        // 因为弹框出现时，分组又可以随便切换，所以最后新添加的人插入到5个ul分组的哪一个，
        // 是根据点击弹框确定时获取的oValueAttr.currentSelectGroupP等于哪一个ul的group-flag决定
        var curGroupUl = passTarget.parentNode.previousSibling;
        // 如果当前按钮对应的ul等于弹框中所选组就直接把li插入，否则走else
        if (parseInt(curGroupUl.getAttribute("data-ul-group-type")) === parseInt(oValueAttr.currentSelectGroupP)) {
            curGroupUl.appendChild(fragment);
        } else {
            var groupBtn = $(".group-header-long-btn");         // 每个组的头部长条按钮
            var dropDownMod = $(".public-group-drop-down");     // 每个组的下拉
            var fiveUlGroup = $(".group-drop-down-ul");
            var i = 0,
                len = fiveUlGroup.length;
            for (; i < len; i++) {
                if (parseInt(fiveUlGroup[i].getAttribute("data-ul-group-type")) === parseInt(oValueAttr.currentSelectGroupP)) {
                    // 把当前"新添加的联系人"添加到对应的ul中
                    fiveUlGroup[i].appendChild(fragment);

                    // 把所有的长条组按钮的选中样式都移除，所有展开的下拉模块都隐藏
                    for (var j = 0; j < dropDownMod.length; j++) {
                        // 所有的都折叠
                        basicAnimation(dropDownMod[j], {height: 0}, 10);

                        // 5个长条组按钮的选中样式移除，后面的箭头样也设置为默认
                        var groupArrowITag = groupBtn[j].getElementsByTagName("i")[0];
                        console.log(groupArrowITag.className);
                        if (parseInt(groupArrowITag.getAttribute("data-switch-flag")) === 1) {
                            groupBtn[j].className = removeClass("blue-font2", groupBtn[j]);

                            groupArrowITag.className = removeClass("fa-angle-down", groupArrowITag);
                            groupArrowITag.className = addClass("fa-angle-right", groupArrowITag);
                            groupArrowITag.setAttribute("data-switch-flag", 0);
                        }
                    }

                    // 最后把当前的插入的下拉模块展开，长条组按钮添加样式
                    groupBtn[i].className = addClass("blue-font2", groupBtn[i]);
                    var iconTag = groupBtn[i].getElementsByTagName("i")[0];

                    iconTag.className = removeClass("fa-angle-right", iconTag);
                    iconTag.className = addClass("fa-angle-down", iconTag);
                    iconTag.setAttribute("data-switch-flag", 1);

                    basicAnimation(dropDownMod[i], {height: 346}, 12);

                }
            }
        }


    },


    /**
     * ajax提交弹框中填写的新建联系人，到服务器
     */
    ajaxPostCreateConPerJson:       function(java_file_path, oValueAttr){
        var updateFreConPerJson;
        var savPerArr = [];
        var savePostPersonData = "";
        savePostPersonData = savePostPersonData +
            "receiveBankAcctName:" + oValueAttr.cardNameValue +

            ",receiveBankAcct:" + oValueAttr.bankCardInputVal +

            ",receiveBankCode:" + oValueAttr.bankCode +
            ",receiveBankName:" + oValueAttr.openBankSpanHtml +

            ",cityId:" + oValueAttr.cityCode +
            ",cityName:" + oValueAttr.cityValSpanHtml +
            ",provinceName:" + oValueAttr.provValSpanHtml +
            ",provinceId:" + oValueAttr.provinceCode +

            ",receiveBankSubbranch:" + oValueAttr.dataBranchId +

            ",contactGroup" + oValueAttr.currentSelectGroupP +

            ",territoryFlag:" + 1 +
            ",contactGroup:" + 1 + ";";


        if(typeof(savePostPersonData) === "string"){
            savePostPersonData = JSON.stringify(savePostPersonData);
            savPerArr.push(savePostPersonData);
        }
        console.log(savPerArr);
        // console.log(savePostPersonData);
        // frequentContactsPersonJson

        // return savePostPersonData;
    },

    // 得到更新后的常用联系人数据，重新写值
    getUpdateConPerAndWrite:        function(passTarget, oValueAttr, java_file_path, java_img_path){

        // 此处为后台忠飒大神提供的判断方法，当时的思路是怎么退出整个方法，而没想到只在方法内做判断就可以了
        if(passTarget.getAttribute("data-add-per-btn-flag") === "false"){
            return;
        }
        passTarget.setAttribute("data-add-per-btn-flag", "false");

        // 提交新建联系人到后台
        this.ajaxPostCreateConPerJson(java_file_path, oValueAttr);

        // 调用当前对象的创建5个组下拉的ul中的li(ajax请求所有数据在内包含)
        var saveFiveGroupLiArr = [];
        this.fnCreateFiveGroupLiHtml(java_file_path, java_img_path, saveFiveGroupLiArr);

        console.log(saveFiveGroupLiArr);
        // 取得5个group下的5个ul,为了避免再次写值出现重复，所以先把所有的ul下的li清空
        var fiveGroupUl = $(".group-drop-down-ul");
        for(var x=0; x<fiveGroupUl.length; x++){
            if(fiveGroupUl[x].innerHTML !== ""){
                fiveGroupUl[x].innerHTML = "";
            }
        }

        for(var i=0; i<saveFiveGroupLiArr.length; i++){
            var curLiGroupType = saveFiveGroupLiArr[i].getAttribute("data-li-group-type");
            for(var j=0; j<fiveGroupUl.length; j++){
                var curUlDataGroupType = fiveGroupUl[j].getAttribute("data-ul-group-type");
                if(parseInt(curLiGroupType) === parseInt(curUlDataGroupType)){
                    fiveGroupUl[j].appendChild(saveFiveGroupLiArr[i]);
                    // 插入之后立马执行scrollReveal效果
                    sr.reveal(saveFiveGroupLiArr[i], {
                        origin:     "right",
                        distance:   "30px",
                        opacity:    0,
                        scale:      1,
                        delay:      200,
                        easing:     "ease-in-out",
                        reset:      false,
                        duration:   280
                    });
                }
            }
        }

        // 因为弹框出现时，分组又可以随便切换，所以最后新添加的人插入到5个ul分组的哪一个，
        // 是根据点击弹框确定时获取的oValueAttr.currentSelectGroupP等于哪一个ul的group-flag决定
        var curGroupUl = passTarget.parentNode.previousSibling;
        var groupBtn = $(".group-header-long-btn");         // 每个组的头部长条按钮
        var dropDownMod = $(".public-group-drop-down");     // 每个组的下拉
        var i =0,
            len = fiveGroupUl.length;
        for(; i < len; i++){
            if(parseInt(fiveGroupUl[i].getAttribute("data-ul-group-type")) === parseInt(oValueAttr.currentSelectGroupP)){

                // 把所有的长条组按钮的选中样式都移除，所有展开的下拉模块都隐藏
                for(var y=0; y<dropDownMod.length; y++){
                    // 所有的都折叠
                    basicAnimation(dropDownMod[y], {height: 0}, 10);

                    // 5个长条组按钮的选中样式移除，后面的箭头样也设置为默认
                    var groupArrowITag = groupBtn[y].getElementsByTagName("i")[0];
                    console.log(groupArrowITag.className);
                    if(parseInt(groupArrowITag.getAttribute("data-switch-flag")) === 1){
                        groupBtn[y].className = removeClass("blue-font2", groupBtn[y]);

                        groupArrowITag.className = removeClass("fa-angle-down", groupArrowITag);
                        groupArrowITag.className = addClass("fa-angle-right", groupArrowITag);
                        groupArrowITag.setAttribute("data-switch-flag", 0);
                    }
                }

                // 最后把当前的插入的下拉模块展开，长条组按钮添加样式
                groupBtn[i].className = addClass("blue-font2", groupBtn[i]);
                var iconTag = groupBtn[i].getElementsByTagName("i")[0];

                iconTag.className = removeClass("fa-angle-right", iconTag);
                iconTag.className = addClass("fa-angle-down", iconTag);
                iconTag.setAttribute("data-switch-flag", 1);

                basicAnimation(dropDownMod[i], {height: 346}, 12);

            }
        }

    },



    // 点击 "最近转账人/常用联系人" 在"收款信息"模块中新建行，添加收款人信息
    fnAddPaymentInfo:               function (saveSelLiArr, oValueAttr, java_img_path) {
        // 0.   首选判断bank-card-p是否存在
        // 1st. 如果bank-card-p下没有span存在，直接写值。
        // 2nd. 如果bank-card-p下已经有span存在,就获取当前p下的第三个span的卡号和当前要写入
        //         的收款人卡号相比较，如果有重复，就删除当前重复的P所在的行，然后再创建行加写入值
        var addPayeeWall = eleConfigMap.addPayeeWall;
        var bankCardP = getClassName("bank-card-p", addPayeeWall);

        var i = 0,
            len = saveSelLiArr.length; // payeeArr收款人数组，可能为单个li || 点击全选按钮写入的一批li
        var saveCreLine = null;
        var getCurCreateLine = null;
        // 如果页面中不存在bank-card-p就直接创建行
        if (bankCardP.length === 0) {
            for (; i < len; i++) {
                // 0.调用创建行的函数
                saveCreLine = mainModuleConfigMap.createLineMethod();
                // 取得上步创建的行(class="dynamic-create-line")
                getCurCreateLine = saveCreLine.childNodes[0];
                // 1.为点击/导入创建的行设置值和属性
                this.fnForClickCreLineSetVal(getCurCreateLine, oValueAttr, java_img_path);
                // 2.为行设置完值和自定义属性之后把当前创建的行插入到 addPayeeWall中
                addPayeeWall.appendChild(saveCreLine);
                // 3.给创建的行设置需要的公共属性
                mainModuleConfigMap.setPropertyForLine(addPayeeWall);
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
                for(; i < len; i++) {
                    // 动态创建行 + 写值
                    // 0.调用创建行的函数
                    saveCreLine = mainModuleConfigMap.createLineMethod();
                    // 取得上步创建的行(class="dynamic-create-line")
                    getCurCreateLine = saveCreLine.childNodes[0];
                    // 1.为点击/导入创建的行中的各个子元素设置值和属性
                    this.fnForClickCreLineSetVal(getCurCreateLine, oValueAttr, java_img_path);
                    // 2.为行设置完值和自定义属性之后把当前创建的行插入到 addPayeeWall中
                    addPayeeWall.appendChild(saveCreLine);
                    // 3.给创建的行设置需要的公共属性
                    mainModuleConfigMap.setPropertyForLine(addPayeeWall);
                }
                return null;
            }
            else{
                // 2nd-(2) 当前还有剩余行存在
                for(; i < len; i++) {
                    this.fnRemoveRepeatLine(bankCardP, oValueAttr);
                }

                // 动态创建行 + 写值
                // 0.调用创建行的函数
                saveCreLine = mainModuleConfigMap.createLineMethod();
                // 取得上步创建的行(class="dynamic-create-line")
                getCurCreateLine = saveCreLine.childNodes[0];
                // 1.为点击/导入创建的行中的各个子元素设置值和属性
                this.fnForClickCreLineSetVal(getCurCreateLine, oValueAttr, java_img_path);
                // 2.为行设置完值和自定义属性之后把当前创建的行插入到 addPayeeWall中
                addPayeeWall.appendChild(saveCreLine);
                // 3.给创建的行设置需要的公共属性
                mainModuleConfigMap.setPropertyForLine(addPayeeWall);
            }
            return null;
        }
    },

    // 删除重复行的函数
    fnRemoveRepeatLine:             function (bankCardP, oValueAttr) {

        // 判断已经存在的行里有没有和要"写入/导入"的数据有重复的，有就删除重复
        /*  提示: 删除重复分2种情况:
         a.右侧的"最近转账人/常用联系人"中的li点击"选中/移除选中"添加和删除行
         b."最近转账人/常用联系人"中的全选/取消全选 + "批量上传"检测到重复的收款人
         */
        var saveRepLineArr = [];     // 保存下面批量导入时，和导入数据发生重复的行

        // 增加for循环原因:例如点击"全选",上面的循环i<len遍历右侧的2个模块中的li，现在要再次遍历左侧的收款人信息下所有的行和当前li一一对比
        for (var y = 0; y < bankCardP.length; y++) {
            if (parseInt(bankCardP[y].getAttribute("data-flag")) === 1) {
                // 判断条件为: 当前bankCardP下第三个span的data-card-number是不是和oValueAttr.bankCardInputVal相等
                var curThirdSpan = getClassName("card-num", bankCardP[y])[0];
                if (parseInt(curThirdSpan.getAttribute("data-card-number")) === parseInt(oValueAttr.bankCardInputVal)) {
                    var tips = "提示：&nbsp;相同收款人只会保留一个。";
                    mainModuleConfigMap.scrollBarRoll();
                    basicAnimation(eleConfigMap.serErrorBox, {height: 40}, 6);
                    eleConfigMap.errorTipsFont.innerHTML = tips;
                    saveRepLineArr.push(bankCardP[y].parentNode.parentNode);
                }
            }
        }

        // 延时5s后把红色下拉弹框隐藏，并清除错误提示
        setTimeout(clearBox, 5000);
        function clearBox() {
            mainModuleConfigMap.hideServerErrorBox();
        }

        // 移除重复的行
        if (saveRepLineArr.length > 0) {
            for (var l = 0; l < saveRepLineArr.length; l++) {
                if (saveRepLineArr[l].parentNode) {
                    saveRepLineArr[l].parentNode.removeChild(saveRepLineArr[l]);
                }
            }
        }
    },



    // 为 "批量导入"/"最近转账人"/"常用联系人"点击写入创建的行设置值和属性
    fnForClickCreLineSetVal:        function(ele, oValueAttr, java_img_path){
        var payeeInput =getClassName("payee-input", ele);
        var bankCardP = getClassName("bank-card-p", ele);
        var transAmountInput =  getClassName("transfer-amount-input", ele);
        var remark = getClassName("remark", ele);

        // a.收款人姓名表单
        payeeInput[0].value = oValueAttr.cardNameValue;

        // b.bankCardP里面的值清空
        bankCardP[0].innerHTML = "";
        // b2.然后调用创建三个span的函数
        var createThreeSpan = mainModuleConfigMap.createBankCardInfSpan(oValueAttr, java_img_path);
        // b3.创建完3个span之后，把data-flag设置为1
        bankCardP[0].setAttribute("data-flag",1);
        // b4. 把b2创建的三个span推入到当前bankCardP中
        bankCardP[0].appendChild(createThreeSpan);
        // b5. 给当前bankCardP的父级的父级元素(即dynamicCreateLine)添加ScrollReveal效果
        var curCreDynamicLine =  bankCardP[0].parentNode.parentNode;
        sr.reveal(curCreDynamicLine, {
            origin:     "bottom",
            distance:   "30px",
            opacity:    0.8,
            scale:      1,
            delay:      0,
            easing:     "ease-in-out",
            reset:      false,
            duration:   150
        });

        // c.转账金额 + 备注表单写值
        transAmountInput[0].value = oValueAttr.transferMoney;
        remark[0].value = oValueAttr.remark;
    },

    // 点击 "最近转账人/常用联系人"中的li取消选中时，判断左侧"收款信息"模块中是不是有当前li相同的收款人存在，若果有就移除
    fnClickLiRemovePayee:           function(oValueAttr){
        var addPayeeWall =  eleConfigMap.addPayeeWall;
        var bankCardP =     getClassName("bank-card-p", addPayeeWall);
        var i = 0,
            len = bankCardP.length;
        if(bankCardP.length > 0) {
            var saveRepLineArr = [];     // 保存下面批量导入时，和导入数据发生重复的行
            // 第一个for遍历右侧的li
            for(; i<len; i++){
                // 第二个遍历左侧的所有行
                for(var y=0; y<bankCardP.length; y++){
                    if(parseInt(bankCardP[y].getAttribute("data-flag")) === 1){
                        // 判断条件为: 当前bankCardP下第三个span的data-card-number是不是和oValueAttr.bankCardInputVal相等
                        var curThirdSpan = getClassName("card-num", bankCardP[y])[0];
                        if (parseInt(curThirdSpan.getAttribute("data-card-number")) === parseInt(oValueAttr.bankCardInputVal)) {
                            saveRepLineArr.push(bankCardP[y].parentNode.parentNode);
                        }
                    }
                }
            }
            if (saveRepLineArr.length > 0) {
                for (var l = 0; l < saveRepLineArr.length; l++) {
                    if (saveRepLineArr[l].parentNode) {
                        saveRepLineArr[l].parentNode.removeChild(saveRepLineArr[l]);
                    }
                }
            }
        }

        // 剩余行设置需要的公共属性
        mainModuleConfigMap.setPropertyForLine(addPayeeWall);
    }

};





