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
exports.ImpliesExpression = void 0;
var LeftRightBasedExpression_1 = require("../LeftRightBasedExpression");
/**
 * | A     | B     | A implies B |
 * | ----- | ----- | ----------- |
 * | false | false | true        |
 * | false | true  | true        |
 * | true  | false | false       |
 * | true  | true  | true        |
 *
 * @oclExample false implies true
 */
var ImpliesExpression = /** @class */ (function (_super) {
    __extends(ImpliesExpression, _super);
    function ImpliesExpression() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ImpliesExpression.prototype.evaluate = function (visitor, localVariables) {
        var _a = this._evaluateLeftRightExpression(visitor, localVariables), left = _a.left, right = _a.right;
        if (left) {
            return right;
        }
        else {
            return true;
        }
    };
    return ImpliesExpression;
}(LeftRightBasedExpression_1.LeftRightBasedExpression));
exports.ImpliesExpression = ImpliesExpression;
//# sourceMappingURL=ImpliesExpression.js.map