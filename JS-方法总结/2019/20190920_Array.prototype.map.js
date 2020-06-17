// ## 你应该知道的 JavaScript Array.prototype.map() 的 5 种用途 
// > 来源: https://www.html.cn/archives/10024

// > 下面注释来自 <JavaScript 高级程序设计>
// - ECMAScript 5 为数组定义了 5 个迭代方法. 每个方法都接受 2 个参数: 
//     + 1) 要在每一项上运行的函数. (该函数接受 3 个参数):
//         - (a) 数组项的值,
//         - (b) 该项在数组中的位置,
//         - (c) 数组对象本身.
//     + 2) 运行该函数的作用域 -- 影响 this 的值.
// - 这 5 个 迭代方法为: every()/filter()/forEach()/map()/some().
// - Array.prototype.map(): 对数组中的每一项运行给定函数, 返回每次函数调用的结果组成
//   的新数组.  .map() 是一种 non-mutating (非变异) 方法, 它创建一个新数组, 而不是只
//   对调用数组进行更改的 mutating (变异) 方法. 
//   [Tips: 即, 此方法不会修改原数组中的包含的值。]

// > (1) 在数组中的每一项上运行函数
const sweet = [2, 3, 4, 5, 34];
const newSweet = sweet.map(function(item) {
    return item * 2;
});
// sweet: [ 2, 3, 4, 5, 34 ]
console.log("sweet:", sweet);
// newSweet: [ 4, 6, 8, 10, 68 ]
console.log("newSweet:", newSweet);

// > (2) 将字符串转换为数组.
const name = "Chuloo";
// - call 的详细使用见: 
//  《Javascript设计模式与编程实践》/第1部分--基础知识/第2章-this_call_apply/2.2_apply-call-bind.js
const newName = Array.prototype.map.call(name, eachLetter => {
    return `${eachLetter}a`;
});
// newName:  [ 'Ca', 'ha', 'ua', 'la', 'oa', 'oa' ]
console.log("newName: ", newName);

// > (3) 在 JS 库中用于渲染列表

// > (4) 重新格式化数组对象. (和 (1) 类似)

// > (5) 小技巧使用案例
// - 下面的语句返回什么?
console.log(["1", "2", "3"].map(parseInt)); 
// - A: n你可能会觉得是 [1, 2, 3]. 但实际上是 [ 1, NaN, NaN ], 为什么会这样? 通常使用
//   parseInt 时只需要传递一个参数. 但实际上, parseInt 有 2 个参数, 第二个参数是进制数,
//   可以通过 'console.log(parseInt.length === 2)' 来验证. map 方法在调用 callback
//   函数时, 此函数默认有 3 个参数: 数组中的当前项, 当前项的索引, 数组本身. 第三个代表
//   数组本身的参数可以忽略, 但第二个参数不会, 也就是说, parseInt 把传过来的索引值当成进制
//   来使用了, 从而返回了 NaN.
function returnInt(ele) {
    return parseInt(ele, 10);
}
// - Note: map() 里调用 returnInt 并没有传递参数 item.
console.log(["1", "2", "3"].map(returnInt)); // [ 1, 2, 3 ]
// - 也可以使用 箭头函数
console.log(["1", "2", "3"].map(item => {returnInt(item)}));

// - △: 一个更简单的方式:
console.log(["1", "2", "3"].map(Number));

// - 与 `parseInt` 不同, 下面的结果会返回浮点数或指数
console.log(['1.1', '2.2e2', '3e300'].map(Number));

// - 还有一个非常实用的小技巧, 像 .map() / .reduce() / .filter() 这些方法支持链式调用
//   例如:
let myArr = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
let result = myArr
    .map((item) => {
        if (item > 5) {
            return 5;
        }
        return item;
    })
    .reduce(function(accumulator, currentValue) {
        // - reduce 详细见: 深入理解ES6》/0th-ES6 其他语法/Array.reduce().html
        return accumulator + currentValue;
    }, 0);
console.log("result:", result);  // result: 40

// - 简化上面的链式调用
(function(){
    let arr = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
    let result = arr
        .map(item => item > 5 ? 5 : m)
        .reduce((accumulator, currentValue) => accumulator, currentValue);
})();