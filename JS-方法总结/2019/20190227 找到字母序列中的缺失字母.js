/**
 * - 5.6.3 String 类型  P122
 *   + 1、字符方法: 2 个用于访问字符串中特定字符的方法: charAt() 和 charCodeAt().
 *        这两个方法都接收一个参数，即基于 0 的字符位置。
 *      - charAt() 方法: 以单字符字符串的形式返回给定位置的哪个字符 (ECMAScript 中没有字符类型)
 *      - charCodeAt(): 返回给定位置的字符编码。
 *   + 8、fromCharCode() 方法:
 *      -  String 构造函数本身还有一个静态方法： fromCharCode() 。这个方法的任务是接收一或多个
 *        字符编码，然后将它们转换成一个字符串。从本质上来看，这个方法与实例方法 charCodeAt()执行的是相反的操作
 */
const stringValue = "How are you today?";
console.log("charAt(8): ", stringValue.charAt(8));  // charAt(8):  y
console.log("charCodeAt(8): ", stringValue.charCodeAt(8));  // charCodeAt(8):  121

// fromCharCode()
console.log(String.fromCharCode(104, 101, 108, 108, 111));  // "hello"


function findMissingLetters(str) {
    // 将字符串转为 ASCII 码，并存入数组
    let arr = [];
    let letters = [];
    for (let i = 0; i< str.length; i++) {
        arr.push(str.charCodeAt(i));
    }
    for (let j = 1; j < arr.length; j++) {
        let num = arr[j] - arr[j-1];
        // 判断后一项减前一项是否为 1, 若不为 1, 则确实该字符的前一项
        if (num !== 1) {
            // 将确实字符 ASCII 转为字符并返回
            letters.push(String.fromCharCode(arr[j] -1));
        }
    }
    return letters;
}
// 缺失字符:  [ 'd', 'j', 'm', 'r' ]
console.log("缺失字符: ", findMissingLetters("abcefghiklnops"));