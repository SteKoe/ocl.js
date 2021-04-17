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
exports.DivExpression = void 0;
var Expression_1 = require("../Expression");
/**
 * Returns the integer quotient of the division of self by *i*.
 *
 * @oclExpression Number::div ( i : Number ) : Number
 * @oclExample 3 div 2 = 1
 */
var DivExpression = /** @class */ (function (_super) {
    __extends(DivExpression, _super);
    function DivExpression() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DivExpression.prototype.evaluate = function (visitor, localVariables) {
        var _a = this._evaluateBodyAndSource(visitor, localVariables), source = _a.source, body = _a.body;
        return Math.floor(body / source);
    };
    return DivExpression;
}(Expression_1.BodyBasedExpression));
exports.DivExpression = DivExpression;
//# sourceMappingURL=DivExpression.js.map