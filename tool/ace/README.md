# mode-yaksok

[ace editor](https://ace.c9.io/) 전용 약속 언어 플러그인입니다.

다음의 기능들을 제공합니다:

- 약속 문법 강조
- 코드 접기
    - (TODO) 번역 접기
- 자동 들여쓰기
- (TODO) 자동 내어쓰기
- (TODO) 코드 자동완성


## 사용법

```html
<!-- noconflict 버전의 ace가 필요합니다 -->
<script type="text/javascript" src="http://ajaxorg.github.io/ace-builds/src-noconflict/ace.js"></script>
<!-- mode-python.js도 같이 포함해야 합니다. -->
<script type="text/javascript" src="http://ajaxorg.github.io/ace-builds/src-noconflict/mode-python.js"></script>
<script type="text/javascript" src="mode-yaksok.js"></script>
```
```js
var YaksokMode = ace.require('ace/mode/yaksok').Mode;
editor.getSession().setMode(new YaksokMode());
```
