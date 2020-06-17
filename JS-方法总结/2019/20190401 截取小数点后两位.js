/**Created on 2017/7/5.*/

var number = 22.127456;
// toFixed(): 也会自动舍入。 (from: js高程 P121)
console.log("number.toFixed(2): ", number.toFixed(2));



function slice(num){
    // 截取小数点后两位(直接截取不四舍五入)
    var reg = /^\d+(?:\.\d{0,2})?/;
    console.log(String(num).match(reg)[0]);
}
const num= 26.6578946;
slice(num);
