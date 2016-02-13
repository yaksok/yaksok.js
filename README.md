<img src="https://cdn.rawgit.com/agemor/yaksok.js/master/logo/logo-noir.svg" width="256">

한글 프로그래밍 언어 [약속](http://yaksok.org/)을 다루기 위한 자바스크립트 라이브러리입니다.

[![build status](https://travis-ci.org/disjukr/yaksok.js.svg)](https://travis-ci.org/disjukr/yaksok.js)


## yaksok.js 써보기

nodejs를 설치합니다.

* osx: [brew](http://brew.sh/) 설치 후 `brew install node`
* windows: [chocolatey](https://chocolatey.org/) 설치 후 `choco install nodejs`
* ubuntu: `sudo apt-get install nodejs npm`

yaksok.js를 설치합니다:

```sh
$ npm install -g yaksok
```

`package.yaml` 파일을 만들고 다음과 같이 입력합니다:

```yaml
시작: 메인
결과: result.js
```

`메인.약속` 혹은 `메인.yak` 파일을 만들고 다음과 같이 입력합니다:

```yaksok
'안녕하세요' 보여주기
```

다음과 같이 컴파일하고 실행해봅니다:

```sh
$ ysjs compile
$ node result
안녕하세요
```


## 더 알아보기

* [약속.js 놀이터](http://0xabcdef.com/yaksok.js/#play) 여기서 약속 코드가 어떻게 컴파일 되는지 확인해보세요.
* [약속.js 배우기](http://0xabcdef.com/yaksok.js/#learn) 약속 프로그래밍 언어의 문법은 이 곳에서 배우실 수 있습니다.
* [약속.js 위키](https://github.com/disjukr/yaksok.js/wiki) yaksok.js의 세부 기능을 알아보고 싶다면 여기로 가시면 됩니다.


## 소스코드 라이센스
zlib 라이센스 하에 배포합니다. `LICENSE` 파일을 보세요.
