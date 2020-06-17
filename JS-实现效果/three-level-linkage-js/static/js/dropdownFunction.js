/**封装下拉函数**/
function Dropdown(){
    this.initialize.apply(this, arguments);
}

Dropdown.prototype = {
    initialize: function(dropdownData, dropdownUl){
        //dropdownData 为传进来的下拉数据，直接从dropdownJson.js中读取
        this.dropdownData = dropdownData;
        this.dropdownUl = dropdownUl;
    },
    //循环创建数据
    createEle: function(){
        for(var i=0; i<this.dropdownData.length; i++){
            var createLi = document.createElement("li");
            createLi.className = "lineHei30 textInd10 height30 cursorPoint";
            createLi.appendChild(document.createTextNode(this.dropdownData[i].Name)); //dropdownData.Bank[i].name
            this.dropdownUl.appendChild(createLi);
        }
    },
    //dropdownUl下拉创建完毕之后默认把第一个li的值写入到上面得span中
    defaultWriteVal: function(dropdownSpan){
        var dropdownLi = this.dropdownUl.getElementsByTagName("li");
        dropdownSpan.innerHTML = dropdownLi[0].innerHTML;
        dropdownLi[0].className += addClassFun(dropdownLi[0],"lightBlueBg4");
        dropdownLi[0].className = addClassFun(dropdownLi[0], "blueFont");
    },
    //在body上点击下拉隐藏
    bodyClickHideDropdown: function(){
        var ulClassArray = getClassNum(this.dropdownUl);
        for (var i = 0; i < ulClassArray.length; i++) {
            if (ulClassArray[i] == "displayNone") {
              return null;
            }else if(ulClassArray[i] == "displayBlock") {
                this.dropdownUl.className = removeClassFun(this.dropdownUl, "displayBlock");
                this.dropdownUl.className = addClassFun(this.dropdownUl, "displayNone");
            }
        }
    },



    //点击dropdownP 下拉的dropdownUl显示和隐藏
    dropdownShowHide: function(event) {
        event = EventUtil.getEvent(event);
        var ulClassArray = getClassNum(this.dropdownUl);
        for (var i = 0; i < ulClassArray.length; i++) {
            if (ulClassArray[i] == "displayNone") {
                this.dropdownUl.className = removeClassFun(this.dropdownUl, "displayNone");
                this.dropdownUl.className = addClassFun(this.dropdownUl, "displayBlock")
            }else if(ulClassArray[i] == "displayBlock") {
                this.dropdownUl.className = removeClassFun(this.dropdownUl, "displayBlock");
                this.dropdownUl.className = addClassFun(this.dropdownUl, "displayNone");
            }
        }
        EventUtil.stopPropagation(event);
    },
    //点击dropdownUl中的li把值写进span中然后隐藏下拉
    saveDropdownLi: function(event, dropdownSpan){
        event = EventUtil.getEvent(event);
        var dropdownLi = this.dropdownUl.getElementsByTagName("li");
        for(var i=0; i<dropdownLi.length; i++){
            var dropdownLiClass = getClassNum(dropdownLi[i]);
            for(var j=0; j<dropdownLiClass.length; j++){
                if(dropdownLiClass[j] == "lightBlueBg4"){
                    dropdownLi[i].className = removeClassFun(dropdownLi[i], "lightBlueBg4");
                    dropdownLi[i].className = removeClassFun(dropdownLi[i], "blueFont");
                }
            }
        }
        event = EventUtil.getEvent(event);
        var target = EventUtil.getTarget(event);
        target.className = addClassFun(target, "lightBlueBg4");
        target.className = addClassFun(target, "blueFont");
        this.dropdownUl.className = removeClassFun(this.dropdownUl, "displayBlock");
        this.dropdownUl.className = addClassFun(this.dropdownUl, "displayNone");
        dropdownSpan.innerHTML = target.innerHTML;
        EventUtil.stopPropagation(event);
    }
};