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
exports.NotEmptyExpression = void 0;
var Expression_1 = require("../Expression");
/**
 * Returns true if self is not empty, false otherwise.
 *
 * @oclExpression notEmpty() : Boolean
 * @oclExample self.cars->notEmpty()
 */
var NotEmptyExpression = /** @class */ (function (_super) {
    __extends(NotEmptyExpression, _super);
    function NotEmptyExpression() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NotEmptyExpression.prototype.evaluate = function (visitor, localVariables) {
        var source = this.getSource().evaluate(visitor, localVariables);
        return Array.isArray(source) ? source.length !== 0 : false;
    };
    return NotEmptyExpression;
}(Expression_1.SourceBasedExpression));
exports.NotEmptyExpression = NotEmptyExpression;
//# sourceMappingURL=NotEmptyExpression.js.map