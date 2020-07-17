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
exports.LiteralExpression = void 0;
var Expression_1 = require("../Expression");
var LiteralExpression = /** @class */ (function (_super) {
    __extends(LiteralExpression, _super);
    function LiteralExpression(value) {
        var _this = _super.call(this) || this;
        _this.value = _this.parseValue(value);
        return _this;
    }
    LiteralExpression.prototype.getValue = function () {
        return this.value;
    };
    LiteralExpression.prototype.evaluate = function (visitor) {
        return this.getValue();
    };
    return LiteralExpression;
}(Expression_1.Expression));
exports.LiteralExpression = LiteralExpression;
//# sourceMappingURL=LiteralExpression.js.map