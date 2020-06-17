// 现规定使用方法
// let obj = {
//     url: 'xxx',
//     data: {key: value},
//     type: 'get/post',
//     success: function() {},
//     error: function() {}
// };

let spliceJson = function(data) {
    let arr = [];
    // - Q: 为什么这里可以使用 for...of 迭代？传入的 data 不是一个自定义的对象吗？
    //   自定义的对象不是不可迭代对象吗？
    for(let name of data) {
        arr.push(name + '=' + data[name]);
    }
    return arr.join("&");
};


let ajax = function(obj) {
    obj = obj || {};
    if (!obj.url) {return}
    obj.data = obj.data || {};
    obj.type = obj.type || 'get';

    let xhr = null;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }

    switch(obj.type) {
        case 'get':
            if (obj.data.length > 0) {
                xhr.open('GET', obj.url + "?" + spliceJson(obj.data));
            } else {
                xhr.open('GET', obj.url);
            }
            xhr.send();
            break;
        case 'post':
            xhr.open('POST', obj.url, true);
            xhr.setRequestHeader('Content-Type',
                'application/x-www.form-urlencoded');
            xhr.send(spliceJson(obj.data));
            break;
    }

    xhr.onreadystatechange = function() {
        if (xhr.readystate == 4) {
            if (xhr.status >= 200 && xhr.status < 300
                || xhr.status === 304) {
                obj.success && obj.success(xhr.responseText);
            } else {
                obj.error && obj.error(xhr.status);
            }
        }
    }
};
