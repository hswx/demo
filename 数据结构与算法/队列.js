/*
先进先出
enqueue(element(s))：向队列尾部添加一个（或多个）新的项。
dequeue()：移除队列的第一（即排在队列最前面的）项，并返回被移除的元素。
front()：返回队列中第一个元素——最先被添加，也将是最先被移除的元素。队列不做任何变动（不移除元素，只返回元素信息——与Stack类的peek方法非常类似）。
isEmpty()：如果队列中不包含任何元素，返回true，否则返回false。
clear():移除队列里的所有元素。
size()：返回队列包含的元素个数，与数组的length属性类似。
 */
function Queue(){
    this.dataStore = [];
}

Queue.prototype = {
    enqueue: function (data) {
        this.dataStore.push(data);
    },
    dequeue: function () {
        return this.dataStore.shift();
    },
    front: function () {
        return this.dataStore[0];
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

let m=[43,57,97,20,46,29,49,64,52,78];
// 用队列实现基数排序，对于0~99 的数字，
// 基数排序将数据集扫描两次。第一次按个位上的数字进行排序，
// 第二次按十位上的数字进行排序。每个数字根据对应位上的数值被分在不同的盒子里
// paixu(m);
function paixu (m) {
    let arrays=[];
    for(let i=0;i<10;i++){
        arrays.push(new Queue());
    }

    for(let i=0;i<m.length;i++){
        arrays[m[i]%10].enqueue(m[i]);
    }

    m=[];

    for(let i=0;i<10;i++){
        while(!arrays[i].isEmpty()){
            m.push(arrays[i].dequeue());
        }
    }
    for(let i=0;i<m.length;i++){
        arrays[Math.floor(m[i]/10)].enqueue(m[i]);
    }
    m=[];

    for(let i=0;i<10;i++){
        while(!arrays[i].isEmpty()){
            m.push(arrays[i].dequeue());
        }
    }
    console.log(m);
}


let name=['a','b','c','d','e','f','g'];
// 循环队列，击鼓传花，name表示人的数组，num表示传到谁手上

function n(name,num) {
    let store=new Queue();
    for(let i=0;i<name.length;i++){
        store.enqueue(name[i]);
    }

    if(store.size()>1){
        for(let i=0;i<num;i++){
            store.enqueue(store.dequeue());
        }
    }

    console.log(store.dequeue());
}

n(name,2)

