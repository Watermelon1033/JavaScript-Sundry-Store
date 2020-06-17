/**Created by Administrator on 2017/6/21.*/

var arr = [
    {status:0},
    {status:1},
    {status:0},
    {status:0},
    {status:0},
    {status:3},
    {status:0},
    {status:7},
    {status:0},
    {status:2}
    ];

console.log(arr);

var i, len;
var flag = true;

for(i=0,len=arr.length; i<len; flag ? i++ : i){
    if( arr[i]&&arr[i].status==0 ){
        arr.splice(i,1);
        flag = false;
    } else {
        flag = true;
    }

}
console.log(arr);