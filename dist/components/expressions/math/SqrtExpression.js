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
var Expression_1 = require("../Expression");
/**
 * Returns the square root of *self*.
 *
 * @oclExpression Number::sqrt () : Number
 * @oclExample 9.sqrt() = 3
 */
var SqrtExpression = /** @class */ (function (_super) {
    __extends(SqrtExpression, _super);
    function SqrtExpression() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SqrtExpression.prototype.evaluate = function (visitor, localVariables) {
        var sqrt = this.getBody() ? this.getBody().evaluate(visitor) : 2;
        var left = this.getSource().evaluate(visitor, localVariables);
        return Math.pow(left, 1 / sqrt);
    };
    return SqrtExpression;
}(Expression_1.BodyBasedExpression));
exports.SqrtExpression = SqrtExpression;
//# sourceMappingURL=SqrtExpression.js.map