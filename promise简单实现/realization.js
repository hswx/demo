function MyPromise(fn){//fn表示用户方法里面传入的匿名函数
    var callback = null;
    this.then = function(cb){
        callback = cb; //callback拿取用户传入的匿名函数
    }

    function resolve(value){
        setTimeout(function(){
            callback(value)
        },0);
    }

    fn(resolve);
}
module.exports = MyPromise;