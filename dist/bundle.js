/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.OclEngine = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _oclParser = __webpack_require__(1);

var _utils = __webpack_require__(3);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OclEngine = exports.OclEngine = function () {
    function OclEngine() {
        _classCallCheck(this, OclEngine);

        this.oclExpressionsPerType = {};
    }

    _createClass(OclEngine, [{
        key: 'addOclExpression',
        value: function addOclExpression(oclExpression) {
            var parsedExpression = _oclParser.OclParser.parse(oclExpression);
            this._addOclExpressionForType(parsedExpression.targetType, parsedExpression);
            return this;
        }
    }, {
        key: 'getOclExpressionsForType',
        value: function getOclExpressionsForType(type) {
            return this.oclExpressionsPerType[type] || [];
        }
    }, {
        key: '_addOclExpressionForType',
        value: function _addOclExpressionForType(type, oclExpression) {
            var oclExpressions = this.getOclExpressionsForType(type);
            oclExpressions.push(oclExpression);
            this.oclExpressionsPerType[type] = oclExpressions;
        }
    }, {
        key: 'evaluate',
        value: function evaluate(obj) {
            var type = _utils.Utils.getClassName(obj);
            var oclExpressionsForType = this.getOclExpressionsForType(type);
            oclExpressionsForType.forEach(function (e) {
                return e.evaluate(obj);
            });

            var namesOfFailedInvs = oclExpressionsForType.filter(function (e) {
                return e.evaluationResult === false;
            }).map(function (e) {
                return e.invs;
            }).reduce(function (p, c) {
                return p.concat(c);
            }, []).filter(function (i) {
                return i.evaluationResult === false;
            }).map(function (i) {
                return i.name || 'anonymous';
            });

            var oclResult = new OclResult();
            oclResult.setResult(namesOfFailedInvs.length === 0);
            oclResult.setNamesOfFailedInvs(namesOfFailedInvs);
            return oclResult;
        }
    }]);

    return OclEngine;
}();

var OclResult = function () {
    function OclResult() {
        _classCallCheck(this, OclResult);
    }

    _createClass(OclResult, [{
        key: 'setResult',
        value: function setResult(result) {
            this.result = result;
        }
    }, {
        key: 'getResult',
        value: function getResult() {
            return this.result;
        }
    }, {
        key: 'setNamesOfFailedInvs',
        value: function setNamesOfFailedInvs(names) {
            this.setNamesOfFailedInvs = names;
        }
    }, {
        key: 'getNamesOfFailedInvs',
        value: function getNamesOfFailedInvs() {
            return this.setNamesOfFailedInvs;
        }
    }]);

    return OclResult;
}();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var parser = __webpack_require__(2);

var OclParser = exports.OclParser = function () {
    function OclParser() {
        _classCallCheck(this, OclParser);
    }

    _createClass(OclParser, null, [{
        key: 'parse',
        value: function parse(oclExpression) {
            return parser.parse(oclExpression);
        }
    }]);

    return OclParser;
}();

