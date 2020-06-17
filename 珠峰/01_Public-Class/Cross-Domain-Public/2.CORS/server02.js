let express = require('express');
let app = express();

// - 添加跨域请求的语法
let whiteList = ['http://localhost:3300'];
app.use((req, res, next) => {
   let origin = req.headers.origin;
    if (whiteList.includes(origin)) {
        // - 设置哪个源可以访问我
        res.setHeader('Access-Control-Allow-Origin', origin);
    }

   next();
});

app.get('/getData', function(req, res) {
    console.log("req.headers：", req.headers);
    res.end('我是 4000 端口服务器的应答');
});


// express 的中间件: 以当前目录作为一个静态文件目录
app.use(express.static(__dirname));
console.log("__dirname: ", __dirname);


app.listen(4000);
