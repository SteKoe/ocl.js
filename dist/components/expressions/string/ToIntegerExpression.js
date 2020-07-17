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
exports.ToIntegerExpression = void 0;
var Expression_1 = require("../Expression");
/**
 * Tries to convert a string to a number.
 *
 * @oclExpression String::toInteger () : Number
 * @oclExample "3.414".toInteger()
 */
var ToIntegerExpression = /** @class */ (function (_super) {
    __extends(ToIntegerExpression, _super);
    function ToIntegerExpression() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ToIntegerExpression.prototype.evaluate = function (visitor, localVariables) {
        var source = this.getSource().evaluate(visitor, localVariables);
        return parseInt(source, 10);
    };
    return ToIntegerExpression;
}(Expression_1.SourceBasedExpression));
exports.ToIntegerExpression = ToIntegerExpression;
//# sourceMappingURL=ToIntegerExpression.js.map