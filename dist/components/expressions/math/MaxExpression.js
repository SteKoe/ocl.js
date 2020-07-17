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
exports.MaxExpression = void 0;
var Expression_1 = require("../Expression");
/**
 * Returns the greatest number of self and *i*.
 *
 * @oclExpression Number::max ( i : Number ) : Number
 * @oclExample 6.max(3) = 6
 */
var MaxExpression = /** @class */ (function (_super) {
    __extends(MaxExpression, _super);
    function MaxExpression() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MaxExpression.prototype.evaluate = function (visitor, localVariables) {
        var body = this.getBody().evaluate(visitor);
        var left = this.getSource().evaluate(visitor, localVariables);
        return Math.max(left, body);
    };
    return MaxExpression;
}(Expression_1.BodyBasedExpression));
exports.MaxExpression = MaxExpression;
//# sourceMappingURL=MaxExpression.js.map