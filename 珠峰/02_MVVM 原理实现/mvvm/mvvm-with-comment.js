function MVVM(options = {}) {
    this.$options = options;
    let data = this._data = this.$options.data;
    observe(data);
    // - 用 this(MVVM 构造函数的实例)代理 this._data，实现类似 vue 的写法，即 vm.a.aa
    //   == vm._data.a.aa
    for (let key in data) {
        Object.defineProperty(this, key, {
            enumerable: true,
            configurable: true,
            get() {
                // - 这里一旦调用，便会执行 Observe() 内的 get 访问器属性, 因为我们通
                //   过 Observe 内的 Object.defineProperty 已经给 data 内全部的属性
                //   添加了访问器属性。
                return this._data[key];
            },
            set(newVal) {
                // - 同理，这里也会调用 Observe() 内的同名属性的 set 访问器属性
                this._data[key] = newVal;
            }
        })
    }

    // - 调用 initComputed: 此处的 initComputed 调用必须写在下面的 new Compiler()
    //   之前，现在还不知道为什么？
    initComputed.call(this);

    // - 实例化模板编译，this 为当前构造函数的实例
    new Compiler(options.el, this);
}


function observe(data) {
    if (data instanceof Object) {
        return new Observe(data);
    }
}
function Observe(data) {
    // - 实例化 收集订阅者的 Dep 构造函数
    let dep = new Dep();
    for (let key in data) {
        let val = data[key];
        // - 如果 data[key] 还是对象我们接着添加访问器属性
        observe(data[key]);
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: true,
            get() {
                // - a).Dep.target 在 Watcher 中被赋值于 Watcher 构造函数的实例，但是
                //   Watcher 构造函数的实例在 Compiler 中声明
                // - b).如果 Dep.target 存在(即 Watcher 构造函数的实例存在)，那么就把
                //   实例推入到 Dep 内的 subs 数组内。
                // - Q-1: 由 MVVM 函数中的代码执行顺序看，当前构造函数的执行顺序是早于 
                //   new Compiler() 的，那就有一个很明显的问题，既然 a) 中说了 Watcher
                //   构造函数的实例在 Compiler 中被声明，此处的 Dep.target 若想存在的
                //   话，当前代码执行到这里时 Compiler 执行体内的 new Watcher() 必须被
                //   执行了 Dep.target 才会存在，那么初始化 MVVM 构造函数执行到当前 
                //   Dep.target 时，当前 Dep.target 是 false ?
                //   A: 回答是是的，Dep.target 依赖于 Compiler 代码执行完毕才会存在，
                //   在上面 MVVM 构造函数的执行体内执行到当前 Observe 时，正常走到此处
                //   时，Compiler 并没有执行，那么 Dep.target 等于 false，所以 
                //   dep.addSub(Dep.target);不会被执行，当前构造函数执行完后，
                //   回到上面的 MVVM 执行体内接着执 new Compiler(), 等 Compiler 
                //   构造函数执行完毕后 new Watcher() 也就被声明了。
                // - Q-2：既然上面说了只有 Compiler 构造函数执行体内的 new Watcher() 
                //   声明之后 Dep.target 才会存在，那么就不禁要问 Dep.target && dep.
                //   addSub(Dep.target); 是什么时候真正执行的？ 
                //   A: new Watcher() 声明一个实例后接着执行 Watcher 构造函数，构造函数
                //   的执行体内 `arr.forEach(k => {val = val[k];});` 执行这句代码时
                //   (Tip: 详见其内部的 "(3)-note" 注释)，`dep.addSub(Dep.target)`
                //   便会真正被执行。 
                Dep.target && dep.addSub(Dep.target);
                return val;
            },
            set(newVal) {
                if (val === newVal) {return;}
                val = newVal;
                // - 如果 newVal 仍是对象的话也要添加访问器属性
                observe(newVal);

                // - 通过上面的  get 操作把 订阅者 推入到 subs 数组中，最后在当前 set 内
                //   触发 notify
                // - (4)-note: notify() 调用执行其内部的代码，下面的 Watcher 原型上的
                //   update 方法接着执行。
                dep.notify();
            }
        })
    }
}

