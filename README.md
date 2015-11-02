# yaksok.js
한글 프로그래밍 언어 [약속](http://yaksok.org/)을 다루기 위한 자바스크립트 라이브러리입니다.

## 예시
```js
var compiler = new yaksok.impl.JsTargetCompiler();
compiler.plugins.add(new yaksok.plugin.ConstantFolder({ dce: true }));
compiler.compile(`


약속 예제 뭘로하지
    결과: '몰라'
만약 (예제 뭘로하지) = '몰라' 이면
    '어쩌라고' 보여주기

# 아, 이런거 되는거 자랑해야지
만약 1 < 2 이면
    '이 코드는 살아남는 코드입니다' 보여주기
아니라면
    '이 코드는 사라지는 코드입니다' 보여주기


`).then(js => {
    console.log(js);
});
```
위 코드는 아래의 코드를 출력합니다.
```js
(function () {
"use strict";
function y0s예제_뭘로하지() {
    var 결과;
    결과 = "몰라";
    return 결과;
}
if ((y0s예제_뭘로하지() === "몰라")) {
    console.log("어쩌라고");
}
console.log("이 코드는 살아남는 코드입니다");
})();
```

복사해서 웹브라우저 개발자도구에 붙이고 실행해보세요!


## 직접 돌려보기

먼저 nodejs를 설치하세요.

* osx: [brew](http://brew.sh/) 설치 후 `brew install node`
* windows: [chocolatey](https://chocolatey.org/) 설치 후 `choco install nodejs`
* ubuntu: `sudo apt-get install nodejs npm`

1. `cd 저장소_최상위_폴더`
2. `npm install`
3. `npm run build` or `npm run watch`
4. `node dist/test`

## 빌드명령어

* `npm run build` 그냥 한 번 빌드합니다.
* `npm run watch` 파일이 수정될 때마다 알아서 다시 빌드합니다.
* `npm run clean` 빌드된 파일을 다 지웁니다.
* `npm run min` 실제로 배포할 코드를 빌드합니다.


## 이 라이브러리의 목표인 것
* node.js(0.10+)와 브라우저(ie9+)에서 작동
* 가능하면 사람도 읽을 수 있는 코드가 뽑히도록 컴파일
* 기본적인 컴파일타임 최적화
    * 런타임 최소화


## 이 라이브러리의 목표가 아닌 것
* 약속 레퍼런스 구현과의 호환성
* 컴파일된 결과 코드가 옛 브라우저(internet explorer)에서 작동
    * 그건 [babel](http://babeljs.io/)에게 맡기겠습니다.
* 런타임 api 제공
    * 약속 소스코드에서 nodejs api를 사용하고 싶다면 이 라이브러리를 가져다 node-yaksok 같은 녀석을 만들면 됩니다.


## 소스코드 라이센스
zlib 라이센스 하에 배포합니다. `LICENSE` 파일을 보세요.
