let express = require('express');
let app = express();

// express 的中间件: 以当前目录作为一个静态文件目录
app.use(express.static(__dirname));
console.log("__dirname: ", __dirname);


app.listen(3300);
