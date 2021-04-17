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
exports.NilExpression = void 0;
var LiteralExpression_1 = require("./LiteralExpression");
var NilExpression = /** @class */ (function (_super) {
    __extends(NilExpression, _super);
    function NilExpression() {
        return _super.call(this, undefined) || this;
    }
    NilExpression.prototype.parseValue = function () {
        return;
    };
    return NilExpression;
}(LiteralExpression_1.LiteralExpression));
exports.NilExpression = NilExpression;
//# sourceMappingURL=NilExpression.js.map