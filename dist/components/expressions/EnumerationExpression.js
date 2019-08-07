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
var Expression_1 = require("./Expression");
/**
 * Resolves enumeration values.
 */
var EnumerationExpression = /** @class */ (function (_super) {
    __extends(EnumerationExpression, _super);
    function EnumerationExpression(source) {
        var _this = _super.call(this) || this;
        var _a = source.split('::'), enumeration = _a[0], field = _a[1];
        _this.enumeration = enumeration;
        _this.field = field;
        return _this;
    }
    EnumerationExpression.prototype.evaluate = function (visitor) {
        var enumeration = visitor.getRegisteredEnumeration(this.enumeration);
        if (enumeration) {
            return enumeration[this.field];
        }
    };
    return EnumerationExpression;
}(Expression_1.Expression));
exports.EnumerationExpression = EnumerationExpression;
//# sourceMappingURL=EnumerationExpression.js.map