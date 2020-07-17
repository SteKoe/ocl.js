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
exports.AbsExpression = void 0;
var Expression_1 = require("../Expression");
/**
 * Returns the absolute value of self.
 *
 * @oclExpression Number::abs () : Number
 * @oclExample -2.abs() = 2
 */
var AbsExpression = /** @class */ (function (_super) {
    __extends(AbsExpression, _super);
    function AbsExpression() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AbsExpression.prototype.evaluate = function (visitor, localVariables) {
        var left = this.getSource().evaluate(visitor, localVariables);
        return Math.abs(left);
    };
    return AbsExpression;
}(Expression_1.SourceBasedExpression));
exports.AbsExpression = AbsExpression;
//# sourceMappingURL=AbsExpression.js.map