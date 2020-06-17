/** Created 2018/1/9. */

/**
 * 0. js高程--chapter3.4--数据类型
 *      + 6 种基本数据类型():
 *          - Undefined : Undefined类型，一个没有被赋值的变量会有一个默认值undefined.
 *          - Null      : Null类型只有一个值: null。
 *          - Boolean   : 布尔类型表示一个逻辑实体，可以有两个值: true和false
 *          - Number
 *          - String
 *          - Symbol (ECMAScript 6新定义)

 *      + 1 种复杂数据类型: Object
 *
 * 1. js高程--chapter5--应用类型：
 *      + (1.) Object   类型
 *      + (2.) Array    类型
 *      + (3.) Date     类型
 *      + (4.) RegExp   类型
 *      + (5.) Function 类型
 *      + (6.) 基本包装类型
 *              - Boolean 类型
 *              - Number  类型
 *              - String  类型
 *      + (7.) 单体内置对象
 *              - Global 对象
 *              - Math   对象
 *
 *
 * 2. 确定一个值是哪种基本类型可以使用 typeof 操作符， 而确定一个值是那种引用类型使用 instanceof 操作符
 *
 * 3. Object.prototype.toString.call([value]) :通过获取 Object 原型上的 toString 方法，让方法中的
 *  this 变为需要检测的数据类型，并且让方法执行。
 *      var obj = {name: "WANG"};
 *      var str =      "250";
 *      var bool =     true;
 *      var arr =      [20, 30];
 *      console.log(Object.prototype.toString.call(obj));     // [object Object]
 *      console.log(Object.prototype.toString.call(str));     // [object String]
 *      console.log(Object.prototype.toString.call(bool));    // [object Boolean]
 *      console.log(Object.prototype.toString.call(arr));     // [object Array]
 *
 * */



