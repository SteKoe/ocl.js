"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Expression_1 = require("./Expression");
var LeftRightBasedExpression = /** @class */ (function (_super) {
    __extends(LeftRightBasedExpression, _super);
    function LeftRightBasedExpression(left, right) {
        var _this = _super.call(this) || this;
        _this.left = left;
        _this.right = right;
        return _this;
    }
    LeftRightBasedExpression.prototype.getLeft = function () {
        return this.left;
    };
    LeftRightBasedExpression.prototype.getRight = function () {
        return this.right;
    };
    LeftRightBasedExpression.prototype._evaluateLeftRightExpression = function (visitor, localVariables) {
        var left = this.getLeft()
            .evaluate(visitor, localVariables);
        var right = this.getRight()
            .evaluate(visitor, localVariables);
        return { left: left, right: right };
    };
    return LeftRightBasedExpression;
}(Expression_1.Expression));
exports.LeftRightBasedExpression = LeftRightBasedExpression;
//# sourceMappingURL=LeftRightBasedExpression.js.map