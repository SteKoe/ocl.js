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
/******/ 	return __webpack_require__(__webpack_require__.s = 42);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MathExpression = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _expression = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MathExpression = exports.MathExpression = function (_Expression) {
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
}(_expression.Expression);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LiteralExpression = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _expression = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LiteralExpression = exports.LiteralExpression = function (_Expression) {
    _inherits(LiteralExpression, _Expression);

    function LiteralExpression(value) {
        _classCallCheck(this, LiteralExpression);

        var _this = _possibleConstructorReturn(this, (LiteralExpression.__proto__ || Object.getPrototypeOf(LiteralExpression)).call(this));

        _this.value = _this.parseValue(value);
        return _this;
    }

    _createClass(LiteralExpression, [{
        key: 'parseValue',
        value: function parseValue(value) {
            throw new Error('parseValue() function not implemented!');
        }
    }, {
        key: 'evaluate',
        value: function evaluate() {
            return this.value;
        }
    }]);

    return LiteralExpression;
}(_expression.Expression);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GateExpression = undefined;

var _expression = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GateExpression = exports.GateExpression = function (_Expression) {
    _inherits(GateExpression, _Expression);

    function GateExpression(left, right) {
        _classCallCheck(this, GateExpression);

        var _this = _possibleConstructorReturn(this, (GateExpression.__proto__ || Object.getPrototypeOf(GateExpression)).call(this));

        _this.left = left;
        _this.right = right;
        return _this;
    }

    return GateExpression;
}(_expression.Expression);

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.InvariantExpression = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _expression = __webpack_require__(0);

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
}(_expression.Expression);

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.IsEmptyExpression = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _expression = __webpack_require__(0);

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
            return !(source && source.length !== 0);
        }
    }]);

    return IsEmptyExpression;
}(_expression.Expression);

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LetExpression = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _expression = __webpack_require__(0);

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
}(_expression.Expression);

/***/ }),
/* 7 */
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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.OclEngine = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _oclParser = __webpack_require__(40);

var _utils = __webpack_require__(7);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OclEngine = exports.OclEngine = function () {
    _createClass(OclEngine, null, [{
        key: 'create',
        value: function create() {
            return new OclEngine();
        }
    }]);

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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AsSetOperation = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _expression = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AsSetOperation = exports.AsSetOperation = function (_Expression) {
    _inherits(AsSetOperation, _Expression);

    function AsSetOperation(source) {
        _classCallCheck(this, AsSetOperation);

        var _this = _possibleConstructorReturn(this, (AsSetOperation.__proto__ || Object.getPrototypeOf(AsSetOperation)).call(this));

        _this.source = source;
        return _this;
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
}(_expression.Expression);

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AtOperation = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _expression = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AtOperation = exports.AtOperation = function (_Expression) {
    _inherits(AtOperation, _Expression);

    function AtOperation(source, index) {
        _classCallCheck(this, AtOperation);

        var _this = _possibleConstructorReturn(this, (AtOperation.__proto__ || Object.getPrototypeOf(AtOperation)).call(this));

        _this.source = source;
        _this.index = index;
        return _this;
    }

    _createClass(AtOperation, [{
        key: "evaluate",
        value: function evaluate(obj) {
            var source = this.source.evaluate(obj);
            var index = this.index.evaluate(obj);

            if (source instanceof Array && Number.isInteger(index) && index >= 0 && index < source.length) {
                return source[index];
            }
        }
    }]);

    return AtOperation;
}(_expression.Expression);

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FirstOperation = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _expression = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FirstOperation = exports.FirstOperation = function (_Expression) {
    _inherits(FirstOperation, _Expression);

    function FirstOperation(source) {
        _classCallCheck(this, FirstOperation);

        var _this = _possibleConstructorReturn(this, (FirstOperation.__proto__ || Object.getPrototypeOf(FirstOperation)).call(this));

        _this.source = source;
        return _this;
    }

    _createClass(FirstOperation, [{
        key: "evaluate",
        value: function evaluate(obj) {
            var source = this.source.evaluate(obj);
            if (source instanceof Array) {
                return source[0];
            }
        }
    }]);

    return FirstOperation;
}(_expression.Expression);

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _asSetOperation = __webpack_require__(9);

Object.keys(_asSetOperation).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _asSetOperation[key];
    }
  });
});

var _atOperation = __webpack_require__(10);

Object.keys(_atOperation).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _atOperation[key];
    }
  });
});

var _firstOperation = __webpack_require__(11);

Object.keys(_firstOperation).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _firstOperation[key];
    }
  });
});

var _lastOperation = __webpack_require__(13);

Object.keys(_lastOperation).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _lastOperation[key];
    }
  });
});

var _sizeExpression = __webpack_require__(14);

Object.keys(_sizeExpression).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _sizeExpression[key];
    }
  });
});

var _unionOperation = __webpack_require__(15);

Object.keys(_unionOperation).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _unionOperation[key];
    }
  });
});

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LastOperation = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _expression = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LastOperation = exports.LastOperation = function (_Expression) {
    _inherits(LastOperation, _Expression);

    function LastOperation(source) {
        _classCallCheck(this, LastOperation);

        var _this = _possibleConstructorReturn(this, (LastOperation.__proto__ || Object.getPrototypeOf(LastOperation)).call(this));

        _this.source = source;
        return _this;
    }

    _createClass(LastOperation, [{
        key: "evaluate",
        value: function evaluate(obj) {
            var source = this.source.evaluate(obj);
            if (source instanceof Array) {
                return source[source.length - 1];
            }
        }
    }]);

    return LastOperation;
}(_expression.Expression);

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SizeExpression = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _expression = __webpack_require__(0);

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
}(_expression.Expression);

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UnionOperation = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _expression = __webpack_require__(0);

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
        key: "evaluate",
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
}(_expression.Expression);

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ContextExpression = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _expression = __webpack_require__(0);

var _invariantExpression = __webpack_require__(4);

var _letExpression = __webpack_require__(6);

var _utils = __webpack_require__(7);

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
}(_expression.Expression);

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ExistsExpression = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _expression = __webpack_require__(0);

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
}(_expression.Expression);

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AndExpression = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _gateExpression = __webpack_require__(3);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AndExpression = exports.AndExpression = function (_GateExpression) {
    _inherits(AndExpression, _GateExpression);

    function AndExpression() {
        _classCallCheck(this, AndExpression);

        return _possibleConstructorReturn(this, (AndExpression.__proto__ || Object.getPrototypeOf(AndExpression)).apply(this, arguments));
    }

    _createClass(AndExpression, [{
        key: "evaluate",
        value: function evaluate(obj, variables) {
            var left = this.left.evaluate(obj, variables);
            var right = this.right.evaluate(obj, variables);

            return left && right;
        }
    }]);

    return AndExpression;
}(_gateExpression.GateExpression);

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ImpliesExpression = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _expression = __webpack_require__(0);

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
}(_expression.Expression);

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _andExpression = __webpack_require__(18);

Object.keys(_andExpression).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _andExpression[key];
    }
  });
});

var _impliesExpression = __webpack_require__(19);

Object.keys(_impliesExpression).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _impliesExpression[key];
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

var _xorExpression = __webpack_require__(22);

Object.keys(_xorExpression).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _xorExpression[key];
    }
  });
});

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.OrExpression = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _gateExpression = __webpack_require__(3);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OrExpression = exports.OrExpression = function (_GateExpression) {
    _inherits(OrExpression, _GateExpression);

    function OrExpression() {
        _classCallCheck(this, OrExpression);

        return _possibleConstructorReturn(this, (OrExpression.__proto__ || Object.getPrototypeOf(OrExpression)).apply(this, arguments));
    }

    _createClass(OrExpression, [{
        key: "evaluate",
        value: function evaluate(obj, variables) {
            var left = this.left.evaluate(obj, variables);
            var right = this.right.evaluate(obj, variables);

            return left || right;
        }
    }]);

    return OrExpression;
}(_gateExpression.GateExpression);

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.XorExpression = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _gateExpression = __webpack_require__(3);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XorExpression = exports.XorExpression = function (_GateExpression) {
    _inherits(XorExpression, _GateExpression);

    function XorExpression() {
        _classCallCheck(this, XorExpression);

        return _possibleConstructorReturn(this, (XorExpression.__proto__ || Object.getPrototypeOf(XorExpression)).apply(this, arguments));
    }

    _createClass(XorExpression, [{
        key: "evaluate",
        value: function evaluate(obj, variables) {
            var left = this.left.evaluate(obj, variables);
            var right = this.right.evaluate(obj, variables);

            return !!(left ^ right);
        }
    }]);

    return XorExpression;
}(_gateExpression.GateExpression);

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _collection = __webpack_require__(12);

Object.keys(_collection).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _collection[key];
    }
  });
});

var _contextExpression = __webpack_require__(16);

Object.keys(_contextExpression).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _contextExpression[key];
    }
  });
});

var _existsExpression = __webpack_require__(17);

Object.keys(_existsExpression).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _existsExpression[key];
    }
  });
});

var _gate = __webpack_require__(20);

Object.keys(_gate).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _gate[key];
    }
  });
});

var _invariantExpression = __webpack_require__(4);

Object.keys(_invariantExpression).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _invariantExpression[key];
    }
  });
});

var _isEmptyExpression = __webpack_require__(5);

Object.keys(_isEmptyExpression).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _isEmptyExpression[key];
    }
  });
});

var _isNotEmptyExpression = __webpack_require__(24);

Object.keys(_isNotEmptyExpression).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _isNotEmptyExpression[key];
    }
  });
});

var _iteratorExpression = __webpack_require__(25);

Object.keys(_iteratorExpression).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _iteratorExpression[key];
    }
  });
});

var _letExpression = __webpack_require__(6);

Object.keys(_letExpression).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _letExpression[key];
    }
  });
});

var _literal = __webpack_require__(27);

Object.keys(_literal).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _literal[key];
    }
  });
});

var _nilExpression = __webpack_require__(36);

Object.keys(_nilExpression).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _nilExpression[key];
    }
  });
});

var _math = __webpack_require__(32);

Object.keys(_math).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _math[key];
    }
  });
});

var _operationCallExpression = __webpack_require__(37);

Object.keys(_operationCallExpression).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _operationCallExpression[key];
    }
  });
});

var _selectExpression = __webpack_require__(38);

Object.keys(_selectExpression).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _selectExpression[key];
    }
  });
});

var _variableExpression = __webpack_require__(39);

Object.keys(_variableExpression).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _variableExpression[key];
    }
  });
});

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.IsNotEmptyExpression = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _isEmptyExpression = __webpack_require__(5);

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

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.IteratorExpression = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _expression = __webpack_require__(0);

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
                    return false;
                } else if (this.iterators.length === 1) {
                    return this._evaluateOneIterator(obj);
                } else if (this.iterators.length === 2) {
                    return this._evaluateTwoIterators(obj);
                }
            } else {
                return false;
            }
        }
    }, {
        key: '_evaluateOneIterator',
        value: function _evaluateOneIterator(obj) {
            var _this2 = this;

            var source = this.source.evaluate(obj);
            var map = source.map(function (c) {
                var variables = {};
                variables[_this2.iterators[0]] = c;
                return _this2.body.evaluate(obj, variables);
            });

            var b = !map.some(function (r) {
                return r === false;
            });

            return b;
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
}(_expression.Expression);

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BooleanExpression = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _literalExpression = __webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BooleanExpression = exports.BooleanExpression = function (_LiteralExpression) {
    _inherits(BooleanExpression, _LiteralExpression);

    function BooleanExpression() {
        _classCallCheck(this, BooleanExpression);

        return _possibleConstructorReturn(this, (BooleanExpression.__proto__ || Object.getPrototypeOf(BooleanExpression)).apply(this, arguments));
    }

    _createClass(BooleanExpression, [{
        key: "parseValue",
        value: function parseValue(value) {
            return JSON.parse(value);
        }
    }, {
        key: "evaluate",
        value: function evaluate() {
            return this.value;
        }
    }]);

    return BooleanExpression;
}(_literalExpression.LiteralExpression);

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _booleanExpression = __webpack_require__(26);

Object.keys(_booleanExpression).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _booleanExpression[key];
    }
  });
});

var _literalExpression = __webpack_require__(2);

Object.keys(_literalExpression).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _literalExpression[key];
    }
  });
});

var _numberExpression = __webpack_require__(28);

Object.keys(_numberExpression).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _numberExpression[key];
    }
  });
});

var _stringExpression = __webpack_require__(29);

