function MVVM(options) {
    this.$options = options || {};
    let data = this.$options.data;
    this._data = data;
    observe(data);
    for (let key in data) {
        Object.defineProperty(this, key, {
            enumerable: true,
            configurable: true,
            get() {
                return this._data[key];
            },
            set(newVal) {
                this._data[key] = newVal;
            }
        })
    }

    initComputed.call(this);

    new Compiler(options.el, this);
}
function observe(data) {
    if (data instanceof Object) {
        return new Observe(data);
    }
}
function Observe(data) {
    let dep = new Dep();
    for (let key in data) {
        let val = data[key];
        observe(data[key]);
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: true,
            get() {
                Dep.target && dep.addSub(Dep.target);
                return val;
            },
            set(newVal) {
                if (val === newVal) {return;}
                val = newVal;
                observe(newVal);
                dep.notify();
            }
        })
    }
}

function Compiler(el, vm) {
    vm.$el = document.querySelector(el);
    let fragment = document.createDocumentFragment();
    let child = null;
    while(child = vm.$el.firstChild) {
        fragment.appendChild(child);
    }
    replace(fragment);
    function replace(fragment) {
        Array.from(fragment.childNodes).forEach(function(node) {
            let text = node.textContent;
            let reg = /\{\{(.*)\}\}/;
            if (node.nodeType === 3 && reg.test(text)) {
                let arr = RegExp.$1.split(".");     // - E.g.: [a, aa]
                let val = vm;
                arr.forEach((k) => {
                    val = val[k];
                });
                node.textContent = text.replace(reg, val);
                new Watcher(vm, RegExp.$1, function(newVal) {
                    node.textContent = text.replace(reg, newVal);
                });
            }

            if (node.nodeType === 1) {
                let attrs = node.attributes;
                if (attrs.length > 0) {
                    Array.from(attrs).forEach((item) => {
                        let name = item.name;
                        let exp = item.value;
                        // let reg = /(.*)/;
                        if (name.indexOf('v-') > -1) {
                            node.value = vm[exp];
                        }

                        new Watcher(vm, exp, (newVal) => {
                            node.value = newVal;
                        });
                        node.addEventListener("input", function(e) {
                            vm[exp] = e.target.value;
                        }, false)
                    })
                }
            }
            if (node.childNodes) {
                replace(node);
            }
        })
    }
    vm.$el.appendChild(fragment);
}

function Dep() {
    this.subs = [];
}
Dep.prototype.addSub = function(fn) {
    this.subs.push(fn);
};
Dep.prototype.notify = function() {
    this.subs.forEach(item => item.update());
};

function Watcher(vm, exp, fn) {
    this.fn = fn;
    this.vm = vm;
    this.exp = exp;
    Dep.target = this;
    let val = vm;
    let arr = exp.split(".");
    arr.forEach(function(k) {
        val = val[k];
    });
    Dep.target = null;
}
Watcher.prototype.update = function() {
    let val = this.vm;
    let arr = this.exp.split(".");
    arr.forEach(function(k){
        val = val[k];
    });
    this.fn(val);
};

function initComputed() {
    let vm = this;
    let computed = this.$options.computed;
    Object.keys(computed).forEach(function(key){
        Object.defineProperty(vm, key, {
            get: typeof computed[key] === "function" ? computed[key]
                : computed[key].get
        })
    })
}



