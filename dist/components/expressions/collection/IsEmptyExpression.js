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
var Expression_1 = require("../Expression");
/**
 * Returns true if self is empty, false otherwise.
 *
 * @oclExpression isEmpty() : Boolean
 * @oclExample self.cars->isEmpty()
 */
var IsEmptyExpression = /** @class */ (function (_super) {
    __extends(IsEmptyExpression, _super);
    function IsEmptyExpression() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IsEmptyExpression.prototype.evaluate = function (visitor, localVariables) {
        var source = this.getSource()
            .evaluate(visitor, localVariables);
        return Array.isArray(source) ? source.length === 0 : true;
    };
    return IsEmptyExpression;
}(Expression_1.SourceBasedExpression));
exports.IsEmptyExpression = IsEmptyExpression;
//# sourceMappingURL=IsEmptyExpression.js.map