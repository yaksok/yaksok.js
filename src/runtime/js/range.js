function yaksokRange(start, stop) {
    return {
        get 시작() { return start; },
        get 끝() { return stop; },
        [Symbol.iterator]: function* () {
            for (let i = start; i <= stop; ++i) yield i;
        }
    };
}
