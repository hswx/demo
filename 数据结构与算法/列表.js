/*
listSize(属性)       列表的元素个数
pos(属性)            列表的当前位置
length(属性)         返回列表中元素的个数
clear(方法)          清空列表中的所有元素
toString(方法)       返回列表的字符串形式
getElement(方法)     返回当前位置的元素
insert(方法)         在现有元素后插入新元素
append(方法)         在列表的末尾添加新元素
remove(方法)         从列表中删除元素
front(方法)          将列表的当前位置设移动到第一个元素
end(方法)            将列表的当前位置移动到最后一个元素
prev(方法)           将当前位置后移一位
next(方法)           将当前位置前移一位
currPos(方法)        返回列表的当前位置
moveTo(方法)         将当前位置移动到指定位置
 */
function List() {
    this.listSize = 0;
    this.pos = 0;
    this.dataStore = [];
}

List.prototype = {
    append: function (data) {
        this.dataStore[this.listSize++] = data;
    },
    find: function (data) {
        return this.dataStore.indexOf(data);
    },
    remove: function (data) {
        var index = this.find(data);
        if(index>=0){
            this.dataStore.splice(index,1);
            this.listSize--;
            return true;
        }else{
            return false;
        }
    },
    length: function() {
        return this.listSize;
    },
    toString: function(){
        return this.dataStore.toString();
    },
    clear: function() {
        delete this.dataStore;
        this.dataStore = [];
        this.listSize = this.pos = 0;
    },
    insert: function(data,index){
        if(index && Number.isInteger(index) && index>=0) {
            this.dataStore.splice(index,0,data);
            this.listSize++;
            return true;
        }
        return false;
    },
    contains: function(data) {
        var index = this.dataStore.indexOf(data);
        return index>=0?true:false;
    },
    front: function(){
        this.pos = 0;
    },
    end: function(){
        this.pos = this.listSize - 1;
    },
    prev: function(){
        if(this.pos > 0) {
            this.pos--;
        }
    },
    next: function(){
        if(this.pos < this.listSize - 1) {
            this.pos++;
        }
    },
    curPos: function(){
        return this.pos;
    },
    moveTo: function(n) {
        this.pos = n;
    },
    getElement: function(){
        return this.dataStore[this.pos];
    },
    constructor:List
};
