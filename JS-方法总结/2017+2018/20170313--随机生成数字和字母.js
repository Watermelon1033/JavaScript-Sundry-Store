/** Create on 2017/3/13*/

function randomString(length) {
    // split() : 基于指定的分隔符将一个字符串分割成多个子字符串，并将结果放在一个数组中。
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');
    if (! length) {
        //Math.random() 方法返回大于等于0小于1的一个随机数。
        length = Math.floor(Math.random() * chars.length);
        console.log("Math.floor(Math.random()*10):", Math.floor(Math.random()*10));
        console.log("chars.length: ",chars.length);
        console.log("Set Array length: ", length);

    }

    var str = '';
    for (var i = 0; i < length; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    // return str;
    console.log(str + ",");
}

randomString();


// -: getUCGI8343026235793061
// -: getUCGI9639430987694071

var str = "getUCGI";
for (var i = 0; i< 16; i++) {
    str += Math.floor(Math.random()*10);
}
console.log("str: ", str);






/*
for(var i=0; i<1; i++){
    randomString();
}*/


/*
console.log(Math.random()); //0.9395614803309535
console.log(Math.floor(Math.random() * 10));  //1

var arr = [];
for(var i=0; i<20; i++){
    //console.log(Math.floor(Math.random() * 10));
    arr.push(Math.floor(Math.random() * 10));
}
console.log(arr);  //[ 2, 0, 7, 4, 3, 5, 3, 5, 0, 4, 8, 1, 1, 6, 4, 4, 4, 5, 9, 8 ] */
