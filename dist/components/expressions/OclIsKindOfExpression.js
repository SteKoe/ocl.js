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
exports.OclIsKindOfExpression = void 0;
var Expression_1 = require("./Expression");
/**
 * Checks if *self* is an instance of the class identified by the name
 *
 * @oclExpression oclIsKindOf(type : T) : Boolean
 */
var OclIsKindOfExpression = /** @class */ (function (_super) {
    __extends(OclIsKindOfExpression, _super);
    function OclIsKindOfExpression() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OclIsKindOfExpression.prototype.evaluate = function (visitor, localVariables) {
        var source = this.getSource().evaluate(visitor, localVariables);
        var body = this.getBody() ? this.getBody().evaluate(visitor, localVariables) : undefined;
        if (!body) {
            return false;
        }
        return source instanceof body;
    };
    return OclIsKindOfExpression;
}(Expression_1.BodyBasedExpression));
exports.OclIsKindOfExpression = OclIsKindOfExpression;
//# sourceMappingURL=OclIsKindOfExpression.js.map