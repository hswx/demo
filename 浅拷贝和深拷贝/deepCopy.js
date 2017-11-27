function deepCopy(obj, finalRes) {
    var res = finalRes || {};
    for (var i in obj) {
        var prop = obj[i];
        if(prop === res) { // 这里防止obj对象中的属性值也是obj导致死循环
            continue;
        }
        if (typeof prop === 'object') {
            res[i] = (prop.constructor === Array) ? [] : {}; 
            deepCopy(prop, res[i]);
        } else { // prop是基本类型或者是function的情况下
            res[i] = prop;
        }
    }
    return res;
}
