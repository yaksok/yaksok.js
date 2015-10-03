YaksokRuntime.range = function (start, stop) {
    return {
        [Symbol.iterator]: function* () {
            for (let i = start; i <= stop; ++i) yield i;
        }
    };
};
