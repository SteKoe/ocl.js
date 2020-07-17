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
exports.InvariantExpression = void 0;
var Expression_1 = require("./Expression");
/**
 * @oclSpecification
 * The OCL expression can be part of an Invariant which is a Constraint stereotyped as an «invariant».
 * When the invariant is associated with a Classifier, the latter is referred to as a “type” in this clause.
 * An OCL expression is an invariant of the type and must be true for all instances of that type at any time.
 * (Note that all OCL expressions that express invariants are of the type Boolean.)
 *
 * @oclExample context Person inv:
 *     self.age > 0
 */
var InvariantExpression = /** @class */ (function (_super) {
    __extends(InvariantExpression, _super);
    function InvariantExpression(oclExpression, name) {
        var _this = _super.call(this) || this;
        _this.name = name || 'anonymous';
        _this.definition = oclExpression;
        return _this;
    }
    InvariantExpression.prototype.getName = function () {
        return this.name;
    };
    InvariantExpression.prototype.getDefinition = function () {
        return this.definition;
    };
    InvariantExpression.prototype.evaluate = function (visitor, localVariables) {
        var evaluationResult = this.getDefinition().evaluate(visitor, localVariables);
        return evaluationResult === true;
    };
    return InvariantExpression;
}(Expression_1.Expression));
exports.InvariantExpression = InvariantExpression;
//# sourceMappingURL=InvariantExpression.js.map