Object.keys(_stringExpression).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _stringExpression[key];
    }
  });
});

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.NumberExpression = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _literalExpression = __webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NumberExpression = exports.NumberExpression = function (_LiteralExpression) {
    _inherits(NumberExpression, _LiteralExpression);

    function NumberExpression() {
        _classCallCheck(this, NumberExpression);

        return _possibleConstructorReturn(this, (NumberExpression.__proto__ || Object.getPrototypeOf(NumberExpression)).apply(this, arguments));
    }

    _createClass(NumberExpression, [{
        key: "parseValue",
        value: function parseValue(value) {
            if (!isNaN(+value)) {
                return +value;
            } else {
                throw new SyntaxError("NumberExpression: '" + value + "' is not a Number!");
            }
        }
    }, {
        key: "evaluate",
        value: function evaluate() {
            return this.value;
        }
    }]);

    return NumberExpression;
}(_literalExpression.LiteralExpression);

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.StringExpression = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _literalExpression = __webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StringExpression = exports.StringExpression = function (_LiteralExpression) {
    _inherits(StringExpression, _LiteralExpression);

    function StringExpression() {
        _classCallCheck(this, StringExpression);

        return _possibleConstructorReturn(this, (StringExpression.__proto__ || Object.getPrototypeOf(StringExpression)).apply(this, arguments));
    }

    _createClass(StringExpression, [{
        key: "parseValue",
        value: function parseValue(value) {
            return value.replace(/^\"|\"$/g, '');
        }
    }, {
        key: "evaluate",
        value: function evaluate() {
            return this.value;
        }
    }]);

    return StringExpression;
}(_literalExpression.LiteralExpression);

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AdditionExpression = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _mathExpression = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AdditionExpression = exports.AdditionExpression = function (_MathExpression) {
    _inherits(AdditionExpression, _MathExpression);

    function AdditionExpression() {
        _classCallCheck(this, AdditionExpression);

        return _possibleConstructorReturn(this, (AdditionExpression.__proto__ || Object.getPrototypeOf(AdditionExpression)).apply(this, arguments));
    }

    _createClass(AdditionExpression, [{
        key: "evaluate",
        value: function evaluate(obj, variables) {
            var e = _get(AdditionExpression.prototype.__proto__ || Object.getPrototypeOf(AdditionExpression.prototype), "evaluate", this).call(this, obj, variables);
            return e.left + e.right;
        }
    }]);

    return AdditionExpression;
}(_mathExpression.MathExpression);

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DivideExpression = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _mathExpression = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DivideExpression = exports.DivideExpression = function (_MathExpression) {
    _inherits(DivideExpression, _MathExpression);

    function DivideExpression() {
        _classCallCheck(this, DivideExpression);

        return _possibleConstructorReturn(this, (DivideExpression.__proto__ || Object.getPrototypeOf(DivideExpression)).apply(this, arguments));
    }

    _createClass(DivideExpression, [{
        key: "evaluate",
        value: function evaluate(obj, variables) {
            var e = _get(DivideExpression.prototype.__proto__ || Object.getPrototypeOf(DivideExpression.prototype), "evaluate", this).call(this, obj, variables);
            return e.left / e.right;
        }
    }]);

    return DivideExpression;
}(_mathExpression.MathExpression);

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _additionExpression = __webpack_require__(30);

Object.keys(_additionExpression).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _additionExpression[key];
    }
  });
});

var _divideExpression = __webpack_require__(31);

Object.keys(_divideExpression).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _divideExpression[key];
    }
  });
});

var _moduloExpression = __webpack_require__(33);

Object.keys(_moduloExpression).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _moduloExpression[key];
    }
  });
});

var _multiplyExpression = __webpack_require__(34);

Object.keys(_multiplyExpression).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _multiplyExpression[key];
    }
  });
});

var _substractionExpression = __webpack_require__(35);

Object.keys(_substractionExpression).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _substractionExpression[key];
    }
  });
});

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ModuloExpression = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _mathExpression = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ModuloExpression = exports.ModuloExpression = function (_MathExpression) {
    _inherits(ModuloExpression, _MathExpression);

    function ModuloExpression() {
        _classCallCheck(this, ModuloExpression);

        return _possibleConstructorReturn(this, (ModuloExpression.__proto__ || Object.getPrototypeOf(ModuloExpression)).apply(this, arguments));
    }

    _createClass(ModuloExpression, [{
        key: "evaluate",
        value: function evaluate(obj, variables) {
            var e = _get(ModuloExpression.prototype.__proto__ || Object.getPrototypeOf(ModuloExpression.prototype), "evaluate", this).call(this, obj, variables);
            return e.left % e.right;
        }
    }]);

    return ModuloExpression;
}(_mathExpression.MathExpression);

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MultiplyExpression = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _mathExpression = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MultiplyExpression = exports.MultiplyExpression = function (_MathExpression) {
    _inherits(MultiplyExpression, _MathExpression);

    function MultiplyExpression() {
        _classCallCheck(this, MultiplyExpression);

        return _possibleConstructorReturn(this, (MultiplyExpression.__proto__ || Object.getPrototypeOf(MultiplyExpression)).apply(this, arguments));
    }

    _createClass(MultiplyExpression, [{
        key: "evaluate",
        value: function evaluate(obj, variables) {
            var e = _get(MultiplyExpression.prototype.__proto__ || Object.getPrototypeOf(MultiplyExpression.prototype), "evaluate", this).call(this, obj, variables);
            return e.left * e.right;
        }
    }]);

    return MultiplyExpression;
}(_mathExpression.MathExpression);

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SubstractionExpression = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _mathExpression = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SubstractionExpression = exports.SubstractionExpression = function (_MathExpression) {
    _inherits(SubstractionExpression, _MathExpression);

    function SubstractionExpression() {
        _classCallCheck(this, SubstractionExpression);

        return _possibleConstructorReturn(this, (SubstractionExpression.__proto__ || Object.getPrototypeOf(SubstractionExpression)).apply(this, arguments));
    }

    _createClass(SubstractionExpression, [{
        key: "evaluate",
        value: function evaluate(obj, variables) {
            var e = _get(SubstractionExpression.prototype.__proto__ || Object.getPrototypeOf(SubstractionExpression.prototype), "evaluate", this).call(this, obj, variables);
            return e.left - e.right;
        }
    }]);

    return SubstractionExpression;
}(_mathExpression.MathExpression);

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.NilExpression = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _expression = __webpack_require__(0);

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
}(_expression.Expression);

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.OperationCallExpression = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _expression = __webpack_require__(0);

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
}(_expression.Expression);

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SelectExpression = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _expression = __webpack_require__(0);

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
}(_expression.Expression);

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.VariableExpression = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _expression = __webpack_require__(0);

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

            function dot_deref(o, ref) {
                if (!o) return;
                return !ref ? o : ref.split('[').reduce(arr_deref, o);
            }

            function arr_deref(o, ref, i) {
                if (!o) return;
                return !ref ? o : o[ref.slice(0, i ? -1 : ref.length)];
            }
        }
    }]);

    return VariableExpression;
}(_expression.Expression);

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var parser = __webpack_require__(41);

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
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _expressions = __webpack_require__(23);

