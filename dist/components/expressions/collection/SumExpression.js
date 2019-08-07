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
 * Returns the sum of all elements contained in self if they support the '+' operation.
 *
 * @oclExpression sum() : Number
 * @oclExample self.jobs.salary->sum()
 */
var SumExpression = /** @class */ (function (_super) {
    __extends(SumExpression, _super);
    function SumExpression() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SumExpression.prototype.evaluate = function (visitor, localVariables) {
        var source = this.getSource().evaluate(visitor, localVariables);
        if (source instanceof Array && source instanceof Array) {
            return source.reduce(function (prev, cur) { return prev + cur; }, 0);
        }
        return 0;
    };
    return SumExpression;
}(Expression_1.SourceBasedExpression));
exports.SumExpression = SumExpression;
//# sourceMappingURL=SumExpression.js.map