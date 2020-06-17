function EventEmitter() {
    // - 把所有的事件监听函数都放在这个对象里保存. 每个键的值都是一个数组
    this.events = {};
    // - 指定给一个时间类型添加的监听函数数量最多多少个
    this._maxListeners = 10;
}

EventEmitter.prototype.setMaxListeners = function(maxListeners) {
    this._maxListeners = maxListeners;
};

EventEmitter.prototype.listeners = function(event) {
    return this.events[event];
};

// - 给指定的事件绑定事件处理函数，1st 参数是事件类型。 2nd 参数是事件监听函数
EventEmitter.prototype.on = EventEmitter.prototype.addListener =
    function(type, listener) {
        if(this.events[type]) {
            // - 如果已经有此类型的 type 事件存在, 那么接着通过 push 把后续的事件推入到
            //   数组中.
            this.events[type].push(listener);
            // - 添加超过最大监听函数数量的警告
            if (this._maxListeners !== 0 
                && this.events[type].length > this._maxListeners) {
                console.error(`MaxListenersExceededWarning: Possible EventEmitter 
                    memory leak detected. ${this.events[type].length} ${type} 
                    listeners added. Use emitter.setMaxListeners() to increase limit`);
            }
        } else {
            // - 如果之前没有添加此事件的监听函数，把监听函数放到一数组字面量中。
            // - Tip: 即第一次添加事件时, 走此判断
            this.events[type] = [listener];
            console.log("listener:", [listener]);
        }
};

EventEmitter.prototype.once = function (type, listener) {
    // - 用完即焚
    let wrapper = (...rest) => {
        // - 先让原始的监听函数执行
        listener.apply(this, rest);
        // - 然后再移除自己 (即当前: wrapper)
        this.removeListener(type, wrapper);
    };
    this.on(type, wrapper);
};

EventEmitter.prototype.removeListener = function(type, listener) {
    if (this.events[type]) {
        // - 利用 filter() 函数返回除 wrapper 函数之外的所有回调函数
        // - filter(): 对数组中的每一项运行给定函数，返回 true 的项组成的数组
        this.events[type] = this.events[type].filter((l) => l !== listener)
    }
};

EventEmitter.prototype.emit = function(type, ...rest) {
    this.events[type] && this.events[type].forEach((listener) => {
        listener.apply(this, rest);
    })
};

module.exports = EventEmitter;
