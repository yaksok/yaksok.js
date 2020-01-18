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
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/head */ "./node_modules/next/dist/next-server/lib/head.js");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_3__);
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
    }

    function loadExample(file) {
      $.ajax({
        url: './examples/' + file,
        dataType: 'text'
      }).done(function (data) {
        srcEditor.setValue(data);
        srcEditor.execCommand('gotoend');
      });
    }

    loadExample($('#examples').val());
    $('#examples').on('change', function () {
      loadExample($(this).val());
    });
    $('#run-babel').on('change', compile);
    srcEditor.getSession().on('change', compile);
    setInterval(function () {
      if (current > lastModified) return;
      if (compiling) return;
      compiling = true;
      compiler.compile(srcEditor.getValue()).then(function (js) {
        if ($('#run-babel').prop('checked')) js = babel.transform(js).code;
        dstEditor.setValue(js);
        dstEditor.execCommand('gotoend');
        current = +new Date();
        compiling = false;
      })["catch"](function (err) {
        var msg = (err instanceof Error || err.message ? err.message : err) + '';
        dstEditor.setValue(msg);
        dstEditor.execCommand('gotoend');
        current = +new Date();
        compiling = false;
      });
    }, 1);
    $('#run').on('click', function () {
      eval(dstEditor.getValue());
    });
  }, []);
  return __jsx(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, __jsx(next_head__WEBPACK_IMPORTED_MODULE_3___default.a, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 77
    },
    __self: this
  }, __jsx("script", {
    src: "https://code.jquery.com/jquery-1.11.3.min.js",
    className: "jsx-3290074322",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 78
    },
    __self: this
  }), __jsx("script", {
    src: "https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.32/browser-polyfill.min.js",
    className: "jsx-3290074322",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 79
    },
    __self: this
  }), __jsx("script", {
    src: "https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.32/browser.min.js",
    className: "jsx-3290074322",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 80
    },
    __self: this
  })), __jsx("div", {
    className: "jsx-3290074322" + " " + "wrap",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 82
    },
    __self: this
  }, __jsx("div", {
    className: "jsx-3290074322" + " " + "col left",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 83
    },
    __self: this
  }, __jsx("div", {
    className: "jsx-3290074322" + " " + "row",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 84
    },
    __self: this
  }, __jsx("div", {
    className: "jsx-3290074322" + " " + "title",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 85
    },
    __self: this
  }, "\uC57D\uC18D \uC18C\uC2A4\uCF54\uB4DC"), __jsx("select", {
    id: "examples",
    onChange: function onChange(e) {
      return console.log(e.target.value);
    },
    className: "jsx-3290074322",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 86
    },
    __self: this
  }, __jsx("option", {
    value: "fibonacci.yak",
    className: "jsx-3290074322",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 87
    },
    __self: this
  }, "\uD53C\uBCF4\uB098\uCE58"), __jsx("option", {
    value: "bubble-sort.yak",
    className: "jsx-3290074322",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 88
    },
    __self: this
  }, "\uBC84\uBE14\uC18C\uD2B8"))), __jsx("div", {
    id: "src-editor",
    className: "jsx-3290074322" + " " + "editor",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 91
    },
    __self: this
  })), __jsx("div", {
    className: "jsx-3290074322" + " " + "col right",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 93
    },
    __self: this
  }, __jsx("div", {
    className: "jsx-3290074322" + " " + "row",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 94
    },
    __self: this
  }, __jsx("div", {
    className: "jsx-3290074322" + " " + "title",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 95
    },
    __self: this
  }, "\uC790\uBC14\uC2A4\uD06C\uB9BD\uD2B8 \uACB0\uACFC\uCF54\uB4DC"), __jsx("button", {
    id: "run",
    className: "jsx-3290074322",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 96
    },
    __self: this
  }, "\uC2E4\uD589\uD558\uAE30")), __jsx("div", {
    id: "dst-editor",
    className: "jsx-3290074322" + " " + "editor",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 98
    },
    __self: this
  }))), __jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a, {
    id: "3290074322",
    __self: this
  }, ".wrap{margin:0 auto;max-width:1024px;width:calc(100% - 40px);height:calc(100% - 20px);}.col{width:calc(50% - 5px);height:100%;}.col.left{float:left;}.col.right{float:right;}.row{margin:5px 0;width:100%;height:30px;}.row .title{display:inline-block;height:100%;padding:1px 5px;font-size:18px;font-weight:lighter;}.editor{width:100%;height:calc(100% - 40px);}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kaXNqdWtyL2Rldi95YWtzb2suanMvZ2gtcGFnZXMvc3JjL3BhZ2VzL3BsYXkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBb0cyQixBQUcrQixBQU1RLEFBR0osQUFDRSxBQUVQLEFBS1EsQUFPVixXQWZRLEFBZ0JNLENBZkosQ0FHVixDQVpNLE9BaUJMLENBWEEsRUFPQSxPQVpZLEVBaUJSLENBWHBCLEVBT0EsQUFXQSxhQU5tQixNQWpCVSxTQWtCTCxnQkFqQnhCLElBa0JBIiwiZmlsZSI6Ii9Vc2Vycy9kaXNqdWtyL2Rldi95YWtzb2suanMvZ2gtcGFnZXMvc3JjL3BhZ2VzL3BsYXkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgKiBhcyB5YWtzb2sgZnJvbSAneWFrc29rJztcbmltcG9ydCBIZWFkIGZyb20gJ25leHQvaGVhZCc7XG5cbmZ1bmN0aW9uIFBhZ2UoKSB7XG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgY29uc3Qgc3JjRWRpdG9yID0gYWNlLmVkaXQoJ3NyYy1lZGl0b3InKTtcbiAgICAgICAgY29uc3QgZHN0RWRpdG9yID0gYWNlLmVkaXQoJ2RzdC1lZGl0b3InKTtcbiAgICAgICAgY29uc3QgY29tcGlsZXIgPSBuZXcgeWFrc29rLmNvbXBpbGVyLkpzVGFyZ2V0Q29tcGlsZXIoKTtcbiAgICAgICAgY29tcGlsZXIucGx1Z2lucy5hZGQobmV3IHlha3Nvay5wbHVnaW4uQ29uc3RhbnRGb2xkZXIoeyBkY2U6IHRydWUgfSkpO1xuICAgICAgICBjb21waWxlci5wbHVnaW5zLmFkZChuZXcgeWFrc29rLnBsdWdpbi5VbnVzZWREZWZSZW1vdmVyKCkpO1xuICAgICAgICBsZXQgY3VycmVudCA9IDA7XG4gICAgICAgIGxldCBsYXN0TW9kaWZpZWQgPSAwO1xuICAgICAgICBsZXQgY29tcGlsaW5nID0gZmFsc2U7XG4gICAgICAgIGZ1bmN0aW9uIGNvbXBpbGUoKSB7IGxhc3RNb2RpZmllZCA9ICsobmV3IERhdGUoKSk7IH1cbiAgICAgICAgZnVuY3Rpb24gZWRpdG9yQ29uZmlnKGVkaXRvciwgb3B0aW9uKSB7XG4gICAgICAgICAgICBlZGl0b3Iuc2V0T3B0aW9ucyh7XG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uU3R5bGU6ICd0ZXh0JyxcbiAgICAgICAgICAgICAgICB1c2VTb2Z0VGFiczogdHJ1ZSxcbiAgICAgICAgICAgICAgICBoaWdobGlnaHRBY3RpdmVMaW5lOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzaG93UHJpbnRNYXJnaW46IGZhbHNlLFxuICAgICAgICAgICAgICAgIHRoZW1lOiAnYWNlL3RoZW1lL21vbm9rYWknXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChvcHRpb24pIHtcbiAgICAgICAgICAgICAgICBlZGl0b3Iuc2V0T3B0aW9ucyhvcHRpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHsgLy8gc3JjIGNvbmZpZ1xuICAgICAgICAgICAgZWRpdG9yQ29uZmlnKHNyY0VkaXRvcik7XG4gICAgICAgICAgICBjb25zdCBZYWtzb2tNb2RlID0gYWNlLnJlcXVpcmUoJ2FjZS9tb2RlL3lha3NvaycpLk1vZGU7XG4gICAgICAgICAgICBzcmNFZGl0b3IuZ2V0U2Vzc2lvbigpLnNldE1vZGUobmV3IFlha3Nva01vZGUoKSk7XG4gICAgICAgIH1cbiAgICAgICAgeyAvLyBkc3QgY29uZmlnXG4gICAgICAgICAgICBlZGl0b3JDb25maWcoZHN0RWRpdG9yLCB7XG4gICAgICAgICAgICAgICAgcmVhZE9ubHk6IHRydWUsXG4gICAgICAgICAgICAgICAgbW9kZTogJ2FjZS9tb2RlL2phdmFzY3JpcHQnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBsb2FkRXhhbXBsZShmaWxlKSB7XG4gICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgIHVybDonLi9leGFtcGxlcy8nICsgZmlsZSxcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ3RleHQnXG4gICAgICAgICAgICB9KS5kb25lKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgc3JjRWRpdG9yLnNldFZhbHVlKGRhdGEpO1xuICAgICAgICAgICAgICAgIHNyY0VkaXRvci5leGVjQ29tbWFuZCgnZ290b2VuZCcpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgbG9hZEV4YW1wbGUoJCgnI2V4YW1wbGVzJykudmFsKCkpO1xuICAgICAgICAkKCcjZXhhbXBsZXMnKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkgeyBsb2FkRXhhbXBsZSgkKHRoaXMpLnZhbCgpKTsgfSk7XG4gICAgICAgICQoJyNydW4tYmFiZWwnKS5vbignY2hhbmdlJywgY29tcGlsZSk7XG4gICAgICAgIHNyY0VkaXRvci5nZXRTZXNzaW9uKCkub24oJ2NoYW5nZScsIGNvbXBpbGUpO1xuICAgICAgICBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudCA+IGxhc3RNb2RpZmllZCkgcmV0dXJuO1xuICAgICAgICAgICAgaWYgKGNvbXBpbGluZykgcmV0dXJuO1xuICAgICAgICAgICAgY29tcGlsaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIGNvbXBpbGVyLmNvbXBpbGUoc3JjRWRpdG9yLmdldFZhbHVlKCkpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoanMpIHtcbiAgICAgICAgICAgICAgICBpZiAoJCgnI3J1bi1iYWJlbCcpLnByb3AoJ2NoZWNrZWQnKSkganMgPSBiYWJlbC50cmFuc2Zvcm0oanMpLmNvZGU7XG4gICAgICAgICAgICAgICAgZHN0RWRpdG9yLnNldFZhbHVlKGpzKTtcbiAgICAgICAgICAgICAgICBkc3RFZGl0b3IuZXhlY0NvbW1hbmQoJ2dvdG9lbmQnKTtcbiAgICAgICAgICAgICAgICBjdXJyZW50ID0gKyhuZXcgRGF0ZSgpKTtcbiAgICAgICAgICAgICAgICBjb21waWxpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgIHZhciBtc2cgPSAoKGVyciBpbnN0YW5jZW9mIEVycm9yIHx8IGVyci5tZXNzYWdlKSA/IGVyci5tZXNzYWdlIDogZXJyKSArICcnO1xuICAgICAgICAgICAgICAgIGRzdEVkaXRvci5zZXRWYWx1ZShtc2cpO1xuICAgICAgICAgICAgICAgIGRzdEVkaXRvci5leGVjQ29tbWFuZCgnZ290b2VuZCcpO1xuICAgICAgICAgICAgICAgIGN1cnJlbnQgPSArKG5ldyBEYXRlKCkpO1xuICAgICAgICAgICAgICAgIGNvbXBpbGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sIDEpO1xuICAgICAgICAkKCcjcnVuJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZXZhbChkc3RFZGl0b3IuZ2V0VmFsdWUoKSk7XG4gICAgICAgIH0pO1xuICAgIH0sIFtdKTtcbiAgICByZXR1cm4gPD5cbiAgICAgICAgPEhlYWQ+XG4gICAgICAgICAgICA8c2NyaXB0IHNyYz1cImh0dHBzOi8vY29kZS5qcXVlcnkuY29tL2pxdWVyeS0xLjExLjMubWluLmpzXCI+PC9zY3JpcHQ+XG4gICAgICAgICAgICA8c2NyaXB0IHNyYz1cImh0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL2JhYmVsLWNvcmUvNS44LjMyL2Jyb3dzZXItcG9seWZpbGwubWluLmpzXCI+PC9zY3JpcHQ+XG4gICAgICAgICAgICA8c2NyaXB0IHNyYz1cImh0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL2JhYmVsLWNvcmUvNS44LjMyL2Jyb3dzZXIubWluLmpzXCI+PC9zY3JpcHQ+XG4gICAgICAgIDwvSGVhZD5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3cmFwXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbCBsZWZ0XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aXRsZVwiPuyVveyGjSDshozsiqTsvZTrk5w8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPHNlbGVjdCBpZD1cImV4YW1wbGVzXCIgb25DaGFuZ2U9e2UgPT4gY29uc29sZS5sb2coZS50YXJnZXQudmFsdWUpfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJmaWJvbmFjY2kueWFrXCI+7ZS867O064KY7LmYPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiYnViYmxlLXNvcnQueWFrXCI+67KE67iU7IaM7Yq4PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJzcmMtZWRpdG9yXCIgY2xhc3NOYW1lPVwiZWRpdG9yXCI+PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sIHJpZ2h0XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aXRsZVwiPuyekOuwlOyKpO2BrOumve2KuCDqsrDqs7zsvZTrk5w8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBpZD1cInJ1blwiPuyLpO2Wie2VmOq4sDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJkc3QtZWRpdG9yXCIgY2xhc3NOYW1lPVwiZWRpdG9yXCI+PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxzdHlsZSBnbG9iYWwganN4PntgXG4gICAgICAgICAgICAud3JhcCB7XG4gICAgICAgICAgICAgICAgbWFyZ2luOiAwIGF1dG87XG4gICAgICAgICAgICAgICAgbWF4LXdpZHRoOiAxMDI0cHg7XG4gICAgICAgICAgICAgICAgd2lkdGg6IGNhbGMoMTAwJSAtIDQwcHgpO1xuICAgICAgICAgICAgICAgIGhlaWdodDogY2FsYygxMDAlIC0gMjBweCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAuY29sIHtcbiAgICAgICAgICAgICAgICB3aWR0aDogY2FsYyg1MCUgLSA1cHgpO1xuICAgICAgICAgICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC5jb2wubGVmdCB7IGZsb2F0OiBsZWZ0OyB9XG4gICAgICAgICAgICAuY29sLnJpZ2h0IHsgZmxvYXQ6IHJpZ2h0OyB9XG4gICAgICAgICAgICAucm93IHtcbiAgICAgICAgICAgICAgICBtYXJnaW46IDVweCAwO1xuICAgICAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgICAgICAgIGhlaWdodDogMzBweDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC5yb3cgLnRpdGxlIHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICAgICAgICAgIHBhZGRpbmc6IDFweCA1cHg7XG4gICAgICAgICAgICAgICAgZm9udC1zaXplOiAxOHB4O1xuICAgICAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiBsaWdodGVyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLmVkaXRvciB7XG4gICAgICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiBjYWxjKDEwMCUgLSA0MHB4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgYH08L3N0eWxlPlxuICAgIDwvPjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgUGFnZTtcbiJdfQ== */\n/*@ sourceURL=/Users/disjukr/dev/yaksok.js/gh-pages/src/pages/play.js */"));
}

/* harmony default export */ __webpack_exports__["default"] = (Page);

/***/ })

})
//# sourceMappingURL=play.js.d832fded2459827bc888.hot-update.js.map