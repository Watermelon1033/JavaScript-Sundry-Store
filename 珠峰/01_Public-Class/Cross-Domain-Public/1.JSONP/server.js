// - 自己起本地服务，使用 express
let express = require('express');
let app = express();

app.get('/say', function(req, res) {
    let {wd, cb} = req.query;
    console.log("wd: ", wd);
    res.end(`${cb}('我是服务器的应答，收到你的请求')`);
});

app.listen(3200);