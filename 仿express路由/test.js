/**
 * Created by wangpeng on 2017/11/17.
 * 测试仿express应用
 */

var express = require("./index");

var app = express();

app.use("/", function (req, res) {
    res.writeHead(200, {'Content-type': 'text/plain'});
    res.end('Hello');
});

app.listen(3000);
