YaksokRuntime.log = function (value) {
    switch (typeof value) {
    case 'boolean': console.log(value ? '참' : '거짓'); return;
    case 'object': {
        if (Array.isArray(value)) {
            let copy = value.slice();
            copy.shift();
            console.log(copy);
        } else {
            console.log(value);
        }
    } return;
    default: console.log(value); return;
    }
};
