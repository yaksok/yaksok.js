webpackHotUpdate("static/development/pages/_app.js",{

/***/ "./src/pages/_app.js":
/*!***************************!*\
  !*** ./src/pages/_app.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_core_js_get_iterator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/get-iterator */ "./node_modules/@babel/runtime-corejs2/core-js/get-iterator.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_get_iterator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_get_iterator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/extends */ "./node_modules/@babel/runtime-corejs2/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/objectWithoutProperties */ "./node_modules/@babel/runtime-corejs2/helpers/esm/objectWithoutProperties.js");
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! styled-jsx/style */ "./node_modules/styled-jsx/style.js");
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(styled_jsx_style__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_github_corner__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-github-corner */ "./node_modules/react-github-corner/lib/GithubCorner.js");
/* harmony import */ var react_github_corner__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_github_corner__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! next/head */ "./node_modules/next/dist/next-server/lib/head.js");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! next/router */ "./node_modules/next/dist/client/router.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_8__);



var _jsxFileName = "/Users/disjukr/dev/yaksok.js/gh-pages/src/pages/_app.js";


var __jsx = react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement;






var NavLink = function NavLink(_ref) {
  var href = _ref.href,
      className = _ref.className,
      children = _ref.children,
      rest = Object(_babel_runtime_corejs2_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2__["default"])(_ref, ["href", "className", "children"]);

  var router = Object(next_router__WEBPACK_IMPORTED_MODULE_8__["useRouter"])();
  var active = router.pathname.startsWith(href);
  var activeClassName = active ? ' active' : '';
  return __jsx(next_link__WEBPACK_IMPORTED_MODULE_7___default.a, Object(_babel_runtime_corejs2_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({
    href: href
  }, rest, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    },
    __self: this
  }), __jsx("a", {
    className: (className || '') + activeClassName,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    },
    __self: this
  }, children));
};

