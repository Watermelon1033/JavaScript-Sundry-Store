const totalLines = 562;
let i = 0;
for (; i < totalLines; i++) {
    if ( i === 0) {
        // 输出第1页的最后行数
        console.log("输出第1页的最后行数: " + (i + 34));
    }
    if ( i >= 34) {
        // 输出去除第一页,总行数是34的倍数的页数，
        if (i % 35 === 0) {
            if ((i + 34) < totalLines) {
                console.log("输出去除第一页,总行数是34的倍数的当页末尾的行数: "  + (i + 34));
            }
        }
    }
}