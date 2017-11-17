/**
 * Created by wangpeng on 2017/11/17.
 */
var http = require("http");

var router = [];

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
        fu: function (req, res) {
            res.writeHead(200, {'Content-type': 'text/plain'});
            res.end('Hello');
        }
    }
);

var server = http.createServer(function (req, res) {
    for (var i = 0; i <router.length; i++){
        //
    }
});

