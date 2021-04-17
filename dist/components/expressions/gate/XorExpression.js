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
exports.XorExpression = void 0;
var LeftRightBasedExpression_1 = require("../LeftRightBasedExpression");
/**
 * | A     | B     | A xor B |
 * | ----- | ----- | ------- |
 * | false | false | false   |
 * | false | true  | true    |
 * | true  | false | true    |
 * | true  | true  | false   |
 *
 * @oclExample false xor true
 */
var XorExpression = /** @class */ (function (_super) {
    __extends(XorExpression, _super);
    function XorExpression() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    XorExpression.prototype.evaluate = function (visitor, localVariables) {
        var _a = this._evaluateLeftRightExpression(visitor, localVariables), left = _a.left, right = _a.right;
        return (left || right) && !(left && right);
    };
    return XorExpression;
}(LeftRightBasedExpression_1.LeftRightBasedExpression));
exports.XorExpression = XorExpression;
//# sourceMappingURL=XorExpression.js.map