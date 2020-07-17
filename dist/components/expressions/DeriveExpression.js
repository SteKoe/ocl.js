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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeriveExpression = void 0;
var Expression_1 = require("./Expression");
/**
 * A derived value expression is an expression that may be linked to a property.
 *
 * @oclExample context Person::income : Integer
 *     derive:  if underAge
 *       then (parents.income->sum() * 1/100).round()
 *       else job.salary->sum()
 *     endif
 */
var DeriveExpression = /** @class */ (function (_super) {
    __extends(DeriveExpression, _super);
    function DeriveExpression(value) {
        var _this = _super.call(this) || this;
        _this.value = value;
        return _this;
    }
    DeriveExpression.prototype.getValue = function () {
        return this.value;
    };
    DeriveExpression.prototype.evaluate = function (visitor, localVariables) {
        return this.getValue()
            .evaluate(visitor, localVariables);
    };
    return DeriveExpression;
}(Expression_1.Expression));
exports.DeriveExpression = DeriveExpression;
//# sourceMappingURL=DeriveExpression.js.map