/**
 * Created by wangpeng on 2017/11/17.
 * 仿express改造路由
 */
var http = require("http");

var Application = function () {
    this.router = [//保存路由
        {
            path: '*',//路由名字
            fn: function (req, res) {
                res.writeHead(404, {'Content-type': 'text/plain'});
                res.end('404, not found page');
            }
        }
    ];
    
};

Application.prototype = {
    use: function (path, fn) {
        this.router.push({path,fn});
    },
    listen: function (port) {
        var self = this; //获取Application的this
        http.createServer(function (req, res) {
            for (var i = 1; i <self.router.length; i++){ //i=1因为第一个是所有路由匹配完之后没有匹配成功，取第一个路由来返回404
                if(req.url == self.router[i].path){ //匹配路由
                    return self.router[i].fn(req, res);
                }
            }

            return self.router[0].fn(req, res);
        }).listen(port || 3000)
    }
};

exports = module.exports = Application;
