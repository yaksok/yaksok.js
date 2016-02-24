import fs from 'fs';
import path from 'path';
import marked from 'marked';

let renderer = new marked.Renderer();

renderer.heading = function (text, level, raw) {
  return '<h'
    + level
    + ' id="'
    + this.options.headerPrefix
    + raw
    + '">'
    + text
    + '</h'
    + level
    + '>\n';
};

renderer.code = function (code, language) {
    return '<pre class="code">' + code + '</pre>'
};

marked.setOptions({
    renderer: renderer,
    gfm: true
});

let markdownFileName = path.join(__dirname, '../gh-pages/learn.md');
let htmlFileName = path.join(__dirname, '../gh-pages/learn.html');

let markdownContent = fs.readFileSync(markdownFileName, 'utf8');
let htmlContent = '<!DOCTYPE html>\n' +
    '<html><head><link rel="stylesheet" type="text/css" href="css/base.css"></head>\n<body>\n<div id="content">\n' +
    marked(markdownContent) +
    '</div>\n</body>\n</html>\n';

fs.writeFileSync(htmlFileName, htmlContent)
