"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LetExpression = void 0;
var Expression_1 = require("./Expression");
/**
 * @oclSpecification
 * Sometimes a sub-expression is used more than once in a constraint.
 * The let expression allows one to define a variable that can be used in the constraint.
 *
 * @oclExample
 * context Person inv:
 *      let income : Integer = self.job.salary->sum() in
 *      if isUnemployed then
 *          income < 100
 *      else
 *          income >= 100
 *      endif
 */
var LetExpression = /** @class */ (function (_super) {
    __extends(LetExpression, _super);
    function LetExpression(variableDeclarationExpressions, inContextDef) {
        var _this = _super.call(this) || this;
        _this.variableDeclarationExpressions = variableDeclarationExpressions;
        _this.inContextDef = inContextDef;
        return _this;
    }
    LetExpression.prototype.evaluate = function (visitor, localVariables) {
        var _a;
        var variableExpression = this.variableDeclarationExpressions[0];
        var variables = (_a = {}, _a[variableExpression.getVariableName()] = variableExpression.evaluate(visitor), _a);
        return this.inContextDef.evaluate(visitor, __assign(__assign({}, localVariables), variables));
    };
    return LetExpression;
}(Expression_1.Expression));
exports.LetExpression = LetExpression;
//# sourceMappingURL=LetExpression.js.map