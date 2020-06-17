/** 表单输入验证 form input validation [/ˌvæli'deiʃən/]  **/

/**本来第一想法是直接用对象写的，但是后来看图片拖拽的效果才真正明白这种写法是面向对象的"组合使用构造函数模式和原型模式",
 * 还有this.initialize.apply(this，argument)是用了类似prototype.js的面相对象写法。 **/

/**
 * 用得到的正则表达式:
 *  1. 判断手机号的: /^0?1[3|4|5|8][0-9]\d{8}$/
 *  2.判断验证码: /^[0-9]{6}$/
 *  3.判断身份证: /(^\d{15}$)|(^\d{17}([0-9]|X)$)/
 *  4. 银行卡正则: /^(\d{16}|\d{19})$/
 *  5.验证Email地址： /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
 **/



/**取得当前元素的className的数量**/
function getClassNum(ele){
    //split()基于指定的分隔符将一个字符串分割成多个子字符串，并将结果放在一个数组中。
    return ele.className.split(/\s+/);
}
/**取得当前元素的className的数量**/

//构造函数 Validation : 构造函数的第一个字母一定要大写 而且 调用时一定要用 new
//原型对象
//实例


/**面相对象写法 公用**/
var Validation = function(){
    this.initialize.apply(this, arguments);
};
Validation.prototype = {
    initialize: function(errorSpanArray,saveInputsArray){
        this.allErrorSpan = errorSpanArray;         //errorSpanArray数组: 保存了当前页面中所有className为errorSpan的span元素
        this.allInputs = saveInputsArray;           //saveInputsArray数组：保存了当前页面中推进来的所有class="theInput"的input表单

        this.psdCantEmpty = "密码不能为空";                   //password can not be empty
        this.enterCorrectPsd = "请输入正确的密码";              //please enter the correct password

        this.psdNotConsistent = "两次密码不一致";              //passwords are not consistent [/kən'sɪst(ə)nt/]

        this.userNameCantEmpty = "用户名不能为空";             //user name can not be empty

        this.verCodeCantEmpty = "验证码不能为空";              //phone verification code cant be empty
        this.verCodeNotCorrect = "请输入正确的验证码";          //phone verification code is not correct

        this.bankCardNumCantEmpty = "银行卡号不能为空";        //bank card number cannot be empty
        this.bankCardNumNoCorrect = "请输入正确的银行卡号";     //please input correct bank card number

        this.reservedPhoCantEmpty = "预留手机号不能为空";       //reserved phone number can not be empty
        this.reservedPhoNoCorrect = "预留手机号不一致";        //Reserved phone number is inconsistent

        this.idNumCantEmpty = "身份证号不能为空";               //identity number can not be empty
        this.idNumNoCorrect = "请输入正确的身份证号";            //please input correct identity number

        this.phoNumCantEmpty = "手机号不能为空";                //phone number can not be empty
        this.phoNumNoCorrect = "请输入正确的手机号";             //please input correct phone number

        this.emailCantEmpty = "邮箱不能为空";                  // email number can not be empty
        this.emailNoCorrect = "请输入正确的邮箱";               // please input correct email

        this.bankBranchEmpty = "开户支行不能为空";              //Bank account can not be empty

        this.amountOfChargeEmpty = "充值金额不能为空";          //Recharge amount can not be empty
        this.amountOfChargecorrect = "充值金额不能大于2000";    //Recharge amount can not be more than 2000

        this.paymentPasswordEmpty = "支付密码不能为空";         //payment password can not be empty

        this.storeNameEmpty = "店铺名称不能为空";               //Store name cannot be empty

        this.sellerNumberEmpty = "卖家编号不能为空";            //Seller number can not be empty

        this.accessKeyCodingEmpty = "访问键编码不能为空";       //Access key cannot be empty

        this.secretKeyEmpty = "密钥不能为空";                  //Key cannot be empty

        this.enterpriseNameEmpty = "企业名称不能为空";         //Enterprise name can not be empty

        this.SWIFTCodeEmpty = "银行国际代码不能为空";           //Bank international code cannot be empty

        this.receiverAddressEmpty = "收款人地址不能为空";       //Recipient address can not be empty
        this.receiverAddressCorrect= "请输入正确的收款人地址";   //Please enter the correct recipient address

        this.urlInputEmpty = "网址不能为空";                  //URL can not be empty
        this.urlInputCorrect = "请输入正确的网址";             //Please enter the correct URL.

        this.loginPasswordEmpty = "登陆密码不能为空";          //Login password can not be empty

    },
    //inputClick的作用就是点击当前input清空当前input的值
    inputClick: function(event){
        event = EventUtil.getEvent(event);
        var target = EventUtil.getTarget(event);
        for(var i=0; i<this.allErrorSpan.length; i++){
            var objClassName = getClassNum(this.allErrorSpan[i]);
            //this.allErrorSpan[i].innerHTML = "";
            if(getClassNum(target).join(/\s+/) == getClassNum(this.allInputs[i]).join(/\s+/)){
                for(var j=0; j<objClassName.length; j++){
                    //"密码表单"errorSpan值清空
                    if(objClassName[j] == "psdErrorSpan"){
                        this.allErrorSpan[i].innerHTML = "";
                    }
                    //"确认密码"errorSpan值清空
                    else if(objClassName[j] == "confirmPsdErrorSpan"){
                        this.allErrorSpan[i].innerHTML = "";
                    }
                    //"用户名"errorSpan值清空
                    else if(objClassName[j] == "userNameErrorSpan"){
                        this.allErrorSpan[i].innerHTML = "";
                    }
                    //"验证码"errorSpan值清空
                    else if(objClassName[j] == "verErrorSpan"){
                        this.allErrorSpan[i].innerHTML = "";
                    }
                    //"银行卡号"errorSpan值清空
                    else if(objClassName[j] == "banKCardErrorSpan"){
                        this.allErrorSpan[i].innerHTML = "";
                    }
                    //"预留手机号"errorSpan值清空
                    else if(objClassName[j] == "reservedPhoErrorSpan"){
                        this.allErrorSpan[i].innerHTML = "";

                    }
                    //"身份证号"errorSpan值清空
                    else if(objClassName[j] == "identityNumErrorSpan"){
                        this.allErrorSpan[i].innerHTML = "";
                    }
                    //"手机号"errorSpan值清空
                    else if(objClassName[j] == "phoNumErrorSpan"){
                        this.allErrorSpan[i].innerHTML = "";
                    }
                    //"邮箱"errorSpan值清空
                    else if(objClassName[j] == "emailErrorSpan"){
                        this.allErrorSpan[i].innerHTML = "";
                    }
                    //"开户支行"errorSpan值清空
                    else if(objClassName[j]=="bankBranchErrorSpan"){
                        this.allErrorSpan[i].innerHTML = "";
                    }
                    //"充值金额"errorSpan值清空
                    else if(objClassName[j]=="amountOfChargeErrorSpan"){
                        this.allErrorSpan[i].innerHTML = "";
                    }
                    //"支付密码"errorSpan值清空
                    else if(objClassName[j]=="paymentPasswordInputErrorSpan"){
                        this.allErrorSpan[i].innerHTML = "";
                    }
                    //"店铺名称"errorSpan值清空
                    else if(objClassName[j]=="storeNameInputErrorSpan"){
                        this.allErrorSpan[i].innerHTML = "";
                    }
                    //"卖家编号"errorSpan值清空
                    else if(objClassName[j]=="sellerNumberInputErrorSpan"){
                        this.allErrorSpan[i].innerHTML = "";
                    }
                    //"访问键编码"errorSpan值清空
                    else if(objClassName[j]=="accessKeyCodingInputErrorSpan"){
                        this.allErrorSpan[i].innerHTML = "";
                    }
                    //"密钥"errorSpan值清空
                    else if(objClassName[j]=="secretKeyInputErrorSpan"){
                        this.allErrorSpan[i].innerHTML = "";
                    }
                    //"企业名称"errorSpan值清空
                    else if(objClassName[j]=="enterpriseNameInputErrorSpan"){
                        this.allErrorSpan[i].innerHTML = "";
                    }
                    //"银行国际代码"errorSpan值清空
                    else if(objClassName[j]=="SWIFTCodeErrorSpan"){
                        this.allErrorSpan[i].innerHTML = "";
                    }
                    //"收款人地址"errorSpan值清空
                    else if(objClassName[j]=="receiverAddressInputErrorSpan"){
                        this.allErrorSpan[i].innerHTML = "";
                    }
                    //"网址"errorSpan值清空
                    else if(objClassName[j]=="urlInputErrorSpan"){
                        this.allErrorSpan[i].innerHTML = "";
                    }
                    //"网址"errorSpan值清空
                    else if(objClassName[j]=="loginPasswordErrorSpan"){
                        this.allErrorSpan[i].innerHTML = "";
                    }
                }

            }
        }
        //阻止事件冒泡的原理是，让点击事件只发生在当前元素上，这样在页面上添加的其他事件都能不受当前事件的影响
        EventUtil.stopPropagation(event);
    },


    //表单失去焦点事件
    inputBlur: function(event){
        //第一个for循环遍历所有的allInputs
        event = EventUtil.getEvent(event);
        var target = EventUtil.getTarget(event);
        for(var i=0; i<this.allInputs.length; i++){
            //取得当前input的class的数量然后利用split()方法推到数组中把数组赋值给curObjClassName;
            var curObjClassName = getClassNum(this.allInputs[i]);
            //这一步很重要，判断出当前点击的是哪个元素
            if(getClassNum(target).join(/\s+/) == getClassNum(this.allInputs[i]).join(/\s+/)){
                for(var j=0; j<curObjClassName.length; j++){
                    //判断保存了当前元素class名的数组(curObjClassName)是不是有某个特定的class名，如果有需要的特定class名做进一步的判断
                    //验证"密码表单"
                    if(curObjClassName[j] == "newPasswordInput"){
                        //判断当前input输入的不同情况，然后做出不同的错误提示reservedPhoErrorSpan
                        if(this.allInputs[i].value !="" && /^\w{8,16}$/.test(this.allInputs[i].value)){
                            return null;
                        }else if(this.allInputs[i].value == ""){
                            this.allErrorSpan[i].innerHTML = this.psdCantEmpty;
                        }else if(this.allInputs[i].value != /^\w{8,16}$/.test(this.allInputs[i].value)){
                            this.allErrorSpan[i].innerHTML = this.enterCorrectPsd;
                        }
                        EventUtil.stopPropagation(event);
                    }
                    //验证"用户名"表单
                    else if(curObjClassName[j] == "userNameInput"){
                        if(this.allInputs[i].value !=""){
                            return null;
                        }else if(this.allInputs[i].value == ""){
                            this.allErrorSpan[i].innerHTML = this.userNameCantEmpty;
                        }
                        EventUtil.stopPropagation(event);
                    }
                    //验证"手机验证码"表单
                    else if(curObjClassName[j] == "verInput"){
                        if(this.allInputs[i].value !="" &&  /^[0-9]{6}$/.test(this.allInputs[i].value)){
                            return null;
                        }else if(this.allInputs[i].value == ""){
                            this.allErrorSpan[i].innerHTML = this.verCodeCantEmpty;
                        }else if(this.allInputs[i].value !=  /^[0-9]{6}$/.test(this.allInputs[i].value)){
                            this.allErrorSpan[i].innerHTML = this.verCodeNotCorrect;
                        }
                        EventUtil.stopPropagation(event);
                    }
                    //验证"手机验证码"表单
                    else if(curObjClassName[j] == "verInput1"){
                        if(this.allInputs[i].value !="" &&  /^[0-9]{6}$/.test(this.allInputs[i].value)){
                            return null;
                        }else if(this.allInputs[i].value == ""){
                            this.allErrorSpan[i].innerHTML = this.verCodeCantEmpty;
                        }else if(this.allInputs[i].value !=  /^[0-9]{6}$/.test(this.allInputs[i].value)){
                            this.allErrorSpan[i].innerHTML = this.verCodeNotCorrect;
                        }
                        EventUtil.stopPropagation(event);
                    }
                    //验证"银行卡号"表单
                    else if(curObjClassName[j] == "bankCardInput"){
                        if(this.allInputs[i].value !="" && /^(\d{16}|\d{19})$/.test(this.allInputs[i].value)){
                            return null;
                        }else if(this.allInputs[i].value == ""){
                            this.allErrorSpan[i].innerHTML = this.bankCardNumCantEmpty;
                        }else if(this.allInputs[i].value != /^(\d{16}|\d{19})$/.test(this.allInputs[i].value)){
                            this.allErrorSpan[i].innerHTML = this.bankCardNumNoCorrect;
                        }
                        EventUtil.stopPropagation(event);
                    }
                    //验证"预留手机号"表单
                    else if(curObjClassName[j] == "reservedPhoneInput"){
                        if(this.allInputs[i].value !="" &&  /^0?1[3|4|5|8][0-9]\d{8}$/.test(this.allInputs[i].value)){
                            return null;
                        }else if(this.allInputs[i].value == ""){
                            this.allErrorSpan[i].innerHTML = this.reservedPhoCantEmpty;
                        }else if(this.allInputs[i].value != /^0?1[3|4|5|8][0-9]\d{8}$/.test(this.allInputs[i].value)){
                            this.allErrorSpan[i].innerHTML = this.reservedPhoNoCorrect;
                        }
                        EventUtil.stopPropagation(event);
                    }
                    //验证"身份证号"表单
                    else if(curObjClassName[j] == "identityNumInput"){
                        if(this.allInputs[i].value !="" && /(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(this.allInputs[i].value)){
                            return null;
                        }else if(this.allInputs[i].value == ""){
                            this.allErrorSpan[i].innerHTML = this.idNumCantEmpty;
                        }else if(this.allInputs[i].value != /(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(this.allInputs[i].value)){
                            this.allErrorSpan[i].innerHTML = this.idNumNoCorrect;
                        }
                        EventUtil.stopPropagation(event);
                    }
                    //验证"手机号"表单
                    else if(curObjClassName[j] == "phoNumInput"){
                        if(this.allInputs[i].value !="" && /^0?1[3|4|5|8][0-9]\d{8}$/.test(this.allInputs[i].value)){
                            return null;
                        }else if(this.allInputs[i].value == ""){
                            this.allErrorSpan[i].innerHTML = this.phoNumCantEmpty;
                        }else if(this.allInputs[i].value != /^0?1[3|4|5|8][0-9]\d{8}$/.test(this.allInputs[i].value)){
                            this.allErrorSpan[i].innerHTML = this.phoNumNoCorrect;
                        }
                        EventUtil.stopPropagation(event);
                    }
                    //验证"邮箱"表单
                    else if(curObjClassName[j] == "emailInput"){
                        if(this.allInputs[i].value !="" && /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(this.allInputs[i].value)){
                            return null;
                        }else if(this.allInputs[i].value == ""){
                            this.allErrorSpan[i].innerHTML = this.emailCantEmpty;
                        }else if(this.allInputs[i].value != /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(this.allInputs[i].value)){
                            this.allErrorSpan[i].innerHTML = this.emailNoCorrect;
                        }
                        EventUtil.stopPropagation(event);
                    }
                    //验证"开户支行"表单
                    else if(curObjClassName[j] == "bankBranchInput"){
                        if(this.allInputs[i].value !=""){
                            return null;
                        }else if(this.allInputs[i].value == ""){
                            this.allErrorSpan[i].innerHTML = this.bankBranchEmpty;
                        }
                        EventUtil.stopPropagation(event);
                    }
                    //验证"充值金额"表单
                    else if(curObjClassName[j] == "amountOfChargeInput"){
                        if(this.allInputs[i].value != "" && /[^0-9]+/.test(this.allInputs[i].value) && this.allInputs[i].value <= 2000){
                            return null;
                        }else if(this.allInputs[i].value != "" && this.allInputs[i].value > 2000){
                            this.allErrorSpan[i].innerHTML = this.amountOfChargecorrect;
                        }else if(this.allInputs[i].value == ""){
                            this.allErrorSpan[i].innerHTML = this.amountOfChargeEmpty;
                        }
                        EventUtil.stopPropagation(event);
                    }
                    //验证"支付密码"表单
                    else if(curObjClassName[j] == "paymentPasswordInput"){
                        if(this.allInputs[i].value >= 6 && this.allInputs[i].value != ""){
                            return null;
                        }else if(this.allInputs[i].value == "" || this.allInputs[i].value < 6){
                            this.allErrorSpan[i].innerHTML  = this.paymentPasswordEmpty;
                        }
                        EventUtil.stopPropagation(event);
                    }
                    //验证"店铺名称"表单
                    else if(curObjClassName[j] == "storeNameInput"){
                        if(this.allInputs[i].value != ""){
                            return null;
                        }else if(this.allInputs[i].value == ""){
                            this.allErrorSpan[i].innerHTML = this.storeNameEmpty;
                        }
                        EventUtil.stopPropagation(event);
                    }
                    //验证"卖家编号"表单
                    else if(curObjClassName[j] == "sellerNumberInput"){
                        if(this.allInputs[i].value != ""){
                            return null;
                        }else if(this.allInputs[i].value == ""){
                            this.allErrorSpan[i].innerHTML = this.sellerNumberEmpty;
                        }
                        EventUtil.stopPropagation(event);
                    }
                    //验证"访问键编码"表单
                    else if(curObjClassName[j] == "accessKeyCodingInput"){
                        if(this.allInputs[i].value != ""){
                            return null;
                        }else if(this.allInputs[i].value == ""){
                            this.allErrorSpan[i].innerHTML = this.accessKeyCodingEmpty;
                        }
                        EventUtil.stopPropagation(event);
                    }
                    //验证"密钥"表单
                    else if(curObjClassName[j] == "secretKeyInput"){
                        if(this.allInputs[i].value != ""){
                            return null;
                        }else if(this.allInputs[i].value == ""){
                            this.allErrorSpan[i].innerHTML = this.secretKeyEmpty;
                        }
                        EventUtil.stopPropagation(event);
                    }
                    //验证"企业名称"表单
                    else if(curObjClassName[j] == "enterpriseNameInput"){
                        if(this.allInputs[i].value != ""){
                            return null;
                        }else if(this.allInputs[i].value == ""){
                            this.allErrorSpan[i].innerHTML = this.enterpriseNameEmpty;
                        }
                        EventUtil.stopPropagation(event);
                    }
                    //验证"银行国际代码"表单
                    else if(curObjClassName[j] == "SWIFTCodeInput"){
                        if(this.allInputs[i].value != ""){
                            return null;
                        }else if(this.allInputs[i].value == ""){
                            this.allErrorSpan[i].innerHTML = this.SWIFTCodeEmpty;
                        }
                        EventUtil.stopPropagation(event);
                    }
                    //验证"收款人地址"表单
                    else if(curObjClassName[j] == "receiverAddressInput"){
                        if(this.allInputs[i].value != "" && /^[\w][\s\w]*(?!\s)$/.test(this.allInputs[i].value)){
                            return null;
                        }else if(this.allInputs[i].value == ""){
                            this.allErrorSpan[i].innerHTML = this.receiverAddressEmpty;
                        }else if( this.allInputs[i].value != /^[\w][\s\w]*(?!\s)$/ ){
                            this.allErrorSpan[i].innerHTML = this.receiverAddressCorrect;
                        }
                        EventUtil.stopPropagation(event);
                    }
                    //验证"网址"表单
                    else if(curObjClassName[j] == "urlInput"){
                        if(this.allInputs[i].value != "" && /^((http|https|ftp):\/\/)?(\w(\:\w)?@)?([0-9a-z_-]+\.)*?([a-z0-9-]+\.[a-z]{2,6}(\.[a-z]{2})?(\:[0-9]{2,6})?)((\/[^?#<>\/\\*":]*)+(\?[^#]*)?(#.*)?)?$/i.test(this.allInputs[i].value)){
                            return null;
                        }else if(this.allInputs[i].value == ""){
                            this.allErrorSpan[i].innerHTML = this.urlInputEmpty;
                        }else if(this.allInputs[i].value !=this.allInputs[i].value!=/^((http|https|ftp):\/\/)?(\w(\:\w)?@)?([0-9a-z_-]+\.)*?([a-z0-9-]+\.[a-z]{2,6}(\.[a-z]{2})?(\:[0-9]{2,6})?)((\/[^?#<>\/\\*":]*)+(\?[^#]*)?(#.*)?)?$/i ){
                            this.allErrorSpan[i].innerHTML = this.urlInputCorrect;
                        }
                        EventUtil.stopPropagation(event);
                    }
                    //验证"登陆密码"表单
                    else if(curObjClassName[j] == "loginPasswordInput"){
                        if(this.allInputs[i].value != ""){
                            return null;
                        }else if(this.allInputs[i].value == ""){
                            this.allErrorSpan[i].innerHTML = this.loginPasswordEmpty;
                        }
                        EventUtil.stopPropagation(event);
                    }
                }
            }
            EventUtil.stopPropagation(event);
        }
    },


    //"确认密码"表单失去焦点事件:(password if equal function) 参数从页面调用的时候传进来
    psdIfEqualFun: function(newPassword, confirmPsd){
        if(newPassword.value == confirmPsd.value){
            return null;
        }else if(newPassword.value != confirmPsd.value){
            for(var i=0; i<this.allErrorSpan.length; i++){
                var objClassName = getClassNum(this.allErrorSpan[i]);
                for(var j=0; j<objClassName.length; j++){
                    if(objClassName[j] == "confirmPsdErrorSpan"){
                        this.allErrorSpan[i].innerHTML = this.psdNotConsistent;
                    }
                }
            }
        }
        EventUtil.stopPropagation(event);
    },

    //定义页面body上得到焦点时，当表单只要有一个不为空值时，下一步/确认按钮 就变色
    butChangeBg: function(theBut){
        //event = EventUtil.getEvent(event);
        //var target = EventUtil.getTarget(event);
        for(var i=0; i<this.allInputs.length; i++){
             if(this.allInputs[i].value != ""){
                 var butClassNum = getClassNum(theBut);
                 for(var j=0; j<butClassNum.length; j++){
                     if(butClassNum[j] == "defaultNextStep"){
                         theBut.className = removeClassFun(theBut, "defaultNextStep");
                         theBut.className = addClassFun(theBut, "selectedNextStep");
                     }else if(butClassNum[j] == "selectedNextStep"){
                         removeClassFun(theBut, "selectedNextStep");
                         addClassFun(theBut, "defaultNextStep");
                     }
                 }
            }
        }
    },

    //确认按钮的click事件 && 下一步按钮click事件
    confirmButClick: function(event, oHref){
        event = EventUtil.getEvent(event);
        var target = EventUtil.getTarget(event);
        for(var i=0; i<this.allErrorSpan.length; i++){
            //如果判断出当前错误提示的span的innerHTML不为空的话，就用return退出函数，这样下面的跳转就不会执行了
            if(this.allErrorSpan[i].innerHTML != ""){
                return;
            }else if(this.allInputs[i].value == ""){
                return;
            }
        }
        //只有满足上面for循环所有的条件之后才会执行这一步
        target.href = oHref;
    }
};
/**面相对象写法 公用**/





/*面相对象的写法: 网上看到的简短示例*/
    // var Class = {
    //     create: function () {
    //         return function () {
    //             this.initialize.apply(this, arguments);
    //         }
    //     }
    // };
    // var A = Class.create();
    // A.prototype = {
    //     initialize: function (v) {
    //         this.value = v;
    //     },
    //     showValue: function () {
    //         alert(this.value);
    //     }
    // };
    // var a = new A("Hello");
    // a.showValue();
/*面相对象的写法*/

/* 灵瞳给的 单击确定按钮，判断页面中所有的input表单不能为空的写法
    if([].find.call(document.querySelectorAll('input'),(dom)=>!dom.value)){return;}
 }*/