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
var Expression_1 = require("../Expression");
var Utils_1 = require("../../Utils");
/**
 * Returns true if the given expr evaluated on the body returns only different values.
 *
 * @oclExpression isUnique(expr : oclExpression) : boolean
 * @oclExample self.collection->isUnique(self > 3)
 */
var IsUniqueExpression = /** @class */ (function (_super) {
    __extends(IsUniqueExpression, _super);
    function IsUniqueExpression() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IsUniqueExpression.prototype.evaluate = function (visitor) {
        var _this = this;
        var collection = this.getSource()
            .evaluate(visitor);
        if (collection instanceof Array) {
            var result = collection.map(function (c) {
                var body = _this.getBody();
                body.variables = {};
                if (_this.getIterators()) {
                    body.variables[_this.getIterators()[0]] = c;
                }
                else {
                    var variableName = Utils_1.Utils.getVariableName(_this);
                    body.variables[variableName.getVariable()] = c;
                }
                return body.evaluate(visitor);
            });
            return result.length === new Set(result).size;
        }
        else {
            return false;
        }
    };
    return IsUniqueExpression;
}(Expression_1.IteratorExpression));
exports.IsUniqueExpression = IsUniqueExpression;
//# sourceMappingURL=IsUniqueExpression.js.map