/**
 * 省市2级联动(精简)
 *  province and city two level linkage
 *  2017/9/9.
 */

var twoLevelLinkageConfigMap = {

    // (省市)创建骨架 create shell html
    createProvCityShellHtml: function(){
        var fragment = document.createDocumentFragment();
        var wrappedDiv = document.createElement("div");
        wrappedDiv.className = "over-hid two-level-linkage-wrapped";
        wrappedDiv.innerHTML +=
            '<div class="fl">'+
                '<div class="save-prov-city-wall outSaveValWall">'+
                    '<p class="save-prov-city-p saveProCityWall">点击选择</p>'+
                    '<p><i class="triangle-down"></i></p>'+
                '</div>'+
                '<p class="popups-error-span prov-city-error-span"></p>'+
            '</div>'+
            '<div class="prov-city-drop-down-module dis-none" data-flag="0">'+
                '<ul class="prov-city-title-wall">'+
                    '<li class="province-title prov-city-selected" data-index="0">省份</li>'+
                    '<li class="prov-city-default city-title" data-index="1">城市</li>'+
                '</ul>'+
                '<ul class="prov-city-wall">'+
                    '<li class="province-li-wall" data-index="0">'+
                    '</li>'+
                    '<li class="city-li-wall dis-none" data-index="1">'+
                        '<ul class="current-show-city-ul over-hid"></ul>'+
                    '</li>'+
                '</ul>'+
            '</div>';
        fragment.appendChild(wrappedDiv);
        return fragment;
    },

    // ajax调用省市数据
    ajaxGetProvCityJson: function(java_file_path){
        var oProvCityJson;
        /*$.ajax({
            type: "post",
            dataType: "json",
            async: false,
            url:  java_file_path +"/commonService/getProvinceCityJsonForNativeTab",
            success: function (data) {
                if (data.ok == true) {
                    oProvCityJson = data.data;
                }
            }
        });*/
        oProvCityJson = provinceCityJson.data;
        return oProvCityJson;
    },

    // 创建 "A-Z + 省份"
    createProvince: function(oProvCityJson){
        if(typeof(oProvCityJson) == "string"){
            oProvCityJson = JSON.parse(oProvCityJson);
        }
        var fragment = document.createDocumentFragment();
        for(var i=0; i<oProvCityJson.letters.length; i++){
            var everyPlate = document.createElement("div");
            everyPlate.className ="over-hid mar-top-5";
            var leftLetters = document.createElement("p");
            leftLetters.className = "left-letters";
            leftLetters.appendChild(document.createTextNode(oProvCityJson.letters[i].alphaOrder));
            everyPlate.appendChild(leftLetters);

            var everyPlateProvUl = document.createElement("ul");
            everyPlateProvUl.className = "every-plate-province";
            for(var j=0; j<oProvCityJson.province[i].lettersBlock.length; j++){
                var provLi = document.createElement("li");
                provLi.className = "prov-or-city-default";
                provLi.setAttribute("data-province-code", oProvCityJson.province[i].lettersBlock[j].code);
                provLi.appendChild(document.createTextNode(oProvCityJson.province[i].lettersBlock[j].provinceName));
                everyPlateProvUl.appendChild(provLi);
            }
            everyPlate.appendChild(everyPlateProvUl);

            fragment.appendChild(everyPlate);
        }
        return fragment;
    },

    // 创建 "城市"
    createCity: function(oProvCityJson){
        if(typeof(oProvCityJson) == "string"){
            oProvCityJson = JSON.parse(oProvCityJson);
        }
        var fragment = document.createDocumentFragment();
        for(var i=0; i<oProvCityJson.city.length; i++){
            var cityLi = document.createElement("li");
            cityLi.className = "prov-or-city-default dis-none";
            cityLi.setAttribute("data-parent-code", oProvCityJson.city[i].parentCode);
            cityLi.setAttribute("data-city-code", oProvCityJson.city[i].code);
            cityLi.appendChild(document.createTextNode(oProvCityJson.city[i].cityName));
            fragment.appendChild(cityLi);
        }
        return fragment;
    },

    // 选项卡切换 tab toggle
    tabToggle: function(current, provCityWall){
       var curIndex = getIndex(current);
       // 把当前对象转换为jq 只需要加$()
      $(current).removeClass("prov-city-default").addClass("prov-city-selected").siblings().
        removeClass("prov-city-selected").addClass("prov-city-default");
      provCityWall.children("li").eq(curIndex).removeClass("dis-none").siblings().addClass("dis-none");
    }
};