function App(_ref2) {
  var Component = _ref2.Component,
      pageProps = _ref2.pageProps;
  Object(react__WEBPACK_IMPORTED_MODULE_4__["useEffect"])(function () {
    var YaksokMode = ace.require('ace/mode/yaksok').Mode;

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = _babel_runtime_corejs2_core_js_get_iterator__WEBPACK_IMPORTED_MODULE_0___default()(document.querySelectorAll('.md-code')), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var editorDiv = _step.value;
        var language = editorDiv.dataset.language;
        var editor = ace.edit(editorDiv);
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
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  });
  return __jsx("div", {
    className: "jsx-2168854858",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 48
    },
    __self: this
  }, __jsx(next_head__WEBPACK_IMPORTED_MODULE_6___default.a, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 49
    },
    __self: this
  }, __jsx("title", {
    className: "jsx-2168854858",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 50
    },
    __self: this
  }, "yaksok.js"), __jsx("script", {
    src: "https://ajaxorg.github.io/ace-builds/src-noconflict/ace.js",
    className: "jsx-2168854858",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 51
    },
    __self: this
  }), __jsx("script", {
    src: "https://ajaxorg.github.io/ace-builds/src-noconflict/mode-python.js",
    className: "jsx-2168854858",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 52
    },
    __self: this
  }), __jsx("script", {
    src: "/mode-yaksok.js",
    className: "jsx-2168854858",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 53
    },
    __self: this
  })), __jsx(react_github_corner__WEBPACK_IMPORTED_MODULE_5___default.a, {
    href: "https://github.com/yaksok/yaksok.js",
    octoColor: "#2f3129",
    bannerColor: "#f0f0f0",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 55
    },
    __self: this
  }), __jsx("header", {
    id: "header",
    className: "jsx-2168854858",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 60
    },
    __self: this
  }, __jsx("div", {
    id: "logo",
    className: "jsx-2168854858",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 61
    },
    __self: this
  }, __jsx(next_link__WEBPACK_IMPORTED_MODULE_7___default.a, {
    href: "/",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 62
    },
    __self: this
  }, __jsx("a", {
    className: "jsx-2168854858",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 63
    },
    __self: this
  }, __jsx("img", {
    src: "/logo.svg",
    className: "jsx-2168854858",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 64
    },
    __self: this
  })))), __jsx(NavLink, {
    href: "/learn",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 68
    },
    __self: this
  }, "\uBC30\uC6B0\uAE30"), __jsx(NavLink, {
    href: "/play",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 69
    },
    __self: this
  }, "\uB180\uC774\uD130"), __jsx(NavLink, {
    href: "/install",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 70
    },
    __self: this
  }, "\uC124\uCE58\uD558\uAE30")), __jsx("div", {
    id: "content",
    className: "jsx-2168854858",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 72
    },
    __self: this
  }, __jsx("div", {
    style: {
      height: '1px'
    },
    className: "jsx-2168854858",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 73
    },
    __self: this
  }), __jsx(Component, Object(_babel_runtime_corejs2_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, pageProps, {
    className: "jsx-2168854858" + " " + (pageProps && pageProps.className != null && pageProps.className || ""),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 74
    },
    __self: this
  }))), __jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_3___default.a, {
    id: "2973807395",
    __self: this
  }, "#header{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;margin:20px auto;width:720px;height:80px;}#logo>a{width:220px;}#header>*{display:-webkit-inline-box;display:-webkit-inline-flex;display:-ms-inline-flexbox;display:inline-flex;margin:auto;}#header>a{height:100%;line-height:80px;-webkit-text-decoration:none;text-decoration:none;font-size:30px;font-weight:lighter;color:#f0f0f0;box-sizing:border-box;border-bottom:0px solid #f0f0f0;-webkit-transition:border 0.3s;transition:border 0.3s;}#header>a.active{border-bottom:2px solid #808080;}#header>a:hover{font-weight:normal;border-bottom:5px solid #f0f0f0;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kaXNqdWtyL2Rldi95YWtzb2suanMvZ2gtcGFnZXMvc3JjL3BhZ2VzL19hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBMkUyQixBQUc4QixBQU1ELEFBR1EsQUFJUixBQVdvQixBQUdiLFlBcEJ2QixBQU9xQixPQWNlLFVBYlgsR0FVekIsbUJBSUEsdUJBNUJxQixLQWVGLFlBZEgsR0FlUSxRQVBSLENBUEEsV0FRaEIsQUFPa0IsQ0FkbEIsYUFlMEIsc0JBQ1UsZ0NBQ1Qsc0RBQzNCIiwiZmlsZSI6Ii9Vc2Vycy9kaXNqdWtyL2Rldi95YWtzb2suanMvZ2gtcGFnZXMvc3JjL3BhZ2VzL19hcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgR2l0aHViQ29ybmVyIGZyb20gJ3JlYWN0LWdpdGh1Yi1jb3JuZXInO1xuaW1wb3J0IEhlYWQgZnJvbSAnbmV4dC9oZWFkJztcbmltcG9ydCBMaW5rIGZyb20gJ25leHQvbGluayc7XG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tICduZXh0L3JvdXRlcic7XG5pbXBvcnQgeyB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5cbmNvbnN0IE5hdkxpbmsgPSAoeyBocmVmLCBjbGFzc05hbWUsIGNoaWxkcmVuLCAuLi5yZXN0IH0pID0+IHtcbiAgICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcbiAgICBjb25zdCBhY3RpdmUgPSByb3V0ZXIucGF0aG5hbWUuc3RhcnRzV2l0aChocmVmKTtcbiAgICBjb25zdCBhY3RpdmVDbGFzc05hbWUgPSBhY3RpdmUgPyAnIGFjdGl2ZScgOiAnJztcbiAgICByZXR1cm4gPExpbmtcbiAgICAgICAgaHJlZj17aHJlZn1cbiAgICAgICAgey4uLnJlc3R9XG4gICAgPlxuICAgICAgICA8YSBjbGFzc05hbWU9eyhjbGFzc05hbWUgfHwgJycpICsgYWN0aXZlQ2xhc3NOYW1lfT5cbiAgICAgICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgPC9hPlxuICAgIDwvTGluaz47XG59O1xuXG5mdW5jdGlvbiBBcHAoeyBDb21wb25lbnQsIHBhZ2VQcm9wcyB9KSB7XG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgY29uc3QgWWFrc29rTW9kZSA9IGFjZS5yZXF1aXJlKCdhY2UvbW9kZS95YWtzb2snKS5Nb2RlO1xuICAgICAgICBmb3IgKGNvbnN0IGVkaXRvckRpdiBvZiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubWQtY29kZScpKSB7XG4gICAgICAgICAgICBjb25zdCBsYW5ndWFnZSA9IGVkaXRvckRpdi5kYXRhc2V0Lmxhbmd1YWdlO1xuICAgICAgICAgICAgY29uc3QgZWRpdG9yID0gYWNlLmVkaXQoZWRpdG9yRGl2KTtcbiAgICAgICAgICAgIGVkaXRvci5zZXRPcHRpb25zKHtcbiAgICAgICAgICAgICAgICBzZWxlY3Rpb25TdHlsZTogJ3RleHQnLFxuICAgICAgICAgICAgICAgIHVzZVNvZnRUYWJzOiB0cnVlLFxuICAgICAgICAgICAgICAgIGhpZ2hsaWdodEFjdGl2ZUxpbmU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHNob3dQcmludE1hcmdpbjogZmFsc2UsXG4gICAgICAgICAgICAgICAgc2hvd0d1dHRlcjogZmFsc2UsXG4gICAgICAgICAgICAgICAgdGhlbWU6ICdhY2UvdGhlbWUvbW9ub2thaScsXG4gICAgICAgICAgICAgICAgcmVhZE9ubHk6IHRydWUsXG4gICAgICAgICAgICAgICAgbWF4TGluZXM6IEluZmluaXR5XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChsYW5ndWFnZSkge1xuICAgICAgICAgICAgICAgIGlmIChsYW5ndWFnZSA9PT0gJ3lha3NvaycpIHtcbiAgICAgICAgICAgICAgICAgICAgZWRpdG9yLmdldFNlc3Npb24oKS5zZXRNb2RlKG5ldyBZYWtzb2tNb2RlKCkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGVkaXRvci5zZXRPcHRpb25zKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGU6ICdhY2UvbW9kZS8nICsgbGFuZ3VhZ2VcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIDxkaXY+XG4gICAgICAgIDxIZWFkPlxuICAgICAgICAgICAgPHRpdGxlPnlha3Nvay5qczwvdGl0bGU+XG4gICAgICAgICAgICA8c2NyaXB0IHNyYz1cImh0dHBzOi8vYWpheG9yZy5naXRodWIuaW8vYWNlLWJ1aWxkcy9zcmMtbm9jb25mbGljdC9hY2UuanNcIj48L3NjcmlwdD5cbiAgICAgICAgICAgIDxzY3JpcHQgc3JjPVwiaHR0cHM6Ly9hamF4b3JnLmdpdGh1Yi5pby9hY2UtYnVpbGRzL3NyYy1ub2NvbmZsaWN0L21vZGUtcHl0aG9uLmpzXCI+PC9zY3JpcHQ+XG4gICAgICAgICAgICA8c2NyaXB0IHNyYz1cIi9tb2RlLXlha3Nvay5qc1wiPjwvc2NyaXB0PlxuICAgICAgICA8L0hlYWQ+XG4gICAgICAgIDxHaXRodWJDb3JuZXJcbiAgICAgICAgICAgIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20veWFrc29rL3lha3Nvay5qc1wiXG4gICAgICAgICAgICBvY3RvQ29sb3I9XCIjMmYzMTI5XCJcbiAgICAgICAgICAgIGJhbm5lckNvbG9yPVwiI2YwZjBmMFwiXG4gICAgICAgIC8+XG4gICAgICAgIDxoZWFkZXIgaWQ9XCJoZWFkZXJcIj5cbiAgICAgICAgICAgIDxkaXYgaWQ9XCJsb2dvXCI+XG4gICAgICAgICAgICAgICAgPExpbmsgaHJlZj1cIi9cIj5cbiAgICAgICAgICAgICAgICAgICAgPGE+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIi9sb2dvLnN2Z1wiLz5cbiAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgIDwvTGluaz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPE5hdkxpbmsgaHJlZj1cIi9sZWFyblwiPuuwsOyasOq4sDwvTmF2TGluaz5cbiAgICAgICAgICAgIDxOYXZMaW5rIGhyZWY9XCIvcGxheVwiPuuGgOydtO2EsDwvTmF2TGluaz5cbiAgICAgICAgICAgIDxOYXZMaW5rIGhyZWY9XCIvaW5zdGFsbFwiPuyEpOy5mO2VmOq4sDwvTmF2TGluaz5cbiAgICAgICAgPC9oZWFkZXI+XG4gICAgICAgIDxkaXYgaWQ9XCJjb250ZW50XCI+XG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGhlaWdodDogJzFweCcgfX0vPlxuICAgICAgICAgICAgPENvbXBvbmVudCB7Li4ucGFnZVByb3BzfSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPHN0eWxlIGdsb2JhbCBqc3g+e2BcbiAgICAgICAgICAgICNoZWFkZXIge1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICAgICAgbWFyZ2luOiAyMHB4IGF1dG87XG4gICAgICAgICAgICAgICAgd2lkdGg6IDcyMHB4O1xuICAgICAgICAgICAgICAgIGhlaWdodDogODBweDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICNsb2dvID4gYSB7XG4gICAgICAgICAgICAgICAgd2lkdGg6IDIyMHB4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgI2hlYWRlciA+ICoge1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICAgICAgICAgICAgICAgIG1hcmdpbjogYXV0bztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICNoZWFkZXIgPiBhIHtcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgICAgICAgICAgbGluZS1oZWlnaHQ6IDgwcHg7XG4gICAgICAgICAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogMzBweDtcbiAgICAgICAgICAgICAgICBmb250LXdlaWdodDogbGlnaHRlcjtcbiAgICAgICAgICAgICAgICBjb2xvcjogI2YwZjBmMDtcbiAgICAgICAgICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgICAgICAgICAgIGJvcmRlci1ib3R0b206IDBweCBzb2xpZCAjZjBmMGYwO1xuICAgICAgICAgICAgICAgIHRyYW5zaXRpb246IGJvcmRlciAwLjNzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgI2hlYWRlciA+IGEuYWN0aXZlIHtcbiAgICAgICAgICAgICAgICBib3JkZXItYm90dG9tOiAycHggc29saWQgIzgwODA4MDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICNoZWFkZXIgPiBhOmhvdmVyIHtcbiAgICAgICAgICAgICAgICBmb250LXdlaWdodDogbm9ybWFsO1xuICAgICAgICAgICAgICAgIGJvcmRlci1ib3R0b206IDVweCBzb2xpZCAjZjBmMGYwO1xuICAgICAgICAgICAgfVxuICAgICAgICBgfTwvc3R5bGU+XG4gICAgICAgIDxzdHlsZSBnbG9iYWwganN4PntgXG4gICAgICAgICAgICBAaW1wb3J0IHVybChodHRwOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vZWFybHlhY2Nlc3Mvbm90b3NhbnNrci5jc3MpO1xuICAgICAgICAgICAgaHRtbCwgYm9keSB7XG4gICAgICAgICAgICAgICAgbWFyZ2luOiAwO1xuICAgICAgICAgICAgICAgIHBhZGRpbmc6IDA7XG4gICAgICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICAgICAgICAgIGZvbnQtZmFtaWx5OiAnTm90byBTYW5zIEtSJywgc2Fucy1zZXJpZjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJvZHkge1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICMyZjMxMjk7XG4gICAgICAgICAgICAgICAgY29sb3I6ICNmMGYwZjA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhIHsgY29sb3I6ICM2NmQ5ZWY7IH0gYTp2aXNpdGVkIHsgY29sb3I6ICNlNmQ4NzQ7IH1cbiAgICAgICAgICAgIGgxLCBoMiwgaDMgeyBmb250LXdlaWdodDogbGlnaHRlcjsgfVxuICAgICAgICAgICAgaDEuaGVhZGxpbmUgeyBmb250LXdlaWdodDogbm9ybWFsOyB9XG4gICAgICAgICAgICBwIHsgdGV4dC1pbmRlbnQ6IDFlbTsgfVxuICAgICAgICAgICAgaWZyYW1lIHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgICAgICAgICBtYXJnaW46IDAgYXV0bztcbiAgICAgICAgICAgICAgICB3aWR0aDogNjQwcHg7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiA1MTBweDtcbiAgICAgICAgICAgICAgICBib3JkZXI6IG5vbmU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb2RlLCBwcmUuY29kZSB7XG4gICAgICAgICAgICAgICAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZTtcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjcyODIyO1xuICAgICAgICAgICAgICAgIHdvcmQtd3JhcDogYnJlYWstd29yZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvZGUge1xuICAgICAgICAgICAgICAgIGNvbG9yOiAjZjkyNjcyO1xuICAgICAgICAgICAgICAgIHBhZGRpbmc6IDNweCA1cHg7XG4gICAgICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogM3B4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHJlLmNvZGUge1xuICAgICAgICAgICAgICAgIHBhZGRpbmc6IDEwcHggMjBweDtcbiAgICAgICAgICAgICAgICBib3JkZXItcmFkaXVzOiA1cHg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcmUuc2ltcGxlLmNvZGUgeyBmb250LXNpemU6IDE0cHQ7IH1cbiAgICAgICAgICAgICNjb250ZW50IHtcbiAgICAgICAgICAgICAgICBtYXJnaW46IDAgYXV0bztcbiAgICAgICAgICAgICAgICBwYWRkaW5nLWJvdHRvbTogNTB2aDtcbiAgICAgICAgICAgICAgICB3aWR0aDogNzIwcHg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcmUgY29kZSB7XG4gICAgICAgICAgICAgICAgcGFkZGluZzogMHB4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYmxvY2txdW90ZSB7XG4gICAgICAgICAgICAgICAgYm9yZGVyLWxlZnQ6IDEwcHggc29saWQgcmdiYSgxMjgsMTI4LDEyOCwwLjA3NSk7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjpyZ2JhKDEyOCwxMjgsMTI4LDAuMSk7XG4gICAgICAgICAgICAgICAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6NXB4O1xuICAgICAgICAgICAgICAgIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOjVweDtcbiAgICAgICAgICAgICAgICBwYWRkaW5nOjE1cHggMjBweFxuICAgICAgICAgICAgfVxuICAgICAgICBgfTwvc3R5bGU+XG4gICAgPC9kaXY+O1xufVxuZXhwb3J0IGRlZmF1bHQgQXBwO1xuIl19 */\n/*@ sourceURL=/Users/disjukr/dev/yaksok.js/gh-pages/src/pages/_app.js */"), __jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_3___default.a, {
    id: "1042330816",
    __self: this
  }, "@import url(http://fonts.googleapis.com/earlyaccess/notosanskr.css);html,body{margin:0;padding:0;width:100%;height:100%;font-family:'Noto Sans KR',sans-serif;}body{background-color:#2f3129;color:#f0f0f0;}a{color:#66d9ef;}a:visited{color:#e6d874;}h1,h2,h3{font-weight:lighter;}h1.headline{font-weight:normal;}p{text-indent:1em;}iframe{display:block;margin:0 auto;width:640px;height:510px;border:none;}code,pre.code{font-family:monospace;background-color:#272822;word-wrap:break-word;}code{color:#f92672;padding:3px 5px;border-radius:3px;}pre.code{padding:10px 20px;border-radius:5px;}pre.simple.code{font-size:14pt;}#content{margin:0 auto;padding-bottom:50vh;width:720px;}pre code{padding:0px;}blockquote{border-left:10px solid rgba(128,128,128,0.075);background-color:rgba(128,128,128,0.1);border-top-right-radius:5px;border-bottom-right-radius:5px;padding:15px 20px;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kaXNqdWtyL2Rldi95YWtzb2suanMvZ2gtcGFnZXMvc3JjL3BhZ2VzL19hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBNEcyQixBQUVnRixBQUV0RCxBQU9nQixBQUdaLEFBQTJCLEFBQ1osQUFDQSxBQUNiLEFBRUQsQUFPUSxBQUtSLEFBS0ksQUFHVSxBQUVkLEFBS0YsQUFHbUMsU0E1Q3JDLEdBMENkLEVBakNrQixBQUEyQixBQU0zQixBQVlFLEFBVUksQ0FIUyxDQXRCYixFQW9CRSxDQS9CUCxBQVVrQixDQURBLEVBWUosR0FmWCxHQVNGLEVBZEEsQUEwQk0sSUFVTixFQUxoQixHQXpCQSxDQVNpQixFQWQwQixJQW9DM0MsQ0FoQnlCLEFBc0JpQixDQWhCMUMsS0FYZ0IsWUFDaEIsR0FLQSxZQXBCQSxNQTBDK0IsNEJBQ0csK0JBRW5DLGtCQUFDIiwiZmlsZSI6Ii9Vc2Vycy9kaXNqdWtyL2Rldi95YWtzb2suanMvZ2gtcGFnZXMvc3JjL3BhZ2VzL19hcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgR2l0aHViQ29ybmVyIGZyb20gJ3JlYWN0LWdpdGh1Yi1jb3JuZXInO1xuaW1wb3J0IEhlYWQgZnJvbSAnbmV4dC9oZWFkJztcbmltcG9ydCBMaW5rIGZyb20gJ25leHQvbGluayc7XG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tICduZXh0L3JvdXRlcic7XG5pbXBvcnQgeyB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5cbmNvbnN0IE5hdkxpbmsgPSAoeyBocmVmLCBjbGFzc05hbWUsIGNoaWxkcmVuLCAuLi5yZXN0IH0pID0+IHtcbiAgICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcbiAgICBjb25zdCBhY3RpdmUgPSByb3V0ZXIucGF0aG5hbWUuc3RhcnRzV2l0aChocmVmKTtcbiAgICBjb25zdCBhY3RpdmVDbGFzc05hbWUgPSBhY3RpdmUgPyAnIGFjdGl2ZScgOiAnJztcbiAgICByZXR1cm4gPExpbmtcbiAgICAgICAgaHJlZj17aHJlZn1cbiAgICAgICAgey4uLnJlc3R9XG4gICAgPlxuICAgICAgICA8YSBjbGFzc05hbWU9eyhjbGFzc05hbWUgfHwgJycpICsgYWN0aXZlQ2xhc3NOYW1lfT5cbiAgICAgICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgPC9hPlxuICAgIDwvTGluaz47XG59O1xuXG5mdW5jdGlvbiBBcHAoeyBDb21wb25lbnQsIHBhZ2VQcm9wcyB9KSB7XG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgY29uc3QgWWFrc29rTW9kZSA9IGFjZS5yZXF1aXJlKCdhY2UvbW9kZS95YWtzb2snKS5Nb2RlO1xuICAgICAgICBmb3IgKGNvbnN0IGVkaXRvckRpdiBvZiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubWQtY29kZScpKSB7XG4gICAgICAgICAgICBjb25zdCBsYW5ndWFnZSA9IGVkaXRvckRpdi5kYXRhc2V0Lmxhbmd1YWdlO1xuICAgICAgICAgICAgY29uc3QgZWRpdG9yID0gYWNlLmVkaXQoZWRpdG9yRGl2KTtcbiAgICAgICAgICAgIGVkaXRvci5zZXRPcHRpb25zKHtcbiAgICAgICAgICAgICAgICBzZWxlY3Rpb25TdHlsZTogJ3RleHQnLFxuICAgICAgICAgICAgICAgIHVzZVNvZnRUYWJzOiB0cnVlLFxuICAgICAgICAgICAgICAgIGhpZ2hsaWdodEFjdGl2ZUxpbmU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHNob3dQcmludE1hcmdpbjogZmFsc2UsXG4gICAgICAgICAgICAgICAgc2hvd0d1dHRlcjogZmFsc2UsXG4gICAgICAgICAgICAgICAgdGhlbWU6ICdhY2UvdGhlbWUvbW9ub2thaScsXG4gICAgICAgICAgICAgICAgcmVhZE9ubHk6IHRydWUsXG4gICAgICAgICAgICAgICAgbWF4TGluZXM6IEluZmluaXR5XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChsYW5ndWFnZSkge1xuICAgICAgICAgICAgICAgIGlmIChsYW5ndWFnZSA9PT0gJ3lha3NvaycpIHtcbiAgICAgICAgICAgICAgICAgICAgZWRpdG9yLmdldFNlc3Npb24oKS5zZXRNb2RlKG5ldyBZYWtzb2tNb2RlKCkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGVkaXRvci5zZXRPcHRpb25zKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGU6ICdhY2UvbW9kZS8nICsgbGFuZ3VhZ2VcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIDxkaXY+XG4gICAgICAgIDxIZWFkPlxuICAgICAgICAgICAgPHRpdGxlPnlha3Nvay5qczwvdGl0bGU+XG4gICAgICAgICAgICA8c2NyaXB0IHNyYz1cImh0dHBzOi8vYWpheG9yZy5naXRodWIuaW8vYWNlLWJ1aWxkcy9zcmMtbm9jb25mbGljdC9hY2UuanNcIj48L3NjcmlwdD5cbiAgICAgICAgICAgIDxzY3JpcHQgc3JjPVwiaHR0cHM6Ly9hamF4b3JnLmdpdGh1Yi5pby9hY2UtYnVpbGRzL3NyYy1ub2NvbmZsaWN0L21vZGUtcHl0aG9uLmpzXCI+PC9zY3JpcHQ+XG4gICAgICAgICAgICA8c2NyaXB0IHNyYz1cIi9tb2RlLXlha3Nvay5qc1wiPjwvc2NyaXB0PlxuICAgICAgICA8L0hlYWQ+XG4gICAgICAgIDxHaXRodWJDb3JuZXJcbiAgICAgICAgICAgIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20veWFrc29rL3lha3Nvay5qc1wiXG4gICAgICAgICAgICBvY3RvQ29sb3I9XCIjMmYzMTI5XCJcbiAgICAgICAgICAgIGJhbm5lckNvbG9yPVwiI2YwZjBmMFwiXG4gICAgICAgIC8+XG4gICAgICAgIDxoZWFkZXIgaWQ9XCJoZWFkZXJcIj5cbiAgICAgICAgICAgIDxkaXYgaWQ9XCJsb2dvXCI+XG4gICAgICAgICAgICAgICAgPExpbmsgaHJlZj1cIi9cIj5cbiAgICAgICAgICAgICAgICAgICAgPGE+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIi9sb2dvLnN2Z1wiLz5cbiAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgIDwvTGluaz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPE5hdkxpbmsgaHJlZj1cIi9sZWFyblwiPuuwsOyasOq4sDwvTmF2TGluaz5cbiAgICAgICAgICAgIDxOYXZMaW5rIGhyZWY9XCIvcGxheVwiPuuGgOydtO2EsDwvTmF2TGluaz5cbiAgICAgICAgICAgIDxOYXZMaW5rIGhyZWY9XCIvaW5zdGFsbFwiPuyEpOy5mO2VmOq4sDwvTmF2TGluaz5cbiAgICAgICAgPC9oZWFkZXI+XG4gICAgICAgIDxkaXYgaWQ9XCJjb250ZW50XCI+XG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGhlaWdodDogJzFweCcgfX0vPlxuICAgICAgICAgICAgPENvbXBvbmVudCB7Li4ucGFnZVByb3BzfSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPHN0eWxlIGdsb2JhbCBqc3g+e2BcbiAgICAgICAgICAgICNoZWFkZXIge1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICAgICAgbWFyZ2luOiAyMHB4IGF1dG87XG4gICAgICAgICAgICAgICAgd2lkdGg6IDcyMHB4O1xuICAgICAgICAgICAgICAgIGhlaWdodDogODBweDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICNsb2dvID4gYSB7XG4gICAgICAgICAgICAgICAgd2lkdGg6IDIyMHB4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgI2hlYWRlciA+ICoge1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICAgICAgICAgICAgICAgIG1hcmdpbjogYXV0bztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICNoZWFkZXIgPiBhIHtcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgICAgICAgICAgbGluZS1oZWlnaHQ6IDgwcHg7XG4gICAgICAgICAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogMzBweDtcbiAgICAgICAgICAgICAgICBmb250LXdlaWdodDogbGlnaHRlcjtcbiAgICAgICAgICAgICAgICBjb2xvcjogI2YwZjBmMDtcbiAgICAgICAgICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgICAgICAgICAgIGJvcmRlci1ib3R0b206IDBweCBzb2xpZCAjZjBmMGYwO1xuICAgICAgICAgICAgICAgIHRyYW5zaXRpb246IGJvcmRlciAwLjNzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgI2hlYWRlciA+IGEuYWN0aXZlIHtcbiAgICAgICAgICAgICAgICBib3JkZXItYm90dG9tOiAycHggc29saWQgIzgwODA4MDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICNoZWFkZXIgPiBhOmhvdmVyIHtcbiAgICAgICAgICAgICAgICBmb250LXdlaWdodDogbm9ybWFsO1xuICAgICAgICAgICAgICAgIGJvcmRlci1ib3R0b206IDVweCBzb2xpZCAjZjBmMGYwO1xuICAgICAgICAgICAgfVxuICAgICAgICBgfTwvc3R5bGU+XG4gICAgICAgIDxzdHlsZSBnbG9iYWwganN4PntgXG4gICAgICAgICAgICBAaW1wb3J0IHVybChodHRwOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vZWFybHlhY2Nlc3Mvbm90b3NhbnNrci5jc3MpO1xuICAgICAgICAgICAgaHRtbCwgYm9keSB7XG4gICAgICAgICAgICAgICAgbWFyZ2luOiAwO1xuICAgICAgICAgICAgICAgIHBhZGRpbmc6IDA7XG4gICAgICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICAgICAgICAgIGZvbnQtZmFtaWx5OiAnTm90byBTYW5zIEtSJywgc2Fucy1zZXJpZjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJvZHkge1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICMyZjMxMjk7XG4gICAgICAgICAgICAgICAgY29sb3I6ICNmMGYwZjA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhIHsgY29sb3I6ICM2NmQ5ZWY7IH0gYTp2aXNpdGVkIHsgY29sb3I6ICNlNmQ4NzQ7IH1cbiAgICAgICAgICAgIGgxLCBoMiwgaDMgeyBmb250LXdlaWdodDogbGlnaHRlcjsgfVxuICAgICAgICAgICAgaDEuaGVhZGxpbmUgeyBmb250LXdlaWdodDogbm9ybWFsOyB9XG4gICAgICAgICAgICBwIHsgdGV4dC1pbmRlbnQ6IDFlbTsgfVxuICAgICAgICAgICAgaWZyYW1lIHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgICAgICAgICBtYXJnaW46IDAgYXV0bztcbiAgICAgICAgICAgICAgICB3aWR0aDogNjQwcHg7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiA1MTBweDtcbiAgICAgICAgICAgICAgICBib3JkZXI6IG5vbmU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb2RlLCBwcmUuY29kZSB7XG4gICAgICAgICAgICAgICAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZTtcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjcyODIyO1xuICAgICAgICAgICAgICAgIHdvcmQtd3JhcDogYnJlYWstd29yZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvZGUge1xuICAgICAgICAgICAgICAgIGNvbG9yOiAjZjkyNjcyO1xuICAgICAgICAgICAgICAgIHBhZGRpbmc6IDNweCA1cHg7XG4gICAgICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogM3B4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHJlLmNvZGUge1xuICAgICAgICAgICAgICAgIHBhZGRpbmc6IDEwcHggMjBweDtcbiAgICAgICAgICAgICAgICBib3JkZXItcmFkaXVzOiA1cHg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcmUuc2ltcGxlLmNvZGUgeyBmb250LXNpemU6IDE0cHQ7IH1cbiAgICAgICAgICAgICNjb250ZW50IHtcbiAgICAgICAgICAgICAgICBtYXJnaW46IDAgYXV0bztcbiAgICAgICAgICAgICAgICBwYWRkaW5nLWJvdHRvbTogNTB2aDtcbiAgICAgICAgICAgICAgICB3aWR0aDogNzIwcHg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcmUgY29kZSB7XG4gICAgICAgICAgICAgICAgcGFkZGluZzogMHB4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYmxvY2txdW90ZSB7XG4gICAgICAgICAgICAgICAgYm9yZGVyLWxlZnQ6IDEwcHggc29saWQgcmdiYSgxMjgsMTI4LDEyOCwwLjA3NSk7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjpyZ2JhKDEyOCwxMjgsMTI4LDAuMSk7XG4gICAgICAgICAgICAgICAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6NXB4O1xuICAgICAgICAgICAgICAgIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOjVweDtcbiAgICAgICAgICAgICAgICBwYWRkaW5nOjE1cHggMjBweFxuICAgICAgICAgICAgfVxuICAgICAgICBgfTwvc3R5bGU+XG4gICAgPC9kaXY+O1xufVxuZXhwb3J0IGRlZmF1bHQgQXBwO1xuIl19 */\n/*@ sourceURL=/Users/disjukr/dev/yaksok.js/gh-pages/src/pages/_app.js */"));
}

/* harmony default export */ __webpack_exports__["default"] = (App);

/***/ })

})
//# sourceMappingURL=_app.js.366695d43bbdec20b81d.hot-update.js.map