
    var url = "static/img/js1.jpg";//这是站内的一张图片资源，采用的相对路径
    convertImgToBase64(url, function(base64Img){
        //转化后的base64
        console.log(base64Img);
    });


//实现将项目的图片转化成base64
function convertImgToBase64(url, callback, outputFormat){
    var canvas = document.createElement('CANVAS'),
        ctx = canvas.getContext('2d'),
        img = new Image;
    img.crossOrigin = 'Anonymous';
    img.onload = function(){
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img,0,0);
        var dataURL = canvas.toDataURL(outputFormat || 'image/png');
        callback.call(this, dataURL);
        canvas = null;
    };
    img.src = url;
}