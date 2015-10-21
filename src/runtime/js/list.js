class YaksokList extends Array {
    get 길이() {
        return (this[0] === void 0) ? this.length - 1 : this.length;
    }
}
function yaksokList(array) {
    array.constructor = YaksokList;
    array.__proto__ = YaksokList.prototype;
    return array;
}
