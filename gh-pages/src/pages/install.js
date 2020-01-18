function Page() {
    return <>
        <h1>Node.js</h1>
        <pre className="simple code">{nodejsText}</pre>
        <h1>HTML</h1>
        <pre className="code">{htmlText}</pre>
    </>;
}

export default Page;

const nodejsText = `# ysjs 설치
$ npm install -g yaksok

# 컴파일
$ ysjs compile "소스코드.yak" -o "결과.js"`;

const htmlText = `<!-- yaksok.js -->
<script src="https://yaksokjs.0xabcdef.com/yaksok.min.js"></script>

<!-- 아래와 같이 사용합니다. -->
<script>
var compiler = new yaksok.compiler.JsTargetCompiler();
compiler.plugins.add(new yaksok.plugin.ConstantFolder({ dce: true }));
compiler.compile(\`


약속 (숫자)의 피보나치
    만약 숫자 = 0 이면
        결과: 0
    아니면서 만약 숫자 = 1 이면
        결과: 1
    아니라면
        결과: ((숫자-1)의 피보나치) + ((숫자-2)의 피보나치)

(10의 피보나치) 보여주기


\`).then(js => {
    console.log(js);
});
</script>`;
