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
exports.IfExpression = void 0;
var Expression_1 = require("./Expression");
/**
 * The IfExpression allows to execute a statement if the given condition is truthy.
 * Otherwise the else part is taken.
 */
var IfExpression = /** @class */ (function (_super) {
    __extends(IfExpression, _super);
    function IfExpression(condition, _then, _else) {
        var _this = _super.call(this) || this;
        _this.condition = condition;
        _this.thenExpression = _then;
        _this.elseExpression = _else;
        return _this;
    }
    IfExpression.prototype.getCondition = function () {
        return this.condition;
    };
    IfExpression.prototype.getThenExpression = function () {
        return this.thenExpression;
    };
    IfExpression.prototype.getElseExpression = function () {
        return this.elseExpression;
    };
    IfExpression.prototype.evaluate = function (visitor, localVariables) {
        return this.getCondition().evaluate(visitor, localVariables)
            ? this.getThenExpression().evaluate(visitor, localVariables)
            : this.getElseExpression().evaluate(visitor, localVariables);
    };
    return IfExpression;
}(Expression_1.Expression));
exports.IfExpression = IfExpression;
//# sourceMappingURL=IfExpression.js.map