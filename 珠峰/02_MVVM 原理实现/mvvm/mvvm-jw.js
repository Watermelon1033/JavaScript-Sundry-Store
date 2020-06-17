// 一
function MVVM(options = {}) {
    this.$options = options;
    let data = this._data = this.$options.data;
    observe(data);
    for (let key in data) {
        Object.defineProperty(this, key, {
            enumerable: true,
            configurable: true,
            get() {
                return this._data[key];
            },
            set(newVal) {
                this._data[key] = newVal
            }
        })
    }

    // 四(1): 调用 initComputed
    initComputed.call(this);

    new Compile(options.el, this);
}

function initComputed() {
    // 四(2)
    let vm = this;
    let computed = this.$options.computed;
    Object.keys(computed).forEach(function(key) {
        Object.defineProperty(vm, key, {
            get: typeof computed[key] === 'function' ? computed[key]: computed[key].get,
        })
    })
}

function Observe(data) {
    let dep = new Dep();
    for (let key in data) {
        let val = data[key];
        observe(val);
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: true,
            get() {
                Dep.target && dep.addSub(Dep.target);
                return val;
            },
            set(newVal) {
                if (newVal === val) return;
                val = newVal;
                observe(newVal);
                dep.notify();
            }
        })
    }
}

function observe(data) {
    // (3)
    if (typeof data !== "object") return;
    // (0-1)
    return new Observe(data);
}

function Compile(el, vm) {
    vm.$el = document.querySelector(el);
    let fragment = document.createDocumentFragment();
    let child;
    while (child = vm.$el.firstChild) {
        fragment.appendChild(child);
    }
    replace(fragment);
    function replace(fragment) {
        // 循环每一层
        Array.from(fragment.childNodes).forEach((node) => {
            let text = node.textContent;
            let reg = /\{\{(.*)\}\}/;
            if (node.nodeType === 3 && reg.test(text)) {
                let arr = RegExp.$1.split(".");
                let val = vm;
                arr.forEach((k) => {
                    val = val[k];
                });
                new Watcher(vm, RegExp.$1, function(newVal) {
                   node.textContent = text.replace(reg, newVal);
                });

                node.textContent = text.replace(reg, val);
            }

            if (node.nodeType === 1) {
                let nodeAttrs = node.attributes;
                Array.from (nodeAttrs).forEach(function(attr) {
                    let name = attr.name;
                    let exp = attr.value;
                    if (name.indexOf('v-') > -1) {
                        node.value = vm[exp]
                    }
                    new Watcher(vm, exp, function(newVal) {
                        node.value = newVal;
                    });
                    node.addEventListener('input', function(e) {
                        vm[exp] =  e.target.value;
                    }, false)
                })
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
Dep.prototype.addSub = function(sub) {
    this.subs.push(sub);
};
Dep.prototype.notify = function() {
    this.subs.forEach((sub) => {
        return sub.update();
    })
};

function Watcher(vm, exp, fn) {
    this.fn = fn;
    this.vm = vm;
    this.exp = exp;

    Dep.target = this;
    let val = vm;
    let arr = exp.split('.');
    arr.forEach(function(k) {
        val = val[k];
    });

    Dep.target = null;
}
Watcher.prototype.update = function() {
    let val = this.vm;
    let arr = this.exp.split('.');
    arr.forEach(function(k) {
        val = val[k];
    });
    this.fn(val);
};