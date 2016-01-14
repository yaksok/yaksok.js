function yaksokLog(value) {
    switch (typeof value) {
    case 'boolean': console.log(value ? '참' : '거짓'); return;
    case 'object': {
        if (value.isYaksokList) {
            console.log(value.toJsArray());
        } else {
            console.log(value);
        }
    } return;
    case 'undefined': console.log('()'); return;
    default: console.log(value); return;
    }
}
