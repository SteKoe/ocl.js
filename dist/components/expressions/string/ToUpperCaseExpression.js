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
exports.ToUpperCaseExpression = void 0;
var Expression_1 = require("../Expression");
/**
 * Returns *self* into upper case string.
 *
 * @oclExpression String:: toUpperCase () : String
 * @oclExample self.name.toUpperCase()
 */
var ToUpperCaseExpression = /** @class */ (function (_super) {
    __extends(ToUpperCaseExpression, _super);
    function ToUpperCaseExpression() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ToUpperCaseExpression.prototype.evaluate = function (visitor, localVariables) {
        var source = this.getSource().evaluate(visitor, localVariables);
        return String(source).toUpperCase();
    };
    return ToUpperCaseExpression;
}(Expression_1.SourceBasedExpression));
exports.ToUpperCaseExpression = ToUpperCaseExpression;
//# sourceMappingURL=ToUpperCaseExpression.js.map