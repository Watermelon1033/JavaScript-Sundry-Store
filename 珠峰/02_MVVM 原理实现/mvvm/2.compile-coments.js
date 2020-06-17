// 二 (Compile) 编译: 模板编译. (tips: 在 MVVM 构造函数中实例化)
function Compile(el, vm) {
    // querySelector() 方法接收一个 CSS 选择符，返回与该模式匹配的第一个元素，
    // 如果没有找到匹配的元素，返回 null。 此处即取得 div#app 元素
    vm.$el = document.querySelector(el);

    // 创建一个文档片段，所有的操作都在文档片段中进行，即在内存中运行完所有操作
    let fragment = document.createDocumentFragment();
    let child;

    // 取得 vm.$el.firstChild 赋值给 child，如果经过内部的 fragment.appendChild(child)
    // 执行后当前 vm.$el.firstChild 部位 null, 那么 while 语句就会继续执行.
    // tips: 将 app 中的内容移入到内存中。
    while (child = vm.$el.firstChild) {
        fragment.appendChild(child);
    }
    replace(fragment);

    function replace(fragment) {
        // output: [text, p, text, div, text] 三个 text 为换行空格
        // console.log("Array.from(fragment.childNodes): ", Array.from(fragment.childNodes));

        // ES6: Array.from() 方法把类数组转换为数组
        Array.from(fragment.childNodes).forEach((item) => {
            let text = item.textContent;

            // console.log("item: ", item);
            // console.log("item.nodeType: ", item.nodeType);
            // console.log("item.textContent: ", item.textContent);

            let reg = /\{\{(.*)\}\}/;
            // 如果当前 item 的节点类型是字符串类型 (3), 并且内容匹配定义的 reg 正则，就
            if (item.nodeType === 3 && reg.test(text)) {
                // console.log("RegExp.$1: ", RegExp.$1);

                let arr = RegExp.$1.split(".");
                // 例如: ["a", "aa"] / ["b", "name"] / ["c"]
                // console.log("arr: ", arr);

                // 因为经过 MVVM + Observe 两个构造函数的操作，我们已经把 data 下所有的
                // 属性都 copy 了一份复制到 MVVM 下了
                // console.log("vm: ", vm);

                let val = vm;
                // 此处是通过 forEach 循环找到当前 a.aa / b.name / c 的之后赋值给
                // val 最后我们在下面替换 (实际上很复杂 )
                arr.forEach((k) => {
                    // k: a / k: aa / k: b / k: name / k: c
                    console.log("k: ", k);
                    // val[k]: {aa: "xxx"} / val[k]: "I am aa" /
                    // val[k]: {name:"xxx"} / val[k]: "I am B" /
                    // val[k]: "I am C"
                    console.log("val[k]: ", val[k]);

                    val = val[k];
                });

                console.log("val: ", val);

                // 替换
                item.textContent = text.replace(/\{\{(.*)\}\}/, val);
            }
            // 如果 item 不能满足上面的 if 判断，表示当前 item 的节点类型不是字符串类型，我们接着调
            // 用当前 replace 函数继续匹配
            if (item.childNodes) {
                replace(item);
            }
        })
    }
    vm.$el.appendChild(fragment);
}
