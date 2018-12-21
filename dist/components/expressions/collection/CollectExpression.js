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
 * @oclSpecification
 * When we want to specify a collection that is derived from some other collection, but which contains different
 * objects from the original collection (i.e., it is not a sub-collection), we can use a collect operation.
 * The collect operation uses the same syntax as the select and reject.
 *
 * @oclExpression collect(expr : OclExpression) : Collection
 * @oclExample self.children->collect(age)
 */
var CollectExpression = /** @class */ (function (_super) {
    __extends(CollectExpression, _super);
    function CollectExpression() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CollectExpression.prototype.evaluate = function (visitor) {
        var _this = this;
        var collection = this.getSource()
            .evaluate(visitor);
        if (collection instanceof Array) {
            return collection.map(function (c) {
                _this.getBody().variables = {};
                if (_this.getIterators()) {
                    _this.getBody().variables[_this.getIterators()[0]] = c;
                }
                else {
                    var variableName = Utils_1.Utils.getVariableName(_this);
                    _this.getBody().variables[variableName.getSource().evaluate(visitor)] = c;
                }
                return _this.getBody()
                    .evaluate(visitor);
            });
        }
        else {
            return collection;
        }
    };
    return CollectExpression;
}(Expression_1.IteratorExpression));
exports.CollectExpression = CollectExpression;
//# sourceMappingURL=CollectExpression.js.map