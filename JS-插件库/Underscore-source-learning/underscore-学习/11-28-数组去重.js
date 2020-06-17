/*** Created on 2017/11/28.*/

// 第一种方法 : 无需思考，我们可以得到 O(n^2) 复杂度的解法。定义一个变量数组 res 保存结果，遍历需要去重的数组，如果该元素已经存在res中了，则说明是重复的元素，如果没有则放入res中。
let unique = a => {
    var res = [];
    var i = 0, 
        j = 0,
        len = a.length,
        jLen = res.length;
    for(; i < len; i++){
        var item = a[i];

        // 实际上很复杂: 第一次运行for时jLen为空，接着走下面的if(j === jLen)
        for(; j < jLen; j++){
            if(res[j] === item){
                break;
            }
        }
        
        // 第一次j=0, jLen=0,所以res推入a[0],
        if(j === jLen){
            res.push(item)
        }
    }
}
