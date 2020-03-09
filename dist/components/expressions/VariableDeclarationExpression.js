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
 * Resolve variables. Simple values are returned as is (e.g. self.age: number), collections are aggregated.
 */
var VariableDeclarationExpression = /** @class */ (function (_super) {
    __extends(VariableDeclarationExpression, _super);
    function VariableDeclarationExpression(variableName, optionalDataType, oclExpressionAsValue) {
        var _this = _super.call(this) || this;
        _this.variableName = variableName;
        _this.optionalDataType = optionalDataType;
        _this.oclExpressionAsValue = oclExpressionAsValue;
        return _this;
    }
    VariableDeclarationExpression.prototype.getVariableName = function () {
        return this.variableName;
    };
    VariableDeclarationExpression.prototype.evaluate = function (visitor, localVariables) {
        return this.oclExpressionAsValue.evaluate(visitor, localVariables);
    };
    return VariableDeclarationExpression;
}(Expression_1.Expression));
exports.VariableDeclarationExpression = VariableDeclarationExpression;
//# sourceMappingURL=VariableDeclarationExpression.js.map