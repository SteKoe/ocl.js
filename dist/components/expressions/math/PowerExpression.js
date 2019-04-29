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
var LeftRightBasedExpression_1 = require("../LeftRightBasedExpression");
/**
 * Power
 *
 * @oclExpression Symbol: ^
 * @oclExample 4 ^ 2
 */
var PowerExpression = /** @class */ (function (_super) {
    __extends(PowerExpression, _super);
    function PowerExpression() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PowerExpression.prototype.evaluate = function (visitor) {
        var _a = this._evaluateLeftRightExpression(visitor), left = _a.left, right = _a.right;
        return Math.pow(left, right);
    };
    return PowerExpression;
}(LeftRightBasedExpression_1.LeftRightBasedExpression));
exports.PowerExpression = PowerExpression;
//# sourceMappingURL=PowerExpression.js.map