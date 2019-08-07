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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var Expression_1 = require("../Expression");
var Utils_1 = require("../../Utils");
/**
 * Operation which checks whether a collection contains an element specified by expr.
 *
 * @oclExpression exists(expr : OclExpression) : Boolean
 * @oclExample self.collection->exists(i | i < 2)
 */
var ExistsExpression = /** @class */ (function (_super) {
    __extends(ExistsExpression, _super);
    function ExistsExpression() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ExistsExpression.prototype.evaluate = function (visitor, localVariables) {
        var _this = this;
        var collection = this.getSource()
            .evaluate(visitor);
        if (collection instanceof Array) {
            return collection.some(function (c) {
                var variables = {};
                if (_this.getIterators()) {
                    variables[_this.getIterators()[0]] = c;
                }
                else {
                    var variableName = Utils_1.Utils.getVariableName(_this);
                    variables[variableName.getVariable()] = c[variableName.getVariable()];
                }
                var visitResult = _this.getBody().evaluate(visitor, __assign({}, localVariables, variables));
                return visitResult === true;
            });
        }
        else {
            return false;
        }
    };
    return ExistsExpression;
}(Expression_1.IteratorExpression));
exports.ExistsExpression = ExistsExpression;
//# sourceMappingURL=ExistsExpression.js.map