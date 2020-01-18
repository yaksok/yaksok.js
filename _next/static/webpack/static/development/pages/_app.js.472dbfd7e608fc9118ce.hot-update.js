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
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! next/head */ "./node_modules/next/dist/next-server/lib/head.js");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! next/router */ "./node_modules/next/dist/client/router.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react_github_corner__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-github-corner */ "./node_modules/react-github-corner/lib/GithubCorner.js");
/* harmony import */ var react_github_corner__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_github_corner__WEBPACK_IMPORTED_MODULE_8__);



var _jsxFileName = "/Users/disjukr/dev/yaksok.js/gh-pages/src/pages/_app.js";


var __jsx = react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement;






var NavLink = function NavLink(_ref) {
  var href = _ref.href,
      className = _ref.className,
      children = _ref.children,
      rest = Object(_babel_runtime_corejs2_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_2__["default"])(_ref, ["href", "className", "children"]);

  var router = Object(next_router__WEBPACK_IMPORTED_MODULE_7__["useRouter"])();
  var active = router.pathname.startsWith(href);
  var activeClassName = active ? ' active' : '';
  return __jsx(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, Object(_babel_runtime_corejs2_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({
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
      for (var _iterator = _babel_runtime_corejs2_core_js_get_iterator__WEBPACK_IMPORTED_MODULE_0___default()(document.querySelectorAll('.md-code:not(.ace_editor)')), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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
  return __jsx(react__WEBPACK_IMPORTED_MODULE_4___default.a.Fragment, null, __jsx(next_head__WEBPACK_IMPORTED_MODULE_5___default.a, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 49
    },
    __self: this
  }, __jsx("title", {
    className: "jsx-1766591363",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 50
    },
    __self: this
  }, "yaksok.js"), __jsx("script", {
    src: "https://ajaxorg.github.io/ace-builds/src-noconflict/ace.js",
    className: "jsx-1766591363",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 51
    },
    __self: this
  }), __jsx("script", {
    src: "https://ajaxorg.github.io/ace-builds/src-noconflict/mode-python.js",
    className: "jsx-1766591363",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 52
    },
    __self: this
  }), __jsx("script", {
    src: "/mode-yaksok.js",
    className: "jsx-1766591363",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 53
    },
    __self: this
  })), __jsx(react_github_corner__WEBPACK_IMPORTED_MODULE_8___default.a, {
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
    className: "jsx-1766591363",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 60
    },
    __self: this
  }, __jsx("div", {
    id: "logo",
    className: "jsx-1766591363",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 61
    },
    __self: this
  }, __jsx(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
    href: "/",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 62
    },
    __self: this
  }, __jsx("a", {
    className: "jsx-1766591363",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 63
    },
    __self: this
  }, __jsx("img", {
    src: "/logo.svg",
    className: "jsx-1766591363",
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
    className: "jsx-1766591363",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 72
    },
    __self: this
  }, __jsx("div", {
    style: {
      height: '1px'
    },
    className: "jsx-1766591363",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 73
    },
    __self: this
  }), __jsx(Component, Object(_babel_runtime_corejs2_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, pageProps, {
    className: "jsx-1766591363" + " " + (pageProps && pageProps.className != null && pageProps.className || ""),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 74
    },
    __self: this
  }))), __jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_3___default.a, {
    id: "2973807395",
    __self: this
  }, "#header{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;margin:20px auto;width:720px;height:80px;}#logo>a{width:220px;}#header>*{display:-webkit-inline-box;display:-webkit-inline-flex;display:-ms-inline-flexbox;display:inline-flex;margin:auto;}#header>a{height:100%;line-height:80px;-webkit-text-decoration:none;text-decoration:none;font-size:30px;font-weight:lighter;color:#f0f0f0;box-sizing:border-box;border-bottom:0px solid #f0f0f0;-webkit-transition:border 0.3s;transition:border 0.3s;}#header>a.active{border-bottom:2px solid #808080;}#header>a:hover{font-weight:normal;border-bottom:5px solid #f0f0f0;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kaXNqdWtyL2Rldi95YWtzb2suanMvZ2gtcGFnZXMvc3JjL3BhZ2VzL19hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBMkUyQixBQUc4QixBQU1ELEFBR1EsQUFJUixBQVdvQixBQUdiLFlBcEJ2QixBQU9xQixPQWNlLFVBYlgsR0FVekIsbUJBSUEsdUJBNUJxQixLQWVGLFlBZEgsR0FlUSxRQVBSLENBUEEsV0FRaEIsQUFPa0IsQ0FkbEIsYUFlMEIsc0JBQ1UsZ0NBQ1Qsc0RBQzNCIiwiZmlsZSI6Ii9Vc2Vycy9kaXNqdWtyL2Rldi95YWtzb2suanMvZ2gtcGFnZXMvc3JjL3BhZ2VzL19hcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgSGVhZCBmcm9tICduZXh0L2hlYWQnO1xuaW1wb3J0IExpbmsgZnJvbSAnbmV4dC9saW5rJztcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gJ25leHQvcm91dGVyJztcbmltcG9ydCBHaXRodWJDb3JuZXIgZnJvbSAncmVhY3QtZ2l0aHViLWNvcm5lcic7XG5cbmNvbnN0IE5hdkxpbmsgPSAoeyBocmVmLCBjbGFzc05hbWUsIGNoaWxkcmVuLCAuLi5yZXN0IH0pID0+IHtcbiAgICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcbiAgICBjb25zdCBhY3RpdmUgPSByb3V0ZXIucGF0aG5hbWUuc3RhcnRzV2l0aChocmVmKTtcbiAgICBjb25zdCBhY3RpdmVDbGFzc05hbWUgPSBhY3RpdmUgPyAnIGFjdGl2ZScgOiAnJztcbiAgICByZXR1cm4gPExpbmtcbiAgICAgICAgaHJlZj17aHJlZn1cbiAgICAgICAgey4uLnJlc3R9XG4gICAgPlxuICAgICAgICA8YSBjbGFzc05hbWU9eyhjbGFzc05hbWUgfHwgJycpICsgYWN0aXZlQ2xhc3NOYW1lfT5cbiAgICAgICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgPC9hPlxuICAgIDwvTGluaz47XG59O1xuXG5mdW5jdGlvbiBBcHAoeyBDb21wb25lbnQsIHBhZ2VQcm9wcyB9KSB7XG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgY29uc3QgWWFrc29rTW9kZSA9IGFjZS5yZXF1aXJlKCdhY2UvbW9kZS95YWtzb2snKS5Nb2RlO1xuICAgICAgICBmb3IgKGNvbnN0IGVkaXRvckRpdiBvZiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubWQtY29kZTpub3QoLmFjZV9lZGl0b3IpJykpIHtcbiAgICAgICAgICAgIGNvbnN0IGxhbmd1YWdlID0gZWRpdG9yRGl2LmRhdGFzZXQubGFuZ3VhZ2U7XG4gICAgICAgICAgICBjb25zdCBlZGl0b3IgPSBhY2UuZWRpdChlZGl0b3JEaXYpO1xuICAgICAgICAgICAgZWRpdG9yLnNldE9wdGlvbnMoe1xuICAgICAgICAgICAgICAgIHNlbGVjdGlvblN0eWxlOiAndGV4dCcsXG4gICAgICAgICAgICAgICAgdXNlU29mdFRhYnM6IHRydWUsXG4gICAgICAgICAgICAgICAgaGlnaGxpZ2h0QWN0aXZlTGluZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgc2hvd1ByaW50TWFyZ2luOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzaG93R3V0dGVyOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB0aGVtZTogJ2FjZS90aGVtZS9tb25va2FpJyxcbiAgICAgICAgICAgICAgICByZWFkT25seTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBtYXhMaW5lczogSW5maW5pdHlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKGxhbmd1YWdlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGxhbmd1YWdlID09PSAneWFrc29rJykge1xuICAgICAgICAgICAgICAgICAgICBlZGl0b3IuZ2V0U2Vzc2lvbigpLnNldE1vZGUobmV3IFlha3Nva01vZGUoKSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZWRpdG9yLnNldE9wdGlvbnMoe1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZTogJ2FjZS9tb2RlLycgKyBsYW5ndWFnZVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gPD5cbiAgICAgICAgPEhlYWQ+XG4gICAgICAgICAgICA8dGl0bGU+eWFrc29rLmpzPC90aXRsZT5cbiAgICAgICAgICAgIDxzY3JpcHQgc3JjPVwiaHR0cHM6Ly9hamF4b3JnLmdpdGh1Yi5pby9hY2UtYnVpbGRzL3NyYy1ub2NvbmZsaWN0L2FjZS5qc1wiPjwvc2NyaXB0PlxuICAgICAgICAgICAgPHNjcmlwdCBzcmM9XCJodHRwczovL2FqYXhvcmcuZ2l0aHViLmlvL2FjZS1idWlsZHMvc3JjLW5vY29uZmxpY3QvbW9kZS1weXRob24uanNcIj48L3NjcmlwdD5cbiAgICAgICAgICAgIDxzY3JpcHQgc3JjPVwiL21vZGUteWFrc29rLmpzXCI+PC9zY3JpcHQ+XG4gICAgICAgIDwvSGVhZD5cbiAgICAgICAgPEdpdGh1YkNvcm5lclxuICAgICAgICAgICAgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS95YWtzb2sveWFrc29rLmpzXCJcbiAgICAgICAgICAgIG9jdG9Db2xvcj1cIiMyZjMxMjlcIlxuICAgICAgICAgICAgYmFubmVyQ29sb3I9XCIjZjBmMGYwXCJcbiAgICAgICAgLz5cbiAgICAgICAgPGhlYWRlciBpZD1cImhlYWRlclwiPlxuICAgICAgICAgICAgPGRpdiBpZD1cImxvZ29cIj5cbiAgICAgICAgICAgICAgICA8TGluayBocmVmPVwiL1wiPlxuICAgICAgICAgICAgICAgICAgICA8YT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiL2xvZ28uc3ZnXCIvPlxuICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgPC9MaW5rPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8TmF2TGluayBocmVmPVwiL2xlYXJuXCI+67Cw7Jqw6riwPC9OYXZMaW5rPlxuICAgICAgICAgICAgPE5hdkxpbmsgaHJlZj1cIi9wbGF5XCI+64aA7J207YSwPC9OYXZMaW5rPlxuICAgICAgICAgICAgPE5hdkxpbmsgaHJlZj1cIi9pbnN0YWxsXCI+7ISk7LmY7ZWY6riwPC9OYXZMaW5rPlxuICAgICAgICA8L2hlYWRlcj5cbiAgICAgICAgPGRpdiBpZD1cImNvbnRlbnRcIj5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgaGVpZ2h0OiAnMXB4JyB9fS8+XG4gICAgICAgICAgICA8Q29tcG9uZW50IHsuLi5wYWdlUHJvcHN9IC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8c3R5bGUgZ2xvYmFsIGpzeD57YFxuICAgICAgICAgICAgI2hlYWRlciB7XG4gICAgICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgICAgICBtYXJnaW46IDIwcHggYXV0bztcbiAgICAgICAgICAgICAgICB3aWR0aDogNzIwcHg7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiA4MHB4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgI2xvZ28gPiBhIHtcbiAgICAgICAgICAgICAgICB3aWR0aDogMjIwcHg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAjaGVhZGVyID4gKiB7XG4gICAgICAgICAgICAgICAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gICAgICAgICAgICAgICAgbWFyZ2luOiBhdXRvO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgI2hlYWRlciA+IGEge1xuICAgICAgICAgICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgICAgICAgICBsaW5lLWhlaWdodDogODBweDtcbiAgICAgICAgICAgICAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gICAgICAgICAgICAgICAgZm9udC1zaXplOiAzMHB4O1xuICAgICAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiBsaWdodGVyO1xuICAgICAgICAgICAgICAgIGNvbG9yOiAjZjBmMGYwO1xuICAgICAgICAgICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgICAgICAgICAgICAgYm9yZGVyLWJvdHRvbTogMHB4IHNvbGlkICNmMGYwZjA7XG4gICAgICAgICAgICAgICAgdHJhbnNpdGlvbjogYm9yZGVyIDAuM3M7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAjaGVhZGVyID4gYS5hY3RpdmUge1xuICAgICAgICAgICAgICAgIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCAjODA4MDgwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgI2hlYWRlciA+IGE6aG92ZXIge1xuICAgICAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gICAgICAgICAgICAgICAgYm9yZGVyLWJvdHRvbTogNXB4IHNvbGlkICNmMGYwZjA7XG4gICAgICAgICAgICB9XG4gICAgICAgIGB9PC9zdHlsZT5cbiAgICAgICAgPHN0eWxlIGdsb2JhbCBqc3g+e2BcbiAgICAgICAgICAgIEBpbXBvcnQgdXJsKGh0dHA6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9lYXJseWFjY2Vzcy9ub3Rvc2Fuc2tyLmNzcyk7XG4gICAgICAgICAgICBodG1sLCBib2R5IHtcbiAgICAgICAgICAgICAgICBtYXJnaW46IDA7XG4gICAgICAgICAgICAgICAgcGFkZGluZzogMDtcbiAgICAgICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgICAgICAgICAgZm9udC1mYW1pbHk6ICdOb3RvIFNhbnMgS1InLCBzYW5zLXNlcmlmO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYm9keSB7XG4gICAgICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMmYzMTI5O1xuICAgICAgICAgICAgICAgIGNvbG9yOiAjZjBmMGYwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgI19fbmV4dCB7XG4gICAgICAgICAgICAgICAgZmxleC1ncm93OiAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYSB7IGNvbG9yOiAjNjZkOWVmOyB9IGE6dmlzaXRlZCB7IGNvbG9yOiAjZTZkODc0OyB9XG4gICAgICAgICAgICBoMSwgaDIsIGgzIHsgZm9udC13ZWlnaHQ6IGxpZ2h0ZXI7IH1cbiAgICAgICAgICAgIGgxLmhlYWRsaW5lIHsgZm9udC13ZWlnaHQ6IG5vcm1hbDsgfVxuICAgICAgICAgICAgcCB7IHRleHQtaW5kZW50OiAxZW07IH1cbiAgICAgICAgICAgIGlmcmFtZSB7XG4gICAgICAgICAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgICAgICAgICAgbWFyZ2luOiAwIGF1dG87XG4gICAgICAgICAgICAgICAgd2lkdGg6IDY0MHB4O1xuICAgICAgICAgICAgICAgIGhlaWdodDogNTEwcHg7XG4gICAgICAgICAgICAgICAgYm9yZGVyOiBub25lO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29kZSwgcHJlLmNvZGUge1xuICAgICAgICAgICAgICAgIGZvbnQtZmFtaWx5OiBtb25vc3BhY2U7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzI3MjgyMjtcbiAgICAgICAgICAgICAgICB3b3JkLXdyYXA6IGJyZWFrLXdvcmQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb2RlIHtcbiAgICAgICAgICAgICAgICBjb2xvcjogI2Y5MjY3MjtcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiAzcHggNXB4O1xuICAgICAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDNweDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHByZS5jb2RlIHtcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiAxMHB4IDIwcHg7XG4gICAgICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogNXB4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHJlLnNpbXBsZS5jb2RlIHsgZm9udC1zaXplOiAxNHB0OyB9XG4gICAgICAgICAgICAjY29udGVudCB7XG4gICAgICAgICAgICAgICAgbWFyZ2luOiAwIGF1dG87XG4gICAgICAgICAgICAgICAgcGFkZGluZy1ib3R0b206IDUwdmg7XG4gICAgICAgICAgICAgICAgd2lkdGg6IDcyMHB4O1xuICAgICAgICAgICAgICAgIG1pbi1oZWlnaHQ6IDEwMCU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcmUgY29kZSB7XG4gICAgICAgICAgICAgICAgcGFkZGluZzogMHB4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYmxvY2txdW90ZSB7XG4gICAgICAgICAgICAgICAgYm9yZGVyLWxlZnQ6IDEwcHggc29saWQgcmdiYSgxMjgsMTI4LDEyOCwwLjA3NSk7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjpyZ2JhKDEyOCwxMjgsMTI4LDAuMSk7XG4gICAgICAgICAgICAgICAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6NXB4O1xuICAgICAgICAgICAgICAgIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOjVweDtcbiAgICAgICAgICAgICAgICBwYWRkaW5nOjE1cHggMjBweFxuICAgICAgICAgICAgfVxuICAgICAgICBgfTwvc3R5bGU+XG4gICAgPC8+O1xufVxuZXhwb3J0IGRlZmF1bHQgQXBwO1xuIl19 */\n/*@ sourceURL=/Users/disjukr/dev/yaksok.js/gh-pages/src/pages/_app.js */"), __jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_3___default.a, {
    id: "125851689",
    __self: this
  }, "@import url(http://fonts.googleapis.com/earlyaccess/notosanskr.css);html,body{margin:0;padding:0;width:100%;height:100%;font-family:'Noto Sans KR',sans-serif;}body{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;background-color:#2f3129;color:#f0f0f0;}#__next{-webkit-box-flex:1;-webkit-flex-grow:1;-ms-flex-positive:1;flex-grow:1;}a{color:#66d9ef;}a:visited{color:#e6d874;}h1,h2,h3{font-weight:lighter;}h1.headline{font-weight:normal;}p{text-indent:1em;}iframe{display:block;margin:0 auto;width:640px;height:510px;border:none;}code,pre.code{font-family:monospace;background-color:#272822;word-wrap:break-word;}code{color:#f92672;padding:3px 5px;border-radius:3px;}pre.code{padding:10px 20px;border-radius:5px;}pre.simple.code{font-size:14pt;}#content{margin:0 auto;padding-bottom:50vh;width:720px;min-height:100%;}pre code{padding:0px;}blockquote{border-left:10px solid rgba(128,128,128,0.075);background-color:rgba(128,128,128,0.1);border-top-right-radius:5px;border-bottom-right-radius:5px;padding:15px 20px;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kaXNqdWtyL2Rldi95YWtzb2suanMvZ2gtcGFnZXMvc3JjL3BhZ2VzL19hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBNEcyQixBQUVnRixBQUV0RCxBQU9JLEFBS0QsQUFFQyxBQUEyQixBQUNaLEFBQ0EsQUFDYixBQUVELEFBT1EsQUFLUixBQUtJLEFBR1UsQUFFZCxBQU1GLEFBR21DLFNBakRyQyxHQStDZCxFQWxDa0IsQUFBMkIsQUFNM0IsQUFZRSxBQVVJLENBSFMsQ0F0QmIsRUFvQkUsQ0FuQ1AsQUFja0IsQ0FEQSxFQVlKLE1BTmIsRUFsQkEsQUE4Qk0sSUFVTixFQUxoQixJQWhCaUIsRUFsQjBCLElBd0N2QixDQWhCSyxBQXVCaUIsQ0FqQjFDLEtBWGdCLFNBc0JoQixHQXJCQSxHQUtBLEdBaEJBLEdBTDZCLE1BSDdCLE1BK0MrQixhQTNDYixjQUNsQixDQTJDa0MsK0JBRW5DLGtCQUFDIiwiZmlsZSI6Ii9Vc2Vycy9kaXNqdWtyL2Rldi95YWtzb2suanMvZ2gtcGFnZXMvc3JjL3BhZ2VzL19hcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgSGVhZCBmcm9tICduZXh0L2hlYWQnO1xuaW1wb3J0IExpbmsgZnJvbSAnbmV4dC9saW5rJztcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gJ25leHQvcm91dGVyJztcbmltcG9ydCBHaXRodWJDb3JuZXIgZnJvbSAncmVhY3QtZ2l0aHViLWNvcm5lcic7XG5cbmNvbnN0IE5hdkxpbmsgPSAoeyBocmVmLCBjbGFzc05hbWUsIGNoaWxkcmVuLCAuLi5yZXN0IH0pID0+IHtcbiAgICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcbiAgICBjb25zdCBhY3RpdmUgPSByb3V0ZXIucGF0aG5hbWUuc3RhcnRzV2l0aChocmVmKTtcbiAgICBjb25zdCBhY3RpdmVDbGFzc05hbWUgPSBhY3RpdmUgPyAnIGFjdGl2ZScgOiAnJztcbiAgICByZXR1cm4gPExpbmtcbiAgICAgICAgaHJlZj17aHJlZn1cbiAgICAgICAgey4uLnJlc3R9XG4gICAgPlxuICAgICAgICA8YSBjbGFzc05hbWU9eyhjbGFzc05hbWUgfHwgJycpICsgYWN0aXZlQ2xhc3NOYW1lfT5cbiAgICAgICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgPC9hPlxuICAgIDwvTGluaz47XG59O1xuXG5mdW5jdGlvbiBBcHAoeyBDb21wb25lbnQsIHBhZ2VQcm9wcyB9KSB7XG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgY29uc3QgWWFrc29rTW9kZSA9IGFjZS5yZXF1aXJlKCdhY2UvbW9kZS95YWtzb2snKS5Nb2RlO1xuICAgICAgICBmb3IgKGNvbnN0IGVkaXRvckRpdiBvZiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubWQtY29kZTpub3QoLmFjZV9lZGl0b3IpJykpIHtcbiAgICAgICAgICAgIGNvbnN0IGxhbmd1YWdlID0gZWRpdG9yRGl2LmRhdGFzZXQubGFuZ3VhZ2U7XG4gICAgICAgICAgICBjb25zdCBlZGl0b3IgPSBhY2UuZWRpdChlZGl0b3JEaXYpO1xuICAgICAgICAgICAgZWRpdG9yLnNldE9wdGlvbnMoe1xuICAgICAgICAgICAgICAgIHNlbGVjdGlvblN0eWxlOiAndGV4dCcsXG4gICAgICAgICAgICAgICAgdXNlU29mdFRhYnM6IHRydWUsXG4gICAgICAgICAgICAgICAgaGlnaGxpZ2h0QWN0aXZlTGluZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgc2hvd1ByaW50TWFyZ2luOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzaG93R3V0dGVyOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB0aGVtZTogJ2FjZS90aGVtZS9tb25va2FpJyxcbiAgICAgICAgICAgICAgICByZWFkT25seTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBtYXhMaW5lczogSW5maW5pdHlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKGxhbmd1YWdlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGxhbmd1YWdlID09PSAneWFrc29rJykge1xuICAgICAgICAgICAgICAgICAgICBlZGl0b3IuZ2V0U2Vzc2lvbigpLnNldE1vZGUobmV3IFlha3Nva01vZGUoKSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZWRpdG9yLnNldE9wdGlvbnMoe1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZTogJ2FjZS9tb2RlLycgKyBsYW5ndWFnZVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gPD5cbiAgICAgICAgPEhlYWQ+XG4gICAgICAgICAgICA8dGl0bGU+eWFrc29rLmpzPC90aXRsZT5cbiAgICAgICAgICAgIDxzY3JpcHQgc3JjPVwiaHR0cHM6Ly9hamF4b3JnLmdpdGh1Yi5pby9hY2UtYnVpbGRzL3NyYy1ub2NvbmZsaWN0L2FjZS5qc1wiPjwvc2NyaXB0PlxuICAgICAgICAgICAgPHNjcmlwdCBzcmM9XCJodHRwczovL2FqYXhvcmcuZ2l0aHViLmlvL2FjZS1idWlsZHMvc3JjLW5vY29uZmxpY3QvbW9kZS1weXRob24uanNcIj48L3NjcmlwdD5cbiAgICAgICAgICAgIDxzY3JpcHQgc3JjPVwiL21vZGUteWFrc29rLmpzXCI+PC9zY3JpcHQ+XG4gICAgICAgIDwvSGVhZD5cbiAgICAgICAgPEdpdGh1YkNvcm5lclxuICAgICAgICAgICAgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS95YWtzb2sveWFrc29rLmpzXCJcbiAgICAgICAgICAgIG9jdG9Db2xvcj1cIiMyZjMxMjlcIlxuICAgICAgICAgICAgYmFubmVyQ29sb3I9XCIjZjBmMGYwXCJcbiAgICAgICAgLz5cbiAgICAgICAgPGhlYWRlciBpZD1cImhlYWRlclwiPlxuICAgICAgICAgICAgPGRpdiBpZD1cImxvZ29cIj5cbiAgICAgICAgICAgICAgICA8TGluayBocmVmPVwiL1wiPlxuICAgICAgICAgICAgICAgICAgICA8YT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiL2xvZ28uc3ZnXCIvPlxuICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgPC9MaW5rPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8TmF2TGluayBocmVmPVwiL2xlYXJuXCI+67Cw7Jqw6riwPC9OYXZMaW5rPlxuICAgICAgICAgICAgPE5hdkxpbmsgaHJlZj1cIi9wbGF5XCI+64aA7J207YSwPC9OYXZMaW5rPlxuICAgICAgICAgICAgPE5hdkxpbmsgaHJlZj1cIi9pbnN0YWxsXCI+7ISk7LmY7ZWY6riwPC9OYXZMaW5rPlxuICAgICAgICA8L2hlYWRlcj5cbiAgICAgICAgPGRpdiBpZD1cImNvbnRlbnRcIj5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgaGVpZ2h0OiAnMXB4JyB9fS8+XG4gICAgICAgICAgICA8Q29tcG9uZW50IHsuLi5wYWdlUHJvcHN9IC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8c3R5bGUgZ2xvYmFsIGpzeD57YFxuICAgICAgICAgICAgI2hlYWRlciB7XG4gICAgICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgICAgICBtYXJnaW46IDIwcHggYXV0bztcbiAgICAgICAgICAgICAgICB3aWR0aDogNzIwcHg7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiA4MHB4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgI2xvZ28gPiBhIHtcbiAgICAgICAgICAgICAgICB3aWR0aDogMjIwcHg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAjaGVhZGVyID4gKiB7XG4gICAgICAgICAgICAgICAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gICAgICAgICAgICAgICAgbWFyZ2luOiBhdXRvO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgI2hlYWRlciA+IGEge1xuICAgICAgICAgICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgICAgICAgICBsaW5lLWhlaWdodDogODBweDtcbiAgICAgICAgICAgICAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gICAgICAgICAgICAgICAgZm9udC1zaXplOiAzMHB4O1xuICAgICAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiBsaWdodGVyO1xuICAgICAgICAgICAgICAgIGNvbG9yOiAjZjBmMGYwO1xuICAgICAgICAgICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgICAgICAgICAgICAgYm9yZGVyLWJvdHRvbTogMHB4IHNvbGlkICNmMGYwZjA7XG4gICAgICAgICAgICAgICAgdHJhbnNpdGlvbjogYm9yZGVyIDAuM3M7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAjaGVhZGVyID4gYS5hY3RpdmUge1xuICAgICAgICAgICAgICAgIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCAjODA4MDgwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgI2hlYWRlciA+IGE6aG92ZXIge1xuICAgICAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gICAgICAgICAgICAgICAgYm9yZGVyLWJvdHRvbTogNXB4IHNvbGlkICNmMGYwZjA7XG4gICAgICAgICAgICB9XG4gICAgICAgIGB9PC9zdHlsZT5cbiAgICAgICAgPHN0eWxlIGdsb2JhbCBqc3g+e2BcbiAgICAgICAgICAgIEBpbXBvcnQgdXJsKGh0dHA6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9lYXJseWFjY2Vzcy9ub3Rvc2Fuc2tyLmNzcyk7XG4gICAgICAgICAgICBodG1sLCBib2R5IHtcbiAgICAgICAgICAgICAgICBtYXJnaW46IDA7XG4gICAgICAgICAgICAgICAgcGFkZGluZzogMDtcbiAgICAgICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgICAgICAgICAgZm9udC1mYW1pbHk6ICdOb3RvIFNhbnMgS1InLCBzYW5zLXNlcmlmO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYm9keSB7XG4gICAgICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMmYzMTI5O1xuICAgICAgICAgICAgICAgIGNvbG9yOiAjZjBmMGYwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgI19fbmV4dCB7XG4gICAgICAgICAgICAgICAgZmxleC1ncm93OiAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYSB7IGNvbG9yOiAjNjZkOWVmOyB9IGE6dmlzaXRlZCB7IGNvbG9yOiAjZTZkODc0OyB9XG4gICAgICAgICAgICBoMSwgaDIsIGgzIHsgZm9udC13ZWlnaHQ6IGxpZ2h0ZXI7IH1cbiAgICAgICAgICAgIGgxLmhlYWRsaW5lIHsgZm9udC13ZWlnaHQ6IG5vcm1hbDsgfVxuICAgICAgICAgICAgcCB7IHRleHQtaW5kZW50OiAxZW07IH1cbiAgICAgICAgICAgIGlmcmFtZSB7XG4gICAgICAgICAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgICAgICAgICAgbWFyZ2luOiAwIGF1dG87XG4gICAgICAgICAgICAgICAgd2lkdGg6IDY0MHB4O1xuICAgICAgICAgICAgICAgIGhlaWdodDogNTEwcHg7XG4gICAgICAgICAgICAgICAgYm9yZGVyOiBub25lO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29kZSwgcHJlLmNvZGUge1xuICAgICAgICAgICAgICAgIGZvbnQtZmFtaWx5OiBtb25vc3BhY2U7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzI3MjgyMjtcbiAgICAgICAgICAgICAgICB3b3JkLXdyYXA6IGJyZWFrLXdvcmQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb2RlIHtcbiAgICAgICAgICAgICAgICBjb2xvcjogI2Y5MjY3MjtcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiAzcHggNXB4O1xuICAgICAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDNweDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHByZS5jb2RlIHtcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiAxMHB4IDIwcHg7XG4gICAgICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogNXB4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHJlLnNpbXBsZS5jb2RlIHsgZm9udC1zaXplOiAxNHB0OyB9XG4gICAgICAgICAgICAjY29udGVudCB7XG4gICAgICAgICAgICAgICAgbWFyZ2luOiAwIGF1dG87XG4gICAgICAgICAgICAgICAgcGFkZGluZy1ib3R0b206IDUwdmg7XG4gICAgICAgICAgICAgICAgd2lkdGg6IDcyMHB4O1xuICAgICAgICAgICAgICAgIG1pbi1oZWlnaHQ6IDEwMCU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcmUgY29kZSB7XG4gICAgICAgICAgICAgICAgcGFkZGluZzogMHB4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYmxvY2txdW90ZSB7XG4gICAgICAgICAgICAgICAgYm9yZGVyLWxlZnQ6IDEwcHggc29saWQgcmdiYSgxMjgsMTI4LDEyOCwwLjA3NSk7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjpyZ2JhKDEyOCwxMjgsMTI4LDAuMSk7XG4gICAgICAgICAgICAgICAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6NXB4O1xuICAgICAgICAgICAgICAgIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOjVweDtcbiAgICAgICAgICAgICAgICBwYWRkaW5nOjE1cHggMjBweFxuICAgICAgICAgICAgfVxuICAgICAgICBgfTwvc3R5bGU+XG4gICAgPC8+O1xufVxuZXhwb3J0IGRlZmF1bHQgQXBwO1xuIl19 */\n/*@ sourceURL=/Users/disjukr/dev/yaksok.js/gh-pages/src/pages/_app.js */"));
}

/* harmony default export */ __webpack_exports__["default"] = (App);

/***/ })

})
//# sourceMappingURL=_app.js.472dbfd7e608fc9118ce.hot-update.js.map