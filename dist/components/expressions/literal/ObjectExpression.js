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
var LiteralExpression_1 = require("./LiteralExpression");
var ObjectExpression = /** @class */ (function (_super) {
    __extends(ObjectExpression, _super);
    function ObjectExpression() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ObjectExpression.prototype.parseValue = function (value) {
        return value;
    };
    return ObjectExpression;
}(LiteralExpression_1.LiteralExpression));
exports.ObjectExpression = ObjectExpression;
//# sourceMappingURL=ObjectExpression.js.map