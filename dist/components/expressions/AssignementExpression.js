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
exports.AssignementExpression = void 0;
var LeftRightBasedExpression_1 = require("./LeftRightBasedExpression");
var VariableExpression_1 = require("./VariableExpression");
/**
 * Assignement
 *
 * @oclExpression Symbol: <-
 * @oclExample 1 <- 2
 */
var AssignementExpression = /** @class */ (function (_super) {
    __extends(AssignementExpression, _super);
    function AssignementExpression(left, right) {
        var _this = _super.call(this, left, right) || this;
        _this.variable = '';
        if (left instanceof VariableExpression_1.VariableExpression) {
            var arr = left.variable.split('.');
            _this.variable = arr.pop();
            left.variable = arr.join('.');
            left.source = left.variable;
        }
        return _this;
    }
    AssignementExpression.prototype.getVariable = function () {
        return this.variable;
    };
    AssignementExpression.prototype.evaluate = function (visitor, localVariables) {
        var _a = this._evaluateLeftRightExpression(visitor, localVariables), left = _a.left, right = _a.right;
        left[this.variable] = right;
        return true; //left + right;
    };
    return AssignementExpression;
}(LeftRightBasedExpression_1.LeftRightBasedExpression));
exports.AssignementExpression = AssignementExpression;
//# sourceMappingURL=AssignementExpression.js.map