import fs from 'fs';
import path from 'path';
import marked from 'marked';

let renderer = new marked.Renderer();

renderer.heading = function (text, level, raw) {
  return `<h${level} id="${this.options.headerPrefix}${raw}">${text}</h${level}>\n`;
};

let codeCount = 0;

renderer.code = function (code, language) {
    return `<div id="code-${codeCount++}" class="editor"${language ? ' data-language="' + language + '"' : ''}>${code}</div>`;
};

marked.setOptions({
    renderer: renderer,
    gfm: true
});

let markdownFileName = path.join(__dirname, '../gh-pages/learn.md');
let htmlFileName = path.join(__dirname, '../gh-pages/learn.html');

let markdownContent = fs.readFileSync(markdownFileName, 'utf8');
let htmlContent = `<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" type="text/css" href="css/base.css">
    <script src="http://ajaxorg.github.io/ace-builds/src-noconflict/ace.js"></script>
    <script src="http://ajaxorg.github.io/ace-builds/src-noconflict/mode-python.js"></script>
    <script src="../tool/ace/mode-yaksok.js"></script>
    <style type="text/css">
    .editor {
        width: 100%;
        margin-top: 15px;
        margin-bottom: 15px;
    }
    </style>
</head>
<body>
<div id="content">
${marked(markdownContent)}
</div>
<script>
    var YaksokMode = ace.require('ace/mode/yaksok').Mode;

    var language;
    var editor;
    for (var i = 0; i < ${codeCount}; i++) {
        language = document.getElementById('code-' + i).getAttribute('data-language');

        editor = ace.edit('code-' + i);
        editor.setOptions({
            selectionStyle: 'text',
            useSoftTabs: true,
            highlightActiveLine: false,
            showPrintMargin: false,
            showGutter: false,
            theme: 'ace/theme/monokai',
            readOnly: true,
            maxLines: Infinity
        });

        if (language) {
            if (language == 'yaksok') {
                editor.getSession().setMode(new YaksokMode());
            } else {
                editor.setOptions({
                    mode: 'ace/mode/' + language
                })
            }
        }
    }
</script>
</body>
</html>`;

fs.writeFileSync(htmlFileName, htmlContent)
