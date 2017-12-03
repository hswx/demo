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
function Node(element){
    this.element = element;
    this.prev = null;
    this.next = null;
}

function DoubleLinkedList() {
    this.head = null;
    this.foot = null;
    this.length = 0;
}

DoubleLinkedList.prototype ={
    append: function (element) {
        var node  = new Node(element);
        if (this.length === 0){
            this.head = node;
            this.foot = node;
        }else{
            this.foot.next = node;
            node.prev = this.foot;
            this.foot = node;
        }
        this.length++;
    },
    insert: function (index, element) {
        var node = new Node(element);
        if (index >= 0 && index <= this.length && Number.isInteger(index)){
            if(index === 0){
                if (this.length === 0){
                    this.head = node;
                    this.foot = node;
                }else{
                    this.head.prev = node;
                    node.next = this.head.next;
                    this.head = node;
                }
            }else if (index === this.length){
                this.foot.next = node;
                node.prev = this.foot;
                this.foot = node;
            }else{
                var current = this.head;
                while (index){
                    index--;
                    current = current.next;
                }
                node.prev = current.prev;
                node.next = current;
                current.prev.next = node;
                current.prev = node;
            }
            this.length++;
        }else{
            return false
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
    }

}