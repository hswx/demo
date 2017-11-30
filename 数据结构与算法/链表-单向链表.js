/*
append(element)：向列表尾部添加一个新的项。
insert(position, element)：向列表的特定位置插入一个新的项。
remove(element)：从列表中移除一项。
indexOf(element)：返回元素在列表中的索引。如果列表中没有该元素则返回-1。
removeAt(position)：从列表的特定位置移除一项。
isEmpty()：如果链表中不包含任何元素，返回true，如果链表长度大于0则返回false。
size()：返回链表包含的元素个数。与数组的length属性类似。
toString()：由于列表项使用了Node类，就需要重写继承自JavaScript对象默认的 toString方法，让其只输出元素的值。
 */
function Node(element) {
    this.element = element;
    this.next = null;
}

function LinkedList() {
    this.head = null;
    this.length = 0;
}

LinkedList.prototype = {
    append: function (element) {
        var node = new Node(element);
        var current = this.head;
        if(current === null){
            this.head = node;
        }else{
            while(current.next){
                current = current.next;
            }
            current.next = node;
        }
        this.length++;
    },
    insert: function (index, element) {
        if(index >= 0 && index < this.length && Number.isInteger(index)){
            var node = new Node(element);
            var current = this.head;
            if(index === 0){
                node.next = this.head;
                this.head = node;
            }else{
                while(current.next && (index-1) > 0){
                    current = current.next;
                    index--;
                }
                node.next = current.next;
                current.next = node;
            }
            this.length++;
            return true;
        }else{
            return false;
        }
    },
    toString: function () {
        var res = [];
        var current = this.head;
        while (current){
            res.push(current.element);
            current = current.next;
        }
        return res.toString();
    },
    removeAt: function (index) {
        if(index >= 0 && index < this.length && Number.isInteger(index)){
            var current = this.head;
            var prev = null;
            if (index === 0){
                this.head = this.head.next;
            }else {
                while (index--){
                    prev = current;
                    current = current.next;
                }
                prev.next = current.next;
            }
            this.length--;
            return current.element;
        }else {
            return null;
        }
    },
    remove: function () {
        // return this.removeAt(this.length-1); // 复用removeAt方法来删除元素
        if (this.head) {
            var current = this.head;
            var prev = null;
            while (current.next){
                prev = current;
                current = current.next;
            }
            if(prev){
                prev.next = null;
            }else{
                this.head = null
            }
            this.length--;
            return current.element;
        }
        return null;
    },
    indexOf: function (element) {
        var current = this.head;
        var index = -1;
        while (current){
            index++;
            if (current.element === element){
                return index;
            }
            current = current.next;
        }
        return -1;
    },
    size: function () {
        return this.length;
    },
    isEmpty: function () {
        return this.length === 0;
    }
}





 