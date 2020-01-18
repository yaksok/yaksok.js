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
  var router = Object(next_router__WEBPACK_IMPORTED_MODULE_7__["useRouter"])();
  var isPlayPage = router.pathname.startsWith('/play');
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
      lineNumber: 51
    },
    __self: this
  }, __jsx("title", {
    className: "jsx-3377022623",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 52
    },
    __self: this
  }, "yaksok.js"), __jsx("script", {
    src: "https://ajaxorg.github.io/ace-builds/src-noconflict/ace.js",
    className: "jsx-3377022623",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 53
    },
    __self: this
  }), __jsx("script", {
    src: "https://ajaxorg.github.io/ace-builds/src-noconflict/mode-python.js",
    className: "jsx-3377022623",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 54
    },
    __self: this
  }), __jsx("script", {
    src: "/mode-yaksok.js",
    className: "jsx-3377022623",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 55
    },
    __self: this
  })), __jsx(react_github_corner__WEBPACK_IMPORTED_MODULE_8___default.a, {
    href: "https://github.com/yaksok/yaksok.js",
    octoColor: "#2f3129",
    bannerColor: "#f0f0f0",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 57
    },
    __self: this
  }), __jsx("header", {
    id: "header",
    className: "jsx-3377022623",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 62
    },
    __self: this
  }, __jsx("div", {
    id: "logo",
    className: "jsx-3377022623",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 63
    },
    __self: this
  }, __jsx(next_link__WEBPACK_IMPORTED_MODULE_6___default.a, {
    href: "/",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 64
    },
    __self: this
  }, __jsx("a", {
    className: "jsx-3377022623",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 65
    },
    __self: this
  }, __jsx("img", {
    src: "/logo.svg",
    className: "jsx-3377022623",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 66
    },
    __self: this
  })))), __jsx(NavLink, {
    href: "/learn",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 70
    },
    __self: this
  }, "\uBC30\uC6B0\uAE30"), __jsx(NavLink, {
    href: "/play",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 71
    },
    __self: this
  }, "\uB180\uC774\uD130"), __jsx(NavLink, {
    href: "/install",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 72
    },
    __self: this
  }, "\uC124\uCE58\uD558\uAE30")), __jsx("div", {
    id: "content",
    className: "jsx-3377022623" + " " + ((isPlayPage ? 'full-width' : '') || ""),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 74
    },
    __self: this
  }, __jsx("div", {
    style: {
      height: '1px'
    },
    className: "jsx-3377022623",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 75
    },
    __self: this
  }), __jsx(Component, Object(_babel_runtime_corejs2_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, pageProps, {
    className: "jsx-3377022623" + " " + (pageProps && pageProps.className != null && pageProps.className || ""),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 76
    },
    __self: this
  }))), __jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_3___default.a, {
    id: "2973807395",
    __self: this
  }, "#header{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;margin:20px auto;width:720px;height:80px;}#logo>a{width:220px;}#header>*{display:-webkit-inline-box;display:-webkit-inline-flex;display:-ms-inline-flexbox;display:inline-flex;margin:auto;}#header>a{height:100%;line-height:80px;-webkit-text-decoration:none;text-decoration:none;font-size:30px;font-weight:lighter;color:#f0f0f0;box-sizing:border-box;border-bottom:0px solid #f0f0f0;-webkit-transition:border 0.3s;transition:border 0.3s;}#header>a.active{border-bottom:2px solid #808080;}#header>a:hover{font-weight:normal;border-bottom:5px solid #f0f0f0;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kaXNqdWtyL2Rldi95YWtzb2suanMvZ2gtcGFnZXMvc3JjL3BhZ2VzL19hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBNkUyQixBQUc4QixBQU1ELEFBR1EsQUFJUixBQVdvQixBQUdiLFlBcEJ2QixBQU9xQixPQWNlLFVBYlgsR0FVekIsbUJBSUEsdUJBNUJxQixLQWVGLFlBZEgsR0FlUSxRQVBSLENBUEEsV0FRaEIsQUFPa0IsQ0FkbEIsYUFlMEIsc0JBQ1UsZ0NBQ1Qsc0RBQzNCIiwiZmlsZSI6Ii9Vc2Vycy9kaXNqdWtyL2Rldi95YWtzb2suanMvZ2gtcGFnZXMvc3JjL3BhZ2VzL19hcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgSGVhZCBmcm9tICduZXh0L2hlYWQnO1xuaW1wb3J0IExpbmsgZnJvbSAnbmV4dC9saW5rJztcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gJ25leHQvcm91dGVyJztcbmltcG9ydCBHaXRodWJDb3JuZXIgZnJvbSAncmVhY3QtZ2l0aHViLWNvcm5lcic7XG5cbmNvbnN0IE5hdkxpbmsgPSAoeyBocmVmLCBjbGFzc05hbWUsIGNoaWxkcmVuLCAuLi5yZXN0IH0pID0+IHtcbiAgICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcbiAgICBjb25zdCBhY3RpdmUgPSByb3V0ZXIucGF0aG5hbWUuc3RhcnRzV2l0aChocmVmKTtcbiAgICBjb25zdCBhY3RpdmVDbGFzc05hbWUgPSBhY3RpdmUgPyAnIGFjdGl2ZScgOiAnJztcbiAgICByZXR1cm4gPExpbmtcbiAgICAgICAgaHJlZj17aHJlZn1cbiAgICAgICAgey4uLnJlc3R9XG4gICAgPlxuICAgICAgICA8YSBjbGFzc05hbWU9eyhjbGFzc05hbWUgfHwgJycpICsgYWN0aXZlQ2xhc3NOYW1lfT5cbiAgICAgICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgPC9hPlxuICAgIDwvTGluaz47XG59O1xuXG5mdW5jdGlvbiBBcHAoeyBDb21wb25lbnQsIHBhZ2VQcm9wcyB9KSB7XG4gICAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XG4gICAgY29uc3QgaXNQbGF5UGFnZSA9IHJvdXRlci5wYXRobmFtZS5zdGFydHNXaXRoKCcvcGxheScpO1xuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IFlha3Nva01vZGUgPSBhY2UucmVxdWlyZSgnYWNlL21vZGUveWFrc29rJykuTW9kZTtcbiAgICAgICAgZm9yIChjb25zdCBlZGl0b3JEaXYgb2YgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1kLWNvZGU6bm90KC5hY2VfZWRpdG9yKScpKSB7XG4gICAgICAgICAgICBjb25zdCBsYW5ndWFnZSA9IGVkaXRvckRpdi5kYXRhc2V0Lmxhbmd1YWdlO1xuICAgICAgICAgICAgY29uc3QgZWRpdG9yID0gYWNlLmVkaXQoZWRpdG9yRGl2KTtcbiAgICAgICAgICAgIGVkaXRvci5zZXRPcHRpb25zKHtcbiAgICAgICAgICAgICAgICBzZWxlY3Rpb25TdHlsZTogJ3RleHQnLFxuICAgICAgICAgICAgICAgIHVzZVNvZnRUYWJzOiB0cnVlLFxuICAgICAgICAgICAgICAgIGhpZ2hsaWdodEFjdGl2ZUxpbmU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHNob3dQcmludE1hcmdpbjogZmFsc2UsXG4gICAgICAgICAgICAgICAgc2hvd0d1dHRlcjogZmFsc2UsXG4gICAgICAgICAgICAgICAgdGhlbWU6ICdhY2UvdGhlbWUvbW9ub2thaScsXG4gICAgICAgICAgICAgICAgcmVhZE9ubHk6IHRydWUsXG4gICAgICAgICAgICAgICAgbWF4TGluZXM6IEluZmluaXR5XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChsYW5ndWFnZSkge1xuICAgICAgICAgICAgICAgIGlmIChsYW5ndWFnZSA9PT0gJ3lha3NvaycpIHtcbiAgICAgICAgICAgICAgICAgICAgZWRpdG9yLmdldFNlc3Npb24oKS5zZXRNb2RlKG5ldyBZYWtzb2tNb2RlKCkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGVkaXRvci5zZXRPcHRpb25zKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGU6ICdhY2UvbW9kZS8nICsgbGFuZ3VhZ2VcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIDw+XG4gICAgICAgIDxIZWFkPlxuICAgICAgICAgICAgPHRpdGxlPnlha3Nvay5qczwvdGl0bGU+XG4gICAgICAgICAgICA8c2NyaXB0IHNyYz1cImh0dHBzOi8vYWpheG9yZy5naXRodWIuaW8vYWNlLWJ1aWxkcy9zcmMtbm9jb25mbGljdC9hY2UuanNcIj48L3NjcmlwdD5cbiAgICAgICAgICAgIDxzY3JpcHQgc3JjPVwiaHR0cHM6Ly9hamF4b3JnLmdpdGh1Yi5pby9hY2UtYnVpbGRzL3NyYy1ub2NvbmZsaWN0L21vZGUtcHl0aG9uLmpzXCI+PC9zY3JpcHQ+XG4gICAgICAgICAgICA8c2NyaXB0IHNyYz1cIi9tb2RlLXlha3Nvay5qc1wiPjwvc2NyaXB0PlxuICAgICAgICA8L0hlYWQ+XG4gICAgICAgIDxHaXRodWJDb3JuZXJcbiAgICAgICAgICAgIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20veWFrc29rL3lha3Nvay5qc1wiXG4gICAgICAgICAgICBvY3RvQ29sb3I9XCIjMmYzMTI5XCJcbiAgICAgICAgICAgIGJhbm5lckNvbG9yPVwiI2YwZjBmMFwiXG4gICAgICAgIC8+XG4gICAgICAgIDxoZWFkZXIgaWQ9XCJoZWFkZXJcIj5cbiAgICAgICAgICAgIDxkaXYgaWQ9XCJsb2dvXCI+XG4gICAgICAgICAgICAgICAgPExpbmsgaHJlZj1cIi9cIj5cbiAgICAgICAgICAgICAgICAgICAgPGE+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIi9sb2dvLnN2Z1wiLz5cbiAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgIDwvTGluaz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPE5hdkxpbmsgaHJlZj1cIi9sZWFyblwiPuuwsOyasOq4sDwvTmF2TGluaz5cbiAgICAgICAgICAgIDxOYXZMaW5rIGhyZWY9XCIvcGxheVwiPuuGgOydtO2EsDwvTmF2TGluaz5cbiAgICAgICAgICAgIDxOYXZMaW5rIGhyZWY9XCIvaW5zdGFsbFwiPuyEpOy5mO2VmOq4sDwvTmF2TGluaz5cbiAgICAgICAgPC9oZWFkZXI+XG4gICAgICAgIDxkaXYgaWQ9XCJjb250ZW50XCIgY2xhc3NOYW1lPXtpc1BsYXlQYWdlID8gJ2Z1bGwtd2lkdGgnIDogJyd9PlxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBoZWlnaHQ6ICcxcHgnIH19Lz5cbiAgICAgICAgICAgIDxDb21wb25lbnQgey4uLnBhZ2VQcm9wc30gLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxzdHlsZSBnbG9iYWwganN4PntgXG4gICAgICAgICAgICAjaGVhZGVyIHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAgICAgIG1hcmdpbjogMjBweCBhdXRvO1xuICAgICAgICAgICAgICAgIHdpZHRoOiA3MjBweDtcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDgwcHg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAjbG9nbyA+IGEge1xuICAgICAgICAgICAgICAgIHdpZHRoOiAyMjBweDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICNoZWFkZXIgPiAqIHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgICAgICAgICAgICAgICBtYXJnaW46IGF1dG87XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAjaGVhZGVyID4gYSB7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICAgICAgICAgIGxpbmUtaGVpZ2h0OiA4MHB4O1xuICAgICAgICAgICAgICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgICAgICAgICAgICAgICBmb250LXNpemU6IDMwcHg7XG4gICAgICAgICAgICAgICAgZm9udC13ZWlnaHQ6IGxpZ2h0ZXI7XG4gICAgICAgICAgICAgICAgY29sb3I6ICNmMGYwZjA7XG4gICAgICAgICAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgICAgICAgICAgICBib3JkZXItYm90dG9tOiAwcHggc29saWQgI2YwZjBmMDtcbiAgICAgICAgICAgICAgICB0cmFuc2l0aW9uOiBib3JkZXIgMC4zcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICNoZWFkZXIgPiBhLmFjdGl2ZSB7XG4gICAgICAgICAgICAgICAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkICM4MDgwODA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAjaGVhZGVyID4gYTpob3ZlciB7XG4gICAgICAgICAgICAgICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgICAgICAgICAgICAgICBib3JkZXItYm90dG9tOiA1cHggc29saWQgI2YwZjBmMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgYH08L3N0eWxlPlxuICAgICAgICA8c3R5bGUgZ2xvYmFsIGpzeD57YFxuICAgICAgICAgICAgQGltcG9ydCB1cmwoaHR0cDovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2Vhcmx5YWNjZXNzL25vdG9zYW5za3IuY3NzKTtcbiAgICAgICAgICAgIGh0bWwsIGJvZHkge1xuICAgICAgICAgICAgICAgIG1hcmdpbjogMDtcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiAwO1xuICAgICAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgICAgICAgICBmb250LWZhbWlseTogJ05vdG8gU2FucyBLUicsIHNhbnMtc2VyaWY7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBib2R5IHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICMyZjMxMjk7XG4gICAgICAgICAgICAgICAgY29sb3I6ICNmMGYwZjA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAjX19uZXh0IHtcbiAgICAgICAgICAgICAgICBmbGV4LWdyb3c6IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhIHsgY29sb3I6ICM2NmQ5ZWY7IH0gYTp2aXNpdGVkIHsgY29sb3I6ICNlNmQ4NzQ7IH1cbiAgICAgICAgICAgIGgxLCBoMiwgaDMgeyBmb250LXdlaWdodDogbGlnaHRlcjsgfVxuICAgICAgICAgICAgaDEuaGVhZGxpbmUgeyBmb250LXdlaWdodDogbm9ybWFsOyB9XG4gICAgICAgICAgICBwIHsgdGV4dC1pbmRlbnQ6IDFlbTsgfVxuICAgICAgICAgICAgaWZyYW1lIHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgICAgICAgICBtYXJnaW46IDAgYXV0bztcbiAgICAgICAgICAgICAgICB3aWR0aDogNjQwcHg7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiA1MTBweDtcbiAgICAgICAgICAgICAgICBib3JkZXI6IG5vbmU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb2RlLCBwcmUuY29kZSB7XG4gICAgICAgICAgICAgICAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZTtcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjcyODIyO1xuICAgICAgICAgICAgICAgIHdvcmQtd3JhcDogYnJlYWstd29yZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvZGUge1xuICAgICAgICAgICAgICAgIGNvbG9yOiAjZjkyNjcyO1xuICAgICAgICAgICAgICAgIHBhZGRpbmc6IDNweCA1cHg7XG4gICAgICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogM3B4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHJlLmNvZGUge1xuICAgICAgICAgICAgICAgIHBhZGRpbmc6IDEwcHggMjBweDtcbiAgICAgICAgICAgICAgICBib3JkZXItcmFkaXVzOiA1cHg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcmUuc2ltcGxlLmNvZGUgeyBmb250LXNpemU6IDE0cHQ7IH1cbiAgICAgICAgICAgICNjb250ZW50IHtcbiAgICAgICAgICAgICAgICBtYXJnaW46IDAgYXV0bztcbiAgICAgICAgICAgICAgICBwYWRkaW5nLWJvdHRvbTogNTB2aDtcbiAgICAgICAgICAgICAgICB3aWR0aDogNzIwcHg7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgI2NvbnRlbnQuZnVsbC13aWR0aCB7XG4gICAgICAgICAgICAgICAgd2lkdGg6IDEwMHZ3O1xuICAgICAgICAgICAgICAgIHBhZGRpbmctbGVmdDogMWVtO1xuICAgICAgICAgICAgICAgIHBhZGRpbmctcmlnaHQ6IDFlbTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHByZSBjb2RlIHtcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiAwcHg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBibG9ja3F1b3RlIHtcbiAgICAgICAgICAgICAgICBib3JkZXItbGVmdDogMTBweCBzb2xpZCByZ2JhKDEyOCwxMjgsMTI4LDAuMDc1KTtcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMTI4LDEyOCwxMjgsMC4xKTtcbiAgICAgICAgICAgICAgICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czo1cHg7XG4gICAgICAgICAgICAgICAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6NXB4O1xuICAgICAgICAgICAgICAgIHBhZGRpbmc6MTVweCAyMHB4XG4gICAgICAgICAgICB9XG4gICAgICAgIGB9PC9zdHlsZT5cbiAgICA8Lz47XG59XG5leHBvcnQgZGVmYXVsdCBBcHA7XG4iXX0= */\n/*@ sourceURL=/Users/disjukr/dev/yaksok.js/gh-pages/src/pages/_app.js */"), __jsx(styled_jsx_style__WEBPACK_IMPORTED_MODULE_3___default.a, {
    id: "643876789",
    __self: this
  }, "@import url(http://fonts.googleapis.com/earlyaccess/notosanskr.css);html,body{margin:0;padding:0;width:100%;height:100%;font-family:'Noto Sans KR',sans-serif;}body{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;background-color:#2f3129;color:#f0f0f0;}#__next{-webkit-box-flex:1;-webkit-flex-grow:1;-ms-flex-positive:1;flex-grow:1;}a{color:#66d9ef;}a:visited{color:#e6d874;}h1,h2,h3{font-weight:lighter;}h1.headline{font-weight:normal;}p{text-indent:1em;}iframe{display:block;margin:0 auto;width:640px;height:510px;border:none;}code,pre.code{font-family:monospace;background-color:#272822;word-wrap:break-word;}code{color:#f92672;padding:3px 5px;border-radius:3px;}pre.code{padding:10px 20px;border-radius:5px;}pre.simple.code{font-size:14pt;}#content{margin:0 auto;padding-bottom:50vh;width:720px;height:100%;}#content.full-width{width:100vw;padding-left:1em;padding-right:1em;}pre code{padding:0px;}blockquote{border-left:10px solid rgba(128,128,128,0.075);background-color:rgba(128,128,128,0.1);border-top-right-radius:5px;border-bottom-right-radius:5px;padding:15px 20px;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kaXNqdWtyL2Rldi95YWtzb2suanMvZ2gtcGFnZXMvc3JjL3BhZ2VzL19hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBOEcyQixBQUVnRixBQUV0RCxBQU9JLEFBS0QsQUFFQyxBQUEyQixBQUNaLEFBQ0EsQUFDYixBQUVELEFBT1EsQUFLUixBQUtJLEFBR1UsQUFFZCxBQU1GLEFBS0EsQUFHbUMsU0F0RHJDLEdBK0NPLEFBS3JCLEVBdkNrQixBQUEyQixBQU0zQixBQVlFLEFBVUksQ0FIUyxDQXRCYixFQW9CRSxDQW5DUCxBQWNrQixDQURBLEVBWUosTUFOYixDQTRCTSxDQTlDTixBQThCTSxJQVVOLEVBTGhCLElBaEJpQixFQWxCMEIsSUF3QzNCLENBaEJTLEFBc0J6QixBQU0wQyxDQXRCMUMsS0FYZ0IsS0FzQmhCLE9BckJBLEdBS0EsR0FoQkEsR0FMNkIsTUFIN0IsTUFvRCtCLGFBaERiLGNBQ2xCLENBZ0RrQywrQkFFbkMsa0JBQUMiLCJmaWxlIjoiL1VzZXJzL2Rpc2p1a3IvZGV2L3lha3Nvay5qcy9naC1wYWdlcy9zcmMvcGFnZXMvX2FwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBIZWFkIGZyb20gJ25leHQvaGVhZCc7XG5pbXBvcnQgTGluayBmcm9tICduZXh0L2xpbmsnO1xuaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSAnbmV4dC9yb3V0ZXInO1xuaW1wb3J0IEdpdGh1YkNvcm5lciBmcm9tICdyZWFjdC1naXRodWItY29ybmVyJztcblxuY29uc3QgTmF2TGluayA9ICh7IGhyZWYsIGNsYXNzTmFtZSwgY2hpbGRyZW4sIC4uLnJlc3QgfSkgPT4ge1xuICAgIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpO1xuICAgIGNvbnN0IGFjdGl2ZSA9IHJvdXRlci5wYXRobmFtZS5zdGFydHNXaXRoKGhyZWYpO1xuICAgIGNvbnN0IGFjdGl2ZUNsYXNzTmFtZSA9IGFjdGl2ZSA/ICcgYWN0aXZlJyA6ICcnO1xuICAgIHJldHVybiA8TGlua1xuICAgICAgICBocmVmPXtocmVmfVxuICAgICAgICB7Li4ucmVzdH1cbiAgICA+XG4gICAgICAgIDxhIGNsYXNzTmFtZT17KGNsYXNzTmFtZSB8fCAnJykgKyBhY3RpdmVDbGFzc05hbWV9PlxuICAgICAgICAgICAge2NoaWxkcmVufVxuICAgICAgICA8L2E+XG4gICAgPC9MaW5rPjtcbn07XG5cbmZ1bmN0aW9uIEFwcCh7IENvbXBvbmVudCwgcGFnZVByb3BzIH0pIHtcbiAgICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcbiAgICBjb25zdCBpc1BsYXlQYWdlID0gcm91dGVyLnBhdGhuYW1lLnN0YXJ0c1dpdGgoJy9wbGF5Jyk7XG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgY29uc3QgWWFrc29rTW9kZSA9IGFjZS5yZXF1aXJlKCdhY2UvbW9kZS95YWtzb2snKS5Nb2RlO1xuICAgICAgICBmb3IgKGNvbnN0IGVkaXRvckRpdiBvZiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubWQtY29kZTpub3QoLmFjZV9lZGl0b3IpJykpIHtcbiAgICAgICAgICAgIGNvbnN0IGxhbmd1YWdlID0gZWRpdG9yRGl2LmRhdGFzZXQubGFuZ3VhZ2U7XG4gICAgICAgICAgICBjb25zdCBlZGl0b3IgPSBhY2UuZWRpdChlZGl0b3JEaXYpO1xuICAgICAgICAgICAgZWRpdG9yLnNldE9wdGlvbnMoe1xuICAgICAgICAgICAgICAgIHNlbGVjdGlvblN0eWxlOiAndGV4dCcsXG4gICAgICAgICAgICAgICAgdXNlU29mdFRhYnM6IHRydWUsXG4gICAgICAgICAgICAgICAgaGlnaGxpZ2h0QWN0aXZlTGluZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgc2hvd1ByaW50TWFyZ2luOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzaG93R3V0dGVyOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB0aGVtZTogJ2FjZS90aGVtZS9tb25va2FpJyxcbiAgICAgICAgICAgICAgICByZWFkT25seTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBtYXhMaW5lczogSW5maW5pdHlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKGxhbmd1YWdlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGxhbmd1YWdlID09PSAneWFrc29rJykge1xuICAgICAgICAgICAgICAgICAgICBlZGl0b3IuZ2V0U2Vzc2lvbigpLnNldE1vZGUobmV3IFlha3Nva01vZGUoKSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZWRpdG9yLnNldE9wdGlvbnMoe1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZTogJ2FjZS9tb2RlLycgKyBsYW5ndWFnZVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gPD5cbiAgICAgICAgPEhlYWQ+XG4gICAgICAgICAgICA8dGl0bGU+eWFrc29rLmpzPC90aXRsZT5cbiAgICAgICAgICAgIDxzY3JpcHQgc3JjPVwiaHR0cHM6Ly9hamF4b3JnLmdpdGh1Yi5pby9hY2UtYnVpbGRzL3NyYy1ub2NvbmZsaWN0L2FjZS5qc1wiPjwvc2NyaXB0PlxuICAgICAgICAgICAgPHNjcmlwdCBzcmM9XCJodHRwczovL2FqYXhvcmcuZ2l0aHViLmlvL2FjZS1idWlsZHMvc3JjLW5vY29uZmxpY3QvbW9kZS1weXRob24uanNcIj48L3NjcmlwdD5cbiAgICAgICAgICAgIDxzY3JpcHQgc3JjPVwiL21vZGUteWFrc29rLmpzXCI+PC9zY3JpcHQ+XG4gICAgICAgIDwvSGVhZD5cbiAgICAgICAgPEdpdGh1YkNvcm5lclxuICAgICAgICAgICAgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS95YWtzb2sveWFrc29rLmpzXCJcbiAgICAgICAgICAgIG9jdG9Db2xvcj1cIiMyZjMxMjlcIlxuICAgICAgICAgICAgYmFubmVyQ29sb3I9XCIjZjBmMGYwXCJcbiAgICAgICAgLz5cbiAgICAgICAgPGhlYWRlciBpZD1cImhlYWRlclwiPlxuICAgICAgICAgICAgPGRpdiBpZD1cImxvZ29cIj5cbiAgICAgICAgICAgICAgICA8TGluayBocmVmPVwiL1wiPlxuICAgICAgICAgICAgICAgICAgICA8YT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiL2xvZ28uc3ZnXCIvPlxuICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgPC9MaW5rPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8TmF2TGluayBocmVmPVwiL2xlYXJuXCI+67Cw7Jqw6riwPC9OYXZMaW5rPlxuICAgICAgICAgICAgPE5hdkxpbmsgaHJlZj1cIi9wbGF5XCI+64aA7J207YSwPC9OYXZMaW5rPlxuICAgICAgICAgICAgPE5hdkxpbmsgaHJlZj1cIi9pbnN0YWxsXCI+7ISk7LmY7ZWY6riwPC9OYXZMaW5rPlxuICAgICAgICA8L2hlYWRlcj5cbiAgICAgICAgPGRpdiBpZD1cImNvbnRlbnRcIiBjbGFzc05hbWU9e2lzUGxheVBhZ2UgPyAnZnVsbC13aWR0aCcgOiAnJ30+XG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGhlaWdodDogJzFweCcgfX0vPlxuICAgICAgICAgICAgPENvbXBvbmVudCB7Li4ucGFnZVByb3BzfSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPHN0eWxlIGdsb2JhbCBqc3g+e2BcbiAgICAgICAgICAgICNoZWFkZXIge1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICAgICAgbWFyZ2luOiAyMHB4IGF1dG87XG4gICAgICAgICAgICAgICAgd2lkdGg6IDcyMHB4O1xuICAgICAgICAgICAgICAgIGhlaWdodDogODBweDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICNsb2dvID4gYSB7XG4gICAgICAgICAgICAgICAgd2lkdGg6IDIyMHB4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgI2hlYWRlciA+ICoge1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICAgICAgICAgICAgICAgIG1hcmdpbjogYXV0bztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICNoZWFkZXIgPiBhIHtcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgICAgICAgICAgbGluZS1oZWlnaHQ6IDgwcHg7XG4gICAgICAgICAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogMzBweDtcbiAgICAgICAgICAgICAgICBmb250LXdlaWdodDogbGlnaHRlcjtcbiAgICAgICAgICAgICAgICBjb2xvcjogI2YwZjBmMDtcbiAgICAgICAgICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgICAgICAgICAgIGJvcmRlci1ib3R0b206IDBweCBzb2xpZCAjZjBmMGYwO1xuICAgICAgICAgICAgICAgIHRyYW5zaXRpb246IGJvcmRlciAwLjNzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgI2hlYWRlciA+IGEuYWN0aXZlIHtcbiAgICAgICAgICAgICAgICBib3JkZXItYm90dG9tOiAycHggc29saWQgIzgwODA4MDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICNoZWFkZXIgPiBhOmhvdmVyIHtcbiAgICAgICAgICAgICAgICBmb250LXdlaWdodDogbm9ybWFsO1xuICAgICAgICAgICAgICAgIGJvcmRlci1ib3R0b206IDVweCBzb2xpZCAjZjBmMGYwO1xuICAgICAgICAgICAgfVxuICAgICAgICBgfTwvc3R5bGU+XG4gICAgICAgIDxzdHlsZSBnbG9iYWwganN4PntgXG4gICAgICAgICAgICBAaW1wb3J0IHVybChodHRwOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vZWFybHlhY2Nlc3Mvbm90b3NhbnNrci5jc3MpO1xuICAgICAgICAgICAgaHRtbCwgYm9keSB7XG4gICAgICAgICAgICAgICAgbWFyZ2luOiAwO1xuICAgICAgICAgICAgICAgIHBhZGRpbmc6IDA7XG4gICAgICAgICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICAgICAgICAgIGZvbnQtZmFtaWx5OiAnTm90byBTYW5zIEtSJywgc2Fucy1zZXJpZjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJvZHkge1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzJmMzEyOTtcbiAgICAgICAgICAgICAgICBjb2xvcjogI2YwZjBmMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICNfX25leHQge1xuICAgICAgICAgICAgICAgIGZsZXgtZ3JvdzogMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGEgeyBjb2xvcjogIzY2ZDllZjsgfSBhOnZpc2l0ZWQgeyBjb2xvcjogI2U2ZDg3NDsgfVxuICAgICAgICAgICAgaDEsIGgyLCBoMyB7IGZvbnQtd2VpZ2h0OiBsaWdodGVyOyB9XG4gICAgICAgICAgICBoMS5oZWFkbGluZSB7IGZvbnQtd2VpZ2h0OiBub3JtYWw7IH1cbiAgICAgICAgICAgIHAgeyB0ZXh0LWluZGVudDogMWVtOyB9XG4gICAgICAgICAgICBpZnJhbWUge1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICAgICAgICAgIG1hcmdpbjogMCBhdXRvO1xuICAgICAgICAgICAgICAgIHdpZHRoOiA2NDBweDtcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDUxMHB4O1xuICAgICAgICAgICAgICAgIGJvcmRlcjogbm9uZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvZGUsIHByZS5jb2RlIHtcbiAgICAgICAgICAgICAgICBmb250LWZhbWlseTogbW9ub3NwYWNlO1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICMyNzI4MjI7XG4gICAgICAgICAgICAgICAgd29yZC13cmFwOiBicmVhay13b3JkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29kZSB7XG4gICAgICAgICAgICAgICAgY29sb3I6ICNmOTI2NzI7XG4gICAgICAgICAgICAgICAgcGFkZGluZzogM3B4IDVweDtcbiAgICAgICAgICAgICAgICBib3JkZXItcmFkaXVzOiAzcHg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcmUuY29kZSB7XG4gICAgICAgICAgICAgICAgcGFkZGluZzogMTBweCAyMHB4O1xuICAgICAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHByZS5zaW1wbGUuY29kZSB7IGZvbnQtc2l6ZTogMTRwdDsgfVxuICAgICAgICAgICAgI2NvbnRlbnQge1xuICAgICAgICAgICAgICAgIG1hcmdpbjogMCBhdXRvO1xuICAgICAgICAgICAgICAgIHBhZGRpbmctYm90dG9tOiA1MHZoO1xuICAgICAgICAgICAgICAgIHdpZHRoOiA3MjBweDtcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAjY29udGVudC5mdWxsLXdpZHRoIHtcbiAgICAgICAgICAgICAgICB3aWR0aDogMTAwdnc7XG4gICAgICAgICAgICAgICAgcGFkZGluZy1sZWZ0OiAxZW07XG4gICAgICAgICAgICAgICAgcGFkZGluZy1yaWdodDogMWVtO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHJlIGNvZGUge1xuICAgICAgICAgICAgICAgIHBhZGRpbmc6IDBweDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJsb2NrcXVvdGUge1xuICAgICAgICAgICAgICAgIGJvcmRlci1sZWZ0OiAxMHB4IHNvbGlkIHJnYmEoMTI4LDEyOCwxMjgsMC4wNzUpO1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6cmdiYSgxMjgsMTI4LDEyOCwwLjEpO1xuICAgICAgICAgICAgICAgIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOjVweDtcbiAgICAgICAgICAgICAgICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czo1cHg7XG4gICAgICAgICAgICAgICAgcGFkZGluZzoxNXB4IDIwcHhcbiAgICAgICAgICAgIH1cbiAgICAgICAgYH08L3N0eWxlPlxuICAgIDwvPjtcbn1cbmV4cG9ydCBkZWZhdWx0IEFwcDtcbiJdfQ== */\n/*@ sourceURL=/Users/disjukr/dev/yaksok.js/gh-pages/src/pages/_app.js */"));
}

/* harmony default export */ __webpack_exports__["default"] = (App);

/***/ })

})
//# sourceMappingURL=_app.js.42f7d607afcc33e81bc3.hot-update.js.map