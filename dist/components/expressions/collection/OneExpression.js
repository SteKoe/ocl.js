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
var Expression_1 = require("../Expression");
var SelectExpression_1 = require("./SelectExpression");
/**
 * Returns true of there is exactly one element matching the given expression, false otherwise.
 *
 * @oclExpression one(expr : oclExpression) : boolean
 * @oclExample self.collection->one(age < 18)
 */
var OneExpression = /** @class */ (function (_super) {
    __extends(OneExpression, _super);
    function OneExpression() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OneExpression.prototype.evaluate = function (visitor, localVariables) {
        var selectExpression = new SelectExpression_1.SelectExpression(this.getSource());
        selectExpression.setBody(this.getBody());
        selectExpression.setIterators(this.getIterators());
        var result = selectExpression.evaluate(visitor, localVariables);
        return result.length === 1;
    };
    return OneExpression;
}(Expression_1.IteratorExpression));
exports.OneExpression = OneExpression;
//# sourceMappingURL=OneExpression.js.map