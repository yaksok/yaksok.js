import { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import GithubCorner from 'react-github-corner';

const NavLink = ({ href, className, children, ...rest }) => {
    const router = useRouter();
    const active = router.pathname.startsWith(href);
    const activeClassName = active ? ' active' : '';
    return <Link
        href={href}
        {...rest}
    >
        <a className={(className || '') + activeClassName}>
            {children}
        </a>
    </Link>;
};

function App({ Component, pageProps }) {
    const router = useRouter();
    const isPlayPage = router.pathname.startsWith('/play');
    useEffect(() => {
        const YaksokMode = ace.require('ace/mode/yaksok').Mode;
        for (const editorDiv of document.querySelectorAll('.md-code:not(.ace_editor)')) {
            const language = editorDiv.dataset.language;
            const editor = ace.edit(editorDiv);
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
                if (language === 'yaksok') {
                    editor.getSession().setMode(new YaksokMode());
                } else {
                    editor.setOptions({
                        mode: 'ace/mode/' + language
                    });
                }
            }
        }
    });
    return <>
        <Head>
            <title>yaksok.js</title>
            <script src="https://ajaxorg.github.io/ace-builds/src-noconflict/ace.js"></script>
            <script src="https://ajaxorg.github.io/ace-builds/src-noconflict/mode-python.js"></script>
            <script src="/mode-yaksok.js"></script>
        </Head>
        <GithubCorner
            href="https://github.com/yaksok/yaksok.js"
            octoColor="#2f3129"
            bannerColor="#f0f0f0"
        />
        <header id="header">
            <div id="logo">
                <Link href="/">
                    <a>
                        <img src="/logo.svg"/>
                    </a>
                </Link>
            </div>
            <NavLink href="/learn">배우기</NavLink>
            <NavLink href="/play">놀이터</NavLink>
            <NavLink href="/install">설치하기</NavLink>
        </header>
        <div id="content" className={isPlayPage ? 'full-width' : ''}>
            <div style={{ height: '1px' }}/>
            <Component {...pageProps} />
        </div>
        <style global jsx>{`
            #header {
                display: flex;
                margin: 20px auto;
                width: 720px;
                height: 80px;
            }
            #logo > a {
                width: 220px;
            }
            #header > * {
                display: inline-flex;
                margin: auto;
            }
            #header > a {
                height: 100%;
                line-height: 80px;
                text-decoration: none;
                font-size: 30px;
                font-weight: lighter;
                color: #f0f0f0;
                box-sizing: border-box;
                border-bottom: 0px solid #f0f0f0;
                transition: border 0.3s;
            }
            #header > a.active {
                border-bottom: 2px solid #808080;
            }
            #header > a:hover {
                font-weight: normal;
                border-bottom: 5px solid #f0f0f0;
            }
        `}</style>
        <style global jsx>{`
            @import url(https://fonts.googleapis.com/earlyaccess/notosanskr.css);
            html, body {
                margin: 0;
                padding: 0;
                width: 100%;
                height: 100%;
                font-family: 'Noto Sans KR', sans-serif;
            }
            body {
                display: flex;
                background-color: #2f3129;
                color: #f0f0f0;
            }
            #__next {
                flex-grow: 1;
            }
            a { color: #66d9ef; } a:visited { color: #e6d874; }
            h1, h2, h3 { font-weight: lighter; }
            h1.headline { font-weight: normal; }
            p { text-indent: 1em; }
            iframe {
                display: block;
                margin: 0 auto;
                width: 640px;
                height: 510px;
                border: none;
            }
            code, pre.code {
                font-family: monospace;
                background-color: #272822;
                word-wrap: break-word;
            }
            code {
                color: #f92672;
                padding: 3px 5px;
                border-radius: 3px;
            }
            pre.code {
                padding: 10px 20px;
                border-radius: 5px;
            }
            pre.simple.code { font-size: 14pt; }
            #content {
                box-sizing: border-box;
                margin: 0 auto;
                margin-bottom: 50vh;
                width: 720px;
                height: 100%;
            }
            #content.full-width {
                width: 100vw;
            }
            pre code {
                padding: 0px;
            }
            blockquote {
                border-left: 10px solid rgba(128,128,128,0.075);
                background-color:rgba(128,128,128,0.1);
                border-top-right-radius:5px;
                border-bottom-right-radius:5px;
                padding:15px 20px
            }
        `}</style>
    </>;
}
export default App;