// - 模板编译
function Compiler(el, vm) {
    vm.$el = document.querySelector(el);
    let fragment = document.createDocumentFragment();
    let child = null;
    // - vm.$el.firstChild 代表当前 vm.$el 节点的子节点，子节点本身包含子孙节点。
    while(child = vm.$el.firstChild) {
        fragment.appendChild(child);
    }
    // - replace 替换模板中的属性，并把每个属性 和 要添加的一个订阅者相关联
    replace(fragment);
    function replace(fragment) {
        // - childNodes 子节点
        Array.from(fragment.childNodes).forEach(function(node) {
            let text = node.textContent;
            // - . : 匹配除换行符之外的任何单个字符。
            // - * : 匹配前面元字符 0 次或多次。
            let reg = /\{\{(.*)\}\}/;
            console.log("node.textContent:", node.textContent);
            if (node.nodeType === 3 && reg.test(text)) {
                // - split(): 把字符串转换成数组
                let arr = RegExp.$1.split(".");     // - E.g.: [a, aa]
                let val = vm;
                arr.forEach((k) => {
                    // - <001> val[k]: this.a: 每次取值都会调用 MVVM 内的 get 访问器，
                    //   get访问器内部又会去访问 Observe 内部的 get 访问器属性
                    // - <001> val[k]: this.a.aa
                    val = val[k];
                });

                // - (1)-note: 实例化 发布订阅模式 的 中介者 Watcher (观察者构造函数),
                //   fn 为真正的订阅者，fn 接收一个通过控制台 (vm.a.aa="I am the new
                //   value.") 或通过 `computed`/`methods` 内定义的方法 "更改||更新"
                //   的值，那么我们通过上面的 new Watcher() 实例化 Watcher 后就会接着
                //   执行 "(2)-note" Watcher 构造函数。
                // - Tip: new Watcher() 的第二个参数 Reg.Exp 是 this.a.aa 这样直接
                //   解析模板的整个值然后添加一个 new Watcher()，一定要搞清楚。
                // - Q: fn 订阅者构造函数是怎么被执行，并且如何接受新值 newVal 的呢？
                // - A: 我们在控制台通过 this.a.aa 时会执行 Observe 构造函数执行体内
                //   aa 属性的 set 访问器属性 (ImportantNote: 这里不会调用 MVVM 内 
                //   this 代理 this._data 这个 for 循环，因为这个代循环是给代码初始化
                //   时，Compiler/Watcher 这样的构造函数使用的)。在 set 访问器属性内部
                //   首先通过 val = newVal(即: this.a.aa = "I have changed a.aa")
                //   把新值赋值给 this.a.aa 然后执行 dep.notify()，Dep 上的 notify 
                //   方法会去执行 Watcher 构造函数上的 update 方法，在 update 方法内部
                //   我们通过 arr.forEach() 操作再次取到 val(即 newVal), 然后利用
                //   this.fn(val) 调用当前 fn, 在当前 fn 函数执行体内部我们再次执行
                //   替换，这样就完成了整个替换的操作。
                new Watcher(vm, RegExp.$1, function(newVal) {
                    node.textContent = text.replace(reg, newVal);
                });

                // - 替换: 把编译后的模板赋值给当前节点的 textContent
                node.textContent = text.replace(reg, val);
            }

            // - 编译 input 上的 v-model 属性
            if (node.nodeType === 1) {
                // - Element 类型是使用 attributes 属性的唯一一个 DOM 节点类型.
                let nodeAttrs = node.attributes;
                console.log("nodeAttrs:", nodeAttrs);
                Array.from(nodeAttrs).forEach((attr) => {
                    let name = attr.name;
                    let exp = attr.value;
                    if (name.indexOf('v-') > -1) {
                        node.value = vm[exp]
                    }
                    // - 同上 if
                    new Watcher(vm, exp, (newVal) => {
                        node.value = newVal;
                    });
                    // - 给 input 添加 input 事件
                    node.addEventListener('input', function(e) {
                        vm[exp] = e.target.value;
                    }, false)
                })
            }

            // - 如果当前 node 节点包含子节点，那子节点可能仍然包含模板属性，那仍需要利用
            //   当前 replace 方法进行替换
            if (node.childNodes) {
                replace(node);
            }
        })
    }
    // - 最后把编译后的 fragment 再插入回页面的节点中
    vm.$el.appendChild(fragment);
}

// - ## 声明 发布订阅模式的收集订阅者的 Dependence 类
function Dep() {
    // - 声明一个 subs 数组用来保存订阅者
    this.subs = [];
}
// - addSub 方法用来把订阅者推入到构造函数内的 subs 数组内
Dep.prototype.addSub = function(fn) {
    this.subs.push(fn);
};
// - notify 方法通知每个订阅者更新值。
// - Tip: 例如页面中有 2 个相同的模板元素: `<p>{{a.aa}}</p> <p>{{a.aa}}</p>`
//   我们在用方法更新值时，肯定要让这里 2 个元素都更新才可以。)
Dep.prototype.notify = function() {
    // - 我们默认每个订阅者上都有一个 update() 方法 (实际上在 Watcher 的原型上定义)
    console.log('this.subs:', this.subs);
    this.subs.forEach(item => item.update());
};

// - ## Watcher 中介者: 收集订阅函数
// - Tip: Watcher 中介者是从哪里收集订阅者呢？ A: 在 Compiler 模板编译函数内，
//   replace() 函数内为符合 if 和 else 的节点都在真正的 订阅者函数(fn) 的执行
//   体内被赋值，当然这个赋值是我们在控制台或者方法内设置新值时才会触发的。
// - (2)-note
function Watcher(vm, exp, fn) {
    this.fn = fn;
    this.vm = vm;
    // - Tip: exp 拿到的是这样的 a.aa 模板值
    this.exp = exp;
    // - 添加订阅
    // - 把当前 Watcher 构造函数的实例赋值给 Dep.target;
    Dep.target = this;
    let val = vm;
    // - 拿到 new Watcher() 传入进来的字符串 (E.g.: a.aa) 利用 split() 方法转换为数组
    let arr = exp.split(".");
    arr.forEach(function(k) {
        // - (3)-note:
        //   val[k]: this.a/this.a.aa: 每次取值都会调用 MVVM 内的 get 访问器，
        //   get访问器内部又会去访问 Observe 内部的 get 访问器属性
        val = val[k];
    });
    Dep.target = null;
}
Watcher.prototype.update = function() {
    let val = this.vm;
    let arr = this.exp.split(".");
    // - 这个 k 值即为 "(1)-note" 中的 fn 订阅者接受的新值 newVal
    arr.forEach(function(k){
        console.log('val[k]:', val[k]);
        val = val[k];
    });
    this.fn(val);
};

// - 初始化 computed 对象/方法
function initComputed() {
    let vm = this;
    let computed = this.$options.computed;
    console.log("Object.keys(computed):", Object.keys(computed));
    Object.keys(computed).forEach(function(key){
        Object.defineProperty(vm, key, {
            get: typeof computed[key] === "function" ? computed[key] 
            : computed[key].get
        })
    })
}




