class YaksokList extends Array {
    get 길이() {
        return (this[0] === void 0) ? this.length - 1 : this.length;
    }
    *[Symbol.iterator]() {
        for (
            let i = this[0] === void 0 ? 1 : 0;
            i < this.length;
            ++i
        ) yield this[i];
    }
    toJsArray() {
        let copy = this.slice();
        copy.shift();
        return copy;
    }
}
YaksokList.prototype.isYaksokList = true;
function yaksokList(array) {
    array.constructor = YaksokList;
    array.__proto__ = YaksokList.prototype;
    return array;
}
