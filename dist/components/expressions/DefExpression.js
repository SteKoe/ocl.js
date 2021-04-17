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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefExpression = void 0;
var Expression_1 = require("./Expression");
/**
 * @oclSpecification
 * The Let expression allows a variable to be used in one OCL expression.
 * To enable reuse of variables/operations over multiple OCL expressions one can use a Constraint with the stereotype «definition», in which helper variables/operations are defined.
 * This «definition» Constraint must be attached to a Classifier and may only contain variable and/or operation definitions, nothing else.
 * All variables and operations defined in the «definition» constraint are known in the same context as where any property of the Classifier can be used.
 * Such variables and operations are attributes and operations with stereotype «OclHelper» of the classifier.
 * They are used in an OCL expression in exactly the same way as normal attributes or operations are used.
 * The syntax of the attribute or operation definitions is similar to the Let expression, but each attribute and operation definition is prefixed with the keyword ‘def’ as shown below.
 *
 * @oclExample context Person def:
 *     income : Integer = self.job.salary->sum()
 */
var DefExpression = /** @class */ (function (_super) {
    __extends(DefExpression, _super);
    function DefExpression(key, value) {
        var _this = _super.call(this) || this;
        _this.key = key;
        _this.value = value;
        return _this;
    }
    DefExpression.prototype.getKey = function () {
        return this.key;
    };
    DefExpression.prototype.getValue = function () {
        return this.value;
    };
    DefExpression.prototype.evaluate = function (visitor, localVariables) {
        visitor.getObjectToEvaluate()[this.getKey()] = this.getValue()
            .evaluate(visitor, localVariables);
    };
    return DefExpression;
}(Expression_1.Expression));
exports.DefExpression = DefExpression;
//# sourceMappingURL=DefExpression.js.map