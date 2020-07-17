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
exports.PackageDeclaration = void 0;
var Utils_1 = require("../Utils");
var Expression_1 = require("./Expression");
/**
 * In order to group and organise OCL constraints, packages can be used.
 */
var PackageDeclaration = /** @class */ (function (_super) {
    __extends(PackageDeclaration, _super);
    function PackageDeclaration(type, contexts) {
        var _this = _super.call(this) || this;
        _this.contexts = contexts;
        return _this;
    }
    PackageDeclaration.prototype.accept = function (visitor) {
        var labelsToExecute = visitor.getLabelsToExecute();
        if (labelsToExecute.length === 0 || this.labels.length === 0) {
            return true;
        }
        var anies = Utils_1.Utils.intersect(this.labels, labelsToExecute);
        return anies.length > 0;
    };
    PackageDeclaration.prototype.getContexts = function () {
        return this.contexts;
    };
    PackageDeclaration.prototype.setExecutionLabels = function (labels) {
        this.labels = labels;
    };
    PackageDeclaration.prototype.setRawOclExpression = function (oclExpression) {
        this.oclExpression = oclExpression;
    };
    PackageDeclaration.prototype.getRawOclExpression = function () {
        return this.oclExpression;
    };
    PackageDeclaration.prototype.evaluate = function (visitor) {
        if (this.accept(visitor)) {
            var contextsToVisit = this.getContexts()
                .filter(function (ctx) { return ctx.accept(visitor); });
            var evaluationResult = !contextsToVisit
                .map(function (ctx) { return ctx.evaluate(visitor); })
                .some(function (inv) { return inv === false; });
            visitor.setEvaluationResult(evaluationResult);
        }
        return this;
    };
    return PackageDeclaration;
}(Expression_1.Expression));
exports.PackageDeclaration = PackageDeclaration;
//# sourceMappingURL=PackageDeclaration.js.map