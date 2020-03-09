"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Expressions = require("../expressions");
var Utils_1 = require("../Utils");
var parser = require("../../../generator/Parser");
parser.yy = {
    Expression: Expressions,
    Utils: Utils_1.Utils
};
var OclParser = /** @class */ (function () {
    function OclParser() {
    }
    OclParser.parseQuery = function (oclExpression, registeredTypes) {
        parser.yy.registeredTypes = registeredTypes || {};
        return parser.parse(oclExpression);
    };
    OclParser.parse = function (oclExpression, labels, registeredTypes) {
        if (labels === void 0) { labels = []; }
        var packageDeclaration = OclParser.parseQuery(oclExpression, registeredTypes);
        packageDeclaration.setExecutionLabels(labels);
        packageDeclaration.setRawOclExpression(oclExpression);
        return packageDeclaration;
    };
    /* tslint:disable:no-console */
    OclParser._lex /* istanbul ignore next */ = function (oclExpression) {
        var lexer = parser.lexer;
        lexer.setInput(oclExpression);
        while (!lexer.done) {
            var token = lexer.lex();
            var resultingToken = void 0;
            /* Look up the token name if necessary */
            if (token in parser.terminals_) {
                resultingToken = parser.terminals_[token];
            }
            console.log("<" + token + ", " + lexer.yytext + ">");
        }
    };
    OclParser.registeredTypes = {
        Array: Array,
        Boolean: Boolean,
        Function: Function,
        Number: Number,
        Object: Object,
        String: String
    };
    OclParser.registeredEnums = {};
    return OclParser;
}());
exports.OclParser = OclParser;
//# sourceMappingURL=OclParser.js.map