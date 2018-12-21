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
 * Returns the first element that validates the given expression.
 *
 * @oclExpression any(expr : OclExpression) : T
 * @oclExample self.collection->any(i < 2)
 */
var AnyExpression = /** @class */ (function (_super) {
    __extends(AnyExpression, _super);
    function AnyExpression() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AnyExpression.prototype.evaluate = function (visitor) {
        var _this = this;
        var collection = this.getSource()
            .evaluate(visitor);
        if (collection instanceof Array) {
            return collection.find(function (c) {
                _this.getBody().variables = {};
                if (_this.getIterators()) {
                    _this.getBody().variables[_this.getIterators()[0]] = c;
                }
                else {
                    var variableName = Utils_1.Utils.getVariableName(_this);
                    _this.getBody().variables[variableName.getVariable()] = c[variableName.getVariable()] || c;
                }
                return _this.getBody()
                    .evaluate(visitor);
            });
        }
        return;
    };
    return AnyExpression;
}(Expression_1.IteratorExpression));
exports.AnyExpression = AnyExpression;
//# sourceMappingURL=AnyExpression.js.map