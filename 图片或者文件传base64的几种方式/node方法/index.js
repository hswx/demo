let fs = require('fs')
let imageBuf = fs.readFileSync('./../testImg.jpg');
console.log('data:image/jpeg;base64,'+imageBuf.toString('base64'));