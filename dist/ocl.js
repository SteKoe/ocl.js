/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _oclEngine = __webpack_require__(1);

	exports.default = _oclEngine.OclEngine;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.OclEngine = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _oclParser = __webpack_require__(2);

	var _utils = __webpack_require__(11);

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

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var parser = __webpack_require__(3);

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

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _expressions = __webpack_require__(4);

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

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _andExpression = __webpack_require__(5);

	Object.keys(_andExpression).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _andExpression[key];
	    }
	  });
	});

	var _booleanExpression = __webpack_require__(7);

	Object.keys(_booleanExpression).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _booleanExpression[key];
	    }
	  });
	});

	var _contextExpression = __webpack_require__(8);

	Object.keys(_contextExpression).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _contextExpression[key];
	    }
	  });
	});

	var _existsExpression = __webpack_require__(12);

	Object.keys(_existsExpression).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _existsExpression[key];
	    }
	  });
	});

	var _impliesExpression = __webpack_require__(13);

	Object.keys(_impliesExpression).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _impliesExpression[key];
	    }
	  });
	});

	var _invariantExpression = __webpack_require__(9);

	Object.keys(_invariantExpression).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _invariantExpression[key];
	    }
	  });
	});

	var _isEmptyExpression = __webpack_require__(14);

	Object.keys(_isEmptyExpression).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _isEmptyExpression[key];
	    }
	  });
	});

	var _isNotEmptyExpression = __webpack_require__(15);

	Object.keys(_isNotEmptyExpression).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _isNotEmptyExpression[key];
	    }
	  });
	});

	var _iteratorExpression = __webpack_require__(16);

	Object.keys(_iteratorExpression).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _iteratorExpression[key];
	    }
	  });
	});

	var _letExpression = __webpack_require__(10);

	Object.keys(_letExpression).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _letExpression[key];
	    }
	  });
	});

	var _nilExpression = __webpack_require__(17);

	Object.keys(_nilExpression).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _nilExpression[key];
	    }
	  });
	});

	var _numberExpression = __webpack_require__(18);

	Object.keys(_numberExpression).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _numberExpression[key];
	    }
	  });
	});

	var _mathExpressions = __webpack_require__(19);

	Object.keys(_mathExpressions).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _mathExpressions[key];
	    }
	  });
	});

	var _operationCallExpression = __webpack_require__(20);

	Object.keys(_operationCallExpression).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _operationCallExpression[key];
	    }
	  });
	});

	var _orExpression = __webpack_require__(21);

	Object.keys(_orExpression).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _orExpression[key];
	    }
	  });
	});

	var _selectExpression = __webpack_require__(22);

	Object.keys(_selectExpression).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _selectExpression[key];
	    }
	  });
	});

	var _sequenceExpressions = __webpack_require__(23);

	Object.keys(_sequenceExpressions).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _sequenceExpressions[key];
	    }
	  });
	});

	var _sizeExpression = __webpack_require__(24);

	Object.keys(_sizeExpression).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _sizeExpression[key];
	    }
	  });
	});

	var _stringExpression = __webpack_require__(25);

	Object.keys(_stringExpression).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _stringExpression[key];
	    }
	  });
	});

	var _variableExpression = __webpack_require__(26);

	Object.keys(_variableExpression).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _variableExpression[key];
	    }
	  });
	});

	var _xorExpression = __webpack_require__(27);

	Object.keys(_xorExpression).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _xorExpression[key];
	    }
	  });
	});

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.AndExpression = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _abstractExpression = __webpack_require__(6);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var AndExpression = exports.AndExpression = function (_Expression) {
	    _inherits(AndExpression, _Expression);

	    function AndExpression(left, right) {
	        _classCallCheck(this, AndExpression);

	        var _this = _possibleConstructorReturn(this, (AndExpression.__proto__ || Object.getPrototypeOf(AndExpression)).call(this));

	        _this.left = left;
	        _this.right = right;
	        return _this;
	    }

	    _createClass(AndExpression, [{
	        key: 'evaluate',
	        value: function evaluate(obj, variables) {
	            var left = this.left.evaluate(obj, variables);
	            var right = this.right.evaluate(obj, variables);

	            return left && right;
	        }
	    }]);

	    return AndExpression;
	}(_abstractExpression.Expression);

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Expression = exports.Expression = function () {
	    function Expression() {
	        _classCallCheck(this, Expression);

	        this.type = this.__proto__.constructor.name;
	    }

	    _createClass(Expression, [{
	        key: 'evaluate',
	        value: function evaluate(obj) {
	            throw new Error('evaluate() function not implemented!');
	        }
	    }]);

	    return Expression;
	}();

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.BooleanExpression = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _abstractExpression = __webpack_require__(6);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var BooleanExpression = exports.BooleanExpression = function (_Expression) {
	    _inherits(BooleanExpression, _Expression);

	    function BooleanExpression(value) {
	        _classCallCheck(this, BooleanExpression);

	        var _this = _possibleConstructorReturn(this, (BooleanExpression.__proto__ || Object.getPrototypeOf(BooleanExpression)).call(this));

	        _this.value = JSON.parse(value);
	        return _this;
	    }

	    _createClass(BooleanExpression, [{
	        key: 'evaluate',
	        value: function evaluate() {
	            return this.value;
	        }
	    }]);

	    return BooleanExpression;
	}(_abstractExpression.Expression);

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ContextExpression = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _abstractExpression = __webpack_require__(6);

	var _invariantExpression = __webpack_require__(9);

	var _letExpression = __webpack_require__(10);

	var _utils = __webpack_require__(11);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ContextExpression = exports.ContextExpression = function (_Expression) {
	    _inherits(ContextExpression, _Expression);

	    function ContextExpression(targetType, rules) {
	        _classCallCheck(this, ContextExpression);

	        var _this = _possibleConstructorReturn(this, (ContextExpression.__proto__ || Object.getPrototypeOf(ContextExpression)).call(this));

	        if (!(rules instanceof Array)) {
	            rules = [rules];
	        }

	        _this.targetType = targetType;
	        _this.invs = rules.filter(function (i) {
	            return i instanceof _invariantExpression.InvariantExpression;
	        });
	        _this.defs = rules.filter(function (i) {
	            return i instanceof _letExpression.LetExpression;
	        });
	        return _this;
	    }

	    _createClass(ContextExpression, [{
	        key: 'evaluate',
	        value: function evaluate(obj) {
	            obj = obj || {};
	            this.evaluationResult = false;

	            if (this.targetType === this._getClassName(obj)) {
	                this.defs.forEach(function (def) {
	                    return def.evaluate(obj);
	                });
	                var map = this.invs.map(function (i) {
	                    return i.evaluate(obj);
	                });
	                this.evaluationResult = !map.some(function (i) {
	                    return i === false;
	                });
	                return this.evaluationResult;
	            }

	            return this.evaluationResult;
	        }
	    }, {
	        key: '_getClassName',
	        value: function _getClassName(obj) {
	            return _utils.Utils.getClassName(obj);
	        }
	    }]);

	    return ContextExpression;
	}(_abstractExpression.Expression);

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.InvariantExpression = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _abstractExpression = __webpack_require__(6);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var InvariantExpression = exports.InvariantExpression = function (_Expression) {
	    _inherits(InvariantExpression, _Expression);

	    function InvariantExpression(oclExpression, name) {
	        _classCallCheck(this, InvariantExpression);

	        var _this = _possibleConstructorReturn(this, (InvariantExpression.__proto__ || Object.getPrototypeOf(InvariantExpression)).call(this));

	        _this.definition = oclExpression;
	        if (name) {
	            _this.name = name || '';
	        }
	        return _this;
	    }

	    _createClass(InvariantExpression, [{
	        key: 'evaluate',
	        value: function evaluate(obj) {
	            this.evaluationResult = this.definition.evaluate(obj);
	            return this.evaluationResult;
	        }
	    }]);

	    return InvariantExpression;
	}(_abstractExpression.Expression);

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.LetExpression = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _abstractExpression = __webpack_require__(6);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var LetExpression = exports.LetExpression = function (_Expression) {
	    _inherits(LetExpression, _Expression);

	    function LetExpression(key, value) {
	        _classCallCheck(this, LetExpression);

	        var _this = _possibleConstructorReturn(this, (LetExpression.__proto__ || Object.getPrototypeOf(LetExpression)).call(this));

	        _this.key = key;
	        _this.value = value;
	        return _this;
	    }

	    _createClass(LetExpression, [{
	        key: 'evaluate',
	        value: function evaluate(obj) {
	            return obj[this.key] = this.value.evaluate(obj);
	        }
	    }]);

	    return LetExpression;
	}(_abstractExpression.Expression);

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

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

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ExistsExpression = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _abstractExpression = __webpack_require__(6);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ExistsExpression = exports.ExistsExpression = function (_Expression) {
	    _inherits(ExistsExpression, _Expression);

	    function ExistsExpression(source, iterators, body) {
	        _classCallCheck(this, ExistsExpression);

	        var _this = _possibleConstructorReturn(this, (ExistsExpression.__proto__ || Object.getPrototypeOf(ExistsExpression)).call(this));

	        _this.source = source;
	        _this.iterators = iterators;
	        _this.body = body;
	        return _this;
	    }

	    _createClass(ExistsExpression, [{
	        key: 'evaluate',
	        value: function evaluate(obj) {
	            var _this2 = this;

	            var collection = this.source.evaluate(obj);
	            if (collection instanceof Array) {
	                return collection.some(function (o) {
	                    var variables = {};
	                    variables[_this2.iterators] = o;
	                    return _this2.body.evaluate(o, variables);
	                });
	            } else {
	                return false;
	            }
	        }
	    }]);

	    return ExistsExpression;
	}(_abstractExpression.Expression);

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ImpliesExpression = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _abstractExpression = __webpack_require__(6);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ImpliesExpression = exports.ImpliesExpression = function (_Expression) {
	    _inherits(ImpliesExpression, _Expression);

	    function ImpliesExpression(left, right) {
	        _classCallCheck(this, ImpliesExpression);

	        var _this = _possibleConstructorReturn(this, (ImpliesExpression.__proto__ || Object.getPrototypeOf(ImpliesExpression)).call(this));

	        _this.left = left;
	        _this.right = right;
	        return _this;
	    }

	    _createClass(ImpliesExpression, [{
	        key: 'evaluate',
	        value: function evaluate(obj, variables) {
	            var left = this.left.evaluate(obj, variables);
	            var right = this.right.evaluate(obj, variables);

	            if (left) {
	                return right;
	            } else {
	                return true;
	            }
	        }
	    }]);

	    return ImpliesExpression;
	}(_abstractExpression.Expression);

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.IsEmptyExpression = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _abstractExpression = __webpack_require__(6);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var IsEmptyExpression = exports.IsEmptyExpression = function (_Expression) {
	    _inherits(IsEmptyExpression, _Expression);

	    function IsEmptyExpression(source) {
	        _classCallCheck(this, IsEmptyExpression);

	        var _this = _possibleConstructorReturn(this, (IsEmptyExpression.__proto__ || Object.getPrototypeOf(IsEmptyExpression)).call(this));

	        _this.source = source;
	        return _this;
	    }

	    _createClass(IsEmptyExpression, [{
	        key: 'evaluate',
	        value: function evaluate(obj, variables) {
	            var source = this.source.evaluate(obj, variables);
	            return !(source && source.length != 0);
	        }
	    }]);

	    return IsEmptyExpression;
	}(_abstractExpression.Expression);

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.IsNotEmptyExpression = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _isEmptyExpression = __webpack_require__(14);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var IsNotEmptyExpression = exports.IsNotEmptyExpression = function (_IsEmptyExpression) {
	    _inherits(IsNotEmptyExpression, _IsEmptyExpression);

	    function IsNotEmptyExpression() {
	        _classCallCheck(this, IsNotEmptyExpression);

	        return _possibleConstructorReturn(this, (IsNotEmptyExpression.__proto__ || Object.getPrototypeOf(IsNotEmptyExpression)).apply(this, arguments));
	    }

	    _createClass(IsNotEmptyExpression, [{
	        key: 'evaluate',
	        value: function evaluate(obj, variables) {
	            var isEmptyExpression = new _isEmptyExpression.IsEmptyExpression(this.source);
	            return !isEmptyExpression.evaluate(obj, variables);
	        }
	    }]);

	    return IsNotEmptyExpression;
	}(_isEmptyExpression.IsEmptyExpression);

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.IteratorExpression = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _abstractExpression = __webpack_require__(6);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var IteratorExpression = exports.IteratorExpression = function (_Expression) {
	    _inherits(IteratorExpression, _Expression);

	    function IteratorExpression(source, iterators, body) {
	        _classCallCheck(this, IteratorExpression);

	        var _this = _possibleConstructorReturn(this, (IteratorExpression.__proto__ || Object.getPrototypeOf(IteratorExpression)).call(this));

	        _this.source = source;
	        _this.iterators = iterators;
	        _this.body = body;
	        return _this;
	    }

	    _createClass(IteratorExpression, [{
	        key: 'evaluate',
	        value: function evaluate(obj) {
	            var source = this.source.evaluate(obj);
	            if (source instanceof Array) {
	                if (!this.iterators || this.iterators.length === 0) {
	                    return this._evaluateNoIterator(obj);
	                } else if (this.iterators.length <= 1) {
	                    return this._evaluateOneIterator(obj);
	                } else if (this.iterators.length === 2) {
	                    return this._evaluateTwoIterators(obj);
	                }
	            } else {
	                return false;
	            }
	        }
	    }, {
	        key: '_evaluateNoIterator',
	        value: function _evaluateNoIterator(obj) {
	            var _this2 = this;

	            var source = this.source.evaluate(obj);
	            return !source.map(function (c) {
	                return _this2.body.evaluate(obj);
	            }).some(function (r) {
	                return r === false;
	            });
	        }
	    }, {
	        key: '_evaluateOneIterator',
	        value: function _evaluateOneIterator(obj) {
	            var _this3 = this;

	            var source = this.source.evaluate(obj);
	            return !source.map(function (c) {
	                var variables = {};
	                if (_this3.iterators[0]) {
	                    variables[_this3.iterators[0]] = c;
	                } else {
	                    variables = c;
	                }
	                return _this3.body.evaluate(obj, variables);
	            }).some(function (r) {
	                return r === false;
	            });
	        }
	    }, {
	        key: '_evaluateTwoIterators',
	        value: function _evaluateTwoIterators(obj) {
	            var source = this.source.evaluate(obj);
	            var result = [];

	            for (var i = 0; i < source.length; i++) {
	                var variables = {};
	                variables[this.iterators[0]] = source[i];

	                for (var j = i + 1; j < source.length; j++) {
	                    variables[this.iterators[1]] = source[j];
	                    result.push(this.body.evaluate(obj, variables));
	                }
	            }

	            return !result.some(function (r) {
	                return r === false;
	            });
	        }
	    }]);

	    return IteratorExpression;
	}(_abstractExpression.Expression);

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.NilExpression = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _abstractExpression = __webpack_require__(6);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var NilExpression = exports.NilExpression = function (_Expression) {
	    _inherits(NilExpression, _Expression);

	    function NilExpression() {
	        _classCallCheck(this, NilExpression);

	        return _possibleConstructorReturn(this, (NilExpression.__proto__ || Object.getPrototypeOf(NilExpression)).call(this));
	    }

	    _createClass(NilExpression, [{
	        key: 'evaluate',
	        value: function evaluate() {
	            return;
	        }
	    }]);

	    return NilExpression;
	}(_abstractExpression.Expression);

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.NumberExpression = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _abstractExpression = __webpack_require__(6);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var NumberExpression = exports.NumberExpression = function (_Expression) {
	    _inherits(NumberExpression, _Expression);

	    function NumberExpression(value) {
	        _classCallCheck(this, NumberExpression);

	        var _this = _possibleConstructorReturn(this, (NumberExpression.__proto__ || Object.getPrototypeOf(NumberExpression)).call(this));

	        if (!isNaN(+value)) {
	            _this.value = +value;
	        } else {
	            throw new SyntaxError('NumberExpression: \'' + value + '\' is not a Number!');
	        }
	        return _this;
	    }

	    _createClass(NumberExpression, [{
	        key: 'evaluate',
	        value: function evaluate() {
	            return this.value;
	        }
	    }]);

	    return NumberExpression;
	}(_abstractExpression.Expression);

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ModuloExpression = exports.DivideExpression = exports.MultiplyExpression = exports.SubstractionExpression = exports.AdditionExpression = undefined;

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _abstractExpression = __webpack_require__(6);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var MathExpression = function (_Expression) {
	    _inherits(MathExpression, _Expression);

	    function MathExpression(left, right) {
	        _classCallCheck(this, MathExpression);

	        var _this = _possibleConstructorReturn(this, (MathExpression.__proto__ || Object.getPrototypeOf(MathExpression)).call(this));

	        _this.left = left;
	        _this.right = right;
	        return _this;
	    }

	    _createClass(MathExpression, [{
	        key: 'evaluate',
	        value: function evaluate(obj, variables) {
	            var left = this.left.evaluate(obj, variables);
	            var right = this.right.evaluate(obj, variables);
	            right = this.right.left ? this.right.left.evaluate(obj) : right;
	            return { left: left, right: right };
	        }
	    }]);

	    return MathExpression;
	}(_abstractExpression.Expression);

	var AdditionExpression = exports.AdditionExpression = function (_MathExpression) {
	    _inherits(AdditionExpression, _MathExpression);

	    function AdditionExpression() {
	        _classCallCheck(this, AdditionExpression);

	        return _possibleConstructorReturn(this, (AdditionExpression.__proto__ || Object.getPrototypeOf(AdditionExpression)).apply(this, arguments));
	    }

	    _createClass(AdditionExpression, [{
	        key: 'evaluate',
	        value: function evaluate(obj, variables) {
	            var e = _get(AdditionExpression.prototype.__proto__ || Object.getPrototypeOf(AdditionExpression.prototype), 'evaluate', this).call(this, obj, variables);
	            return e.left + e.right;
	        }
	    }]);

	    return AdditionExpression;
	}(MathExpression);

	var SubstractionExpression = exports.SubstractionExpression = function (_MathExpression2) {
	    _inherits(SubstractionExpression, _MathExpression2);

	    function SubstractionExpression() {
	        _classCallCheck(this, SubstractionExpression);

	        return _possibleConstructorReturn(this, (SubstractionExpression.__proto__ || Object.getPrototypeOf(SubstractionExpression)).apply(this, arguments));
	    }

	    _createClass(SubstractionExpression, [{
	        key: 'evaluate',
	        value: function evaluate(obj, variables) {
	            var e = _get(SubstractionExpression.prototype.__proto__ || Object.getPrototypeOf(SubstractionExpression.prototype), 'evaluate', this).call(this, obj, variables);
	            return e.left - e.right;
	        }
	    }]);

	    return SubstractionExpression;
	}(MathExpression);

	var MultiplyExpression = exports.MultiplyExpression = function (_MathExpression3) {
	    _inherits(MultiplyExpression, _MathExpression3);

	    function MultiplyExpression() {
	        _classCallCheck(this, MultiplyExpression);

	        return _possibleConstructorReturn(this, (MultiplyExpression.__proto__ || Object.getPrototypeOf(MultiplyExpression)).apply(this, arguments));
	    }

	    _createClass(MultiplyExpression, [{
	        key: 'evaluate',
	        value: function evaluate(obj, variables) {
	            var e = _get(MultiplyExpression.prototype.__proto__ || Object.getPrototypeOf(MultiplyExpression.prototype), 'evaluate', this).call(this, obj, variables);
	            return e.left * e.right;
	        }
	    }]);

	    return MultiplyExpression;
	}(MathExpression);

	var DivideExpression = exports.DivideExpression = function (_MathExpression4) {
	    _inherits(DivideExpression, _MathExpression4);

	    function DivideExpression() {
	        _classCallCheck(this, DivideExpression);

	        return _possibleConstructorReturn(this, (DivideExpression.__proto__ || Object.getPrototypeOf(DivideExpression)).apply(this, arguments));
	    }

	    _createClass(DivideExpression, [{
	        key: 'evaluate',
	        value: function evaluate(obj, variables) {
	            var e = _get(DivideExpression.prototype.__proto__ || Object.getPrototypeOf(DivideExpression.prototype), 'evaluate', this).call(this, obj, variables);
	            return e.left / e.right;
	        }
	    }]);

	    return DivideExpression;
	}(MathExpression);

	var ModuloExpression = exports.ModuloExpression = function (_MathExpression5) {
	    _inherits(ModuloExpression, _MathExpression5);

	    function ModuloExpression() {
	        _classCallCheck(this, ModuloExpression);

	        return _possibleConstructorReturn(this, (ModuloExpression.__proto__ || Object.getPrototypeOf(ModuloExpression)).apply(this, arguments));
	    }

	    _createClass(ModuloExpression, [{
	        key: 'evaluate',
	        value: function evaluate(obj, variables) {
	            var e = _get(ModuloExpression.prototype.__proto__ || Object.getPrototypeOf(ModuloExpression.prototype), 'evaluate', this).call(this, obj, variables);
	            return e.left % e.right;
	        }
	    }]);

	    return ModuloExpression;
	}(MathExpression);

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.OperationCallExpression = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _abstractExpression = __webpack_require__(6);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var OperationCallExpression = exports.OperationCallExpression = function (_Expression) {
	    _inherits(OperationCallExpression, _Expression);

	    function OperationCallExpression(operator, left, right) {
	        _classCallCheck(this, OperationCallExpression);

	        var _this = _possibleConstructorReturn(this, (OperationCallExpression.__proto__ || Object.getPrototypeOf(OperationCallExpression)).call(this));

	        _this.operator = operator;
	        _this.left = left;
	        _this.right = right;
	        return _this;
	    }

	    _createClass(OperationCallExpression, [{
	        key: 'evaluate',
	        value: function evaluate(obj, variables) {
	            var left = this.left.evaluate(obj, variables);
	            var right = this.right.evaluate(obj, variables);
	            if (this.operator === '<>') {
	                return left !== right;
	            } else if (this.operator === '<=') {
	                return left <= right;
	            } else if (this.operator === '>=') {
	                return left >= right;
	            } else if (this.operator === '>') {
	                return left > right;
	            } else if (this.operator === '<') {
	                return left < right;
	            } else if (this.operator === '=') {
	                return left === right;
	            }

	            throw new SyntaxError('Unhandled operator found: \'' + this.operator + '\'');
	        }
	    }]);

	    return OperationCallExpression;
	}(_abstractExpression.Expression);

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.OrExpression = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _abstractExpression = __webpack_require__(6);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var OrExpression = exports.OrExpression = function (_Expression) {
	    _inherits(OrExpression, _Expression);

	    function OrExpression(left, right) {
	        _classCallCheck(this, OrExpression);

	        var _this = _possibleConstructorReturn(this, (OrExpression.__proto__ || Object.getPrototypeOf(OrExpression)).call(this));

	        _this.left = left;
	        _this.right = right;
	        return _this;
	    }

	    _createClass(OrExpression, [{
	        key: 'evaluate',
	        value: function evaluate(obj, variables) {
	            var left = this.left.evaluate(obj, variables);
	            var right = this.right.evaluate(obj, variables);

	            return left || right;
	        }
	    }]);

	    return OrExpression;
	}(_abstractExpression.Expression);

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.SelectExpression = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _abstractExpression = __webpack_require__(6);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var SelectExpression = exports.SelectExpression = function (_Expression) {
	    _inherits(SelectExpression, _Expression);

	    function SelectExpression(source, iterator, body) {
	        _classCallCheck(this, SelectExpression);

	        var _this = _possibleConstructorReturn(this, (SelectExpression.__proto__ || Object.getPrototypeOf(SelectExpression)).call(this));

	        _this.source = source;
	        _this.iterators = iterator;
	        _this.body = body;
	        return _this;
	    }

	    _createClass(SelectExpression, [{
	        key: 'evaluate',
	        value: function evaluate(obj) {
	            var _this2 = this;

	            var collection = this.source.evaluate(obj);
	            if (collection instanceof Array) {
	                return collection.filter(function (c) {
	                    var variables = {};
	                    if (_this2.iterators) {
	                        variables[_this2.iterators[0]] = c;
	                    } else {
	                        variables = c;
	                    }

	                    return _this2.body.evaluate(c, variables);
	                });
	            } else {
	                return [];
	            }
	        }
	    }]);

	    return SelectExpression;
	}(_abstractExpression.Expression);

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.AsSetOperation = exports.LastOperation = exports.FirstOperation = exports.AtOperation = exports.UnionOperation = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _abstractExpression = __webpack_require__(6);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var UnionOperation = exports.UnionOperation = function (_Expression) {
	    _inherits(UnionOperation, _Expression);

	    function UnionOperation(source, body) {
	        _classCallCheck(this, UnionOperation);

	        var _this = _possibleConstructorReturn(this, (UnionOperation.__proto__ || Object.getPrototypeOf(UnionOperation)).call(this));

	        _this.source = source;
	        _this.body = body;
	        return _this;
	    }

	    _createClass(UnionOperation, [{
	        key: 'evaluate',
	        value: function evaluate(obj) {
	            var source = this.source.evaluate(obj);
	            var body = this.body.evaluate(obj);

	            if (source instanceof Array && body instanceof Array) {
	                return source.concat(body);
	            }
	            return [];
	        }
	    }]);

	    return UnionOperation;
	}(_abstractExpression.Expression);

	var AtOperation = exports.AtOperation = function (_Expression2) {
	    _inherits(AtOperation, _Expression2);

	    function AtOperation(source, index) {
	        _classCallCheck(this, AtOperation);

	        var _this2 = _possibleConstructorReturn(this, (AtOperation.__proto__ || Object.getPrototypeOf(AtOperation)).call(this));

	        _this2.source = source;
	        _this2.index = index;
	        return _this2;
	    }

	    _createClass(AtOperation, [{
	        key: 'evaluate',
	        value: function evaluate(obj) {
	            var source = this.source.evaluate(obj);
	            var index = this.index.evaluate(obj);

	            if (source instanceof Array && Number.isInteger(index) && index >= 0 && index < source.length) {
	                return source[index];
	            }
	        }
	    }]);

	    return AtOperation;
	}(_abstractExpression.Expression);

	var FirstOperation = exports.FirstOperation = function (_Expression3) {
	    _inherits(FirstOperation, _Expression3);

	    function FirstOperation(source) {
	        _classCallCheck(this, FirstOperation);

	        var _this3 = _possibleConstructorReturn(this, (FirstOperation.__proto__ || Object.getPrototypeOf(FirstOperation)).call(this));

	        _this3.source = source;
	        return _this3;
	    }

	    _createClass(FirstOperation, [{
	        key: 'evaluate',
	        value: function evaluate(obj) {
	            var source = this.source.evaluate(obj);
	            if (source instanceof Array) {
	                return source[0];
	            }
	        }
	    }]);

	    return FirstOperation;
	}(_abstractExpression.Expression);

	var LastOperation = exports.LastOperation = function (_Expression4) {
	    _inherits(LastOperation, _Expression4);

	    function LastOperation(source) {
	        _classCallCheck(this, LastOperation);

	        var _this4 = _possibleConstructorReturn(this, (LastOperation.__proto__ || Object.getPrototypeOf(LastOperation)).call(this));

	        _this4.source = source;
	        return _this4;
	    }

	    _createClass(LastOperation, [{
	        key: 'evaluate',
	        value: function evaluate(obj) {
	            var source = this.source.evaluate(obj);
	            if (source instanceof Array) {
	                return source[source.length - 1];
	            }
	        }
	    }]);

	    return LastOperation;
	}(_abstractExpression.Expression);

	var AsSetOperation = exports.AsSetOperation = function (_Expression5) {
	    _inherits(AsSetOperation, _Expression5);

	    function AsSetOperation(source) {
	        _classCallCheck(this, AsSetOperation);

	        var _this5 = _possibleConstructorReturn(this, (AsSetOperation.__proto__ || Object.getPrototypeOf(AsSetOperation)).call(this));

	        _this5.source = source;
	        return _this5;
	    }

	    _createClass(AsSetOperation, [{
	        key: 'evaluate',
	        value: function evaluate(obj) {
	            var source = this.source.evaluate(obj);
	            if (source instanceof Array) {
	                return new Set(source);
	            }
	        }
	    }]);

	    return AsSetOperation;
	}(_abstractExpression.Expression);

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.SizeExpression = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _abstractExpression = __webpack_require__(6);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var SizeExpression = exports.SizeExpression = function (_Expression) {
	    _inherits(SizeExpression, _Expression);

	    function SizeExpression(source) {
	        _classCallCheck(this, SizeExpression);

	        var _this = _possibleConstructorReturn(this, (SizeExpression.__proto__ || Object.getPrototypeOf(SizeExpression)).call(this));

	        _this.source = source;
	        return _this;
	    }

	    _createClass(SizeExpression, [{
	        key: 'evaluate',
	        value: function evaluate(obj, variables) {
	            var source = this.source.evaluate(obj, variables);
	            if (source instanceof Array || source instanceof Map || source instanceof Set) {
	                return source.length;
	            } else if (!source) {
	                return 0;
	            }

	            throw new Error('Expected Collection, got ' + (typeof source === 'undefined' ? 'undefined' : _typeof(source)));
	        }
	    }]);

	    return SizeExpression;
	}(_abstractExpression.Expression);

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.StringExpression = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _abstractExpression = __webpack_require__(6);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var StringExpression = exports.StringExpression = function (_Expression) {
	    _inherits(StringExpression, _Expression);

	    function StringExpression(value) {
	        _classCallCheck(this, StringExpression);

	        var _this = _possibleConstructorReturn(this, (StringExpression.__proto__ || Object.getPrototypeOf(StringExpression)).call(this));

	        _this.value = value.replace(/^\"|\"$/g, '');
	        return _this;
	    }

	    _createClass(StringExpression, [{
	        key: 'evaluate',
	        value: function evaluate() {
	            return this.value;
	        }
	    }]);

	    return StringExpression;
	}(_abstractExpression.Expression);

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.VariableExpression = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _abstractExpression = __webpack_require__(6);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var VariableExpression = exports.VariableExpression = function (_Expression) {
	    _inherits(VariableExpression, _Expression);

	    function VariableExpression(variable) {
	        _classCallCheck(this, VariableExpression);

	        var _this = _possibleConstructorReturn(this, (VariableExpression.__proto__ || Object.getPrototypeOf(VariableExpression)).call(this));

	        _this.variable = variable;
	        return _this;
	    }

	    _createClass(VariableExpression, [{
	        key: 'evaluate',
	        value: function evaluate(obj, variables) {
	            var o = void 0;
	            var parts = this.variable.split('.');
	            if (parts[0] === 'self') {
	                parts.shift();
	                o = obj;
	            } else {
	                o = variables;
	            }

	            o = this._resolvePath(o, parts.join('.'));

	            return o;
	        }
	    }, {
	        key: '_resolvePath',
	        value: function _resolvePath(object, reference) {
	            return reference.split('.').reduce(dot_deref, object);

	            function arr_deref(o, ref, i) {
	                if (!o) return;
	                return !ref ? o : o[ref.slice(0, i ? -1 : ref.length)];
	            }

	            function dot_deref(o, ref) {
	                if (!o) return;
	                return !ref ? o : ref.split('[').reduce(arr_deref, o);
	            }
	        }
	    }]);

	    return VariableExpression;
	}(_abstractExpression.Expression);

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.XorExpression = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _abstractExpression = __webpack_require__(6);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var XorExpression = exports.XorExpression = function (_Expression) {
	    _inherits(XorExpression, _Expression);

	    function XorExpression(left, right) {
	        _classCallCheck(this, XorExpression);

	        var _this = _possibleConstructorReturn(this, (XorExpression.__proto__ || Object.getPrototypeOf(XorExpression)).call(this));

	        _this.left = left;
	        _this.right = right;
	        return _this;
	    }

	    _createClass(XorExpression, [{
	        key: 'evaluate',
	        value: function evaluate(obj, variables) {
	            var left = this.left.evaluate(obj, variables);
	            var right = this.right.evaluate(obj, variables);

	            return !!(left ^ right);
	        }
	    }]);

	    return XorExpression;
	}(_abstractExpression.Expression);

/***/ }
/******/ ]);