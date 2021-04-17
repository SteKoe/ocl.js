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
exports.IsUniqueExpression = void 0;
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
    IsUniqueExpression.prototype.evaluate = function (visitor, localVariables) {
        var _this = this;
        var collection = this.getSource()
            .evaluate(visitor);
        var body = this.getBody();
        var iterators = this.getIterators();
        if (collection instanceof Array) {
            var result = collection.map(function (c) {
                var variables = {};
                if (iterators) {
                    variables[iterators[0]] = c;
                }
                else {
                    var variableName = Utils_1.Utils.getVariableName(_this);
                    variables[variableName.getVariable()] = c;
                }
                return body.evaluate(visitor, __assign(__assign({}, localVariables), variables));
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