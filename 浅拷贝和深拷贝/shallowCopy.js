function shallowCopy(obj) {
    var result = {};
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            result[key] = obj[key];
        }
    }
    return result;
}
