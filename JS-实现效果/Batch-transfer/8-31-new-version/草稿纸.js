/*
tip = "提示：您还未填写转账人！" ;
// 如果错误信息没有在当前窗口，就回滚页面让错误弹框展示
mainModuleConfigMap.scrollBarRoll();
// console.log("输出此时的错误提示框的高度 " + eleConfigMap.serErrorBox.offsetHeight);
if(parseInt(eleConfigMap.serErrorBox.offsetHeight) === 0){
    basicAnimation(eleConfigMap.serErrorBox, {height: 40}, 2);
    eleConfigMap.errorTipsFont.innerHTML = tip;
}

// 延时5s后把红色下拉弹框隐藏，并清除错误提示
setTimeout(function(){
    mainModuleConfigMap.hideServerErrorBox();
}, 5000);

return null;



/!**
 * 滚动条上滚函数
 *!/
scrollBarRoll:                  function(){
    // 取得错误弹框在页面中的偏移量
    var serErrorBoxPosition = getPosition(eleConfigMap.serErrorBox).top;
    // 如果scrollTo执行之前有滚动，那就先把清除等于0
    window.scrollTo(0, 0);
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if(parseInt(scrollTop - 12) > parseInt(serErrorBoxPosition)){
        window.scrollTo(0, serErrorBoxPosition - 60);
    }
},*/
