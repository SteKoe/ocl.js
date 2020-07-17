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
exports.OclIsTypeOfExpression = void 0;
var Utils_1 = require("../Utils");
var Expression_1 = require("./Expression");
/**
 * Checks if *self* is an instance of exact the class identified by the name
 *
 * @oclExpression oclIsTypeOf(s : String) : Boolean
 */
var OclIsTypeOfExpression = /** @class */ (function (_super) {
    __extends(OclIsTypeOfExpression, _super);
    function OclIsTypeOfExpression() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OclIsTypeOfExpression.prototype.evaluate = function (visitor, localVariables) {
        var source = this.getSource().evaluate(visitor, localVariables);
        source = Utils_1.Utils.getClassName(source);
        var body = this.getBody().evaluate(visitor, localVariables);
        if (typeof body !== 'string') {
            body = Utils_1.Utils.getClassName(body);
        }
        return source === body;
    };
    return OclIsTypeOfExpression;
}(Expression_1.BodyBasedExpression));
exports.OclIsTypeOfExpression = OclIsTypeOfExpression;
//# sourceMappingURL=OclIsTypeOfExpression.js.map