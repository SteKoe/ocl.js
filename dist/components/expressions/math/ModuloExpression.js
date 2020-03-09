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
var LeftRightBasedExpression_1 = require("../LeftRightBasedExpression");
/**
 * Returns the number remainder of the division of self by *i*.
 *
 * @oclExpression Number::mod ( i : Number ) : Number
 * @oclExample 4 mod 2 = 0
 */
var ModuloExpression = /** @class */ (function (_super) {
    __extends(ModuloExpression, _super);
    function ModuloExpression() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ModuloExpression.prototype.evaluate = function (visitor, localVariables) {
        var _a = this._evaluateLeftRightExpression(visitor, localVariables), left = _a.left, right = _a.right;
        return left % right;
    };
    return ModuloExpression;
}(LeftRightBasedExpression_1.LeftRightBasedExpression));
exports.ModuloExpression = ModuloExpression;
//# sourceMappingURL=ModuloExpression.js.map