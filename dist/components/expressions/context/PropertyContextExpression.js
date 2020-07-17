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
exports.PropertyContextExpression = void 0;
var InitExpression_1 = require("../InitExpression");
var DeriveExpression_1 = require("../DeriveExpression");
var Utils_1 = require("../../Utils");
var ContextExpression_1 = require("./ContextExpression");
/**
 * A PropertyContextDefinition allows to initialize or derive a value for the targeted property.
 *
 * @oclExpression context Person::age (init|derive)
 */
var PropertyContextExpression = /** @class */ (function (_super) {
    __extends(PropertyContextExpression, _super);
    function PropertyContextExpression(targetType, rules) {
        var _this = _super.call(this) || this;
        var split = targetType.split('::');
        _this.targetType = split[0];
        _this.propertyName = split[1];
        if (!(rules instanceof Array)) {
            rules = [rules];
        }
        _this.inits = rules.filter(function (i) { return i instanceof InitExpression_1.InitExpression; });
        _this.derived = rules.filter(function (i) { return i instanceof DeriveExpression_1.DeriveExpression; });
        return _this;
    }
    PropertyContextExpression.prototype.getInits = function () {
        return this.inits;
    };
    PropertyContextExpression.prototype.getDerived = function () {
        return this.derived;
    };
    PropertyContextExpression.prototype.getPropertyName = function () {
        return this.propertyName;
    };
    PropertyContextExpression.prototype.accept = function (visitor) {
        return Utils_1.Utils.getClassName(visitor.getObjectToEvaluate()) === this.targetType;
    };
    PropertyContextExpression.prototype.evaluate = function (visitor) {
        var _this = this;
        _super.prototype.evaluate.call(this, visitor);
        this.getInits().forEach(function (init) {
            visitor.getObjectToEvaluate()[_this.getPropertyName()] = init.evaluate(visitor);
        });
        this.getDerived().forEach(function (derive) {
            visitor.getObjectToEvaluate()[_this.getPropertyName()] = derive.evaluate(visitor);
        });
        return true;
    };
    return PropertyContextExpression;
}(ContextExpression_1.ContextExpression));
exports.PropertyContextExpression = PropertyContextExpression;
//# sourceMappingURL=PropertyContextExpression.js.map