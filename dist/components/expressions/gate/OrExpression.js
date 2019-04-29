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
 * | A     | B     | A or B |
 * | ----- | ----- | ------ |
 * | false | false | false  |
 * | false | true  | true   |
 * | true  | false | true   |
 * | true  | true  | true   |
 *
 * @oclExample false or true
 */
var OrExpression = /** @class */ (function (_super) {
    __extends(OrExpression, _super);
    function OrExpression() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OrExpression.prototype.evaluate = function (visitor, localVariables) {
        var _a = this._evaluateLeftRightExpression(visitor, localVariables), left = _a.left, right = _a.right;
        return left || right;
    };
    return OrExpression;
}(LeftRightBasedExpression_1.LeftRightBasedExpression));
exports.OrExpression = OrExpression;
//# sourceMappingURL=OrExpression.js.map