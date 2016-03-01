const babel = eval('require("babel-core")');

export default function transform(js) {
    return babel.transform(js, {
        presets: [ 'es2015' ],
        plugins: [ 'transform-runtime' ]
    }).code;
}
