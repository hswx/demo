/**
 * Created by wangpeng on 2017/11/17.
 */
var http = require("http");

var router = [];  //保存路由

router.push(
    {
        path: '*',//路由名字
        fn: function (req, res) {
            res.writeHead(404, {'Content-type': 'text/plain'});
            res.end('404, not found page');
        }
    },
    {
        path: '/',
        fn: function (req, res) {
            res.writeHead(200, {'Content-type': 'text/plain'});
            res.end('Hello');
        }
    }
);

var server = http.createServer(function (req, res) {
    console.log(req.url);
    for (var i = 1; i <router.length; i++){ //i=1因为第一个是所有路由匹配完之后没有匹配成功，取第一个路由来返回404
        if(req.url == router[i].path){ //匹配路由
            return router[i].fn(req, res);
        }
    }

    return router[0].fn(req, res);
});

server.listen(3000);

