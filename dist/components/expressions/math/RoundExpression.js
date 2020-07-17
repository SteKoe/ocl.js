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
exports.RoundExpression = void 0;
var Expression_1 = require("../Expression");
/**
 * Returns the nearest number to self.
 *
 * @oclExpression Number::round () : Number
 * @oclExpression 2.5.round() = 3
 */
var RoundExpression = /** @class */ (function (_super) {
    __extends(RoundExpression, _super);
    function RoundExpression() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RoundExpression.prototype.evaluate = function (visitor, localVariables) {
        var result = this.getSource().evaluate(visitor, localVariables);
        return Math.round(result);
    };
    return RoundExpression;
}(Expression_1.SourceBasedExpression));
exports.RoundExpression = RoundExpression;
//# sourceMappingURL=RoundExpression.js.map