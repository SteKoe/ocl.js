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
exports.NumberExpression = void 0;
var LiteralExpression_1 = require("./LiteralExpression");
/**
 */
var NumberExpression = /** @class */ (function (_super) {
    __extends(NumberExpression, _super);
    function NumberExpression() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NumberExpression.prototype.parseValue = function (value) {
        var val = typeof value === 'string' ? value.replace(/_/g, '') : value;
        if (!isNaN(+val)) {
            return +val;
        }
        else {
            throw new SyntaxError("NumberExpression: '" + value + "' could not be parsed as Number!");
        }
    };
    return NumberExpression;
}(LiteralExpression_1.LiteralExpression));
exports.NumberExpression = NumberExpression;
//# sourceMappingURL=NumberExpression.js.map