// MVVM 双向数据绑定:  Vue 实现的方式是 "数据劫持 + 发布订阅模式"
function MVVM(options = {}) {
    // 将所有属性挂载在 $options 上
    this.$options = options;

    // 当前的 this 指向的是构造函数的实例， 而且从下面 this.__proto__ 也可以看出来。
    console.log("this: ", this);
    console.log("this.__proto__: ", this.__proto__);


    // 把实例里的 data 赋值给 this._data 然后再赋值给变量 data
    let data = this._data = this.$options.data;

    // (0-0).调用给 data 添加访问器属性的 observe() 函数
    observe(data);

    // (5).平时我们在使用 vue 时是可以直接 vm.a 这样直接操作属性，但此时更改 a 的值方式是
    // mvvm._data.a = xxx 这样来操作，那么我们怎么实现 mvvm.a = xxx 这种操作呢？ A:再
    // 次遍历当前 this._data 对象，
    for (let key in data) {
        // 以当前 data 对象中的 key 为名，给当前 this(构造函数的实例)添加同名的属性，并且此属性
        // 也是访问器属性。此处的意思就是: this.a = this._data.a = {aa: "I am aa",}
        /* this 代理了 this._data */
        Object.defineProperty(this, key, {
            enumerable: true,
            get() {
                // tips: 我们在浏览器的控制台中输入: mvvm.a 就调用 this._data[key]， 由于
                // this.data[key] 是访问器属性，所以这里会接着调用 Observe 构造函数内 Object.
                // defineProperty() 方法内的 get 方法，返回值。 (tips: 此时还没发在浏览器
                // 中打断点， 可以在 console 控制台中 直接写 mvvm.a 可以看到整个实例的数据)
                return this._data[key];
            },
            // 在 setter 函数中给当前 this 赋值时(tips: 就是 vm.a = xxx) 时，我们并不能直接赋值给 vm.a
            // 而是需要赋值给 this._data[key]，因为在上面 get 中我们返回还是 this._data[key]
            set(newVal) {
                // 到这里就实现了 vm.a = xxx 这种写法了。
                this._data[key] = newVal
            }
        })
    }
}

// (1).这里写主要逻辑
function Observe(data) {
    // 遍历 data 对象，把内部的属性都添加上访问器属性
    for (let key in data) {
        // 拿到当前属性的值
        let val = data[key];

        // (2). 如果此时我们上面拿到的 val 还是一个对象的话，接着把当前 val 放入到 observe()
        // 函数中给当前 val 的值添加访问器属性。 在控制台输入: mvvm._data.a 输出值为 :
        observe(val);

        Object.defineProperty(data, key, {
            enumerable: true,
            get() {
                // get 方法就是直接返回当前属性的值
                return val;
            },
            set(newVal) {
                // set 的新值和原值相等就直接 return
                if (newVal === val) return;
                // 然后把 newVal 赋值给 val，更新 val 的值
                // ▲测试: 在浏览器 console 中
                // 输入-> mvvm._data.a 测试 get.
                // 输入: mvvm._data.a = 2 就可以 set 更改值.
                val = newVal;

                // (4). 如果经过上面 val = newVal 赋的值仍然是一个对象，那么我们是不是应该
                // 把当前得到的新 val 也添加 "访问器属性"？ 那么就需要再次调用 observe() 了
                // e.g: 我们在控制台输入 mvvm._data.a = { aa: "I had change aa's
                // value" }; 经过这一步我们更改后的 newVal 也有了 访问器属性
                observe(newVal);
            }
        })
    }
}

// (0-1).观察对象给对象添加 Object.defineProperty()
// 扩展一个工厂方法来实例化 Observe. 这样写的目的是什么? A: 因为接下来的操作会用到递归，
// 这样写更有利于组织代码。
function observe(data) {

    // (3).此处为什么要判断 data 是不是等于 object? A: 我们在 Observe 构造函数内会再次
    // 循环调用当前 observe 来给 data 下属性值仍是对象的项添加访问器属性，所以当上面 (2)
    // 步调用当前 observe() 方法时，就应该一进来就应该判断当前参数是不是对象吧！ 如果这里不
    // 增加判断，浏览器就会报错: Maximum call stack size exceeded (超出最大调用堆栈大小)
    if (typeof data !== "object") return;

    return new Observe(data);
}
