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
/**
 * @oclSpecification
 * Many times a constraint is needed on all elements of a collection.
 * The forAll operation in OCL allows specifying a Boolean expression, which must hold for all objects in a collection.
 *
 * @oclExpression forAll(expr : oclExpression)
 */
var ForAllExpression = /** @class */ (function (_super) {
    __extends(ForAllExpression, _super);
    function ForAllExpression() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ForAllExpression.prototype.evaluate = function (visitor, localVariables) {
        var _this = this;
        var collection = this.getSource()
            .evaluate(visitor);
        if (collection instanceof Array) {
            var iterators = this.getIterators();
            var body_1 = this.getBody();
            if (!iterators || iterators.length === 0) {
                return false;
            }
            else if (iterators.length === 1) {
                return !collection.some(function (c) {
                    var _a;
                    return body_1.evaluate(visitor, (_a = {}, _a[_this.getIterators()[0]] = c, _a)) === false;
                });
            }
            else if (iterators.length === 2) {
                var sourceLength = collection.length;
                for (var i = 0; i < sourceLength; i++) {
                    var variables = {};
                    variables[iterators[0]] = collection[i];
                    for (var j = i + 1; j < sourceLength; j++) {
                        variables[iterators[1]] = collection[j];
                        var items = body_1.evaluate(visitor, __assign({}, localVariables, variables));
                        if (items === false) {
                            return false;
                        }
                    }
                }
                return true;
            }
        }
        else {
            return false;
        }
    };
    return ForAllExpression;
}(Expression_1.IteratorExpression));
exports.ForAllExpression = ForAllExpression;
//# sourceMappingURL=ForAllExpression.js.map