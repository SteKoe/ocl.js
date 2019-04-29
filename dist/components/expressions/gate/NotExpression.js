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
 * | A     | NOT A |
 * | ----- | ----- |
 * | true  | false |
 * | false | true  |
 *
 * @oclExample not false
 */
var NotExpression = /** @class */ (function (_super) {
    __extends(NotExpression, _super);
    function NotExpression() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NotExpression.prototype.evaluate = function (visitor, localVariables) {
        var source = this.getSource().evaluate(visitor, localVariables);
        return !source;
    };
    return NotExpression;
}(Expression_1.SourceBasedExpression));
exports.NotExpression = NotExpression;
//# sourceMappingURL=NotExpression.js.map