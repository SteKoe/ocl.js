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
exports.ContextExpression = void 0;
var Expression_1 = require("../Expression");
var ContextExpression = /** @class */ (function (_super) {
    __extends(ContextExpression, _super);
    function ContextExpression() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ContextExpression.prototype.evaluate = function (visitor) {
        if (this.accept(visitor)) {
            visitor.addEvaluatedContext(this);
        }
    };
    return ContextExpression;
}(Expression_1.Expression));
exports.ContextExpression = ContextExpression;
//# sourceMappingURL=ContextExpression.js.map