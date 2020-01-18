import { useEffect, useRef } from 'react';
import * as yaksok from 'yaksok';

function Page() {
    const examplesSelectRef = useRef();
    const srcEditorRef = useRef();
    const dstEditorRef = useRef();
    const loadExample = async file => {
        const text = await fetch('/examples/' + file).then(res => res.text());
        if (!srcEditorRef.current) return;
        srcEditorRef.current.setValue(text);
        srcEditorRef.current.execCommand('gotoend');
    };
    const execute = () => {
        if (!dstEditorRef.current) return;
        eval(dstEditorRef.current.getValue());
    };
    useEffect(() => {
        const srcEditor = ace.edit('src-editor');
        const dstEditor = ace.edit('dst-editor');
        srcEditorRef.current = srcEditor;
        dstEditorRef.current = dstEditor;
        const compiler = new yaksok.compiler.JsTargetCompiler();
        compiler.plugins.add(new yaksok.plugin.ConstantFolder({ dce: true }));
        compiler.plugins.add(new yaksok.plugin.UnusedDefRemover());
        let current = 0;
        let lastModified = 0;
        let compiling = false;
        function compile() { lastModified = +(new Date()); }
        function editorConfig(editor, option) {
            editor.setOptions({
                selectionStyle: 'text',
                useSoftTabs: true,
                highlightActiveLine: false,
                showPrintMargin: false,
                theme: 'ace/theme/monokai'
            });
            if (option) {
                editor.setOptions(option);
            }
        }
        { // src config
            editorConfig(srcEditor);
            const YaksokMode = ace.require('ace/mode/yaksok').Mode;
            srcEditor.getSession().setMode(new YaksokMode());
        }
        { // dst config
            editorConfig(dstEditor, {
                readOnly: true,
                mode: 'ace/mode/javascript'
            });
        }
        loadExample(examplesSelectRef.current.value);
        srcEditor.getSession().on('change', compile);
        setInterval(async function () {
            if (current > lastModified) return;
            if (compiling) return;
            compiling = true;
            try {
                const js = await compiler.compile(srcEditor.getValue() || '');
                dstEditor.setValue(js);
                dstEditor.execCommand('gotoend');
                current = +(new Date());
                compiling = false;
            } catch (err) {
                const msg = ((err instanceof Error || err.message) ? err.message : err) + '';
                dstEditor.setValue(msg);
                dstEditor.execCommand('gotoend');
                current = +(new Date());
                compiling = false;
            }
        }, 1);
    }, []);
    return <>
        <div className="wrap">
            <div className="col left">
                <div className="row">
                    <div className="title">약속 소스코드</div>
                    <select
                        ref={examplesSelectRef}
                        id="examples"
                        onChange={e => loadExample(e.target.value)}>
                        <option value="fibonacci.yak">피보나치</option>
                        <option value="bubble-sort.yak">버블소트</option>
                    </select>
                </div>
                <div id="src-editor" className="editor"></div>
            </div>
            <div className="col right">
                <div className="row">
                    <div className="title">자바스크립트 결과코드</div>
                    <button id="run" onClick={execute}>실행하기</button>
                </div>
                <div id="dst-editor" className="editor"></div>
            </div>
        </div>
        <style global jsx>{`
            .wrap {
                margin: 0 auto;
                width: calc(100% - 40px);
                height: calc(100% - 20px);
            }
            .col {
                width: calc(50% - 5px);
                height: 100%;
            }
            .col.left { float: left; }
            .col.right { float: right; }
            .row {
                margin: 5px 0;
                width: 100%;
                height: 30px;
            }
            .row .title {
                display: inline-block;
                height: 100%;
                padding: 1px 5px;
                font-size: 18px;
                font-weight: lighter;
            }
            .editor {
                width: 100%;
                height: calc(100% - 40px);
            }
        `}</style>
    </>;
}

export default Page;
