webpackHotUpdate("static/development/pages/play.js",{

/***/ "./src/pages/play.js":
/*!***************************!*\
  !*** ./src/pages/play.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-jsx/style */ "./node_modules/styled-jsx/style.js");
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var yaksok__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! yaksok */ "./node_modules/yaksok/dist/yaksok.min.js");
/* harmony import */ var yaksok__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(yaksok__WEBPACK_IMPORTED_MODULE_2__);
var _jsxFileName = "/Users/disjukr/dev/yaksok.js/gh-pages/src/pages/play.js";


var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;



function Page() {
  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    var srcEditor = ace.edit('src-editor');
    var dstEditor = ace.edit('dst-editor');
    var compiler = new yaksok__WEBPACK_IMPORTED_MODULE_2__["compiler"].JsTargetCompiler();
    compiler.plugins.add(new yaksok__WEBPACK_IMPORTED_MODULE_2__["plugin"].ConstantFolder({
      dce: true
    }));
    compiler.plugins.add(new yaksok__WEBPACK_IMPORTED_MODULE_2__["plugin"].UnusedDefRemover());
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
    } // function loadExample(file) {
    //     $.ajax({
    //         url:'./examples/' + file,
    //         dataType: 'text'
    //     }).done(function (data) {
    //         srcEditor.setValue(data);
    //         srcEditor.execCommand('gotoend');
    //     });
    // }
    // loadExample($('#examples').val());
    // $('#examples').on('change', function () { loadExample($(this).val()); });
    // $('#run-babel').on('change', compile);
    // srcEditor.getSession().on('change', compile);
    // setInterval(function () {
    //     if (current > lastModified) return;
    //     if (compiling) return;
    //     compiling = true;
    //     compiler.compile(srcEditor.getValue())
    //     .then(function (js) {
    //         if ($('#run-babel').prop('checked')) js = babel.transform(js).code;
    //         dstEditor.setValue(js);
    //         dstEditor.execCommand('gotoend');
    //         current = +(new Date());
    //         compiling = false;
    //     })
    //     .catch(function (err) {
    //         var msg = ((err instanceof Error || err.message) ? err.message : err) + '';
    //         dstEditor.setValue(msg);
    //         dstEditor.execCommand('gotoend');
    //         current = +(new Date());
    //         compiling = false;
    //     });
    // }, 1);
    // $('#run').on('click', function () {
    //     eval(dstEditor.getValue());
    // });
  }, []);
  return __jsx(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, __jsx("div", {
    className: "jsx-3290074322" + " " + "wrap",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 76
    },
    __self: this
  }, __jsx("div", {
    className: "jsx-3290074322" + " " + "col left",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 77
    },
    __self: this
  }, __jsx("div", {
    className: "jsx-3290074322" + " " + "row",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 78
    },
    __self: this
  }, __jsx("div", {
    className: "jsx-3290074322" + " " + "title",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 79
    },
    __self: this
  }, "\uC57D\uC18D \uC18C\uC2A4\uCF54\uB4DC"), __jsx("select", {
    id: "examples",
    className: "jsx-3290074322",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 80
    },
    __self: this
  }, __jsx("option", {
    value: "fibonacci.yak",
    className: "jsx-3290074322",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 81
    },
    __self: this
  }, "\uD53C\uBCF4\uB098\uCE58"), __jsx("option", {
    value: "bubble-sort.yak",
    className: "jsx-3290074322",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 82
    },
    __self: this
  }, "\uBC84\uBE14\uC18C\uD2B8"))), __jsx("div", {
    id: "src-editor",
    className: "jsx-3290074322" + " " + "editor",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 85
    },
    __self: this
  })), __jsx("div", {
    className: "jsx-3290074322" + " " + "col right",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 87
    },
    __self: this
  }, __jsx("div", {
    className: "jsx-3290074322" + " " + "row",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 88
    },
    __self: this
  }, __jsx("div", {
    className: "jsx-3290074322" + " " + "title",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 89
    },
    __self: this
  }, "\uC790\uBC14\uC2A4\uD06C\uB9BD\uD2B8 \uACB0\uACFC\uCF54\uB4DC"), "es5: ", __jsx("input", {
    type: "checkbox",
    id: "run-babel",
    checked: true,
    className: "jsx-3290074322",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 90
    },
    __self: this
  }), __jsx("button", {
    id: "run",
    className: "jsx-3290074322",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 91
    },
    __self: this
  }, "\uC2E4\uD589\uD558\uAE30")), __jsx("div", {
    id: "dst-editor",
    className: "jsx-3290074322" + " " + "editor",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 93
    },
    __self: this
  }))), __jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a, {
    id: "3290074322",
    __self: this
  }, ".wrap{margin:0 auto;max-width:1024px;width:calc(100% - 40px);height:calc(100% - 20px);}.col{width:calc(50% - 5px);height:100%;}.col.left{float:left;}.col.right{float:right;}.row{margin:5px 0;width:100%;height:30px;}.row .title{display:inline-block;height:100%;padding:1px 5px;font-size:18px;font-weight:lighter;}.editor{width:100%;height:calc(100% - 40px);}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kaXNqdWtyL2Rldi95YWtzb2suanMvZ2gtcGFnZXMvc3JjL3BhZ2VzL3BsYXkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBK0YyQixBQUcrQixBQU1RLEFBR0osQUFDRSxBQUVQLEFBS1EsQUFPVixXQWZRLEFBZ0JNLENBZkosQ0FHVixDQVpNLE9BaUJMLENBWEEsRUFPQSxPQVpZLEVBaUJSLENBWHBCLEVBT0EsQUFXQSxhQU5tQixNQWpCVSxTQWtCTCxnQkFqQnhCLElBa0JBIiwiZmlsZSI6Ii9Vc2Vycy9kaXNqdWtyL2Rldi95YWtzb2suanMvZ2gtcGFnZXMvc3JjL3BhZ2VzL3BsYXkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgKiBhcyB5YWtzb2sgZnJvbSAneWFrc29rJztcblxuZnVuY3Rpb24gUGFnZSgpIHtcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICB2YXIgc3JjRWRpdG9yID0gYWNlLmVkaXQoJ3NyYy1lZGl0b3InKTtcbiAgICAgICAgdmFyIGRzdEVkaXRvciA9IGFjZS5lZGl0KCdkc3QtZWRpdG9yJyk7XG4gICAgICAgIHZhciBjb21waWxlciA9IG5ldyB5YWtzb2suY29tcGlsZXIuSnNUYXJnZXRDb21waWxlcigpO1xuICAgICAgICBjb21waWxlci5wbHVnaW5zLmFkZChuZXcgeWFrc29rLnBsdWdpbi5Db25zdGFudEZvbGRlcih7IGRjZTogdHJ1ZSB9KSk7XG4gICAgICAgIGNvbXBpbGVyLnBsdWdpbnMuYWRkKG5ldyB5YWtzb2sucGx1Z2luLlVudXNlZERlZlJlbW92ZXIoKSk7XG4gICAgICAgIHZhciBjdXJyZW50ID0gMDtcbiAgICAgICAgdmFyIGxhc3RNb2RpZmllZCA9IDA7XG4gICAgICAgIHZhciBjb21waWxpbmcgPSBmYWxzZTtcbiAgICAgICAgZnVuY3Rpb24gY29tcGlsZSgpIHsgbGFzdE1vZGlmaWVkID0gKyhuZXcgRGF0ZSgpKTsgfVxuICAgICAgICBmdW5jdGlvbiBlZGl0b3JDb25maWcoZWRpdG9yLCBvcHRpb24pIHtcbiAgICAgICAgICAgIGVkaXRvci5zZXRPcHRpb25zKHtcbiAgICAgICAgICAgICAgICBzZWxlY3Rpb25TdHlsZTogJ3RleHQnLFxuICAgICAgICAgICAgICAgIHVzZVNvZnRUYWJzOiB0cnVlLFxuICAgICAgICAgICAgICAgIGhpZ2hsaWdodEFjdGl2ZUxpbmU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHNob3dQcmludE1hcmdpbjogZmFsc2UsXG4gICAgICAgICAgICAgICAgdGhlbWU6ICdhY2UvdGhlbWUvbW9ub2thaSdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKG9wdGlvbikge1xuICAgICAgICAgICAgICAgIGVkaXRvci5zZXRPcHRpb25zKG9wdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgeyAvLyBzcmMgY29uZmlnXG4gICAgICAgICAgICBlZGl0b3JDb25maWcoc3JjRWRpdG9yKTtcbiAgICAgICAgICAgIHZhciBZYWtzb2tNb2RlID0gYWNlLnJlcXVpcmUoJ2FjZS9tb2RlL3lha3NvaycpLk1vZGU7XG4gICAgICAgICAgICBzcmNFZGl0b3IuZ2V0U2Vzc2lvbigpLnNldE1vZGUobmV3IFlha3Nva01vZGUoKSk7XG4gICAgICAgIH1cbiAgICAgICAgeyAvLyBkc3QgY29uZmlnXG4gICAgICAgICAgICBlZGl0b3JDb25maWcoZHN0RWRpdG9yLCB7XG4gICAgICAgICAgICAgICAgcmVhZE9ubHk6IHRydWUsXG4gICAgICAgICAgICAgICAgbW9kZTogJ2FjZS9tb2RlL2phdmFzY3JpcHQnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBmdW5jdGlvbiBsb2FkRXhhbXBsZShmaWxlKSB7XG4gICAgICAgIC8vICAgICAkLmFqYXgoe1xuICAgICAgICAvLyAgICAgICAgIHVybDonLi9leGFtcGxlcy8nICsgZmlsZSxcbiAgICAgICAgLy8gICAgICAgICBkYXRhVHlwZTogJ3RleHQnXG4gICAgICAgIC8vICAgICB9KS5kb25lKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIC8vICAgICAgICAgc3JjRWRpdG9yLnNldFZhbHVlKGRhdGEpO1xuICAgICAgICAvLyAgICAgICAgIHNyY0VkaXRvci5leGVjQ29tbWFuZCgnZ290b2VuZCcpO1xuICAgICAgICAvLyAgICAgfSk7XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8gbG9hZEV4YW1wbGUoJCgnI2V4YW1wbGVzJykudmFsKCkpO1xuICAgICAgICAvLyAkKCcjZXhhbXBsZXMnKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkgeyBsb2FkRXhhbXBsZSgkKHRoaXMpLnZhbCgpKTsgfSk7XG4gICAgICAgIC8vICQoJyNydW4tYmFiZWwnKS5vbignY2hhbmdlJywgY29tcGlsZSk7XG4gICAgICAgIC8vIHNyY0VkaXRvci5nZXRTZXNzaW9uKCkub24oJ2NoYW5nZScsIGNvbXBpbGUpO1xuICAgICAgICAvLyBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vICAgICBpZiAoY3VycmVudCA+IGxhc3RNb2RpZmllZCkgcmV0dXJuO1xuICAgICAgICAvLyAgICAgaWYgKGNvbXBpbGluZykgcmV0dXJuO1xuICAgICAgICAvLyAgICAgY29tcGlsaW5nID0gdHJ1ZTtcbiAgICAgICAgLy8gICAgIGNvbXBpbGVyLmNvbXBpbGUoc3JjRWRpdG9yLmdldFZhbHVlKCkpXG4gICAgICAgIC8vICAgICAudGhlbihmdW5jdGlvbiAoanMpIHtcbiAgICAgICAgLy8gICAgICAgICBpZiAoJCgnI3J1bi1iYWJlbCcpLnByb3AoJ2NoZWNrZWQnKSkganMgPSBiYWJlbC50cmFuc2Zvcm0oanMpLmNvZGU7XG4gICAgICAgIC8vICAgICAgICAgZHN0RWRpdG9yLnNldFZhbHVlKGpzKTtcbiAgICAgICAgLy8gICAgICAgICBkc3RFZGl0b3IuZXhlY0NvbW1hbmQoJ2dvdG9lbmQnKTtcbiAgICAgICAgLy8gICAgICAgICBjdXJyZW50ID0gKyhuZXcgRGF0ZSgpKTtcbiAgICAgICAgLy8gICAgICAgICBjb21waWxpbmcgPSBmYWxzZTtcbiAgICAgICAgLy8gICAgIH0pXG4gICAgICAgIC8vICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAvLyAgICAgICAgIHZhciBtc2cgPSAoKGVyciBpbnN0YW5jZW9mIEVycm9yIHx8IGVyci5tZXNzYWdlKSA/IGVyci5tZXNzYWdlIDogZXJyKSArICcnO1xuICAgICAgICAvLyAgICAgICAgIGRzdEVkaXRvci5zZXRWYWx1ZShtc2cpO1xuICAgICAgICAvLyAgICAgICAgIGRzdEVkaXRvci5leGVjQ29tbWFuZCgnZ290b2VuZCcpO1xuICAgICAgICAvLyAgICAgICAgIGN1cnJlbnQgPSArKG5ldyBEYXRlKCkpO1xuICAgICAgICAvLyAgICAgICAgIGNvbXBpbGluZyA9IGZhbHNlO1xuICAgICAgICAvLyAgICAgfSk7XG4gICAgICAgIC8vIH0sIDEpO1xuICAgICAgICAvLyAkKCcjcnVuJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyAgICAgZXZhbChkc3RFZGl0b3IuZ2V0VmFsdWUoKSk7XG4gICAgICAgIC8vIH0pO1xuICAgIH0sIFtdKTtcbiAgICByZXR1cm4gPD5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3cmFwXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCBsZWZ0XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aXRsZVwiPuyVveyGjSDshozsiqTsvZTrk5w8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPHNlbGVjdCBpZD1cImV4YW1wbGVzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiZmlib25hY2NpLnlha1wiPu2UvOuztOuCmOy5mDwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImJ1YmJsZS1zb3J0Lnlha1wiPuuyhOu4lOyGjO2KuDwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGlkPVwic3JjLWVkaXRvclwiIGNsYXNzTmFtZT1cImVkaXRvclwiPjwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCByaWdodFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGl0bGVcIj7snpDrsJTsiqTtgazrpr3tirgg6rKw6rO87L2U65OcPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIGVzNTogPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGlkPVwicnVuLWJhYmVsXCIgY2hlY2tlZC8+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gaWQ9XCJydW5cIj7si6TtlontlZjquLA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGlkPVwiZHN0LWVkaXRvclwiIGNsYXNzTmFtZT1cImVkaXRvclwiPjwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8c3R5bGUgZ2xvYmFsIGpzeD57YFxuICAgICAgICAgICAgLndyYXAge1xuICAgICAgICAgICAgICAgIG1hcmdpbjogMCBhdXRvO1xuICAgICAgICAgICAgICAgIG1heC13aWR0aDogMTAyNHB4O1xuICAgICAgICAgICAgICAgIHdpZHRoOiBjYWxjKDEwMCUgLSA0MHB4KTtcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IGNhbGMoMTAwJSAtIDIwcHgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLmNvbCB7XG4gICAgICAgICAgICAgICAgd2lkdGg6IGNhbGMoNTAlIC0gNXB4KTtcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAuY29sLmxlZnQgeyBmbG9hdDogbGVmdDsgfVxuICAgICAgICAgICAgLmNvbC5yaWdodCB7IGZsb2F0OiByaWdodDsgfVxuICAgICAgICAgICAgLnJvdyB7XG4gICAgICAgICAgICAgICAgbWFyZ2luOiA1cHggMDtcbiAgICAgICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDMwcHg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAucm93IC50aXRsZSB7XG4gICAgICAgICAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICAgICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiAxcHggNXB4O1xuICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogMThweDtcbiAgICAgICAgICAgICAgICBmb250LXdlaWdodDogbGlnaHRlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC5lZGl0b3Ige1xuICAgICAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgICAgICAgIGhlaWdodDogY2FsYygxMDAlIC0gNDBweCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIGB9PC9zdHlsZT5cbiAgICA8Lz47XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBhZ2U7XG4iXX0= */\n/*@ sourceURL=/Users/disjukr/dev/yaksok.js/gh-pages/src/pages/play.js */"));
}

/* harmony default export */ __webpack_exports__["default"] = (Page);

/***/ })

})
//# sourceMappingURL=play.js.7fa1cfffe573cb6cc3e1.hot-update.js.map