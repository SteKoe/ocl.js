"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToLowerCaseExpression = void 0;
var Expression_1 = require("../Expression");
/**
 * Returns *self* as lower case string.
 *
 * @oclExpression String:: toLowerCase () : String
 * @oclExample self.name.toLowerCase()
 */
var ToLowerCaseExpression = /** @class */ (function (_super) {
    __extends(ToLowerCaseExpression, _super);
    function ToLowerCaseExpression() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ToLowerCaseExpression.prototype.evaluate = function (visitor, localVariables) {
        var source = this.getSource().evaluate(visitor, localVariables);
        return String(source).toLowerCase();
    };
    return ToLowerCaseExpression;
}(Expression_1.SourceBasedExpression));
exports.ToLowerCaseExpression = ToLowerCaseExpression;
//# sourceMappingURL=ToLowerCaseExpression.js.map