var Expression = _interopRequireWildcard(_expressions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/* parser generated by jison 0.4.18-180 */

/*
 * Returns a Parser object of the following structure:
 *
 *  Parser: {
 *    yy: {}     The so-called "shared state" or rather the *source* of it;
 *               the real "shared state" `yy` passed around to
 *               the rule actions, etc. is a derivative/copy of this one,
 *               not a direct reference!
 *  }
 *
 *  Parser.prototype: {
 *    yy: {},
 *    EOF: 1,
 *    TERROR: 2,
 *
 *    trace: function(errorMessage, ...),
 *
 *    JisonParserError: function(msg, hash),
 *
 *    quoteName: function(name),
 *               Helper function which can be overridden by user code later on: put suitable
 *               quotes around literal IDs in a description string.
 *
 *    originalQuoteName: function(name),
 *               The basic quoteName handler provided by JISON.
 *               `cleanupAfterParse()` will clean up and reset `quoteName()` to reference this function
 *               at the end of the `parse()`.
 *
 *    describeSymbol: function(symbol),
 *               Return a more-or-less human-readable description of the given symbol, when
 *               available, or the symbol itself, serving as its own 'description' for lack
 *               of something better to serve up.
 *
 *               Return NULL when the symbol is unknown to the parser.
 *
 *    symbols_: {associative list: name ==> number},
 *    terminals_: {associative list: number ==> name},
 *    nonterminals: {associative list: rule-name ==> {associative list: number ==> rule-alt}},
 *    terminal_descriptions_: (if there are any) {associative list: number ==> description},
 *    productions_: [...],
 *
 *    performAction: function parser__performAction(yytext, yyleng, yylineno, yyloc, yystate, yysp, yyvstack, yylstack, yystack, yysstack, ...),
 *               where `...` denotes the (optional) additional arguments the user passed to
 *               `parser.parse(str, ...)` and specified by way of `%parse-param ...` in the grammar file
 *
 *               The function parameters and `this` have the following value/meaning:
 *               - `this`    : reference to the `yyval` internal object, which has members (`$` and `_$`)
 *                             to store/reference the rule value `$$` and location info `@$`.
 *
 *                 One important thing to note about `this` a.k.a. `yyval`: every *reduce* action gets
 *                 to see the same object via the `this` reference, i.e. if you wish to carry custom
 *                 data from one reduce action through to the next within a single parse run, then you
 *                 may get nasty and use `yyval` a.k.a. `this` for storing you own semi-permanent data.
 *
 *               - `yytext`  : reference to the lexer value which belongs to the last lexer token used
 *                             to match this rule. This is *not* the look-ahead token, but the last token
 *                             that's actually part of this rule.
 *
 *                 Formulated another way, `yytext` is the value of the token immediately preceeding
 *                 the current look-ahead token.
 *                 Caveats apply for rules which don't require look-ahead, such as epsilon rules.
 *
 *               - `yyleng`  : ditto as `yytext`, only now for the lexer.yyleng value.
 *
 *               - `yylineno`: ditto as `yytext`, only now for the lexer.yylineno value.
 *
 *               - `yyloc`   : ditto as `yytext`, only now for the lexer.yylloc lexer token location info.
 *
 *               - `yystate` : the current parser state number, used internally for dispatching and
 *                             executing the action code chunk matching the rule currently being reduced.
 *
 *               - `yysp`    : the current state stack position (a.k.a. 'stack pointer')
 *
 *                 This one comes in handy when you are going to do advanced things to the parser
 *                 stacks, all of which are accessible from your action code (see the next entries below).
 *
 *                 Also note that you can access this and other stack index values using the new double-hash
 *                 syntax, i.e. `##$ === ##0 === yysp`, while `##1` is the stack index for all things
 *                 related to the first rule term, just like you have `$1`, `@1` and `#1`.
 *                 This is made available to write very advanced grammar action rules, e.g. when you want
 *                 to investigate the parse state stack in your action code, which would, for example,
 *                 be relevant when you wish to implement error diagnostics and reporting schemes similar
 *                 to the work described here:
 *
 *                 + Pottier, F., 2016. Reachability and error diagnosis in LR(1) automata.
 *                   In Journées Francophones des Languages Applicatifs.
 *
 *                 + Jeffery, C.L., 2003. Generating LR syntax error messages from examples.
 *                   ACM Transactions on Programming Languages and Systems (TOPLAS), 25(5), pp.631–640.
 *
 *               - `yyvstack`: reference to the parser value stack. Also accessed via the `$1` etc.
 *                             constructs.
 *
 *               - `yylstack`: reference to the parser token location stack. Also accessed via
 *                             the `@1` etc. constructs.
 *
 *               - `yystack` : reference to the parser token id stack. Also accessed via the
 *                             `#1` etc. constructs.
 *
 *                 Note: this is a bit of a **white lie** as we can statically decode any `#n` reference to
 *                 its numeric token id value, hence that code wouldn't need the `yystack` but *you* might
 *                 want access for your own purposes, such as error analysis as mentioned above!
 *
 *                 Note that this stack stores the current stack of *tokens*, that is the sequence of
 *                 already parsed=reduced *nonterminals* (tokens representing rules) and *terminals*
 *                 (lexer tokens *shifted* onto the stack until the rule they belong to is found and
 *                 *reduced*.
 *
 *               - `yysstack`: reference to the parser state stack. This one carries the internal parser
 *                             *states* such as the one in `yystate`, which are used to represent
 *                             the parser state machine in the *parse table*. *Very* *internal* stuff,
 *                             what can I say? If you access this one, you're clearly doing wicked things
 *
 *               - `...`     : the extra arguments you specified in the `%parse-param` statement in your
 *                             grammar definition file.
 *
 *    table: [...],
 *               State transition table
 *               ----------------------
 *
 *               index levels are:
 *               - `state`  --> hash table
 *               - `symbol` --> action (number or array)
 *
 *                 If the `action` is an array, these are the elements' meaning:
 *                 - index [0]: 1 = shift, 2 = reduce, 3 = accept
 *                 - index [1]: GOTO `state`
 *
 *                 If the `action` is a number, it is the GOTO `state`
 *
 *    defaultActions: {...},
 *
 *    parseError: function(str, hash, ExceptionClass),
 *    yyError: function(str, ...),
 *    yyRecovering: function(),
 *    yyErrOk: function(),
 *    yyClearIn: function(),
 *
 *    constructParseErrorInfo: function(error_message, exception_object, expected_token_set, is_recoverable),
 *               Helper function **which will be set up during the first invocation of the `parse()` method**.
 *               Produces a new errorInfo 'hash object' which can be passed into `parseError()`.
 *               See it's use in this parser kernel in many places; example usage:
 *
 *                   var infoObj = parser.constructParseErrorInfo('fail!', null,
 *                                     parser.collect_expected_token_set(state), true);
 *                   var retVal = parser.parseError(infoObj.errStr, infoObj, parser.JisonParserError);
 *
 *    originalParseError: function(str, hash, ExceptionClass),
 *               The basic `parseError` handler provided by JISON.
 *               `cleanupAfterParse()` will clean up and reset `parseError()` to reference this function
 *               at the end of the `parse()`.
 *
 *    options: { ... parser %options ... },
 *
 *    parse: function(input[, args...]),
 *               Parse the given `input` and return the parsed value (or `true` when none was provided by
 *               the root action, in which case the parser is acting as a *matcher*).
 *               You MAY use the additional `args...` parameters as per `%parse-param` spec of this grammar:
 *               these extra `args...` are passed verbatim to the grammar rules' action code.
 *
 *    cleanupAfterParse: function(resultValue, invoke_post_methods, do_not_nuke_errorinfos),
 *               Helper function **which will be set up during the first invocation of the `parse()` method**.
 *               This helper API is invoked at the end of the `parse()` call, unless an exception was thrown
 *               and `%options no-try-catch` has been defined for this grammar: in that case this helper MAY
 *               be invoked by calling user code to ensure the `post_parse` callbacks are invoked and
 *               the internal parser gets properly garbage collected under these particular circumstances.
 *
 *    lexer: {
 *        yy: {...},           A reference to the so-called "shared state" `yy` once
 *                             received via a call to the `.setInput(input, yy)` lexer API.
 *        EOF: 1,
 *        ERROR: 2,
 *        JisonLexerError: function(msg, hash),
 *        parseError: function(str, hash, ExceptionClass),
 *        setInput: function(input, [yy]),
 *        input: function(),
 *        unput: function(str),
 *        more: function(),
 *        reject: function(),
 *        less: function(n),
 *        pastInput: function(n),
 *        upcomingInput: function(n),
 *        showPosition: function(),
 *        test_match: function(regex_match_array, rule_index, ...),
 *        next: function(...),
 *        lex: function(...),
 *        begin: function(condition),
 *        pushState: function(condition),
 *        popState: function(),
 *        topState: function(),
 *        _currentRules: function(),
 *        stateStackSize: function(),
 *        cleanupAfterLex: function()
 *
 *        options: { ... lexer %options ... },
 *
 *        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START, ...),
 *        rules: [...],
 *        conditions: {associative list: name ==> set},
 *    }
 *  }
 *
 *
 *  token location info (@$, _$, etc.): {
 *    first_line: n,
 *    last_line: n,
 *    first_column: n,
 *    last_column: n,
 *    range: [start_number, end_number]
 *               (where the numbers are indexes into the input string, zero-based)
 *  }
 *
 * ---
 *
 * The `parseError` function receives a 'hash' object with these members for lexer and
 * parser errors:
 *
 *  {
 *    text:        (matched text)
 *    token:       (the produced terminal token, if any)
 *    token_id:    (the produced terminal token numeric ID, if any)
 *    line:        (yylineno)
 *    loc:         (yylloc)
 *  }
 *
 * parser (grammar) errors will also provide these additional members:
 *
 *  {
 *    expected:    (array describing the set of expected tokens;
 *                  may be UNDEFINED when we cannot easily produce such a set)
 *    state:       (integer (or array when the table includes grammar collisions);
 *                  represents the current internal state of the parser kernel.
 *                  can, for example, be used to pass to the `collect_expected_token_set()`
 *                  API to obtain the expected token set)
 *    action:      (integer; represents the current internal action which will be executed)
 *    new_state:   (integer; represents the next/planned internal state, once the current
 *                  action has executed)
 *    recoverable: (boolean: TRUE when the parser MAY have an error recovery rule
 *                  available for this particular error)
 *    state_stack: (array: the current parser LALR/LR internal state stack; this can be used,
 *                  for instance, for advanced error analysis and reporting)
 *    value_stack: (array: the current parser LALR/LR internal `$$` value stack; this can be used,
 *                  for instance, for advanced error analysis and reporting)
 *    location_stack: (array: the current parser LALR/LR internal location stack; this can be used,
 *                  for instance, for advanced error analysis and reporting)
 *    yy:          (object: the current parser internal "shared state" `yy`
 *                  as is also available in the rule actions; this can be used,
 *                  for instance, for advanced error analysis and reporting)
 *    lexer:       (reference to the current lexer instance used by the parser)
 *    parser:      (reference to the current parser instance)
 *  }
 *
 * while `this` will reference the current parser instance.
 *
 * When `parseError` is invoked by the lexer, `this` will still reference the related *parser*
 * instance, while these additional `hash` fields will also be provided:
 *
 *  {
 *    lexer:       (reference to the current lexer instance which reported the error)
 *  }
 *
 * When `parseError` is invoked by the parser due to a **JavaScript exception** being fired
 * from either the parser or lexer, `this` will still reference the related *parser*
 * instance, while these additional `hash` fields will also be provided:
 *
 *  {
 *    exception:   (reference to the exception thrown)
 *  }
 *
 * Please do note that in the latter situation, the `expected` field will be omitted as
 * this type of failure is assumed not to be due to *parse errors* but rather due to user
 * action code in either parser or lexer failing unexpectedly.
 *
 * ---
 *
 * You can specify parser options by setting / modifying the `.yy` object of your Parser instance.
 * These options are available:
 *
 * ### options which are global for all parser instances
 *
 *  Parser.pre_parse: function(yy [, optional parse() args])
 *                 optional: you can specify a pre_parse() function in the chunk following
 *                 the grammar, i.e. after the last `%%`.
 *  Parser.post_parse: function(yy, retval [, optional parse() args]) { return retval; }
 *                 optional: you can specify a post_parse() function in the chunk following
 *                 the grammar, i.e. after the last `%%`. When it does not return any value,
 *                 the parser will return the original `retval`.
 *
 * ### options which can be set up per parser instance
 *
 *  yy: {
 *      pre_parse:  function(yy [, optional parse() args])
 *                 optional: is invoked before the parse cycle starts (and before the first
 *                 invocation of `lex()`) but immediately after the invocation of
 *                 `parser.pre_parse()`).
 *      post_parse: function(yy, retval [, optional parse() args]) { return retval; }
 *                 optional: is invoked when the parse terminates due to success ('accept')
 *                 or failure (even when exceptions are thrown).
 *                 `retval` contains the return value to be produced by `Parser.parse()`;
 *                 this function can override the return value by returning another.
 *                 When it does not return any value, the parser will return the original
 *                 `retval`.
 *                 This function is invoked immediately before `Parser.post_parse()`.
 *
 *      parseError: function(str, hash, ExceptionClass)
 *                 optional: overrides the default `parseError` function.
 *      quoteName: function(name),
 *                 optional: overrides the default `quoteName` function.
 *  }
 *
 *  parser.lexer.options: {
 *      pre_lex:  function()
 *                 optional: is invoked before the lexer is invoked to produce another token.
 *                 `this` refers to the Lexer object.
 *      post_lex: function(token) { return token; }
 *                 optional: is invoked when the lexer has produced a token `token`;
 *                 this function can override the returned token value by returning another.
 *                 When it does not return any (truthy) value, the lexer will return
 *                 the original `token`.
 *                 `this` refers to the Lexer object.
 *
 *      ranges: boolean
 *                 optional: `true` ==> token location info will include a .range[] member.
 *      flex: boolean
 *                 optional: `true` ==> flex-like lexing behaviour where the rules are tested
 *                 exhaustively to find the longest match.
 *      backtrack_lexer: boolean
 *                 optional: `true` ==> lexer regexes are tested in order and for invoked;
 *                 the lexer terminates the scan when a token is returned by the action code.
 *      xregexp: boolean
 *                 optional: `true` ==> lexer rule regexes are "extended regex format" requiring the
 *                 `XRegExp` library. When this %option has not been specified at compile time, all lexer
 *                 rule regexes have been written as standard JavaScript RegExp expressions.
 *  }
 */
var parser = function () {

    // See also:
    // http://stackoverflow.com/questions/1382107/whats-a-good-way-to-extend-error-in-javascript/#35881508
    // but we keep the prototype.constructor and prototype.name assignment lines too for compatibility
    // with userland code which might access the derived class in a 'classic' way.
    function JisonParserError(msg, hash) {
        Object.defineProperty(this, 'name', {
            enumerable: false,
            writable: false,
            value: 'JisonParserError'
        });

        if (msg == null) msg = '???';

        Object.defineProperty(this, 'message', {
            enumerable: false,
            writable: true,
            value: msg
        });

        this.hash = hash;

        var stacktrace;
        if (hash && hash.exception instanceof Error) {
            var ex2 = hash.exception;
            this.message = ex2.message || msg;
            stacktrace = ex2.stack;
        }
        if (!stacktrace) {
            if (Error.hasOwnProperty('captureStackTrace')) {
                // V8
                Error.captureStackTrace(this, this.constructor);
            } else {
                stacktrace = new Error(msg).stack;
            }
        }
        if (stacktrace) {
            Object.defineProperty(this, 'stack', {
                enumerable: false,
                writable: false,
                value: stacktrace
            });
        }
    }

    if (typeof Object.setPrototypeOf === 'function') {
        Object.setPrototypeOf(JisonParserError.prototype, Error.prototype);
    } else {
        JisonParserError.prototype = Object.create(Error.prototype);
    }
    JisonParserError.prototype.constructor = JisonParserError;
    JisonParserError.prototype.name = 'JisonParserError';

    // helper: reconstruct the productions[] table
    function bp(s) {
        var rv = [];
        var p = s.pop;
        var r = s.rule;
        for (var i = 0, l = p.length; i < l; i++) {
            rv.push([p[i], r[i]]);
        }
        return rv;
    }

    // helper: reconstruct the defaultActions[] table
    function bda(s) {
        var rv = {};
        var d = s.idx;
        var g = s.goto;
        for (var i = 0, l = d.length; i < l; i++) {
            var j = d[i];
            rv[j] = g[i];
        }
        return rv;
    }

    // helper: reconstruct the 'goto' table
    function bt(s) {
        var rv = [];
        var d = s.len;
        var y = s.symbol;
        var t = s.type;
        var a = s.state;
        var m = s.mode;
        var g = s.goto;
        for (var i = 0, l = d.length; i < l; i++) {
            var n = d[i];
            var q = {};
            for (var j = 0; j < n; j++) {
                var z = y.shift();
                switch (t.shift()) {
                    case 2:
                        q[z] = [m.shift(), g.shift()];
                        break;

                    case 0:
                        q[z] = a.shift();
                        break;

                    default:
                        // type === 1: accept
                        q[z] = [3];
                }
            }
            rv.push(q);
        }
        return rv;
    }

    // helper: runlength encoding with increment step: code, length: step (default step = 0)
    // `this` references an array
    function s(c, l, a) {
        a = a || 0;
        for (var i = 0; i < l; i++) {
            this.push(c);
            c += a;
        }
    }

    // helper: duplicate sequence from *relative* offset and length.
    // `this` references an array
    function c(i, l) {
        i = this.length - i;
        for (l += i; i < l; i++) {
            this.push(this[i]);
        }
    }

    // helper: unpack an array using helpers and data, all passed in an array argument 'a'.
    function u(a) {
        var rv = [];
        for (var i = 0, l = a.length; i < l; i++) {
            var e = a[i];
            // Is this entry a helper function?
            if (typeof e === 'function') {
                i++;
                e.apply(rv, a[i]);
            } else {
                rv.push(e);
            }
        }
        return rv;
    }

    var parser = {
        // Code Generator Information Report
        // ---------------------------------
        //
        // Options:
        //
        //   no default action: ............... false
        //   no try..catch: ................... false
        //   no default resolve on conflict:    false
        //   on-demand look-ahead: ............ false
        //   error recovery token skip maximum: 3
        //   debug grammar/output: ............ false
        //   has partial LR conflict upgrade:   true
        //   rudimentary token-stack support:   false
        //   parser table compression mode: ... 2
        //   export debug tables: ............. false
        //   export *all* tables: ............. false
        //   module type: ..................... js
        //   parser engine type: .............. lalr
        //   output main() in the module: ..... false
        //   number of expected conflicts: .... 0
        //
        //
        // Parser Analysis flags:
        //
        //   all actions are default: ......... false
        //   uses yyleng: ..................... false
        //   uses yylineno: ................... false
        //   uses yytext: ..................... false
        //   uses yylloc: ..................... false
        //   uses ParseError API: ............. false
        //   uses YYERROR: .................... false
        //   uses YYRECOVERING: ............... false
        //   uses YYERROK: .................... false
        //   uses YYCLEARIN: .................. false
        //   tracks rule values: .............. true
        //   assigns rule values: ............. true
        //   uses location tracking: .......... false
        //   assigns location: ................ false
        //   uses yystack: .................... false
        //   uses yysstack: ................... false
        //   uses yysp: ....................... true
        //   has error recovery: .............. false
        //
        // --------- END OF REPORT -----------

        trace: function no_op_trace() {},
        JisonParserError: JisonParserError,
        yy: {},
        options: {
            type: "lalr",
            hasPartialLrUpgradeOnConflict: true,
            errorRecoveryTokenDiscardCount: 3
        },
        symbols_: {
            "$accept": 0,
            "$end": 1,
            "(": 4,
            ")": 5,
            "*": 9,
            "+": 7,
            ",": 15,
            "-": 8,
            "->": 29,
            ".": 6,
            "/": 10,
            ":": 3,
            "::": 39,
            "<": 11,
            "<=": 23,
            "<>": 25,
            "=": 12,
            ">": 13,
            ">=": 24,
            "@": 16,
            "EOF": 1,
            "and": 26,
            "classifierContextDecl": 42,
            "context": 17,
            "contextDeclList": 40,
            "contextDeclaration": 41,
            "def": 19,
            "defExpression": 46,
            "div": 22,
            "error": 2,
            "false": 37,
            "implies": 30,
            "integer": 33,
            "inv": 18,
            "invOrDef": 44,
            "invOrDefList": 43,
            "let": 31,
            "literalExp": 52,
            "mod": 21,
            "nil": 38,
            "oclExpression": 45,
            "or": 27,
            "pathName": 55,
            "pre": 32,
            "preOptional": 51,
            "primitiveLiteralExp": 54,
            "real": 34,
            "simpleName": 20,
            "simpleNameOptional": 53,
            "string": 35,
            "true": 36,
            "type": 47,
            "typeOptional": 50,
            "variableDeclaration": 48,
            "variableDeclarationList": 49,
            "xor": 28,
            "|": 14
        },
        terminals_: {
            1: "EOF",
            2: "error",
            3: ":",
            4: "(",
            5: ")",
            6: ".",
            7: "+",
            8: "-",
            9: "*",
            10: "/",
            11: "<",
            12: "=",
            13: ">",
            14: "|",
            15: ",",
            16: "@",
            17: "context",
            18: "inv",
            19: "def",
            20: "simpleName",
            21: "mod",
            22: "div",
            23: "<=",
            24: ">=",
            25: "<>",
            26: "and",
            27: "or",
            28: "xor",
            29: "->",
            30: "implies",
            31: "let",
            32: "pre",
            33: "integer",
            34: "real",
            35: "string",
            36: "true",
            37: "false",
            38: "nil",
            39: "::"
        },
        TERROR: 2,
        EOF: 1,

        // internals: defined here so the object *structure* doesn't get modified by parse() et al,
        // thus helping JIT compilers like Chrome V8.
        originalQuoteName: null,
        originalParseError: null,
        cleanupAfterParse: null,
        constructParseErrorInfo: null,

        __reentrant_call_depth: 0, // INTERNAL USE ONLY
        __error_infos: [], // INTERNAL USE ONLY: the set of parseErrorInfo objects created since the last cleanup

        // APIs which will be set up depending on user action code analysis:
        //yyRecovering: 0,
        //yyErrOk: 0,
        //yyClearIn: 0,

        // Helper APIs
        // -----------

        // Helper function which can be overridden by user code later on: put suitable quotes around
        // literal IDs in a description string.
        quoteName: function parser_quoteName(id_str) {
            return '"' + id_str + '"';
        },

        // Return a more-or-less human-readable description of the given symbol, when available,
        // or the symbol itself, serving as its own 'description' for lack of something better to serve up.
        //
        // Return NULL when the symbol is unknown to the parser.
        describeSymbol: function parser_describeSymbol(symbol) {
            if (symbol !== this.EOF && this.terminal_descriptions_ && this.terminal_descriptions_[symbol]) {
                return this.terminal_descriptions_[symbol];
            } else if (symbol === this.EOF) {
                return 'end of input';
            } else if (this.terminals_[symbol]) {
                return this.quoteName(this.terminals_[symbol]);
            }
            // Otherwise... this might refer to a RULE token i.e. a non-terminal: see if we can dig that one up.
            //
            // An example of this may be where a rule's action code contains a call like this:
            //
            //      parser.describeSymbol(#$)
            //
            // to obtain a human-readable description or name of the current grammar rule. This comes handy in
            // error handling action code blocks, for example.
            var s = this.symbols_;
            for (var key in s) {
                if (s[key] === symbol) {
                    return key;
                }
            }
            return null;
        },

        // Produce a (more or less) human-readable list of expected tokens at the point of failure.
        //
        // The produced list may contain token or token set descriptions instead of the tokens
        // themselves to help turning this output into something that easier to read by humans
        // unless `do_not_describe` parameter is set, in which case a list of the raw, *numeric*,
        // expected terminals and nonterminals is produced.
        //
        // The returned list (array) will not contain any duplicate entries.
        collect_expected_token_set: function parser_collect_expected_token_set(state, do_not_describe) {
            var TERROR = this.TERROR;
            var tokenset = [];
            var check = {};
            // Has this (error?) state been outfitted with a custom expectations description text for human consumption?
            // If so, use that one instead of the less palatable token set.
            if (!do_not_describe && this.state_descriptions_ && this.state_descriptions_[state]) {
                return [this.state_descriptions_[state]];
            }
            for (var p in this.table[state]) {
                p = +p;
                if (p !== TERROR) {
                    var d = do_not_describe ? p : this.describeSymbol(p);
                    if (d && !check[d]) {
                        tokenset.push(d);
                        check[d] = true; // Mark this token description as already mentioned to prevent outputting duplicate entries.
                    }
                }
            }
            return tokenset;
        },
        productions_: bp({
            pop: u([s, [40, 4, 1], 43, 44, 44, s, [45, 24], 46, s, [46, 4, 1], 49, 50, 50, 51, 51, 52, 53, 53, s, [54, 6], 55, 55]),
            rule: u([2, 1, 3, 2, 1, 4, 4, 2, 3, 4, s, [3, 16], 6, c, [18, 3], 1, 4, 3, 1, 2, c, [3, 3], 0, 2, 0, 1, 1, c, [3, 3], s, [1, 5], 3])
        }),
        performAction: function parser__PerformAction(yystate /* action[1] */, yysp, yyvstack) {
            /* this == yyval */
            var yy = this.yy;

            switch (yystate) {
                case 1:
                    /*! Production::    contextDeclList : contextDeclaration EOF */
                    return yyvstack[yysp - 1];
                    break;

                case 2:
                /*! Production::    contextDeclaration : classifierContextDecl */
                case 31:
                /*! Production::    oclExpression : literalExp */
                case 34:
                /*! Production::    type : pathName */
                case 38:
                /*! Production::    typeOptional : ":" type */
                case 42:
                /*! Production::    literalExp : primitiveLiteralExp */
                case 43:
                /*! Production::    simpleNameOptional : simpleName */
                case 51:
                    /*! Production::    pathName : simpleName */
                    this.$ = yyvstack[yysp];
                    break;

                case 3:
                    /*! Production::    classifierContextDecl : context pathName invOrDefList */
                    this.$ = new Expression.ContextExpression(yyvstack[yysp - 1], yyvstack[yysp]);
                    break;

                case 4:
                    /*! Production::    invOrDefList : invOrDefList invOrDef */
                    this.$ = yyvstack[yysp - 1].concat(yyvstack[yysp]);
                    break;

                case 5:
                /*! Production::    invOrDefList : invOrDef */
                case 37:
                    /*! Production::    variableDeclarationList : variableDeclaration */
                    this.$ = [yyvstack[yysp]];
                    break;

                case 6:
                    /*! Production::    invOrDef : inv simpleNameOptional ":" oclExpression */
                    this.$ = new Expression.InvariantExpression(yyvstack[yysp], yyvstack[yysp - 2]);
                    break;

                case 7:
                /*! Production::    invOrDef : def simpleNameOptional ":" defExpression */
                case 32:
                /*! Production::    defExpression : let simpleName ":" oclExpression */
                case 33:
                    /*! Production::    defExpression : simpleName ":" oclExpression */
                    this.$ = new Expression.LetExpression(yyvstack[yysp - 2], yyvstack[yysp]);
                    break;

                case 8:
                    /*! Production::    oclExpression : pathName preOptional */
                    this.$ = new Expression.VariableExpression(yyvstack[yysp - 1]);
                    break;

                case 9:
                /*! Production::    oclExpression : "(" oclExpression ")" */
                case 35:
                    /*! Production::    variableDeclaration : simpleName typeOptional */
                    this.$ = yyvstack[yysp - 1];
                    break;

                case 10:
                    /*! Production::    oclExpression : oclExpression "." simpleName preOptional */
                    this.$ = yyvstack[yysp - 3] instanceof Expression.VariableExpression ? new Expression.VariableExpression([yyvstack[yysp - 3].variable, yyvstack[yysp - 1]].join('.')) : yyvstack[yysp - 3];
                    break;

                case 11:
                /*! Production::    oclExpression : oclExpression "+" oclExpression */
                case 12:
                    /*! Production::    oclExpression : oclExpression "-" oclExpression */
                    this.$ = new Expression.AdditionExpression(yyvstack[yysp - 2], yyvstack[yysp]);
                    break;

                case 13:
                    /*! Production::    oclExpression : oclExpression "*" oclExpression */
                    this.$ = new Expression.MultiplyExpression(yyvstack[yysp - 2], yyvstack[yysp]);
                    break;

                case 14:
                /*! Production::    oclExpression : oclExpression "/" oclExpression */
                case 16:
                    /*! Production::    oclExpression : oclExpression div oclExpression */
                    this.$ = new Expression.DivideExpression(yyvstack[yysp - 2], yyvstack[yysp]);
                    break;

                case 15:
                    /*! Production::    oclExpression : oclExpression mod oclExpression */
                    this.$ = new Expression.ModuloExpression(yyvstack[yysp - 2], yyvstack[yysp]);
                    break;

                case 17:
                    /*! Production::    oclExpression : oclExpression "<" oclExpression */
                    this.$ = new Expression.OperationCallExpression('<', yyvstack[yysp - 2], yyvstack[yysp]);
                    break;

                case 18:
                    /*! Production::    oclExpression : oclExpression "<=" oclExpression */
                    this.$ = new Expression.OperationCallExpression('<=', yyvstack[yysp - 2], yyvstack[yysp]);
                    break;

                case 19:
                    /*! Production::    oclExpression : oclExpression "=" oclExpression */
                    this.$ = new Expression.OperationCallExpression('=', yyvstack[yysp - 2], yyvstack[yysp]);
                    break;

                case 20:
                    /*! Production::    oclExpression : oclExpression ">=" oclExpression */
                    this.$ = new Expression.OperationCallExpression('>=', yyvstack[yysp - 2], yyvstack[yysp]);
                    break;

                case 21:
                    /*! Production::    oclExpression : oclExpression ">" oclExpression */
                    this.$ = new Expression.OperationCallExpression('>', yyvstack[yysp - 2], yyvstack[yysp]);
                    break;

                case 22:
                    /*! Production::    oclExpression : oclExpression "<>" oclExpression */
                    this.$ = new Expression.OperationCallExpression('<>', yyvstack[yysp - 2], yyvstack[yysp]);
                    break;

                case 23:
                    /*! Production::    oclExpression : oclExpression and oclExpression */
                    this.$ = new Expression.AndExpression(yyvstack[yysp - 2], yyvstack[yysp]);
                    break;

                case 24:
                    /*! Production::    oclExpression : oclExpression or oclExpression */
                    this.$ = new Expression.OrExpression(yyvstack[yysp - 2], yyvstack[yysp]);
                    break;

                case 25:
                    /*! Production::    oclExpression : oclExpression xor oclExpression */
                    this.$ = new Expression.XorExpression(yyvstack[yysp - 2], yyvstack[yysp]);
                    break;

                case 26:
                    /*! Production::    oclExpression : oclExpression "->" simpleName */
                    this.$ = functionCallExpression(yyvstack[yysp], this.$);
                    break;

                case 27:
                    /*! Production::    oclExpression : oclExpression "(" variableDeclarationList "|" oclExpression ")" */
                    yyvstack[yysp - 5].body = yyvstack[yysp - 1];yyvstack[yysp - 5].iterators = yyvstack[yysp - 3];this.$ = yyvstack[yysp - 5];
                    break;

                case 28:
                    /*! Production::    oclExpression : oclExpression "(" oclExpression ")" */
                    yyvstack[yysp - 3].body = yyvstack[yysp - 1];this.$ = yyvstack[yysp - 3];
                    break;

                case 29:
                    /*! Production::    oclExpression : oclExpression "(" ")" */

                    break;

                case 30:
                    /*! Production::    oclExpression : oclExpression implies oclExpression */
                    this.$ = new Expression.ImpliesExpression(yyvstack[yysp - 2], yyvstack[yysp]);
                    break;

                case 36:
                    /*! Production::    variableDeclarationList : variableDeclarationList "," variableDeclaration */
                    this.$ = [].concat(yyvstack[yysp - 2]).concat(yyvstack[yysp]);
                    break;

                case 45:
                /*! Production::    primitiveLiteralExp : integer */
                case 46:
                    /*! Production::    primitiveLiteralExp : real */
                    this.$ = new Expression.NumberExpression(yyvstack[yysp]);
                    break;

                case 47:
                    /*! Production::    primitiveLiteralExp : string */
                    this.$ = new Expression.StringExpression(yyvstack[yysp]);
                    break;

                case 48:
                    /*! Production::    primitiveLiteralExp : true */
                    this.$ = new Expression.BooleanExpression(true);
                    break;

                case 49:
                    /*! Production::    primitiveLiteralExp : false */
                    this.$ = new Expression.BooleanExpression(false);
                    break;

                case 50:
                    /*! Production::    primitiveLiteralExp : nil */
                    this.$ = new Expression.NilExpression();
                    break;

                case 52:
                    /*! Production::    pathName : pathName "::" simpleName */
                    this.$ = yyvstack[yysp - 2];
                    break;

            }
        },
        table: bt({
            len: u([4, 1, 1, 0, 2, 0, 5, 0, 4, 1, 0, 3, 3, 0, 0, 1, 0, 1, 12, 3, 22, 26, 12, s, [0, 9], s, [1, 3], s, [12, 15], 1, 15, 12, 0, 1, 20, 1, 12, 25, s, [23, 15], 0, 2, 20, 0, 0, 26, 23, 0, 0, 12, 22, 0, 12, 2, 0, 0, 3, 22, 20, 0, 4, 0, 3, 0]),
            symbol: u([17, 40, 41, 42, 1, 1, 20, 55, 18, 19, 39, 43, 44, 1, 18, 19, 44, 20, 3, 20, 53, c, [3, 4], 3, 4, 20, s, [33, 6, 1], 45, 52, 54, 55, 20, 31, 46, 1, 4, s, [6, 8, 1], 18, 19, s, [21, 10, 1], 1, s, [4, 10, 1], 16, c, [24, 12], 39, 51, c, [63, 13], 3, 20, c, [15, 12], c, [12, 168], 20, 4, 5, c, [14, 8], 48, 49, c, [28, 15], 32, c, [249, 10], c, [246, 10], c, [308, 13], c, [283, 24], 51, c, [25, 11], c, [331, 23], c, [23, 311], 14, 15, c, [405, 22], s, [5, 12, 1], c, [675, 11], 50, c, [71, 23], c, [453, 14], c, [34, 32], 20, 48, 20, 47, c, [39, 24], c, [142, 20], 14, 15, 50, 14, 15, 39]),
            type: u([2, s, [0, 3], 1, 2, 2, 0, s, [2, 3], 0, c, [5, 5], c, [4, 6], c, [7, 4], s, [2, 7], s, [0, 4], c, [17, 13], s, [2, 37], c, [48, 9], c, [63, 6], c, [78, 15], c, [12, 174], c, [14, 6], c, [28, 24], c, [254, 21], c, [34, 27], c, [330, 48], s, [2, 345], c, [393, 32], c, [487, 39], 0, c, [825, 6], c, [120, 46]]),
            state: u([1, 2, 3, 6, 8, 10, 13, 15, 17, 20, 23, 24, 21, 31, 53, 55, c, [6, 3], 59, c, [4, 3], 60, c, [4, 3], 61, c, [4, 3], 62, c, [4, 3], 63, c, [4, 3], 64, c, [4, 3], 65, c, [4, 3], 66, c, [4, 3], 67, c, [4, 3], 68, c, [4, 3], 69, c, [4, 3], 70, c, [4, 3], 71, c, [4, 3], 72, c, [4, 3], 73, c, [4, 3], 76, 78, 75, c, [6, 3], 80, c, [4, 3], 84, c, [4, 3], 85, 89, 91, c, [6, 3], 92, c, [4, 3], 93, 95, 96, 89]),
            mode: u([s, [1, 6], 2, c, [4, 5], c, [6, 4], s, [1, 10], c, [14, 10], 2, c, [25, 11], s, [2, 11], c, [12, 12], c, [59, 14], s, [1, 167], c, [204, 24], c, [266, 4], c, [210, 7], c, [7, 9], c, [18, 5], c, [23, 27], c, [18, 5], c, [23, 39], c, [343, 20], c, [23, 26], c, [92, 46], c, [23, 92], c, [161, 14], c, [23, 51], c, [392, 34], s, [2, 14], c, [70, 30], c, [673, 22], c, [705, 32], c, [130, 25], 1]),
            goto: u([4, 5, 7, 11, 12, 9, 3, 11, 12, 14, 44, 16, 44, 16, 18, 19, 22, 7, s, [25, 6, 1], 33, 32, 6, 51, s, [34, 5, 1], 41, 43, 45, 6, 6, 39, s, [40, 4, 2], s, [47, 4, 1], 52, s, [41, 11], 54, s, [41, 12], 9, c, [57, 8], 56, 57, 58, c, [11, 8], c, [8, 112], 74, 22, 77, 79, c, [18, 14], 81, 51, 82, c, [197, 8], c, [195, 10], 83, c, [30, 8], c, [204, 24], 11, 51, 11, 34, 11, 11, c, [54, 5], 11, 11, c, [56, 5], s, [11, 3], 50, 11, 12, 51, 12, 34, 12, 12, c, [23, 5], 12, 12, c, [23, 5], s, [12, 3], 50, 12, 13, 51, 13, 34, s, [13, 4], c, [23, 3], 13, 13, c, [23, 5], s, [13, 3], 50, 13, 14, 51, 14, 34, s, [14, 4], c, [23, 3], 14, 14, c, [23, 5], s, [14, 3], 50, 14, 15, 51, 15, c, [146, 8], 15, 15, c, [148, 10], 16, 51, 16, c, [23, 8], 16, 16, c, [23, 10], 17, 51, 17, 34, s, [17, 4], c, [23, 3], 17, 17, c, [23, 5], s, [17, 3], 50, 17, 18, 51, 18, 34, s, [18, 4], c, [23, 3], 18, 18, c, [23, 5], s, [18, 3], 50, 18, 19, 51, 19, 34, s, [19, 4], c, [23, 3], 19, 19, c, [23, 5], s, [19, 3], 50, 19, 20, 51, 20, 34, s, [20, 4], c, [23, 3], 20, 20, c, [23, 5], s, [20, 3], 50, 20, 21, 51, 21, 34, s, [21, 4], c, [23, 3], 21, 21, c, [23, 5], s, [21, 3], 50, 21, 22, 51, 22, 34, s, [22, 4], c, [23, 3], 22, 22, c, [23, 5], s, [22, 3], 50, 22, 23, 51, 23, c, [161, 8], 23, 23, c, [23, 5], s, [23, 3], 50, 23, 24, 51, 24, c, [23, 8], 24, 24, c, [23, 5], s, [24, 3], 50, 24, 25, 51, 25, c, [23, 8], 25, 25, c, [23, 5], s, [25, 3], 50, 25, 86, 87, 51, 88, c, [400, 18], 90, s, [51, 10], 39, 39, s, [51, 12], 30, 51, 30, c, [46, 8], 30, 30, c, [48, 5], s, [30, 3], 50, c, [477, 9], 33, c, [673, 9], 33, 33, c, [78, 10], c, [30, 8], 94, 7, 32, c, [32, 9], 32, 32, c, [32, 10], 51, 97, c, [130, 19], 39, 39, 34, 34, 9])
        }),
        defaultActions: bda({
            idx: u([3, 5, 7, 10, 13, 14, 16, s, [23, 9, 1], 53, 74, 77, 78, 81, 82, 85, 88, 89, 93, 95, 97]),
            goto: u([2, 1, 51, 5, 4, 52, 43, 31, 42, s, [45, 6, 1], 7, 8, 26, 29, 37, 40, 9, 10, 28, 35, 36, 38, 27])
        }),
        parseError: function parseError(str, hash, ExceptionClass) {
            if (hash.recoverable) {
                this.trace(str);
                hash.destroy(); // destroy... well, *almost*!
            } else {
                throw new ExceptionClass(str, hash);
            }
        },
        parse: function parse(input) {
            var self = this,
                stack = new Array(128),
                // token stack: stores token which leads to state at the same index (column storage)
            sstack = new Array(128),
                // state stack: stores states (column storage)

            vstack = new Array(128),
                // semantic value stack

            table = this.table,
                sp = 0; // 'stack pointer': index into the stacks

            var TERROR = this.TERROR,
                EOF = this.EOF,
                ERROR_RECOVERY_TOKEN_DISCARD_COUNT = this.options.errorRecoveryTokenDiscardCount | 0 || 3;
            var NO_ACTION = [0, table.length /* ensures that anyone using this new state will fail dramatically! */];

            //this.reductionCount = this.shiftCount = 0;

            var lexer;
            if (this.__lexer__) {
                lexer = this.__lexer__;
            } else {
                lexer = this.__lexer__ = Object.create(this.lexer);
            }

            var sharedState_yy = {
                parseError: null,
                quoteName: null,
                lexer: null,
                parser: null,
                pre_parse: null,
                post_parse: null
            };
            // copy state
            for (var k in this.yy) {
                if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
                    sharedState_yy[k] = this.yy[k];
                }
            }

            sharedState_yy.lexer = lexer;
            sharedState_yy.parser = this;

            lexer.setInput(input, sharedState_yy);

            vstack[sp] = null;
            sstack[sp] = 0;
            stack[sp] = 0;
            ++sp;

            // Does the shared state override the default `parseError` that already comes with this instance?
            if (typeof sharedState_yy.parseError === 'function') {
                this.parseError = function parseErrorAlt(str, hash, ExceptionClass) {
                    return sharedState_yy.parseError(str, hash, ExceptionClass);
                };
            } else {
                this.parseError = this.originalParseError;
            }

            // Does the shared state override the default `quoteName` that already comes with this instance?
            if (typeof sharedState_yy.quoteName === 'function') {
                this.quoteName = sharedState_yy.quoteName;
            } else {
                this.quoteName = this.originalQuoteName;
            }

            // set up the cleanup function; make it an API so that external code can re-use this one in case of
            // calamities or when the `%options no-try-catch` option has been specified for the grammar, in which
            // case this parse() API method doesn't come with a `finally { ... }` block any more!
            //
            // NOTE: as this API uses parse() as a closure, it MUST be set again on every parse() invocation,
            //       or else your `sharedState`, etc. references will be *wrong*!
            this.cleanupAfterParse = function parser_cleanupAfterParse(resultValue, invoke_post_methods, do_not_nuke_errorinfos) {
                var rv;

                if (invoke_post_methods) {
                    if (sharedState_yy.post_parse) {
                        rv = sharedState_yy.post_parse.call(this, sharedState_yy, resultValue);
                        if (typeof rv !== 'undefined') resultValue = rv;
                    }
                    if (this.post_parse) {
                        rv = this.post_parse.call(this, sharedState_yy, resultValue);
                        if (typeof rv !== 'undefined') resultValue = rv;
                    }
                }

                if (this.__reentrant_call_depth > 1) return resultValue; // do not (yet) kill the sharedState when this is a reentrant run.

                // clean up the lingering lexer structures as well:
                if (lexer.cleanupAfterLex) {
                    lexer.cleanupAfterLex(do_not_nuke_errorinfos);
                }

                // prevent lingering circular references from causing memory leaks:
                if (sharedState_yy) {
                    sharedState_yy.parseError = undefined;
                    sharedState_yy.quoteName = undefined;
                    sharedState_yy.lexer = undefined;
                    sharedState_yy.parser = undefined;
                    if (lexer.yy === sharedState_yy) {
                        lexer.yy = undefined;
                    }
                }
                sharedState_yy = undefined;
                this.parseError = this.originalParseError;
                this.quoteName = this.originalQuoteName;

                // nuke the vstack[] array at least as that one will still reference obsoleted user values.
                // To be safe, we nuke the other internal stack columns as well...
                stack.length = 0; // fastest way to nuke an array without overly bothering the GC
                sstack.length = 0;

                vstack.length = 0;
                sp = 0;

                // nuke the error hash info instances created during this run.
                // Userland code must COPY any data/references
                // in the error hash instance(s) it is more permanently interested in.
                if (!do_not_nuke_errorinfos) {
                    for (var i = this.__error_infos.length - 1; i >= 0; i--) {
                        var el = this.__error_infos[i];
                        if (el && typeof el.destroy === 'function') {
                            el.destroy();
                        }
                    }
                    this.__error_infos.length = 0;
                }

                return resultValue;
            };

            // NOTE: as this API uses parse() as a closure, it MUST be set again on every parse() invocation,
            //       or else your `lexer`, `sharedState`, etc. references will be *wrong*!
            this.constructParseErrorInfo = function parser_constructParseErrorInfo(msg, ex, expected, recoverable) {
                var pei = {
                    errStr: msg,
                    exception: ex,
                    text: lexer.match,
                    value: lexer.yytext,
                    token: this.describeSymbol(symbol) || symbol,
                    token_id: symbol,
                    line: lexer.yylineno,

                    expected: expected,
                    recoverable: recoverable,
                    state: state,
                    action: action,
                    new_state: newState,
                    symbol_stack: stack,
                    state_stack: sstack,
                    value_stack: vstack,

                    stack_pointer: sp,
                    yy: sharedState_yy,
                    lexer: lexer,
                    parser: this,

                    // and make sure the error info doesn't stay due to potential
                    // ref cycle via userland code manipulations.
                    // These would otherwise all be memory leak opportunities!
                    //
                    // Note that only array and object references are nuked as those
                    // constitute the set of elements which can produce a cyclic ref.
                    // The rest of the members is kept intact as they are harmless.
                    destroy: function destructParseErrorInfo() {
                        // remove cyclic references added to error info:
                        // info.yy = null;
                        // info.lexer = null;
                        // info.value = null;
                        // info.value_stack = null;
                        // ...
                        var rec = !!this.recoverable;
                        for (var key in this) {
                            if (this.hasOwnProperty(key) && (typeof key === 'undefined' ? 'undefined' : _typeof(key)) === 'object') {
                                this[key] = undefined;
                            }
                        }
                        this.recoverable = rec;
                    }
                };
                // track this instance so we can `destroy()` it once we deem it superfluous and ready for garbage collection!
                this.__error_infos.push(pei);
                return pei;
            };

            function lex() {
                var token = lexer.lex();
                // if token isn't its numeric value, convert
                if (typeof token !== 'number') {
                    token = self.symbols_[token] || token;
                }
                return token || EOF;
            }

            var symbol = 0;

            var state, action, r, t;
            var yyval = {
                $: true,
                _$: undefined,
                yy: sharedState_yy
            };
            var p, len, this_production;

            var newState;
            var retval = false;

            try {
                this.__reentrant_call_depth++;

                if (this.pre_parse) {
                    this.pre_parse.call(this, sharedState_yy);
                }
                if (sharedState_yy.pre_parse) {
                    sharedState_yy.pre_parse.call(this, sharedState_yy);
                }

                newState = sstack[sp - 1];
                for (;;) {
                    // retrieve state number from top of stack
                    state = newState; // sstack[sp - 1];

                    // use default actions if available
                    if (this.defaultActions[state]) {
                        action = 2;
                        newState = this.defaultActions[state];
                    } else {
                        // The single `==` condition below covers both these `===` comparisons in a single
                        // operation:
                        //
                        //     if (symbol === null || typeof symbol === 'undefined') ...
                        if (!symbol) {
                            symbol = lex();
                        }
                        // read action for current state and first input
                        t = table[state] && table[state][symbol] || NO_ACTION;
                        newState = t[1];
                        action = t[0];

                        // handle parse error
                        if (!action) {
                            var errStr;
                            var errSymbolDescr = this.describeSymbol(symbol) || symbol;
                            var expected = this.collect_expected_token_set(state);

                            // Report error
                            if (typeof lexer.yylineno === 'number') {
                                errStr = 'Parse error on line ' + (lexer.yylineno + 1) + ': ';
                            } else {
                                errStr = 'Parse error: ';
                            }
                            if (lexer.showPosition) {
                                errStr += '\n' + lexer.showPosition(79 - 10, 10) + '\n';
                            }
                            if (expected.length) {
                                errStr += 'Expecting ' + expected.join(', ') + ', got unexpected ' + errSymbolDescr;
                            } else {
                                errStr += 'Unexpected ' + errSymbolDescr;
                            }
                            // we cannot recover from the error!
                            p = this.constructParseErrorInfo(errStr, null, expected, false);
                            retval = this.parseError(p.errStr, p, this.JisonParserError);
                            break;
                        }
                    }

                    switch (action) {
                        // catch misc. parse failures:
                        default:
                            // this shouldn't happen, unless resolve defaults are off
                            if (action instanceof Array) {
                                p = this.constructParseErrorInfo('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol, null, null, false);
                                retval = this.parseError(p.errStr, p, this.JisonParserError);
                                break;
                            }
                            // Another case of better safe than sorry: in case state transitions come out of another error recovery process
                            // or a buggy LUT (LookUp Table):
                            p = this.constructParseErrorInfo('Parsing halted. No viable error recovery approach available due to internal system failure.', null, null, false);
                            retval = this.parseError(p.errStr, p, this.JisonParserError);
                            break;

                        // shift:
                        case 1:
                            //this.shiftCount++;
                            stack[sp] = symbol;
                            vstack[sp] = lexer.yytext;

                            sstack[sp] = newState; // push state
                            ++sp;
                            symbol = 0;

                            // Pick up the lexer details for the current symbol as that one is not 'look-ahead' any more:


                            continue;

                        // reduce:
                        case 2:
                            //this.reductionCount++;
                            this_production = this.productions_[newState - 1]; // `this.productions_[]` is zero-based indexed while states start from 1 upwards...
                            len = this_production[1];

                            // Make sure subsequent `$$ = $1` default action doesn't fail
                            // for rules where len==0 as then there's no $1 (you're reducing an epsilon rule then!)
                            //
                            // Also do this to prevent nasty action block codes to *read* `$0` or `$$`
                            // and *not* get `undefined` as a result for their efforts!
                            vstack[sp] = undefined;

                            // perform semantic action
                            yyval.$ = vstack[sp - len]; // default to $$ = $1; result must produce `undefined` when len == 0, as then there's no $1


                            r = this.performAction.call(yyval, newState, sp - 1, vstack);

                            if (typeof r !== 'undefined') {
                                retval = r;
                                break;
                            }

                            // pop off stack
                            sp -= len;

                            // don't overwrite the `symbol` variable: use a local var to speed things up:
                            var ntsymbol = this_production[0]; // push nonterminal (reduce)
                            stack[sp] = ntsymbol;
                            vstack[sp] = yyval.$;

                            // goto new state = table[STATE][NONTERMINAL]
                            newState = table[sstack[sp - 1]][ntsymbol];
                            sstack[sp] = newState;
                            ++sp;

                            continue;

                        // accept:
                        case 3:
                            retval = true;
                            // Return the `$accept` rule's `$$` result, if available.
                            //
                            // Also note that JISON always adds this top-most `$accept` rule (with implicit,
                            // default, action):
                            //
                            //     $accept: <startSymbol> $end
                            //                  %{ $$ = $1; @$ = @1; %}
                            //
                            // which, combined with the parse kernel's `$accept` state behaviour coded below,
                            // will produce the `$$` value output of the <startSymbol> rule as the parse result,
                            // IFF that result is *not* `undefined`. (See also the parser kernel code.)
                            //
                            // In code:
                            //
                            //                  %{
                            //                      @$ = @1;            // if location tracking support is included
                            //                      if (typeof $1 !== 'undefined')
                            //                          return $1;
                            //                      else
                            //                          return true;           // the default parse result if the rule actions don't produce anything
                            //                  %}
                            if (typeof yyval.$ !== 'undefined') {
                                retval = yyval.$;
                            }
                            break;
                    }

                    // break out of loop: we accept or fail with error
                    break;
                }
            } catch (ex) {
                // report exceptions through the parseError callback too:
                p = this.constructParseErrorInfo('Parsing aborted due to exception.', ex, null, false);
                retval = this.parseError(p.errStr, p, this.JisonParserError);
            } finally {
                retval = this.cleanupAfterParse(retval, true, true);
                this.__reentrant_call_depth--;
            }

            return retval;
        }
    };
    parser.originalParseError = parser.parseError;
    parser.originalQuoteName = parser.quoteName;

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

        throw new Error('No function call expression found for \'' + fn + '\' not found!');
    }
    /* lexer generated by jison-lex 0.3.4-166 */
    /*
     * Returns a Lexer object of the following structure:
     *
     *  Lexer: {
     *    yy: {}     The so-called "shared state" or rather the *source* of it;
     *               the real "shared state" `yy` passed around to
     *               the rule actions, etc. is a derivative/copy of this one,
     *               not a direct reference!
     *  }
     *
     *  Lexer.prototype: {
     *    yy: {},
     *    EOF: 1,
     *    ERROR: 2,
     *
     *    JisonLexerError: function(msg, hash),
     *
     *    performAction: function lexer__performAction(yy, yy_, $avoiding_name_collisions, YY_START, ...),
     *               where `...` denotes the (optional) additional arguments the user passed to
     *               `lexer.lex(...)` and specified by way of `%parse-param ...` in the **parser** grammar file
     *
     *               The function parameters and `this` have the following value/meaning:
     *               - `this`    : reference to the `lexer` instance.
     *
     *               - `yy`      : a reference to the `yy` "shared state" object which was passed to the lexer
     *                             by way of the `lexer.setInput(str, yy)` API before.
     *
     *               - `yy_`     : lexer instance reference used internally.
     *
     *               - `$avoiding_name_collisions`   : index of the matched lexer rule (regex), used internally.
     *
     *               - `YY_START`: the current lexer "start condition" state.
     *
     *               - `...`     : the extra arguments you specified in the `%parse-param` statement in your
     *                             **parser** grammar definition file and which are passed to the lexer via
     *                             its `lexer.lex(...)` API.
     *
     *    parseError: function(str, hash, ExceptionClass),
     *
     *    constructLexErrorInfo: function(error_message, is_recoverable),
     *               Helper function.
     *               Produces a new errorInfo 'hash object' which can be passed into `parseError()`.
     *               See it's use in this lexer kernel in many places; example usage:
     *
     *                   var infoObj = lexer.constructParseErrorInfo('fail!', true);
     *                   var retVal = lexer.parseError(infoObj.errStr, infoObj, lexer.JisonLexerError);
     *
     *    options: { ... lexer %options ... },
     *
     *    lex: function([args...]),
     *               Produce one token of lexed input, which was passed in earlier via the `lexer.setInput()` API.
     *               You MAY use the additional `args...` parameters as per `%parse-param` spec of the **parser** grammar:
     *               these extra `args...` are passed verbatim to the lexer rules' action code.
     *
     *    cleanupAfterLex: function(do_not_nuke_errorinfos),
     *               Helper function.
     *               This helper API is invoked when the parse process has completed. This helper may
     *               be invoked by user code to ensure the internal lexer gets properly garbage collected.
     *
     *        setInput: function(input, [yy]),
     *        input: function(),
     *        unput: function(str),
     *        more: function(),
     *        reject: function(),
     *        less: function(n),
     *        pastInput: function(n),
     *        upcomingInput: function(n),
     *        showPosition: function(),
     *        test_match: function(regex_match_array, rule_index),
     *        next: function(...),
     *        lex: function(...),
     *        begin: function(condition),
     *        pushState: function(condition),
     *        popState: function(),
     *        topState: function(),
     *        _currentRules: function(),
     *        stateStackSize: function(),
     *
     *        options: { ... lexer %options ... },
     *
     *        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START, ...),
     *        rules: [...],
     *        conditions: {associative list: name ==> set},
     *  }
     *
     *
     *  token location info (`yylloc`): {
     *    first_line: n,
     *    last_line: n,
     *    first_column: n,
     *    last_column: n,
     *    range: [start_number, end_number]
     *               (where the numbers are indexes into the input string, zero-based)
     *  }
     *
     * ---
     *
     * The `parseError` function receives a 'hash' object with these members for lexer errors:
     *
     *  {
     *    text:        (matched text)
     *    token:       (the produced terminal token, if any)
     *    token_id:    (the produced terminal token numeric ID, if any)
     *    line:        (yylineno)
     *    loc:         (yylloc)
     *    recoverable: (boolean: TRUE when the parser MAY have an error recovery rule
     *                  available for this particular error)
     *    yy:          (object: the current parser internal "shared state" `yy`
     *                  as is also available in the rule actions; this can be used,
     *                  for instance, for advanced error analysis and reporting)
     *    lexer:       (reference to the current lexer instance used by the parser)
     *  }
     *
     * while `this` will reference the current lexer instance.
     *
     * When `parseError` is invoked by the lexer, the default implementation will
     * attempt to invoke `yy.parser.parseError()`; when this callback is not provided
     * it will try to invoke `yy.parseError()` instead. When that callback is also not
     * provided, a `JisonLexerError` exception will be thrown containing the error
     * message and `hash`, as constructed by the `constructLexErrorInfo()` API.
     *
     * Note that the lexer's `JisonLexerError` error class is passed via the
     * `ExceptionClass` argument, which is invoked to construct the exception
     * instance to be thrown, so technically `parseError` will throw the object
     * produced by the `new ExceptionClass(str, hash)` JavaScript expression.
     *
     * ---
     *
     * You can specify lexer options by setting / modifying the `.options` object of your Lexer instance.
     * These options are available:
     *
     * (Options are permanent.)
     *  
     *  yy: {
     *      parseError: function(str, hash, ExceptionClass)
     *                 optional: overrides the default `parseError` function.
     *  }
     *
     *  lexer.options: {
     *      pre_lex:  function()
     *                 optional: is invoked before the lexer is invoked to produce another token.
     *                 `this` refers to the Lexer object.
     *      post_lex: function(token) { return token; }
     *                 optional: is invoked when the lexer has produced a token `token`;
     *                 this function can override the returned token value by returning another.
     *                 When it does not return any (truthy) value, the lexer will return
     *                 the original `token`.
     *                 `this` refers to the Lexer object.
     *
     * WARNING: the next set of options are not meant to be changed. They echo the abilities of
     * the lexer as per when it was compiled!
     *
     *      ranges: boolean
     *                 optional: `true` ==> token location info will include a .range[] member.
     *      flex: boolean
     *                 optional: `true` ==> flex-like lexing behaviour where the rules are tested
     *                 exhaustively to find the longest match.
     *      backtrack_lexer: boolean
     *                 optional: `true` ==> lexer regexes are tested in order and for invoked;
     *                 the lexer terminates the scan when a token is returned by the action code.
     *      xregexp: boolean
     *                 optional: `true` ==> lexer rule regexes are "extended regex format" requiring the
     *                 `XRegExp` library. When this %option has not been specified at compile time, all lexer
     *                 rule regexes have been written as standard JavaScript RegExp expressions.
     *  }
     */

    var lexer = function () {
        // See also:
        // http://stackoverflow.com/questions/1382107/whats-a-good-way-to-extend-error-in-javascript/#35881508
        // but we keep the prototype.constructor and prototype.name assignment lines too for compatibility
        // with userland code which might access the derived class in a 'classic' way.
        function JisonLexerError(msg, hash) {
            Object.defineProperty(this, 'name', {
                enumerable: false,
                writable: false,
                value: 'JisonLexerError'
            });

            if (msg == null) msg = '???';

            Object.defineProperty(this, 'message', {
                enumerable: false,
                writable: true,
                value: msg
            });

            this.hash = hash;

            var stacktrace;
            if (hash && hash.exception instanceof Error) {
                var ex2 = hash.exception;
                this.message = ex2.message || msg;
                stacktrace = ex2.stack;
            }
            if (!stacktrace) {
                if (Error.hasOwnProperty('captureStackTrace')) {
                    // V8
                    Error.captureStackTrace(this, this.constructor);
                } else {
                    stacktrace = new Error(msg).stack;
                }
            }
            if (stacktrace) {
                Object.defineProperty(this, 'stack', {
                    enumerable: false,
                    writable: false,
                    value: stacktrace
                });
            }
        }

        if (typeof Object.setPrototypeOf === 'function') {
            Object.setPrototypeOf(JisonLexerError.prototype, Error.prototype);
        } else {
            JisonLexerError.prototype = Object.create(Error.prototype);
        }
        JisonLexerError.prototype.constructor = JisonLexerError;
        JisonLexerError.prototype.name = 'JisonLexerError';

        var lexer = {
            // Code Generator Information Report
            // ---------------------------------
            //
            // Options:
            //   backtracking:        false
            //   location.ranges:     undefined
            //
            // Forwarded Parser Analysis flags:
            //   uses yyleng:         false
            //   uses yylineno:       false
            //   uses yytext:         false
            //   uses yylloc:         false
            //   uses lexer values:   true / true
            //   location tracking:   false
            //   location assignment: false
            //
            // --------- END OF REPORT -----------


            EOF: 1,
            ERROR: 2,

            // JisonLexerError: JisonLexerError,        // <-- injected by the code generator

            // options: {},                             // <-- injected by the code generator

            // yy: ...,                                 // <-- injected by setInput()

            __currentRuleSet__: null, // <-- internal rule set cache for the current lexer state

            __error_infos: [], // INTERNAL USE ONLY: the set of lexErrorInfo objects created since the last cleanup

            __decompressed: false, // INTERNAL USE ONLY: mark whether the lexer instance has been 'unfolded' completely and is now ready for use

            done: false, // INTERNAL USE ONLY
            _backtrack: false, // INTERNAL USE ONLY
            _input: '', // INTERNAL USE ONLY
            _more: false, // INTERNAL USE ONLY
            _signaled_error_token: false, // INTERNAL USE ONLY

            conditionStack: [], // INTERNAL USE ONLY; managed via `pushState()`, `popState()`, `topState()` and `stateStackSize()`

            match: '', // READ-ONLY EXTERNAL ACCESS - ADVANCED USE ONLY: tracks input which has been matched so far for the lexer token under construction. `match` is identical to `yytext` except that this one still contains the matched input string after `lexer.performAction()` has been invoked, where userland code MAY have changed/replaced the `yytext` value entirely!
            matched: '', // READ-ONLY EXTERNAL ACCESS - ADVANCED USE ONLY: tracks entire input which has been matched so far
            matches: false, // READ-ONLY EXTERNAL ACCESS - ADVANCED USE ONLY: tracks RE match result for last (successful) match attempt
            yytext: '', // ADVANCED USE ONLY: tracks input which has been matched so far for the lexer token under construction; this value is transferred to the parser as the 'token value' when the parser consumes the lexer token produced through a call to the `lex()` API.
            offset: 0, // READ-ONLY EXTERNAL ACCESS - ADVANCED USE ONLY: tracks the 'cursor position' in the input string, i.e. the number of characters matched so far
            yyleng: 0, // READ-ONLY EXTERNAL ACCESS - ADVANCED USE ONLY: length of matched input for the token under construction (`yytext`)
            yylineno: 0, // READ-ONLY EXTERNAL ACCESS - ADVANCED USE ONLY: 'line number' at which the token under construction is located
            yylloc: null, // READ-ONLY EXTERNAL ACCESS - ADVANCED USE ONLY: tracks location info (lines + columns) for the token under construction

            // INTERNAL USE: construct a suitable error info hash object instance for `parseError`.
            /**
            @public 
            @this {RegExpLexer} 
            */
            constructLexErrorInfo: function lexer_constructLexErrorInfo(msg, recoverable) {
                /** @constructor */
                var pei = {
                    errStr: msg,
                    recoverable: !!recoverable,
                    text: this.match, // This one MAY be empty; userland code should use the `upcomingInput` API to obtain more text which follows the 'lexer cursor position'...
                    token: null,
                    line: this.yylineno,
                    loc: this.yylloc,
                    yy: this.yy,
                    lexer: this,

                    // and make sure the error info doesn't stay due to potential
                    // ref cycle via userland code manipulations.
                    // These would otherwise all be memory leak opportunities!
                    //
                    // Note that only array and object references are nuked as those
                    // constitute the set of elements which can produce a cyclic ref.
                    // The rest of the members is kept intact as they are harmless.
                    /** 
                    @public 
                    @this {LexErrorInfo} 
                    */
                    destroy: function destructLexErrorInfo() {
                        // remove cyclic references added to error info:
                        // info.yy = null;
                        // info.lexer = null;
                        // ...
                        var rec = !!this.recoverable;
                        for (var key in this) {
                            if (this.hasOwnProperty(key) && (typeof key === 'undefined' ? 'undefined' : _typeof(key)) === 'object') {
                                this[key] = undefined;
                            }
                        }
                        this.recoverable = rec;
                    }
                };
                // track this instance so we can `destroy()` it once we deem it superfluous and ready for garbage collection!
                this.__error_infos.push(pei);
                return pei;
            },

            /** 
            @public 
            @this {RegExpLexer} 
            */
            parseError: function lexer_parseError(str, hash, ExceptionClass) {
                if (this.yy.parser && typeof this.yy.parser.parseError === 'function') {
                    return this.yy.parser.parseError(str, hash, ExceptionClass) || this.ERROR;
                } else if (typeof this.yy.parseError === 'function') {
                    return this.yy.parseError(str, hash, ExceptionClass) || this.ERROR;
                } else {
                    throw new ExceptionClass(str, hash);
                }
            },

            // final cleanup function for when we have completed lexing the input;
            // make it an API so that external code can use this one once userland
            // code has decided it's time to destroy any lingering lexer error
            // hash object instances and the like: this function helps to clean
            // up these constructs, which *may* carry cyclic references which would
            // otherwise prevent the instances from being properly and timely
            // garbage-collected, i.e. this function helps prevent memory leaks!
            /** 
            @public 
            @this {RegExpLexer} 
            */
            cleanupAfterLex: function lexer_cleanupAfterLex(do_not_nuke_errorinfos) {
                var rv;

                // prevent lingering circular references from causing memory leaks:
                this.setInput('', {});

                // nuke the error hash info instances created during this run.
                // Userland code must COPY any data/references
                // in the error hash instance(s) it is more permanently interested in.
                if (!do_not_nuke_errorinfos) {
                    for (var i = this.__error_infos.length - 1; i >= 0; i--) {
                        var el = this.__error_infos[i];
                        if (el && typeof el.destroy === 'function') {
                            el.destroy();
                        }
                    }
                    this.__error_infos.length = 0;
                }

                return this;
            },

            // clear the lexer token context; intended for internal use only
            /** 
            @public 
            @this {RegExpLexer} 
            */
            clear: function lexer_clear() {
                this.yytext = '';
                this.yyleng = 0;
                this.match = '';
                this.matches = false;
                this._more = false;
                this._backtrack = false;
            },

            // resets the lexer, sets new input
            /** 
            @public 
            @this {RegExpLexer} 
            */
            setInput: function lexer_setInput(input, yy) {
                this.yy = yy || this.yy || {};

                // also check if we've fully initialized the lexer instance,
                // including expansion work to be done to go from a loaded
                // lexer to a usable lexer:
                if (!this.__decompressed) {
                    // step 1: decompress the regex list:
                    var rules = this.rules;
                    for (var i = 0, len = rules.length; i < len; i++) {
                        var rule_re = rules[i];

                        // compression: is the RE an xref to another RE slot in the rules[] table?
                        if (typeof rule_re === 'number') {
                            rules[i] = rules[rule_re];
                        }
                    }

                    // step 2: unfold the conditions[] set to make these ready for use:
                    var conditions = this.conditions;
                    for (var k in conditions) {
                        var spec = conditions[k];

                        var rule_ids = spec.rules;

                        var len = rule_ids.length;
                        var rule_regexes = new Array(len + 1); // slot 0 is unused; we use a 1-based index approach here to keep the hottest code in `lexer_next()` fast and simple!
                        var rule_new_ids = new Array(len + 1);

                        for (var i = 0; i < len; i++) {
                            var idx = rule_ids[i];
                            var rule_re = rules[idx];
                            rule_regexes[i + 1] = rule_re;
                            rule_new_ids[i + 1] = idx;
                        }

                        spec.rules = rule_new_ids;
                        spec.__rule_regexes = rule_regexes;
                        spec.__rule_count = len;
                    }

                    this.__decompressed = true;
                }

                this._input = input || '';
                this.clear();
                this._signaled_error_token = false;
                this.done = false;
                this.yylineno = 0;
                this.matched = '';
                this.conditionStack = ['INITIAL'];
                this.__currentRuleSet__ = null;
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
            /** 
            @public 
            @this {RegExpLexer} 
            */
            input: function lexer_input() {
                if (!this._input) {
                    //this.done = true;    -- don't set `done` as we want the lex()/next() API to be able to produce one custom EOF token match after this anyhow. (lexer can match special <<EOF>> tokens and perform user action code for a <<EOF>> match, but only does so *once*)
                    return null;
                }
                var ch = this._input[0];
                this.yytext += ch;
                this.yyleng++;
                this.offset++;
                this.match += ch;
                this.matched += ch;
                // Count the linenumber up when we hit the LF (or a stand-alone CR).
                // On CRLF, the linenumber is incremented when you fetch the CR or the CRLF combo
                // and we advance immediately past the LF as well, returning both together as if
                // it was all a single 'character' only.
                var slice_len = 1;
                var lines = false;
                if (ch === '\n') {
                    lines = true;
                } else if (ch === '\r') {
                    lines = true;
                    var ch2 = this._input[1];
                    if (ch2 === '\n') {
                        slice_len++;
                        ch += ch2;
                        this.yytext += ch2;
                        this.yyleng++;
                        this.offset++;
                        this.match += ch2;
                        this.matched += ch2;
                        if (this.options.ranges) {
                            this.yylloc.range[1]++;
                        }
                    }
                }
                if (lines) {
                    this.yylineno++;
                    this.yylloc.last_line++;
                } else {
                    this.yylloc.last_column++;
                }
                if (this.options.ranges) {
                    this.yylloc.range[1]++;
                }

                this._input = this._input.slice(slice_len);
                return ch;
            },

            // unshifts one char (or a string) into the input
            /** 
            @public 
            @this {RegExpLexer} 
            */
            unput: function lexer_unput(ch) {
                var len = ch.length;
                var lines = ch.split(/(?:\r\n?|\n)/g);

                this._input = ch + this._input;
                this.yytext = this.yytext.substr(0, this.yytext.length - len);
                //this.yyleng -= len;
                this.offset -= len;
                var oldLines = this.match.split(/(?:\r\n?|\n)/g);
                this.match = this.match.substr(0, this.match.length - len);
                this.matched = this.matched.substr(0, this.matched.length - len);

                if (lines.length - 1) {
                    this.yylineno -= lines.length - 1;
                }

                this.yylloc.last_line = this.yylineno + 1;
                this.yylloc.last_column = lines ? (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length : this.yylloc.first_column - len;

                if (this.options.ranges) {
                    this.yylloc.range[1] = this.yylloc.range[0] + this.yyleng - len;
                }
                this.yyleng = this.yytext.length;
                this.done = false;
                return this;
            },

            // When called from action, caches matched text and appends it on next action
            /** 
            @public 
            @this {RegExpLexer} 
            */
            more: function lexer_more() {
                this._more = true;
                return this;
            },

            // When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
            /** 
            @public 
            @this {RegExpLexer} 
            */
            reject: function lexer_reject() {
                if (this.options.backtrack_lexer) {
                    this._backtrack = true;
                } else {
                    // when the `parseError()` call returns, we MUST ensure that the error is registered.
                    // We accomplish this by signaling an 'error' token to be produced for the current
                    // `.lex()` run.
                    var p = this.constructLexErrorInfo('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), false);
                    this._signaled_error_token = this.parseError(p.errStr, p, this.JisonLexerError) || this.ERROR;
                }
                return this;
            },

            // retain first n characters of the match
            /** 
            @public 
            @this {RegExpLexer} 
            */
            less: function lexer_less(n) {
                return this.unput(this.match.slice(n));
            },

            // return (part of the) already matched input, i.e. for error messages.
            // Limit the returned string length to `maxSize` (default: 20).
            // Limit the returned string to the `maxLines` number of lines of input (default: 1).
            // Negative limit values equal *unlimited*.
            /** 
            @public 
            @this {RegExpLexer} 
            */
            pastInput: function lexer_pastInput(maxSize, maxLines) {
                var past = this.matched.substring(0, this.matched.length - this.match.length);
                if (maxSize < 0) maxSize = past.length;else if (!maxSize) maxSize = 20;
                if (maxLines < 0) maxLines = past.length; // can't ever have more input lines than this!
                else if (!maxLines) maxLines = 1;
                // `substr` anticipation: treat \r\n as a single character and take a little
                // more than necessary so that we can still properly check against maxSize
                // after we've transformed and limited the newLines in here:
                past = past.substr(-maxSize * 2 - 2);
                // now that we have a significantly reduced string to process, transform the newlines
                // and chop them, then limit them:
                var a = past.replace(/\r\n|\r/g, '\n').split('\n');
                a = a.slice(-maxLines);
                past = a.join('\n');
                // When, after limiting to maxLines, we still have too much to return,
                // do add an ellipsis prefix...
                if (past.length > maxSize) {
                    past = '...' + past.substr(-maxSize);
                }
                return past;
            },

            // return (part of the) upcoming input, i.e. for error messages.
            // Limit the returned string length to `maxSize` (default: 20).
            // Limit the returned string to the `maxLines` number of lines of input (default: 1).
            // Negative limit values equal *unlimited*.
            /** 
            @public 
            @this {RegExpLexer} 
            */
            upcomingInput: function lexer_upcomingInput(maxSize, maxLines) {
                var next = this.match;
                if (maxSize < 0) maxSize = next.length + this._input.length;else if (!maxSize) maxSize = 20;
                if (maxLines < 0) maxLines = maxSize; // can't ever have more input lines than this!
                else if (!maxLines) maxLines = 1;
                // `substring` anticipation: treat \r\n as a single character and take a little
                // more than necessary so that we can still properly check against maxSize
                // after we've transformed and limited the newLines in here:
                if (next.length < maxSize * 2 + 2) {
                    next += this._input.substring(0, maxSize * 2 + 2); // substring is faster on Chrome/V8
                }
                // now that we have a significantly reduced string to process, transform the newlines
                // and chop them, then limit them:
                var a = next.replace(/\r\n|\r/g, '\n').split('\n');
                a = a.slice(0, maxLines);
                next = a.join('\n');
                // When, after limiting to maxLines, we still have too much to return,
                // do add an ellipsis postfix...
                if (next.length > maxSize) {
                    next = next.substring(0, maxSize) + '...';
                }
                return next;
            },

            // return a string which displays the character position where the lexing error occurred, i.e. for error messages
            /** 
            @public 
            @this {RegExpLexer} 
            */
            showPosition: function lexer_showPosition(maxPrefix, maxPostfix) {
                var pre = this.pastInput(maxPrefix).replace(/\s/g, ' ');
                var c = new Array(pre.length + 1).join('-');
                return pre + this.upcomingInput(maxPostfix).replace(/\s/g, ' ') + '\n' + c + '^';
            },

            // helper function, used to produce a human readable description as a string, given
            // the input `yylloc` location object.
            // Set `display_range_too` to TRUE to include the string character index position(s)
            // in the description if the `yylloc.range` is available.
            /** 
            @public 
            @this {RegExpLexer} 
            */
            describeYYLLOC: function lexer_describe_yylloc(yylloc, display_range_too) {
                var l1 = yylloc.first_line;
                var l2 = yylloc.last_line;
                var o1 = yylloc.first_column;
                var o2 = yylloc.last_column - 1;
                var dl = l2 - l1;
                var d_o = dl === 0 ? o2 - o1 : 1000;
                var rv;
                if (dl === 0) {
                    rv = 'line ' + l1 + ', ';
                    if (d_o === 0) {
                        rv += 'column ' + o1;
                    } else {
                        rv += 'columns ' + o1 + ' .. ' + o2;
                    }
                } else {
                    rv = 'lines ' + l1 + '(column ' + o1 + ') .. ' + l2 + '(column ' + o2 + ')';
                }
                if (yylloc.range && display_range_too) {
                    var r1 = yylloc.range[0];
                    var r2 = yylloc.range[1] - 1;
                    if (r2 === r1) {
                        rv += ' {String Offset: ' + r1 + '}';
                    } else {
                        rv += ' {String Offset range: ' + r1 + ' .. ' + r2 + '}';
                    }
                }
                return rv;
                // return JSON.stringify(yylloc);
            },

            // test the lexed token: return FALSE when not a match, otherwise return token.
            //
            // `match` is supposed to be an array coming out of a regex match, i.e. `match[0]`
            // contains the actually matched text string.
            //
            // Also move the input cursor forward and update the match collectors:
            // - yytext
            // - yyleng
            // - match
            // - matches
            // - yylloc
            // - offset
            /** 
            @public 
            @this {RegExpLexer} 
            */
            test_match: function lexer_test_match(match, indexed_rule) {
                var token, lines, backup, match_str, match_str_len;

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

                match_str = match[0];
                match_str_len = match_str.length;
                // if (match_str.indexOf('\n') !== -1 || match_str.indexOf('\r') !== -1) {
                lines = match_str.match(/(?:\r\n?|\n).*/g);
                if (lines) {
                    this.yylineno += lines.length;
                }
                // }
                this.yylloc = {
                    first_line: this.yylloc.last_line,
                    last_line: this.yylineno + 1,
                    first_column: this.yylloc.last_column,
                    last_column: lines ? lines[lines.length - 1].length - lines[lines.length - 1].match(/^\r?\n?/)[0].length : this.yylloc.last_column + match_str_len
                };
                this.yytext += match_str;
                this.match += match_str;
                this.matches = match;
                this.yyleng = this.yytext.length;
                if (this.options.ranges) {
                    this.yylloc.range = [this.offset, this.offset + this.yyleng];
                }
                // previous lex rules MAY have invoked the `more()` API rather than producing a token:
                // those rules will already have moved this `offset` forward matching their match lengths,
                // hence we must only add our own match length now:
                this.offset += match_str_len;
                this._more = false;
                this._backtrack = false;
                this._input = this._input.slice(match_str_len);
                this.matched += match_str;

                // calling this method:
                //
                //   function lexer__performAction(yy, yy_, $avoiding_name_collisions, YY_START) {...}
                token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1] /* = YY_START */);
                // otherwise, when the action codes are all simple return token statements:
                //token = this.simpleCaseActionClusters[indexed_rule];

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
                    this.__currentRuleSet__ = null;
                    return false; // rule action called reject() implying the next rule should be tested instead.
                } else if (this._signaled_error_token) {
                    // produce one 'error' token as `.parseError()` in `reject()` did not guarantee a failure signal by throwing an exception!
                    token = this._signaled_error_token;
                    this._signaled_error_token = false;
                    return token;
                }
                return false;
            },

            // return next match in input
            /** 
            @public 
            @this {RegExpLexer} 
            */
            next: function lexer_next() {
                if (this.done) {
                    this.clear();
                    return this.EOF;
                }
                if (!this._input) {
                    this.done = true;
                }

                var token, match, tempMatch, index;
                if (!this._more) {
                    this.clear();
                }
                var spec = this.__currentRuleSet__;
                if (!spec) {
                    // Update the ruleset cache as we apparently encountered a state change or just started lexing.
                    // The cache is set up for fast lookup -- we assume a lexer will switch states much less often than it will
                    // invoke the `lex()` token-producing API and related APIs, hence caching the set for direct access helps
                    // speed up those activities a tiny bit.
                    spec = this.__currentRuleSet__ = this._currentRules();
                    // Check whether a *sane* condition has been pushed before: this makes the lexer robust against
                    // user-programmer bugs such as https://github.com/zaach/jison-lex/issues/19
                    if (!spec || !spec.rules) {
                        var p = this.constructLexErrorInfo('Internal lexer engine error on line ' + (this.yylineno + 1) + '. The lex grammar programmer pushed a non-existing condition name "' + this.topState() + '"; this is a fatal error and should be reported to the application programmer team!\n', false);
                        // produce one 'error' token until this situation has been resolved, most probably by parse termination!
                        return this.parseError(p.errStr, p, this.JisonLexerError) || this.ERROR;
                    }
                }

                var rule_ids = spec.rules;
                //var dispatch = spec.__dispatch_lut;
                var regexes = spec.__rule_regexes;
                var len = spec.__rule_count;

                //var c0 = this._input[0];

                // Note: the arrays are 1-based, while `len` itself is a valid index,
                // hence the non-standard less-or-equal check in the next loop condition!
                //
                // `dispatch` is a lookup table which lists the *first* rule which matches the 1-char *prefix* of the rule-to-match.
                // By using that array as a jumpstart, we can cut down on the otherwise O(n*m) behaviour of this lexer, down to
                // O(n) ideally, where:
                //
                // - N is the number of input particles -- which is not precisely characters
                //   as we progress on a per-regex-match basis rather than on a per-character basis
                //
                // - M is the number of rules (regexes) to test in the active condition state.
                //
                for (var i = 1 /* (dispatch[c0] || 1) */; i <= len; i++) {
                    tempMatch = this._input.match(regexes[i]);
                    if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                        match = tempMatch;
                        index = i;
                        if (this.options.backtrack_lexer) {
                            token = this.test_match(tempMatch, rule_ids[i]);
                            if (token !== false) {
                                return token;
                            } else if (this._backtrack) {
                                match = undefined;
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
                    token = this.test_match(match, rule_ids[index]);
                    if (token !== false) {
                        return token;
                    }
                    // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                    return false;
                }
                if (this._input === '') {
                    this.done = true;
                    return this.EOF;
                } else {
                    var p = this.constructLexErrorInfo('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), this.options.lexer_errors_are_recoverable);
                    token = this.parseError(p.errStr, p, this.JisonLexerError) || this.ERROR;
                    if (token === this.ERROR) {
                        // we can try to recover from a lexer error that `parseError()` did not 'recover' for us
                        // by moving forward at least one character at a time:
                        if (!this.match.length) {
                            this.input();
                        }
                    }
                    return token;
                }
            },

            // return next match that has a token
            /** 
            @public 
            @this {RegExpLexer} 
            */
            lex: function lexer_lex() {
                var r;
                // allow the PRE/POST handlers set/modify the return token for maximum flexibility of the generated lexer:
                if (typeof this.options.pre_lex === 'function') {
                    r = this.options.pre_lex.call(this);
                }
                while (!r) {
                    r = this.next();
                }
                if (typeof this.options.post_lex === 'function') {
                    // (also account for a userdef function which does not return any value: keep the token as is)
                    r = this.options.post_lex.call(this, r) || r;
                }
                return r;
            },

            // backwards compatible alias for `pushState()`;
            // the latter is symmetrical with `popState()` and we advise to use
            // those APIs in any modern lexer code, rather than `begin()`.
            /** 
            @public 
            @this {RegExpLexer} 
            */
            begin: function lexer_begin(condition) {
                return this.pushState(condition);
            },

            // activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
            /** 
            @public 
            @this {RegExpLexer} 
            */
            pushState: function lexer_pushState(condition) {
                this.conditionStack.push(condition);
                this.__currentRuleSet__ = null;
                return this;
            },

            // pop the previously active lexer condition state off the condition stack
            /** 
            @public 
            @this {RegExpLexer} 
            */
            popState: function lexer_popState() {
                var n = this.conditionStack.length - 1;
                if (n > 0) {
                    this.__currentRuleSet__ = null;
                    return this.conditionStack.pop();
                } else {
                    return this.conditionStack[0];
                }
            },

            // return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
            /** 
            @public 
            @this {RegExpLexer} 
            */
            topState: function lexer_topState(n) {
                n = this.conditionStack.length - 1 - Math.abs(n || 0);
                if (n >= 0) {
                    return this.conditionStack[n];
                } else {
                    return 'INITIAL';
                }
            },

            // (internal) determine the lexer rule set which is active for the currently active lexer condition state
            /** 
            @public 
            @this {RegExpLexer} 
            */
            _currentRules: function lexer__currentRules() {
                if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
                    return this.conditions[this.conditionStack[this.conditionStack.length - 1]];
                } else {
                    return this.conditions['INITIAL'];
                }
            },

            // return the number of states currently on the stack
            /** 
            @public 
            @this {RegExpLexer} 
            */
            stateStackSize: function lexer_stateStackSize() {
                return this.conditionStack.length;
            },
            options: {},
            JisonLexerError: JisonLexerError,
            performAction: function lexer__performAction(yy, yy_, $avoiding_name_collisions, YY_START) {

                var YYSTATE = YY_START;
                switch ($avoiding_name_collisions) {
                    case 0:
                        /*! Conditions:: INITIAL */
                        /*! Rule::       \s+ */
                        /* ignore */
                        break;
                    default:
                        return this.simpleCaseActionClusters[$avoiding_name_collisions];
                }
            },
            simpleCaseActionClusters: {

                /*! Conditions:: INITIAL */
                /*! Rule::       -?[0-9][0-9]*\.[0-9]* */
                1: 34,
                /*! Conditions:: INITIAL */
                /*! Rule::       -?[0-9][0-9]* */
                2: 33,
                /*! Conditions:: INITIAL */
                /*! Rule::       context */
                3: 17,
                /*! Conditions:: INITIAL */
                /*! Rule::       inv */
                4: 18,
                /*! Conditions:: INITIAL */
                /*! Rule::       def */
                5: 19,
                /*! Conditions:: INITIAL */
                /*! Rule::       let */
                6: 31,
                /*! Conditions:: INITIAL */
                /*! Rule::       true */
                7: 36,
                /*! Conditions:: INITIAL */
                /*! Rule::       false */
                8: 37,
                /*! Conditions:: INITIAL */
                /*! Rule::       and */
                9: 26,
                /*! Conditions:: INITIAL */
                /*! Rule::       or */
                10: 27,
                /*! Conditions:: INITIAL */
                /*! Rule::       mod */
                11: 21,
                /*! Conditions:: INITIAL */
                /*! Rule::       div */
                12: 22,
                /*! Conditions:: INITIAL */
                /*! Rule::       xor */
                13: 28,
                /*! Conditions:: INITIAL */
                /*! Rule::       implies */
                14: 30,
                /*! Conditions:: INITIAL */
                /*! Rule::       \( */
                15: 4,
                /*! Conditions:: INITIAL */
                /*! Rule::       \) */
                16: 5,
                /*! Conditions:: INITIAL */
                /*! Rule::       \| */
                17: 14,
                /*! Conditions:: INITIAL */
                /*! Rule::       -> */
                18: 29,
                /*! Conditions:: INITIAL */
                /*! Rule::       <= */
                19: 23,
                /*! Conditions:: INITIAL */
                /*! Rule::       >= */
                20: 24,
                /*! Conditions:: INITIAL */
                /*! Rule::       <> */
                21: 25,
                /*! Conditions:: INITIAL */
                /*! Rule::       < */
                22: 11,
                /*! Conditions:: INITIAL */
                /*! Rule::       = */
                23: 12,
                /*! Conditions:: INITIAL */
                /*! Rule::       > */
                24: 13,
                /*! Conditions:: INITIAL */
                /*! Rule::       :: */
                25: 39,
                /*! Conditions:: INITIAL */
                /*! Rule::       : */
                26: 3,
                /*! Conditions:: INITIAL */
                /*! Rule::       \. */
                27: 6,
                /*! Conditions:: INITIAL */
                /*! Rule::       , */
                28: 15,
                /*! Conditions:: INITIAL */
                /*! Rule::       \+ */
                29: 7,
                /*! Conditions:: INITIAL */
                /*! Rule::       - */
                30: 8,
                /*! Conditions:: INITIAL */
                /*! Rule::       \* */
                31: 9,
                /*! Conditions:: INITIAL */
                /*! Rule::       \/ */
                32: 10,
                /*! Conditions:: INITIAL */
                /*! Rule::       @ */
                33: 16,
                /*! Conditions:: INITIAL */
                /*! Rule::       pre */
                34: 32,
                /*! Conditions:: INITIAL */
                /*! Rule::       nil */
                35: 38,
                /*! Conditions:: INITIAL */
                /*! Rule::       [a-zA-Z][a-zA-Z0-9]* */
                36: 20,
                /*! Conditions:: INITIAL */
                /*! Rule::       ["][^\"]*["] */
                37: 35,
                /*! Conditions:: INITIAL */
                /*! Rule::       $ */
                38: 1,
                /*! Conditions:: INITIAL */
                /*! Rule::       . */
                39: 'ERROR'
            },
            rules: [/^(?:\s+)/, /^(?:-?\d\d*\.\d*)/, /^(?:-?\d\d*)/, /^(?:context)/, /^(?:inv)/, /^(?:def)/, /^(?:let)/, /^(?:true)/, /^(?:false)/, /^(?:and)/, /^(?:or)/, /^(?:mod)/, /^(?:div)/, /^(?:xor)/, /^(?:implies)/, /^(?:\()/, /^(?:\))/, /^(?:\|)/, /^(?:->)/, /^(?:<=)/, /^(?:>=)/, /^(?:<>)/, /^(?:<)/, /^(?:=)/, /^(?:>)/, /^(?:::)/, /^(?::)/, /^(?:\.)/, /^(?:,)/, /^(?:\+)/, /^(?:-)/, /^(?:\*)/, /^(?:\/)/, /^(?:@)/, /^(?:pre)/, /^(?:nil)/, /^(?:[A-Za-z][^\W_]*)/, /^(?:["][^"]*["])/, /^(?:$)/, /^(?:.)/],
            conditions: {
                "INITIAL": {
                    rules: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39],
                    inclusive: true
                }
            }
        };

        return lexer;
    }();
    parser.lexer = lexer;

    function Parser() {
        this.yy = {};
    }
    Parser.prototype = parser;
    parser.Parser = Parser;

    return new Parser();
}();

module.exports = parser;

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _oclEngine = __webpack_require__(8);

exports.default = _oclEngine.OclEngine;

/***/ })
/******/ ]);