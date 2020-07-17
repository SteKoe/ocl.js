"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperationContextExpression = void 0;
var OclExecutionContext_1 = require("../../OclExecutionContext");
var OclValidationError_1 = require("../../OclValidationError");
var PreExpression_1 = require("../PreExpression");
var PostExpression_1 = require("../PostExpression");
var ContextExpression_1 = require("./ContextExpression");
/**
 * The Operation Context Expression allows to define pre and or post conditions of functions.
 *
 * @oclExpression context Person::kill() (pre|post)
 * @oclExample
 *     context Person::setAge(age: number)
 *         pre: age > 0
 */
var OperationContextExpression = /** @class */ (function (_super) {
    __extends(OperationContextExpression, _super);
    function OperationContextExpression(operationMetaInfo, expressions, registeredTypes) {
        var _this = _super.call(this) || this;
        var split = operationMetaInfo.pathName.split('::');
        _this.targetType = split[0];
        _this.fnName = split[1];
        _this.params = operationMetaInfo.params;
        _this.returnType = operationMetaInfo.returnType;
        _this.preExpressions = expressions.filter(function (expr) { return expr instanceof PreExpression_1.PreExpression; });
        _this.postExpressions = expressions.filter(function (expr) { return expr instanceof PostExpression_1.PostExpression; });
        var actualType = registeredTypes[_this.targetType];
        if (actualType && typeof actualType.prototype[_this.fnName] === 'function') {
            var self_1 = _this;
            var originalFn_1 = actualType.prototype[_this.fnName];
            actualType.prototype[_this.fnName] = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var oclExecutionContext = new OclExecutionContext_1.OclExecutionContext(this);
                oclExecutionContext.registerTypes(registeredTypes);
                var anies = (self_1.params || []).reduce(function (prev, cur, i) {
                    prev[cur] = args[i];
                    return prev;
                }, { result: undefined });
                self_1.preExpressions.forEach(function (preExpression) {
                    var evaluationResult = preExpression.evaluate(oclExecutionContext, anies);
                    if (!evaluationResult) {
                        throw new OclValidationError_1.OclValidationError("A precondition failed on type " + self_1.targetType + ".");
                    }
                });
                var result = originalFn_1.call.apply(originalFn_1, __spreadArrays([this], args));
                anies.result = result;
                self_1.postExpressions.forEach(function (postExpression) {
                    var evaluationResult = postExpression.evaluate(oclExecutionContext, anies);
                    if (!evaluationResult) {
                        throw new OclValidationError_1.OclValidationError("A postcondition failed on type " + self_1.targetType + ".");
                    }
                });
                return result;
            };
        }
        return _this;
    }
    return OperationContextExpression;
}(ContextExpression_1.ContextExpression));
exports.OperationContextExpression = OperationContextExpression;
//# sourceMappingURL=OperationContextExpression.js.map