/***/ }),
/* 2 */
/***/ (function(module, exports) {

"use strict";

var _expressions = require("../expressions/expressions");

var Expression = _interopRequireWildcard(_expressions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/* parser generated by jison 0.4.17 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var parser = function () {
    var o = function o(k, v, _o, l) {
        for (_o = _o || {}, l = k.length; l--; _o[k[l]] = v) {}return _o;
    },
        $V0 = [1, 7],
        $V1 = [1, 11],
        $V2 = [1, 12],
        $V3 = [1, 9],
        $V4 = [5, 11, 15, 18, 19, 20, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 39, 40, 46, 47, 56],
        $V5 = [2, 51],
        $V6 = [5, 11, 15],
        $V7 = [2, 44],
        $V8 = [1, 16],
        $V9 = [1, 22],
        $Va = [1, 25],
        $Vb = [1, 26],
        $Vc = [1, 27],
        $Vd = [1, 28],
        $Ve = [1, 29],
        $Vf = [1, 30],
        $Vg = [1, 51],
        $Vh = [1, 34],
        $Vi = [1, 35],
        $Vj = [1, 36],
        $Vk = [1, 37],
        $Vl = [1, 38],
        $Vm = [1, 39],
        $Vn = [1, 40],
        $Vo = [1, 41],
        $Vp = [1, 42],
        $Vq = [1, 43],
        $Vr = [1, 44],
        $Vs = [1, 45],
        $Vt = [1, 46],
        $Vu = [1, 47],
        $Vv = [1, 48],
        $Vw = [1, 49],
        $Vx = [1, 50],
        $Vy = [1, 52],
        $Vz = [5, 11, 15, 18, 19, 20, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 40],
        $VA = [2, 41],
        $VB = [1, 54],
        $VC = [5, 11, 15, 19, 22, 23, 34, 35, 36, 40],
        $VD = [5, 11, 15, 19, 22, 23, 24, 25, 34, 35, 36, 40],
        $VE = [5, 11, 15, 19],
        $VF = [5, 11, 15, 19, 34, 35, 36, 40],
        $VG = [39, 46],
        $VH = [1, 90],
        $VI = [2, 39];
    var parser = { trace: function trace() {},
        yy: {},
        symbols_: { "error": 2, "contextDeclList": 3, "contextDeclaration": 4, "EOF": 5, "classifierContextDecl": 6, "context": 7, "pathName": 8, "invOrDefList": 9, "invOrDef": 10, "inv": 11, "simpleNameOptional": 12, ":": 13, "oclExpression": 14, "def": 15, "defExpression": 16, "preOptional": 17, "(": 18, ")": 19, ".": 20, "simpleName": 21, "+": 22, "-": 23, "*": 24, "/": 25, "mod": 26, "div": 27, "<": 28, "<=": 29, "=": 30, ">=": 31, ">": 32, "<>": 33, "and": 34, "or": 35, "xor": 36, "->": 37, "variableDeclarationList": 38, "|": 39, "implies": 40, "literalExp": 41, "let": 42, "type": 43, "variableDeclaration": 44, "typeOptional": 45, ",": 46, "@": 47, "pre": 48, "primitiveLiteralExp": 49, "integer": 50, "real": 51, "string": 52, "true": 53, "false": 54, "nil": 55, "::": 56, "$accept": 0, "$end": 1 },
        terminals_: { 2: "error", 5: "EOF", 7: "context", 11: "inv", 13: ":", 15: "def", 18: "(", 19: ")", 20: ".", 21: "simpleName", 22: "+", 23: "-", 24: "*", 25: "/", 26: "mod", 27: "div", 28: "<", 29: "<=", 30: "=", 31: ">=", 32: ">", 33: "<>", 34: "and", 35: "or", 36: "xor", 37: "->", 39: "|", 40: "implies", 42: "let", 46: ",", 47: "@", 48: "pre", 50: "integer", 51: "real", 52: "string", 53: "true", 54: "false", 55: "nil", 56: "::" },
        productions_: [0, [3, 2], [4, 1], [6, 3], [9, 2], [9, 1], [10, 4], [10, 4], [14, 2], [14, 3], [14, 4], [14, 3], [14, 3], [14, 3], [14, 3], [14, 3], [14, 3], [14, 3], [14, 3], [14, 3], [14, 3], [14, 3], [14, 3], [14, 3], [14, 3], [14, 3], [14, 3], [14, 6], [14, 4], [14, 3], [14, 3], [14, 1], [16, 4], [16, 3], [43, 1], [44, 2], [38, 3], [38, 1], [45, 2], [45, 0], [17, 2], [17, 0], [41, 1], [12, 1], [12, 0], [49, 1], [49, 1], [49, 1], [49, 1], [49, 1], [49, 1], [8, 1], [8, 3]],
        performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
            /* this == yyval */

            var $0 = $$.length - 1;
            switch (yystate) {
                case 1:
                    return $$[$0 - 1];
                    break;
                case 2:case 31:case 34:case 38:case 42:case 43:case 51:
                    this.$ = $$[$0];
                    break;
                case 3:
                    this.$ = new Expression.ContextExpression($$[$0 - 1], $$[$0]);
                    break;
                case 4:
                    this.$ = $$[$0 - 1].concat($$[$0]);
                    break;
                case 5:case 37:
                    this.$ = [$$[$0]];
                    break;
                case 6:
                    this.$ = new Expression.InvariantExpression($$[$0], $$[$0 - 2]);
                    break;
                case 7:case 32:case 33:
                    this.$ = new Expression.LetExpression($$[$0 - 2], $$[$0]);
                    break;
                case 8:
                    this.$ = new Expression.VariableExpression($$[$0 - 1]);
                    break;
                case 9:case 35:
                    this.$ = $$[$0 - 1];
                    break;
                case 10:
                    this.$ = $$[$0 - 3] instanceof Expression.VariableExpression ? new Expression.VariableExpression([$$[$0 - 3].variable, $$[$0 - 1]].join('.')) : $$[$0 - 3];
                    break;
                case 11:case 12:
                    this.$ = new Expression.AdditionExpression($$[$0 - 2], $$[$0]);
                    break;
                case 13:
                    this.$ = new Expression.MultiplyExpression($$[$0 - 2], $$[$0]);
                    break;
                case 14:case 16:
                    this.$ = new Expression.DivideExpression($$[$0 - 2], $$[$0]);
                    break;
                case 15:
                    this.$ = new Expression.ModuloExpression($$[$0 - 2], $$[$0]);
                    break;
                case 17:
                    this.$ = new Expression.OperationCallExpression('<', $$[$0 - 2], $$[$0]);
                    break;
                case 18:
                    this.$ = new Expression.OperationCallExpression('<=', $$[$0 - 2], $$[$0]);
                    break;
                case 19:
                    this.$ = new Expression.OperationCallExpression('=', $$[$0 - 2], $$[$0]);
                    break;
                case 20:
                    this.$ = new Expression.OperationCallExpression('>=', $$[$0 - 2], $$[$0]);
                    break;
                case 21:
                    this.$ = new Expression.OperationCallExpression('>', $$[$0 - 2], $$[$0]);
                    break;
                case 22:
                    this.$ = new Expression.OperationCallExpression('<>', $$[$0 - 2], $$[$0]);
                    break;
                case 23:
                    this.$ = new Expression.AndExpression($$[$0 - 2], $$[$0]);
                    break;
                case 24:
                    this.$ = new Expression.OrExpression($$[$0 - 2], $$[$0]);
                    break;
                case 25:
                    this.$ = new Expression.XorExpression($$[$0 - 2], $$[$0]);
                    break;
                case 26:
                    this.$ = functionCallExpression($$[$0], this.$);
                    break;
                case 27:
                    $$[$0 - 5].body = $$[$0 - 1];$$[$0 - 5].iterators = $$[$0 - 3];this.$ = $$[$0 - 5];
                    break;
                case 28:
                    $$[$0 - 3].body = $$[$0 - 1];this.$ = $$[$0 - 3];
                    break;
                case 29:

                    break;
                case 30:
                    this.$ = new Expression.ImpliesExpression($$[$0 - 2], $$[$0]);
                    break;
                case 36:
                    this.$ = [].concat($$[$0 - 2]).concat($$[$0]);
                    break;
                case 45:case 46:
                    this.$ = new Expression.NumberExpression($$[$0]);
                    break;
                case 47:
                    this.$ = new Expression.StringExpression($$[$0]);
                    break;
                case 48:
                    this.$ = new Expression.BooleanExpression(true);
                    break;
                case 49:
                    this.$ = new Expression.BooleanExpression(false);
                    break;
                case 50:
                    this.$ = new Expression.NilExpression();
                    break;
                case 52:
                    this.$ = $$[$0 - 2];
                    break;
            }
        },
        table: [{ 3: 1, 4: 2, 6: 3, 7: [1, 4] }, { 1: [3] }, { 5: [1, 5] }, { 5: [2, 2] }, { 8: 6, 21: $V0 }, { 1: [2, 1] }, { 9: 8, 10: 10, 11: $V1, 15: $V2, 56: $V3 }, o($V4, $V5), { 5: [2, 3], 10: 13, 11: $V1, 15: $V2 }, { 21: [1, 14] }, o($V6, [2, 5]), { 12: 15, 13: $V7, 21: $V8 }, { 12: 17, 13: $V7, 21: $V8 }, o($V6, [2, 4]), o($V4, [2, 52]), { 13: [1, 18] }, { 13: [2, 43] }, { 13: [1, 19] }, { 8: 21, 14: 20, 18: $V9, 21: $V0, 41: 23, 49: 24, 50: $Va, 51: $Vb, 52: $Vc, 53: $Vd, 54: $Ve, 55: $Vf }, { 16: 31, 21: [1, 33], 42: [1, 32] }, o($V6, [2, 6], { 18: $Vg, 20: $Vh, 22: $Vi, 23: $Vj, 24: $Vk, 25: $Vl, 26: $Vm, 27: $Vn, 28: $Vo, 29: $Vp, 30: $Vq, 31: $Vr, 32: $Vs, 33: $Vt, 34: $Vu, 35: $Vv, 36: $Vw, 37: $Vx, 40: $Vy }), o($Vz, $VA, { 17: 53, 47: $VB, 56: $V3 }), { 8: 21, 14: 55, 18: $V9, 21: $V0, 41: 23, 49: 24, 50: $Va, 51: $Vb, 52: $Vc, 53: $Vd, 54: $Ve, 55: $Vf }, o($Vz, [2, 31]), o($Vz, [2, 42]), o($Vz, [2, 45]), o($Vz, [2, 46]), o($Vz, [2, 47]), o($Vz, [2, 48]), o($Vz, [2, 49]), o($Vz, [2, 50]), o($V6, [2, 7]), { 21: [1, 56] }, { 13: [1, 57] }, { 21: [1, 58] }, { 8: 21, 14: 59, 18: $V9, 21: $V0, 41: 23, 49: 24, 50: $Va, 51: $Vb, 52: $Vc, 53: $Vd, 54: $Ve, 55: $Vf }, { 8: 21, 14: 60, 18: $V9, 21: $V0, 41: 23, 49: 24, 50: $Va, 51: $Vb, 52: $Vc, 53: $Vd, 54: $Ve, 55: $Vf }, { 8: 21, 14: 61, 18: $V9, 21: $V0, 41: 23, 49: 24, 50: $Va, 51: $Vb, 52: $Vc, 53: $Vd, 54: $Ve, 55: $Vf }, { 8: 21, 14: 62, 18: $V9, 21: $V0, 41: 23, 49: 24, 50: $Va, 51: $Vb, 52: $Vc, 53: $Vd, 54: $Ve, 55: $Vf }, { 8: 21, 14: 63, 18: $V9, 21: $V0, 41: 23, 49: 24, 50: $Va, 51: $Vb, 52: $Vc, 53: $Vd, 54: $Ve, 55: $Vf }, { 8: 21, 14: 64, 18: $V9, 21: $V0, 41: 23, 49: 24, 50: $Va, 51: $Vb, 52: $Vc, 53: $Vd, 54: $Ve, 55: $Vf }, { 8: 21, 14: 65, 18: $V9, 21: $V0, 41: 23, 49: 24, 50: $Va, 51: $Vb, 52: $Vc, 53: $Vd, 54: $Ve, 55: $Vf }, { 8: 21, 14: 66, 18: $V9, 21: $V0, 41: 23, 49: 24, 50: $Va, 51: $Vb, 52: $Vc, 53: $Vd, 54: $Ve, 55: $Vf }, { 8: 21, 14: 67, 18: $V9, 21: $V0, 41: 23, 49: 24, 50: $Va, 51: $Vb, 52: $Vc, 53: $Vd, 54: $Ve, 55: $Vf }, { 8: 21, 14: 68, 18: $V9, 21: $V0, 41: 23, 49: 24, 50: $Va, 51: $Vb, 52: $Vc, 53: $Vd, 54: $Ve, 55: $Vf }, { 8: 21, 14: 69, 18: $V9, 21: $V0, 41: 23, 49: 24, 50: $Va, 51: $Vb, 52: $Vc, 53: $Vd, 54: $Ve, 55: $Vf }, { 8: 21, 14: 70, 18: $V9, 21: $V0, 41: 23, 49: 24, 50: $Va, 51: $Vb, 52: $Vc, 53: $Vd, 54: $Ve, 55: $Vf }, { 8: 21, 14: 71, 18: $V9, 21: $V0, 41: 23, 49: 24, 50: $Va, 51: $Vb, 52: $Vc, 53: $Vd, 54: $Ve, 55: $Vf }, { 8: 21, 14: 72, 18: $V9, 21: $V0, 41: 23, 49: 24, 50: $Va, 51: $Vb, 52: $Vc, 53: $Vd, 54: $Ve, 55: $Vf }, { 8: 21, 14: 73, 18: $V9, 21: $V0, 41: 23, 49: 24, 50: $Va, 51: $Vb, 52: $Vc, 53: $Vd, 54: $Ve, 55: $Vf }, { 21: [1, 74] }, { 8: 21, 14: 76, 18: $V9, 19: [1, 77], 21: [1, 79], 38: 75, 41: 23, 44: 78, 49: 24, 50: $Va, 51: $Vb, 52: $Vc, 53: $Vd, 54: $Ve, 55: $Vf }, { 8: 21, 14: 80, 18: $V9, 21: $V0, 41: 23, 49: 24, 50: $Va, 51: $Vb, 52: $Vc, 53: $Vd, 54: $Ve, 55: $Vf }, o($Vz, [2, 8]), { 48: [1, 81] }, { 18: $Vg, 19: [1, 82], 20: $Vh, 22: $Vi, 23: $Vj, 24: $Vk, 25: $Vl, 26: $Vm, 27: $Vn, 28: $Vo, 29: $Vp, 30: $Vq, 31: $Vr, 32: $Vs, 33: $Vt, 34: $Vu, 35: $Vv, 36: $Vw, 37: $Vx, 40: $Vy }, { 13: [1, 83] }, { 8: 21, 14: 84, 18: $V9, 21: $V0, 41: 23, 49: 24, 50: $Va, 51: $Vb, 52: $Vc, 53: $Vd, 54: $Ve, 55: $Vf }, o($Vz, $VA, { 17: 85, 47: $VB }), o($VC, [2, 11], { 18: $Vg, 20: $Vh, 24: $Vk, 25: $Vl, 26: $Vm, 27: $Vn, 28: $Vo, 29: $Vp, 30: $Vq, 31: $Vr, 32: $Vs, 33: $Vt, 37: $Vx }), o($VC, [2, 12], { 18: $Vg, 20: $Vh, 24: $Vk, 25: $Vl, 26: $Vm, 27: $Vn, 28: $Vo, 29: $Vp, 30: $Vq, 31: $Vr, 32: $Vs, 33: $Vt, 37: $Vx }), o($VD, [2, 13], { 18: $Vg, 20: $Vh, 26: $Vm, 27: $Vn, 28: $Vo, 29: $Vp, 30: $Vq, 31: $Vr, 32: $Vs, 33: $Vt, 37: $Vx }), o($VD, [2, 14], { 18: $Vg, 20: $Vh, 26: $Vm, 27: $Vn, 28: $Vo, 29: $Vp, 30: $Vq, 31: $Vr, 32: $Vs, 33: $Vt, 37: $Vx }), o($VE, [2, 15], { 18: $Vg, 20: $Vh, 22: $Vi, 23: $Vj, 24: $Vk, 25: $Vl, 26: $Vm, 27: $Vn, 28: $Vo, 29: $Vp, 30: $Vq, 31: $Vr, 32: $Vs, 33: $Vt, 34: $Vu, 35: $Vv, 36: $Vw, 37: $Vx, 40: $Vy }), o($VE, [2, 16], { 18: $Vg, 20: $Vh, 22: $Vi, 23: $Vj, 24: $Vk, 25: $Vl, 26: $Vm, 27: $Vn, 28: $Vo, 29: $Vp, 30: $Vq, 31: $Vr, 32: $Vs, 33: $Vt, 34: $Vu, 35: $Vv, 36: $Vw, 37: $Vx, 40: $Vy }), o($VD, [2, 17], { 18: $Vg, 20: $Vh, 26: $Vm, 27: $Vn, 28: $Vo, 29: $Vp, 30: $Vq, 31: $Vr, 32: $Vs, 33: $Vt, 37: $Vx }), o($VD, [2, 18], { 18: $Vg, 20: $Vh, 26: $Vm, 27: $Vn, 28: $Vo, 29: $Vp, 30: $Vq, 31: $Vr, 32: $Vs, 33: $Vt, 37: $Vx }), o($VD, [2, 19], { 18: $Vg, 20: $Vh, 26: $Vm, 27: $Vn, 28: $Vo, 29: $Vp, 30: $Vq, 31: $Vr, 32: $Vs, 33: $Vt, 37: $Vx }), o($VD, [2, 20], { 18: $Vg, 20: $Vh, 26: $Vm, 27: $Vn, 28: $Vo, 29: $Vp, 30: $Vq, 31: $Vr, 32: $Vs, 33: $Vt, 37: $Vx }), o($VD, [2, 21], { 18: $Vg, 20: $Vh, 26: $Vm, 27: $Vn, 28: $Vo, 29: $Vp, 30: $Vq, 31: $Vr, 32: $Vs, 33: $Vt, 37: $Vx }), o($VD, [2, 22], { 18: $Vg, 20: $Vh, 26: $Vm, 27: $Vn, 28: $Vo, 29: $Vp, 30: $Vq, 31: $Vr, 32: $Vs, 33: $Vt, 37: $Vx }), o($VF, [2, 23], { 18: $Vg, 20: $Vh, 22: $Vi, 23: $Vj, 24: $Vk, 25: $Vl, 26: $Vm, 27: $Vn, 28: $Vo, 29: $Vp, 30: $Vq, 31: $Vr, 32: $Vs, 33: $Vt, 37: $Vx }), o($VF, [2, 24], { 18: $Vg, 20: $Vh, 22: $Vi, 23: $Vj, 24: $Vk, 25: $Vl, 26: $Vm, 27: $Vn, 28: $Vo, 29: $Vp, 30: $Vq, 31: $Vr, 32: $Vs, 33: $Vt, 37: $Vx }), o($VF, [2, 25], { 18: $Vg, 20: $Vh, 22: $Vi, 23: $Vj, 24: $Vk, 25: $Vl, 26: $Vm, 27: $Vn, 28: $Vo, 29: $Vp, 30: $Vq, 31: $Vr, 32: $Vs, 33: $Vt, 37: $Vx }), o($Vz, [2, 26]), { 39: [1, 86], 46: [1, 87] }, { 18: $Vg, 19: [1, 88], 20: $Vh, 22: $Vi, 23: $Vj, 24: $Vk, 25: $Vl, 26: $Vm, 27: $Vn, 28: $Vo, 29: $Vp, 30: $Vq, 31: $Vr, 32: $Vs, 33: $Vt, 34: $Vu, 35: $Vv, 36: $Vw, 37: $Vx, 40: $Vy }, o($Vz, [2, 29]), o($VG, [2, 37]), o([18, 19, 20, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 40, 47, 56], $V5, { 45: 89, 13: $VH, 39: $VI, 46: $VI }), o($VF, [2, 30], { 18: $Vg, 20: $Vh, 22: $Vi, 23: $Vj, 24: $Vk, 25: $Vl, 26: $Vm, 27: $Vn, 28: $Vo, 29: $Vp, 30: $Vq, 31: $Vr, 32: $Vs, 33: $Vt, 37: $Vx }), o($Vz, [2, 40]), o($Vz, [2, 9]), { 8: 21, 14: 91, 18: $V9, 21: $V0, 41: 23, 49: 24, 50: $Va, 51: $Vb, 52: $Vc, 53: $Vd, 54: $Ve, 55: $Vf }, o($V6, [2, 33], { 18: $Vg, 20: $Vh, 22: $Vi, 23: $Vj, 24: $Vk, 25: $Vl, 26: $Vm, 27: $Vn, 28: $Vo, 29: $Vp, 30: $Vq, 31: $Vr, 32: $Vs, 33: $Vt, 34: $Vu, 35: $Vv, 36: $Vw, 37: $Vx, 40: $Vy }), o($Vz, [2, 10]), { 8: 21, 14: 92, 18: $V9, 21: $V0, 41: 23, 49: 24, 50: $Va, 51: $Vb, 52: $Vc, 53: $Vd, 54: $Ve, 55: $Vf }, { 21: [1, 94], 44: 93 }, o($Vz, [2, 28]), o($VG, [2, 35]), { 8: 96, 21: $V0, 43: 95 }, o($V6, [2, 32], { 18: $Vg, 20: $Vh, 22: $Vi, 23: $Vj, 24: $Vk, 25: $Vl, 26: $Vm, 27: $Vn, 28: $Vo, 29: $Vp, 30: $Vq, 31: $Vr, 32: $Vs, 33: $Vt, 34: $Vu, 35: $Vv, 36: $Vw, 37: $Vx, 40: $Vy }), { 18: $Vg, 19: [1, 97], 20: $Vh, 22: $Vi, 23: $Vj, 24: $Vk, 25: $Vl, 26: $Vm, 27: $Vn, 28: $Vo, 29: $Vp, 30: $Vq, 31: $Vr, 32: $Vs, 33: $Vt, 34: $Vu, 35: $Vv, 36: $Vw, 37: $Vx, 40: $Vy }, o($VG, [2, 36]), o($VG, $VI, { 45: 89, 13: $VH }), o($VG, [2, 38]), o($VG, [2, 34], { 56: $V3 }), o($Vz, [2, 27])],
        defaultActions: { 3: [2, 2], 5: [2, 1], 16: [2, 43] },
        parseError: function parseError(str, hash) {
            if (hash.recoverable) {
                this.trace(str);
            } else {
                var _parseError = function _parseError(msg, hash) {
                    this.message = msg;
                    this.hash = hash;
                };

                _parseError.prototype = Error;

                throw new _parseError(str, hash);
            }
        },
        parse: function parse(input) {
            var self = this,
                stack = [0],
                tstack = [],
                vstack = [null],
                lstack = [],
                table = this.table,
                yytext = '',
                yylineno = 0,
                yyleng = 0,
                recovering = 0,
                TERROR = 2,
                EOF = 1;
            var args = lstack.slice.call(arguments, 1);
            var lexer = Object.create(this.lexer);
            var sharedState = { yy: {} };
            for (var k in this.yy) {
                if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
                    sharedState.yy[k] = this.yy[k];
                }
            }
            lexer.setInput(input, sharedState.yy);
            sharedState.yy.lexer = lexer;
            sharedState.yy.parser = this;
            if (typeof lexer.yylloc == 'undefined') {
                lexer.yylloc = {};
            }
            var yyloc = lexer.yylloc;
            lstack.push(yyloc);
            var ranges = lexer.options && lexer.options.ranges;
            if (typeof sharedState.yy.parseError === 'function') {
                this.parseError = sharedState.yy.parseError;
            } else {
                this.parseError = Object.getPrototypeOf(this).parseError;
            }
            function popStack(n) {
                stack.length = stack.length - 2 * n;
                vstack.length = vstack.length - n;
                lstack.length = lstack.length - n;
            }
            _token_stack: var lex = function lex() {
                var token;
                token = lexer.lex() || EOF;
                if (typeof token !== 'number') {
                    token = self.symbols_[token] || token;
                }
                return token;
            };
            var symbol,
                preErrorSymbol,
                state,
                action,
                a,
                r,
                yyval = {},
                p,
                len,
                newState,
                expected;
            while (true) {
                state = stack[stack.length - 1];
                if (this.defaultActions[state]) {
                    action = this.defaultActions[state];
                } else {
                    if (symbol === null || typeof symbol == 'undefined') {
                        symbol = lex();
                    }
                    action = table[state] && table[state][symbol];
                }
                if (typeof action === 'undefined' || !action.length || !action[0]) {
                    var errStr = '';
                    expected = [];
                    for (p in table[state]) {
                        if (this.terminals_[p] && p > TERROR) {
                            expected.push('\'' + this.terminals_[p] + '\'');
                        }
                    }
                    if (lexer.showPosition) {
                        errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                    } else {
                        errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                    }
                    this.parseError(errStr, {
                        text: lexer.match,
                        token: this.terminals_[symbol] || symbol,
                        line: lexer.yylineno,
                        loc: yyloc,
                        expected: expected
                    });
                }
                if (action[0] instanceof Array && action.length > 1) {
                    throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
                }
                switch (action[0]) {
                    case 1:
                        stack.push(symbol);
                        vstack.push(lexer.yytext);
                        lstack.push(lexer.yylloc);
                        stack.push(action[1]);
                        symbol = null;
                        if (!preErrorSymbol) {
                            yyleng = lexer.yyleng;
                            yytext = lexer.yytext;
                            yylineno = lexer.yylineno;
                            yyloc = lexer.yylloc;
                            if (recovering > 0) {
                                recovering--;
                            }
                        } else {
                            symbol = preErrorSymbol;
                            preErrorSymbol = null;
                        }
                        break;
                    case 2:
                        len = this.productions_[action[1]][1];
                        yyval.$ = vstack[vstack.length - len];
                        yyval._$ = {
                            first_line: lstack[lstack.length - (len || 1)].first_line,
                            last_line: lstack[lstack.length - 1].last_line,
                            first_column: lstack[lstack.length - (len || 1)].first_column,
                            last_column: lstack[lstack.length - 1].last_column
                        };
                        if (ranges) {
                            yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]];
                        }
                        r = this.performAction.apply(yyval, [yytext, yyleng, yylineno, sharedState.yy, action[1], vstack, lstack].concat(args));
                        if (typeof r !== 'undefined') {
                            return r;
                        }
                        if (len) {
                            stack = stack.slice(0, -1 * len * 2);
                            vstack = vstack.slice(0, -1 * len);
                            lstack = lstack.slice(0, -1 * len);
                        }
                        stack.push(this.productions_[action[1]][0]);
                        vstack.push(yyval.$);
                        lstack.push(yyval._$);
                        newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
                        stack.push(newState);
                        break;
                    case 3:
                        return true;
                }
            }
            return true;
        } };

    /* start of helper functions */

    function functionCallExpression(fn, source) {
        if (fn.toLowerCase() === 'isempty') {
            return new Expression.IsEmptyExpression(source);
        } else if (fn.toLowerCase() === 'isnotempty') {
            return new Expression.IsNotEmptyExpression(source);
        } else if (fn.toLowerCase() === 'size') {
            return new Expression.SizeExpression(source);
        } else if (fn.toLowerCase() === 'forall') {
            return new Expression.IteratorExpression(source);
        } else if (fn.toLowerCase() === 'select') {
            return new Expression.SelectExpression(source);
        } else if (fn.toLowerCase() === 'exists') {
            return new Expression.ExistsExpression(source);
        } else if (fn.toLowerCase() === 'union') {
            return new Expression.UnionOperation(source);
        } else if (fn.toLowerCase() === 'first') {
            return new Expression.FirstOperation(source);
        } else if (fn.toLowerCase() === 'at') {
            return new Expression.AOperation(source);
        } else if (fn.toLowerCase() === 'last') {
            return new Expression.LastOperation(source);
        } else if (fn.toLowerCase() === 'asset') {
            return new Expression.AsSetOperation(source);
        }

        throw new Error("No function call expression found for '" + fn + "' not found!");
    }
    /* generated by jison-lex 0.3.4 */
    var lexer = function () {
        var lexer = {

            EOF: 1,

            parseError: function parseError(str, hash) {
                if (this.yy.parser) {
                    this.yy.parser.parseError(str, hash);
                } else {
                    throw new Error(str);
                }
            },

            // resets the lexer, sets new input
            setInput: function setInput(input, yy) {
                this.yy = yy || this.yy || {};
                this._input = input;
                this._more = this._backtrack = this.done = false;
                this.yylineno = this.yyleng = 0;
                this.yytext = this.matched = this.match = '';
                this.conditionStack = ['INITIAL'];
                this.yylloc = {
                    first_line: 1,
                    first_column: 0,
                    last_line: 1,
                    last_column: 0
                };
                if (this.options.ranges) {
                    this.yylloc.range = [0, 0];
                }
                this.offset = 0;
                return this;
            },

            // consumes and returns one char from the input
            input: function input() {
                var ch = this._input[0];
                this.yytext += ch;
                this.yyleng++;
                this.offset++;
                this.match += ch;
                this.matched += ch;
                var lines = ch.match(/(?:\r\n?|\n).*/g);
                if (lines) {
                    this.yylineno++;
                    this.yylloc.last_line++;
                } else {
                    this.yylloc.last_column++;
                }
                if (this.options.ranges) {
                    this.yylloc.range[1]++;
                }

                this._input = this._input.slice(1);
                return ch;
            },

            // unshifts one char (or a string) into the input
            unput: function unput(ch) {
                var len = ch.length;
                var lines = ch.split(/(?:\r\n?|\n)/g);

                this._input = ch + this._input;
                this.yytext = this.yytext.substr(0, this.yytext.length - len);
                //this.yyleng -= len;
                this.offset -= len;
                var oldLines = this.match.split(/(?:\r\n?|\n)/g);
                this.match = this.match.substr(0, this.match.length - 1);
                this.matched = this.matched.substr(0, this.matched.length - 1);

                if (lines.length - 1) {
                    this.yylineno -= lines.length - 1;
                }
                var r = this.yylloc.range;

                this.yylloc = {
                    first_line: this.yylloc.first_line,
                    last_line: this.yylineno + 1,
                    first_column: this.yylloc.first_column,
                    last_column: lines ? (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length : this.yylloc.first_column - len
                };

                if (this.options.ranges) {
                    this.yylloc.range = [r[0], r[0] + this.yyleng - len];
                }
                this.yyleng = this.yytext.length;
                return this;
            },

            // When called from action, caches matched text and appends it on next action
            more: function more() {
                this._more = true;
                return this;
            },

            // When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
            reject: function reject() {
                if (this.options.backtrack_lexer) {
                    this._backtrack = true;
                } else {
                    return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                        text: "",
                        token: null,
                        line: this.yylineno
                    });
                }
                return this;
            },

            // retain first n characters of the match
            less: function less(n) {
                this.unput(this.match.slice(n));
            },

            // displays already matched input, i.e. for error messages
            pastInput: function pastInput() {
                var past = this.matched.substr(0, this.matched.length - this.match.length);
                return (past.length > 20 ? '...' : '') + past.substr(-20).replace(/\n/g, "");
            },

            // displays upcoming input, i.e. for error messages
            upcomingInput: function upcomingInput() {
                var next = this.match;
                if (next.length < 20) {
                    next += this._input.substr(0, 20 - next.length);
                }
                return (next.substr(0, 20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
            },

            // displays the character position where the lexing error occurred, i.e. for error messages
            showPosition: function showPosition() {
                var pre = this.pastInput();
                var c = new Array(pre.length + 1).join("-");
                return pre + this.upcomingInput() + "\n" + c + "^";
            },

            // test the lexed token: return FALSE when not a match, otherwise return token
            test_match: function test_match(match, indexed_rule) {
                var token, lines, backup;

                if (this.options.backtrack_lexer) {
                    // save context
                    backup = {
                        yylineno: this.yylineno,
                        yylloc: {
                            first_line: this.yylloc.first_line,
                            last_line: this.last_line,
                            first_column: this.yylloc.first_column,
                            last_column: this.yylloc.last_column
                        },
                        yytext: this.yytext,
                        match: this.match,
                        matches: this.matches,
                        matched: this.matched,
                        yyleng: this.yyleng,
                        offset: this.offset,
                        _more: this._more,
                        _input: this._input,
                        yy: this.yy,
                        conditionStack: this.conditionStack.slice(0),
                        done: this.done
                    };
                    if (this.options.ranges) {
                        backup.yylloc.range = this.yylloc.range.slice(0);
                    }
                }

                lines = match[0].match(/(?:\r\n?|\n).*/g);
                if (lines) {
                    this.yylineno += lines.length;
                }
                this.yylloc = {
                    first_line: this.yylloc.last_line,
                    last_line: this.yylineno + 1,
                    first_column: this.yylloc.last_column,
                    last_column: lines ? lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length
                };
                this.yytext += match[0];
                this.match += match[0];
                this.matches = match;
                this.yyleng = this.yytext.length;
                if (this.options.ranges) {
                    this.yylloc.range = [this.offset, this.offset += this.yyleng];
                }
                this._more = false;
                this._backtrack = false;
                this._input = this._input.slice(match[0].length);
                this.matched += match[0];
                token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
                if (this.done && this._input) {
                    this.done = false;
                }
                if (token) {
                    return token;
                } else if (this._backtrack) {
                    // recover context
                    for (var k in backup) {
                        this[k] = backup[k];
                    }
                    return false; // rule action called reject() implying the next rule should be tested instead.
                }
                return false;
            },

            // return next match in input
            next: function next() {
                if (this.done) {
                    return this.EOF;
                }
                if (!this._input) {
                    this.done = true;
                }

                var token, match, tempMatch, index;
                if (!this._more) {
                    this.yytext = '';
                    this.match = '';
                }
                var rules = this._currentRules();
                for (var i = 0; i < rules.length; i++) {
                    tempMatch = this._input.match(this.rules[rules[i]]);
                    if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                        match = tempMatch;
                        index = i;
                        if (this.options.backtrack_lexer) {
                            token = this.test_match(tempMatch, rules[i]);
                            if (token !== false) {
                                return token;
                            } else if (this._backtrack) {
                                match = false;
                                continue; // rule action called reject() implying a rule MISmatch.
                            } else {
                                // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                                return false;
                            }
                        } else if (!this.options.flex) {
                            break;
                        }
                    }
                }
                if (match) {
                    token = this.test_match(match, rules[index]);
                    if (token !== false) {
                        return token;
                    }
                    // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                    return false;
                }
                if (this._input === "") {
                    return this.EOF;
                } else {
                    return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                        text: "",
                        token: null,
                        line: this.yylineno
                    });
                }
            },

            // return next match that has a token
            lex: function lex() {
                var r = this.next();
                if (r) {
                    return r;
                } else {
                    return this.lex();
                }
            },

            // activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
            begin: function begin(condition) {
                this.conditionStack.push(condition);
            },

            // pop the previously active lexer condition state off the condition stack
            popState: function popState() {
                var n = this.conditionStack.length - 1;
                if (n > 0) {
                    return this.conditionStack.pop();
                } else {
                    return this.conditionStack[0];
                }
            },

            // produce the lexer rule set which is active for the currently active lexer condition state
            _currentRules: function _currentRules() {
                if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
                    return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
                } else {
                    return this.conditions["INITIAL"].rules;
                }
            },

            // return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
            topState: function topState(n) {
                n = this.conditionStack.length - 1 - Math.abs(n || 0);
                if (n >= 0) {
                    return this.conditionStack[n];
                } else {
                    return "INITIAL";
                }
            },

            // alias for begin(condition)
            pushState: function pushState(condition) {
                this.begin(condition);
            },

            // return the number of states currently on the stack
            stateStackSize: function stateStackSize() {
                return this.conditionStack.length;
            },
            options: {},
            performAction: function anonymous(yy, yy_, $avoiding_name_collisions, YY_START) {
                var YYSTATE = YY_START;
                switch ($avoiding_name_collisions) {
                    case 0:
                        /* ignore */
                        break;
                    case 1:
                        return 51;
                        break;
                    case 2:
                        return 50;
                        break;
                    case 3:
                        return 7;
                        break;
                    case 4:
                        return 11;
                        break;
                    case 5:
                        return 15;
                        break;
                    case 6:
                        return 42;
                        break;
                    case 7:
                        return 53;
                        break;
                    case 8:
                        return 54;
                        break;
                    case 9:
                        return 34;
                        break;
                    case 10:
                        return 35;
                        break;
                    case 11:
                        return 26;
                        break;
                    case 12:
                        return 27;
                        break;
                    case 13:
                        return 36;
                        break;
                    case 14:
                        return 40;
                        break;
                    case 15:
                        return 18;
                        break;
                    case 16:
                        return 19;
                        break;
                    case 17:
                        return 39;
                        break;
                    case 18:
                        return 37;
                        break;
                    case 19:
                        return 29;
                        break;
                    case 20:
                        return 31;
                        break;
                    case 21:
                        return 33;
                        break;
                    case 22:
                        return 28;
                        break;
                    case 23:
                        return 30;
                        break;
                    case 24:
                        return 32;
                        break;
                    case 25:
                        return 56;
                        break;
                    case 26:
                        return 13;
                        break;
                    case 27:
                        return 20;
                        break;
                    case 28:
                        return 46;
                        break;
                    case 29:
                        return 22;
                        break;
                    case 30:
                        return 23;
                        break;
                    case 31:
                        return 24;
                        break;
                    case 32:
                        return 25;
                        break;
                    case 33:
                        return 47;
                        break;
                    case 34:
                        return 48;
                        break;
                    case 35:
                        return 55;
                        break;
                    case 36:
                        return 21;
                        break;
                    case 37:
                        return 52;
                        break;
                    case 38:
                        return 5;
                        break;
                    case 39:
                        return 'ERROR';
                        break;
                }
            },
            rules: [/^(?:\s+)/, /^(?:-?[0-9][0-9]*\.[0-9]*)/, /^(?:-?[0-9][0-9]*)/, /^(?:context\b)/, /^(?:inv\b)/, /^(?:def\b)/, /^(?:let\b)/, /^(?:true\b)/, /^(?:false\b)/, /^(?:and\b)/, /^(?:or\b)/, /^(?:mod\b)/, /^(?:div\b)/, /^(?:xor\b)/, /^(?:implies\b)/, /^(?:\()/, /^(?:\))/, /^(?:\|)/, /^(?:->)/, /^(?:<=)/, /^(?:>=)/, /^(?:<>)/, /^(?:<)/, /^(?:=)/, /^(?:>)/, /^(?:::)/, /^(?::)/, /^(?:\.)/, /^(?:,)/, /^(?:\+)/, /^(?:-)/, /^(?:\*)/, /^(?:\/)/, /^(?:@)/, /^(?:pre\b)/, /^(?:nil\b)/, /^(?:[a-zA-Z][a-zA-Z0-9]*)/, /^(?:["][^\"]*["])/, /^(?:$)/, /^(?:.)/],
            conditions: { "INITIAL": { "rules": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39], "inclusive": true } }
        };
        return lexer;
    }();
    parser.lexer = lexer;
    function Parser() {
        this.yy = {};
    }
    Parser.prototype = parser;parser.Parser = Parser;
    return new Parser();
}();

module.exports = parser;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Utils = exports.Utils = function () {
    function Utils() {
        _classCallCheck(this, Utils);
    }

    _createClass(Utils, null, [{
        key: 'getClassName',
        value: function getClassName(obj) {
            if (obj.typeName) {
                return obj.typeName;
            } else if (typeof obj === 'function') {
                return Utils._getFunctionName(obj);
            } else if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object') {
                var objectTypename = Utils._getFunctionName(obj.__proto__.constructor.toString());
                return objectTypename;
            }
        }
    }, {
        key: '_getFunctionName',
        value: function _getFunctionName(fn) {
            var name = fn.toString().split(' ')[1];
            name = name.substring(0, name.indexOf('('));
            return name.length > 0 ? name : undefined;
        }
    }]);

    return Utils;
}();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _oclEngine = __webpack_require__(0);

exports.default = _oclEngine.OclEngine;

/***/ })
/******/ ]);