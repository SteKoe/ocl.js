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
exports.ClassifierContextExpression = void 0;
var InvariantExpression_1 = require("../InvariantExpression");
var DefExpression_1 = require("../DefExpression");
var ContextExpression_1 = require("./ContextExpression");
/**
 * Define invariants and definitions on a given types
 *
 * @oclExpression context <Type> (inv|def)
 */
var ClassifierContextExpression = /** @class */ (function (_super) {
    __extends(ClassifierContextExpression, _super);
    function ClassifierContextExpression(targetType, rules) {
        var _this = _super.call(this) || this;
        if (!(rules instanceof Array)) {
            rules = [rules];
        }
        _this.targetType = targetType;
        _this.invs = rules.filter(function (i) { return i instanceof InvariantExpression_1.InvariantExpression; });
        _this.defs = rules.filter(function (i) { return i instanceof DefExpression_1.DefExpression; });
        return _this;
    }
    ClassifierContextExpression.prototype.getInvs = function () {
        return this.invs;
    };
    ClassifierContextExpression.prototype.getDefs = function () {
        return this.defs;
    };
    ClassifierContextExpression.prototype.accept = function (visitor) {
        var accept = _super.prototype.accept.call(this, visitor);
        if (accept === false) {
            return false;
        }
        else {
            var visitorTargetType = visitor.getRegisteredType(visitor.getTargetTypeName()) || visitor.getTargetTypeName();
            var expressionTargetType = visitor.getRegisteredType(this.targetType) || this.targetType;
            if (typeof visitorTargetType === 'string' || typeof expressionTargetType === 'string') {
                return this.targetType === visitor.getTargetTypeName();
            }
            else {
                return visitorTargetType instanceof expressionTargetType || visitorTargetType === expressionTargetType;
            }
        }
    };
    ClassifierContextExpression.prototype.evaluate = function (visitor) {
        _super.prototype.evaluate.call(this, visitor);
        if (this.accept(visitor)) {
            this.getDefs()
                .forEach(function (def) { return def.evaluate(visitor); });
            var invs = this.getInvs();
            return !invs
                .map(function (inv) {
                var evaluationResult = inv.evaluate(visitor);
                if (evaluationResult === false) {
                    visitor.addFailedInvariant(inv);
                }
                return evaluationResult;
            })
                .some(function (inv) { return inv === false; });
        }
    };
    return ClassifierContextExpression;
}(ContextExpression_1.ContextExpression));
exports.ClassifierContextExpression = ClassifierContextExpression;
//# sourceMappingURL=ClassifierContextExpression.js.map