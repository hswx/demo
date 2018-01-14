var MyPromise = require("./realization.js");

function test(){
    return new MyPromise(function(resolve){
        console.log(1);
        resolve("2");
    })
}

test().then(function(result){
    console.log(result);
})