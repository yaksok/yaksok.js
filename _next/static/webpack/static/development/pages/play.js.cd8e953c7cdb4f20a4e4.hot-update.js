webpackHotUpdate("static/development/pages/play.js",{

/***/ "./src/pages/play.js":
/*!***************************!*\
  !*** ./src/pages/play.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/regenerator */ "./node_modules/@babel/runtime-corejs2/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-jsx/style */ "./node_modules/styled-jsx/style.js");
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_jsx_style__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var yaksok__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! yaksok */ "./node_modules/yaksok/dist/yaksok.min.js");
/* harmony import */ var yaksok__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(yaksok__WEBPACK_IMPORTED_MODULE_3__);

var _jsxFileName = "/Users/disjukr/dev/yaksok.js/gh-pages/src/pages/play.js";


var __jsx = react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement;



function Page() {
  var examplesSelectRef = Object(react__WEBPACK_IMPORTED_MODULE_2__["useRef"])();
  var srcEditorRef = Object(react__WEBPACK_IMPORTED_MODULE_2__["useRef"])();
  var dstEditorRef = Object(react__WEBPACK_IMPORTED_MODULE_2__["useRef"])();

  var loadExample = function loadExample(file) {
    var text;
    return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.async(function loadExample$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.awrap(fetch('/examples/' + file).then(function (res) {
              return res.text();
            }));

          case 2:
            text = _context.sent;

            if (srcEditorRef.current) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return");

          case 5:
            srcEditorRef.current.setValue(text);
            srcEditorRef.current.execCommand('gotoend');

          case 7:
          case "end":
            return _context.stop();
        }
      }
    });
  };

  var execute = function execute() {
    if (!dstEditor.current) return;
    eval(dstEditor.current.getValue());
  };

  Object(react__WEBPACK_IMPORTED_MODULE_2__["useEffect"])(function () {
    var srcEditor = ace.edit('src-editor');
    var dstEditor = ace.edit('dst-editor');
    srcEditorRef.current = srcEditor;
    dstEditorRef.current = dstEditor;
    var compiler = new yaksok__WEBPACK_IMPORTED_MODULE_3__["compiler"].JsTargetCompiler();
    compiler.plugins.add(new yaksok__WEBPACK_IMPORTED_MODULE_3__["plugin"].ConstantFolder({
      dce: true
    }));
    compiler.plugins.add(new yaksok__WEBPACK_IMPORTED_MODULE_3__["plugin"].UnusedDefRemover());
    var current = 0;
    var lastModified = 0;
    var compiling = false;

    function compile() {
      lastModified = +new Date();
    }

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

    {
      // src config
      editorConfig(srcEditor);

      var YaksokMode = ace.require('ace/mode/yaksok').Mode;

      srcEditor.getSession().setMode(new YaksokMode());
    }
    {
      // dst config
      editorConfig(dstEditor, {
        readOnly: true,
        mode: 'ace/mode/javascript'
      });
    }
    loadExample(examplesSelectRef.current.value);
    srcEditor.getSession().on('change', compile);
    setInterval(function _callee() {
      var js, msg;
      return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.async(function _callee$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(current > lastModified)) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt("return");

            case 2:
              if (!compiling) {
                _context2.next = 4;
                break;
              }

              return _context2.abrupt("return");

            case 4:
              compiling = true;
              _context2.prev = 5;
              _context2.next = 8;
              return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.awrap(compiler.compile(srcEditor.getValue() || ''));

            case 8:
              js = _context2.sent;
              dstEditor.setValue(js);
              dstEditor.execCommand('gotoend');
              current = +new Date();
              compiling = false;
              _context2.next = 22;
              break;

            case 15:
              _context2.prev = 15;
              _context2.t0 = _context2["catch"](5);
              msg = (_context2.t0 instanceof Error || _context2.t0.message ? _context2.t0.message : _context2.t0) + '';
              dstEditor.setValue(msg);
              dstEditor.execCommand('gotoend');
              current = +new Date();
              compiling = false;

            case 22:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[5, 15]]);
    }, 1);
  }, []);
  return __jsx(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null, __jsx("div", {
    className: "jsx-3290074322" + " " + "wrap",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 75
    },
    __self: this
  }, __jsx("div", {
    className: "jsx-3290074322" + " " + "col left",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 76
    },
    __self: this
  }, __jsx("div", {
    className: "jsx-3290074322" + " " + "row",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 77
    },
    __self: this
  }, __jsx("div", {
    className: "jsx-3290074322" + " " + "title",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 78
    },
    __self: this
  }, "\uC57D\uC18D \uC18C\uC2A4\uCF54\uB4DC"), __jsx("select", {
    ref: examplesSelectRef,
    id: "examples",
    onChange: function onChange(e) {
      return loadExample(e.target.value);
    },
    className: "jsx-3290074322",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 79
    },
    __self: this
  }, __jsx("option", {
    value: "fibonacci.yak",
    className: "jsx-3290074322",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 83
    },
    __self: this
  }, "\uD53C\uBCF4\uB098\uCE58"), __jsx("option", {
    value: "bubble-sort.yak",
    className: "jsx-3290074322",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 84
    },
    __self: this
  }, "\uBC84\uBE14\uC18C\uD2B8"))), __jsx("div", {
    id: "src-editor",
    className: "jsx-3290074322" + " " + "editor",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 87
    },
    __self: this
  })), __jsx("div", {
    className: "jsx-3290074322" + " " + "col right",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 89
    },
    __self: this
  }, __jsx("div", {
    className: "jsx-3290074322" + " " + "row",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 90
    },
    __self: this
  }, __jsx("div", {
    className: "jsx-3290074322" + " " + "title",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 91
    },
    __self: this
  }, "\uC790\uBC14\uC2A4\uD06C\uB9BD\uD2B8 \uACB0\uACFC\uCF54\uB4DC"), __jsx("button", {
    id: "run",
    onClick: execute,
    className: "jsx-3290074322",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 92
    },
    __self: this
  }, "\uC2E4\uD589\uD558\uAE30")), __jsx("div", {
    id: "dst-editor",
    className: "jsx-3290074322" + " " + "editor",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 94
    },
    __self: this
  }))), __jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_1___default.a, {
    id: "3290074322",
    __self: this
  }, ".wrap{margin:0 auto;max-width:1024px;width:calc(100% - 40px);height:calc(100% - 20px);}.col{width:calc(50% - 5px);height:100%;}.col.left{float:left;}.col.right{float:right;}.row{margin:5px 0;width:100%;height:30px;}.row .title{display:inline-block;height:100%;padding:1px 5px;font-size:18px;font-weight:lighter;}.editor{width:100%;height:calc(100% - 40px);}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kaXNqdWtyL2Rldi95YWtzb2suanMvZ2gtcGFnZXMvc3JjL3BhZ2VzL3BsYXkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBZ0cyQixBQUcrQixBQU1RLEFBR0osQUFDRSxBQUVQLEFBS1EsQUFPVixXQWZRLEFBZ0JNLENBZkosQ0FHVixDQVpNLE9BaUJMLENBWEEsRUFPQSxPQVpZLEVBaUJSLENBWHBCLEVBT0EsQUFXQSxhQU5tQixNQWpCVSxTQWtCTCxnQkFqQnhCLElBa0JBIiwiZmlsZSI6Ii9Vc2Vycy9kaXNqdWtyL2Rldi95YWtzb2suanMvZ2gtcGFnZXMvc3JjL3BhZ2VzL3BsYXkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VFZmZlY3QsIHVzZVJlZiB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCAqIGFzIHlha3NvayBmcm9tICd5YWtzb2snO1xuXG5mdW5jdGlvbiBQYWdlKCkge1xuICAgIGNvbnN0IGV4YW1wbGVzU2VsZWN0UmVmID0gdXNlUmVmKCk7XG4gICAgY29uc3Qgc3JjRWRpdG9yUmVmID0gdXNlUmVmKCk7XG4gICAgY29uc3QgZHN0RWRpdG9yUmVmID0gdXNlUmVmKCk7XG4gICAgY29uc3QgbG9hZEV4YW1wbGUgPSBhc3luYyBmaWxlID0+IHtcbiAgICAgICAgY29uc3QgdGV4dCA9IGF3YWl0IGZldGNoKCcvZXhhbXBsZXMvJyArIGZpbGUpLnRoZW4ocmVzID0+IHJlcy50ZXh0KCkpO1xuICAgICAgICBpZiAoIXNyY0VkaXRvclJlZi5jdXJyZW50KSByZXR1cm47XG4gICAgICAgIHNyY0VkaXRvclJlZi5jdXJyZW50LnNldFZhbHVlKHRleHQpO1xuICAgICAgICBzcmNFZGl0b3JSZWYuY3VycmVudC5leGVjQ29tbWFuZCgnZ290b2VuZCcpO1xuICAgIH07XG4gICAgY29uc3QgZXhlY3V0ZSA9ICgpID0+IHtcbiAgICAgICAgaWYgKCFkc3RFZGl0b3IuY3VycmVudCkgcmV0dXJuO1xuICAgICAgICBldmFsKGRzdEVkaXRvci5jdXJyZW50LmdldFZhbHVlKCkpO1xuICAgIH07XG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgY29uc3Qgc3JjRWRpdG9yID0gYWNlLmVkaXQoJ3NyYy1lZGl0b3InKTtcbiAgICAgICAgY29uc3QgZHN0RWRpdG9yID0gYWNlLmVkaXQoJ2RzdC1lZGl0b3InKTtcbiAgICAgICAgc3JjRWRpdG9yUmVmLmN1cnJlbnQgPSBzcmNFZGl0b3I7XG4gICAgICAgIGRzdEVkaXRvclJlZi5jdXJyZW50ID0gZHN0RWRpdG9yO1xuICAgICAgICBjb25zdCBjb21waWxlciA9IG5ldyB5YWtzb2suY29tcGlsZXIuSnNUYXJnZXRDb21waWxlcigpO1xuICAgICAgICBjb21waWxlci5wbHVnaW5zLmFkZChuZXcgeWFrc29rLnBsdWdpbi5Db25zdGFudEZvbGRlcih7IGRjZTogdHJ1ZSB9KSk7XG4gICAgICAgIGNvbXBpbGVyLnBsdWdpbnMuYWRkKG5ldyB5YWtzb2sucGx1Z2luLlVudXNlZERlZlJlbW92ZXIoKSk7XG4gICAgICAgIGxldCBjdXJyZW50ID0gMDtcbiAgICAgICAgbGV0IGxhc3RNb2RpZmllZCA9IDA7XG4gICAgICAgIGxldCBjb21waWxpbmcgPSBmYWxzZTtcbiAgICAgICAgZnVuY3Rpb24gY29tcGlsZSgpIHsgbGFzdE1vZGlmaWVkID0gKyhuZXcgRGF0ZSgpKTsgfVxuICAgICAgICBmdW5jdGlvbiBlZGl0b3JDb25maWcoZWRpdG9yLCBvcHRpb24pIHtcbiAgICAgICAgICAgIGVkaXRvci5zZXRPcHRpb25zKHtcbiAgICAgICAgICAgICAgICBzZWxlY3Rpb25TdHlsZTogJ3RleHQnLFxuICAgICAgICAgICAgICAgIHVzZVNvZnRUYWJzOiB0cnVlLFxuICAgICAgICAgICAgICAgIGhpZ2hsaWdodEFjdGl2ZUxpbmU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHNob3dQcmludE1hcmdpbjogZmFsc2UsXG4gICAgICAgICAgICAgICAgdGhlbWU6ICdhY2UvdGhlbWUvbW9ub2thaSdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKG9wdGlvbikge1xuICAgICAgICAgICAgICAgIGVkaXRvci5zZXRPcHRpb25zKG9wdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgeyAvLyBzcmMgY29uZmlnXG4gICAgICAgICAgICBlZGl0b3JDb25maWcoc3JjRWRpdG9yKTtcbiAgICAgICAgICAgIGNvbnN0IFlha3Nva01vZGUgPSBhY2UucmVxdWlyZSgnYWNlL21vZGUveWFrc29rJykuTW9kZTtcbiAgICAgICAgICAgIHNyY0VkaXRvci5nZXRTZXNzaW9uKCkuc2V0TW9kZShuZXcgWWFrc29rTW9kZSgpKTtcbiAgICAgICAgfVxuICAgICAgICB7IC8vIGRzdCBjb25maWdcbiAgICAgICAgICAgIGVkaXRvckNvbmZpZyhkc3RFZGl0b3IsIHtcbiAgICAgICAgICAgICAgICByZWFkT25seTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBtb2RlOiAnYWNlL21vZGUvamF2YXNjcmlwdCdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGxvYWRFeGFtcGxlKGV4YW1wbGVzU2VsZWN0UmVmLmN1cnJlbnQudmFsdWUpO1xuICAgICAgICBzcmNFZGl0b3IuZ2V0U2Vzc2lvbigpLm9uKCdjaGFuZ2UnLCBjb21waWxlKTtcbiAgICAgICAgc2V0SW50ZXJ2YWwoYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnQgPiBsYXN0TW9kaWZpZWQpIHJldHVybjtcbiAgICAgICAgICAgIGlmIChjb21waWxpbmcpIHJldHVybjtcbiAgICAgICAgICAgIGNvbXBpbGluZyA9IHRydWU7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGpzID0gYXdhaXQgY29tcGlsZXIuY29tcGlsZShzcmNFZGl0b3IuZ2V0VmFsdWUoKSB8fCAnJyk7XG4gICAgICAgICAgICAgICAgZHN0RWRpdG9yLnNldFZhbHVlKGpzKTtcbiAgICAgICAgICAgICAgICBkc3RFZGl0b3IuZXhlY0NvbW1hbmQoJ2dvdG9lbmQnKTtcbiAgICAgICAgICAgICAgICBjdXJyZW50ID0gKyhuZXcgRGF0ZSgpKTtcbiAgICAgICAgICAgICAgICBjb21waWxpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIGNvbnN0IG1zZyA9ICgoZXJyIGluc3RhbmNlb2YgRXJyb3IgfHwgZXJyLm1lc3NhZ2UpID8gZXJyLm1lc3NhZ2UgOiBlcnIpICsgJyc7XG4gICAgICAgICAgICAgICAgZHN0RWRpdG9yLnNldFZhbHVlKG1zZyk7XG4gICAgICAgICAgICAgICAgZHN0RWRpdG9yLmV4ZWNDb21tYW5kKCdnb3RvZW5kJyk7XG4gICAgICAgICAgICAgICAgY3VycmVudCA9ICsobmV3IERhdGUoKSk7XG4gICAgICAgICAgICAgICAgY29tcGlsaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDEpO1xuICAgIH0sIFtdKTtcbiAgICByZXR1cm4gPD5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3cmFwXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCBsZWZ0XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aXRsZVwiPuyVveyGjSDshozsiqTsvZTrk5w8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPHNlbGVjdFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVmPXtleGFtcGxlc1NlbGVjdFJlZn1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlkPVwiZXhhbXBsZXNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e2UgPT4gbG9hZEV4YW1wbGUoZS50YXJnZXQudmFsdWUpfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJmaWJvbmFjY2kueWFrXCI+7ZS867O064KY7LmYPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiYnViYmxlLXNvcnQueWFrXCI+67KE67iU7IaM7Yq4PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJzcmMtZWRpdG9yXCIgY2xhc3NOYW1lPVwiZWRpdG9yXCI+PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sIHJpZ2h0XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aXRsZVwiPuyekOuwlOyKpO2BrOumve2KuCDqsrDqs7zsvZTrk5w8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBpZD1cInJ1blwiIG9uQ2xpY2s9e2V4ZWN1dGV9PuyLpO2Wie2VmOq4sDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJkc3QtZWRpdG9yXCIgY2xhc3NOYW1lPVwiZWRpdG9yXCI+PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxzdHlsZSBnbG9iYWwganN4PntgXG4gICAgICAgICAgICAud3JhcCB7XG4gICAgICAgICAgICAgICAgbWFyZ2luOiAwIGF1dG87XG4gICAgICAgICAgICAgICAgbWF4LXdpZHRoOiAxMDI0cHg7XG4gICAgICAgICAgICAgICAgd2lkdGg6IGNhbGMoMTAwJSAtIDQwcHgpO1xuICAgICAgICAgICAgICAgIGhlaWdodDogY2FsYygxMDAlIC0gMjBweCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAuY29sIHtcbiAgICAgICAgICAgICAgICB3aWR0aDogY2FsYyg1MCUgLSA1cHgpO1xuICAgICAgICAgICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC5jb2wubGVmdCB7IGZsb2F0OiBsZWZ0OyB9XG4gICAgICAgICAgICAuY29sLnJpZ2h0IHsgZmxvYXQ6IHJpZ2h0OyB9XG4gICAgICAgICAgICAucm93IHtcbiAgICAgICAgICAgICAgICBtYXJnaW46IDVweCAwO1xuICAgICAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgICAgICAgIGhlaWdodDogMzBweDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC5yb3cgLnRpdGxlIHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICAgICAgICAgIHBhZGRpbmc6IDFweCA1cHg7XG4gICAgICAgICAgICAgICAgZm9udC1zaXplOiAxOHB4O1xuICAgICAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiBsaWdodGVyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLmVkaXRvciB7XG4gICAgICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiBjYWxjKDEwMCUgLSA0MHB4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgYH08L3N0eWxlPlxuICAgIDwvPjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgUGFnZTtcbiJdfQ== */\n/*@ sourceURL=/Users/disjukr/dev/yaksok.js/gh-pages/src/pages/play.js */"));
}

/* harmony default export */ __webpack_exports__["default"] = (Page);

/***/ })

})
//# sourceMappingURL=play.js.cd8e953c7cdb4f20a4e4.hot-update.js.map