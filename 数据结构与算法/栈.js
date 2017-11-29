/*
先进后出
push(element(s)):添加一个(或几个)新元素到栈顶。
pop():移除栈顶的元素，同时返回被移除的元素。
peek():返回栈顶的元素，不对栈做任何修改(这个方法不会移除栈顶的元素，仅仅返回它)。
isEmpty():如果栈里没有任何元素就返回true，否则返回false。
clear():移除栈里的所有元素。
size():返回栈里的元素个数。这个方法和数组的length属性很类似。
 */
function Stack(){
    this.dataStore = [];
}
Stack.prototype = {
    push: function (data) {
        this.dataStore.push(data);
    },
    pop: function () {
        return this.dataStore.pop();
    },
    peek: function () {
        return this.dataStore[this.dataStore.length-1];
    },
    isEmpty: function () {
        return this.dataStore.length === 0;
    },
    clear: function () {
        this.dataStore = [];
    },
    size: function () {
        return this.dataStore.length;
    },
    toString: function () {
        return this.dataStore.toString();
    }
}

function numBase(num,base) { // 进制转换，10进制转2进制
    var stack= new Stack();
    while (num>0){
        var a= Math.floor(num/base);
        var b= num%base;
        num=a;
        stack.push(b);
    }
    while (!stack.isEmpty()){
        console.log(stack.pop())
    }
}
numBase(10,2);