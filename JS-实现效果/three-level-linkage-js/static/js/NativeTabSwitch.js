/** 原生选项卡切换(native tab switches) Created on 2017/2/13.**/
/**写这个省市二级切换最大的失误是: 全部判断都在操作class，没有使用自定义属性**/
function NativeTabSwitch(){
    this.initialize.apply(this, arguments);
}

NativeTabSwitch.prototype = {
    initialize: function(ChineseDistricts,dropdownWall){
        this.allData = ChineseDistricts; //取得所有的数据
        this.dropdownWall = dropdownWall; //取得整个下拉框
    },

    //选项卡切换(省市切换)
    changeTab: function(event){
        event = EventUtil.getEvent(event);
        var target = EventUtil.getTarget(event);
        var curIndex = getIndex(target); //取得当前元素的索引
        var curSiblings = siblings(target); //取得当前元素的同级元素(同级节点)

        //secBlockLis是取得下部分保存省份和城市的li
        var secBlockLis = getClassName("provinceAndCityLi", this.dropdownWall);

        var secBlockSiblings = siblings(secBlockLis[curIndex]); //取得(省或城市)处于选中之外的同级节点

        var curTargetClass = getClassNum(target); //取得当前点击元素的className
        for(var i=0; i<curTargetClass.length; i++){
            if(curTargetClass[i] == "selectedTabLi"){//首先判断当前元素已经处于selectedTabLi状态
                return; //选中状态可以直接不判断
            }else if(curTargetClass[i] == "defaultTabLi"){
                //如果当前元素处于未选中状态，点击时把defaultTabLi样式删除，添加selectedTabLi样式, 同级的li如果有selectedLi就移除selectedTabLi添加defaultTabLi,如果没有就不做改变;
                target.className = removeClassFun(target, "defaultTabLi");
                target.className = addClassFun(target, "selectedTabLi");
                switchClass(curSiblings, "selectedTabLi", "defaultTabLi");

                //第二是把第二部分(省和城市)当前从默认没选中到选中状态后:移除displayNone, 同级的节点移除displayBlock再添加displayNone样式
                secBlockLis[curIndex].className = removeClassFun(secBlockLis[curIndex], "displayNone");
                secBlockLis[curIndex].className = addClassFun(secBlockLis[curIndex], "displayBlock");
                switchClass(secBlockSiblings, "displayBlock","displayNone");
            }
        }
    },

    //点击表单(saveValueWall)下拉展示和隐藏
    dropdownShowHide: function(event) {
        event = EventUtil.getEvent(event);
        var outerWallClass = getClassNum(this.dropdownWall);
        for (var i = 0; i < outerWallClass.length; i++) {
            if (outerWallClass[i] == "displayNone") {
                this.dropdownWall.className = removeClassFun(this.dropdownWall, "displayNone");
                this.dropdownWall.className = addClassFun(this.dropdownWall, "displayBlock")
            }else if(outerWallClass[i] == "displayBlock") {
                this.dropdownWall.className = removeClassFun(this.dropdownWall, "displayBlock");
                this.dropdownWall.className = addClassFun(this.dropdownWall, "displayNone");
            }
        }
        EventUtil.stopPropagation(event);
    },

    //循环创建省份province
    createProvince: function(provinceWallLi){
        for(var i=0; i<this.allData.letters.length; i++){
            var createDiv = document.createElement("div");
            createDiv.className = "theLetter marBot8 overflowHid";
            var lettersP = document.createElement("p");
            lettersP.className = "fl wid18Per letters textCenter";
            lettersP.appendChild(document.createTextNode(this.allData.letters[i].alphaOrder));
            createDiv.appendChild(lettersP);
            var everyProvinceUl = document.createElement("ul");
            everyProvinceUl.className = "fl wid82Per AToZLetters textCenter overflowHid cursorPoint";
            for(var j=0; j<this.allData.province[i].lettersBlock.length; j++){ //这里找到每一块省份的方式比较绕
                var provinceLi = document.createElement("li");
                provinceLi.className = "fl marLeft8 padLeft2 padRight2 proCityDefStyle";
                provinceLi.setAttribute("provinceCode", this.allData.province[i].lettersBlock[j].code);
                provinceLi.appendChild(document.createTextNode(this.allData.province[i].lettersBlock[j].provinceName));
                everyProvinceUl.appendChild(provinceLi);
            }
            createDiv.appendChild(everyProvinceUl);
            provinceWallLi.appendChild(createDiv);
        }
    },

    //循环创建市区city
    createCity: function(saveCityUl){
        for(var i=0; i<this.allData.city.length; i++){
            var cityLi = document.createElement("li");
            cityLi.className = "fl marLeft8 padLeft2 padRight2 proCityDefStyle";
            cityLi.style.display = "none";
            cityLi.setAttribute("parentCode", this.allData.city[i].parentCode);
            cityLi.setAttribute("cityCode", this.allData.city[i].code);
            cityLi.appendChild(document.createTextNode(this.allData.city[i].cityName));
            saveCityUl.appendChild(cityLi);
        }
    },

    //点击不同的省份显示不同的市(click on different provinces to show different cities)
    //并把当前的省份值传入到上面的表单中
    clickProShowCity : function(saveProCityWall, proCityTitWall, provinceWall, cityWall, saveCityUl){
        var allProLis = provinceWall.getElementsByTagName("li");
        var allCityLis = saveCityUl.getElementsByTagName("li");
        //遍历所有省份: 1.给当前点击元素添加选中事件。
        // 2.把点击的省份写入到class为saveProValSpan的元素中(存省份的元素是下面方法中动态创建的)
        // 3.加载当前省份对应的城市。
        // 4.把省份值写入之后，根据写入值的class为判断条件，自动切换到显示城市的选项卡
        for(var i=0; i<allProLis.length; i++){
            EventUtil.addHandler(allProLis[i], "click", function(event){
                event = EventUtil.getEvent(event);
                var target = EventUtil.getTarget(event);
                var curEleParPar = target.parentNode.parentNode; //取得当前li的父级ul的父级div

                //1.清除所有省份的选中样式,添加默认样式
                switchClass(allProLis, "proCitySelStyle", "proCityDefStyle");
                //给当前点击的省份li添加选中样式(因为上面把所有的选中样式都清除了所以现在只需要加上选中样式就可以了)
                target.className = removeClassFun(target, "proCityDefStyle");
                target.className = addClassFun(target, "proCitySelStyle");

                //2.把点击的省份写入到表单的class为saveProValWall的元素中(存省份的元素是方法中动态创建的)
                saveProResultFun();
                function saveProResultFun(){
                    var saveValSpan = saveProCityWall.getElementsByTagName("span");
                    while(saveValSpan.length > 0){
                        saveProCityWall.removeChild(saveProCityWall.firstChild);
                    }
                    var saveProValSpan = document.createElement("span");
                    saveProValSpan.className = "fl marRight4 textCenter saveProValSpan";
                    saveProValSpan.setAttribute("provinceCode", target.getAttribute("provinceCode"));
                    var theProText = document.createTextNode(target.innerHTML);//写入当前点击的省份
                    saveProValSpan.appendChild(theProText);
                    saveProCityWall.appendChild(saveProValSpan);
                }

                //3.点击省份加载对应的城市
                var everyBlockProLi = curEleParPar.getElementsByTagName("li"); //取得每一板块中的省份
                for(var i=0; i<everyBlockProLi.length; i++){
                    for(var y=0; y<allCityLis.length; y++){
                        allCityLis[y].style.display = "none"; //这一句不要漏掉 在执行之前先把所有的li都隐藏，接着加载需要显示的部分
                        if(target.getAttribute("provinceCode") == allCityLis[y].getAttribute("parentCode")){
                            allCityLis[y].style.display = "block";
                        }
                    }
                }

                //4.点击省份之后自动切换到城市选项卡
                autoChange();
                function autoChange(){
                    var saveValSpans = saveProCityWall.getElementsByTagName("span");
                    var proCityTitLis = proCityTitWall.getElementsByTagName("li");
                    if(saveValSpans.length >0){
                        for(var i=0; i<saveValSpans.length; i++){
                            var curValSpanClass = getClassNum(saveValSpans[i]);
                            for(var j=0; j<curValSpanClass.length; j++){
                                if(curValSpanClass[j] == "saveProValSpan"){
                                    proCityTitLis[0].className = removeClassFun(proCityTitLis[0], "selectedTabLi");
                                    proCityTitLis[0].className = addClassFun(proCityTitLis[0], "defaultTabLi");

                                    proCityTitLis[1].className = removeClassFun(proCityTitLis[1], "defaultTabLi");
                                    proCityTitLis[1].className = addClassFun(proCityTitLis[1], "selectedTabLi");

                                    provinceWall.className = removeClassFun(provinceWall, "displayBlock");
                                    provinceWall.className = addClassFun(provinceWall, "displayNone");

                                    cityWall.className = removeClassFun(cityWall, "displayNone");
                                    cityWall.className = addClassFun(cityWall, "displayBlock");
                                }
                            }
                        }
                    }
                }

            })
        }

        //1.给城市添加选中样式。//2.保存当前点击的城市值: 如果上面的表单元素内存在class为saveProValSpan元素存在，
        // 就动态创建省份后面的斜杠元素和保存城市的class为saveCityValSpan的span元素
        for(var j=0; j<allCityLis.length; j++){
            EventUtil.addHandler(allCityLis[j], "click",function(event){
                event = EventUtil.getEvent(event);
                var target = EventUtil.getTarget(event);
                //1.给城市添加选中样式。
                switchClass(allCityLis, "proCitySelStyle", "proCityDefStyle");//首先清除所有城市的选中样式,添加默认样式
                target.className = removeClassFun(target, "proCityDefStyle"); //然后给当前点击的城市li添加选中样式
                target.className = addClassFun(target, "proCitySelStyle");

                //2.保存当前点击的城市值
                saveCityResultFun();
                function saveCityResultFun(){
                    var getSaveSpans = saveProCityWall.getElementsByTagName("span");
                    //for循环写了半天，一个while搞定，只要子元素大于1就删除后面的就搞定了啊，醉了
                    while(getSaveSpans.length > 1){
                        saveProCityWall.removeChild(saveProCityWall.lastChild);
                    }
                    //首先创建保存斜杠(/)的元素，追加到省份后面
                    var slashSpan = document.createElement("span"); //slash /slæʃ/ (计算机)斜杠
                    slashSpan.className = "fl lightGreyFont marRight4 theSlash";
                    slashSpan.appendChild(document.createTextNode("/"));
                    saveProCityWall.appendChild(slashSpan);
                    //然后创建保存城市的元素，追加到斜杠元素的后面
                    var saveCityValSpan = document.createElement("span");
                    saveCityValSpan.className = "fl marRight4 textCenter saveCityValSpan";
                    saveCityValSpan.setAttribute("cityCode", target.getAttribute("cityCode"));
                    saveCityValSpan.appendChild(document.createTextNode(target.innerHTML)); //写入当前点击的城市
                    saveProCityWall.appendChild(saveCityValSpan);
                }

                //写完城市的值之后，把下拉隐藏
                var dropdownWall = proCityTitWall.parentNode;
                dropdownWall.className = removeClassFun(dropdownWall, "displayBlock");
                dropdownWall.className = addClassFun(dropdownWall, "displayNone");
            });

        }
    },

    //鼠标移动到省市的效果
    mouseEnterFun: function(event){
        event = event || window.event;
        var target = EventUtil.getTarget(event);
        target.className = addClassFun(target, "proCityMouEntSty");
    },

    //鼠标从省份和城市上滑走的效果
    mouseOutFun: function(event){
        event = event || window.event;
        var target = EventUtil.getTarget(event);
        target.className = removeClassFun(target, "proCityMouEntSty");
    }

};

