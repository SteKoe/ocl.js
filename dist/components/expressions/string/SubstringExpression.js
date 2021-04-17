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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubstringExpression = void 0;
var Expression_1 = require("../Expression");
/**
 * Returns a string containing all characters from self starting from index *start* up to index *end* included.
 * Both *start* and *end* parameters should be contained between *1* and *self.size()* included.
 * *start* cannot be greater than *end*.
 *
 * @oclExpression String::substring (start : Number, end : Number) : String
 * @oclExample self.name.substring(0,2)
 */
var SubstringExpression = /** @class */ (function (_super) {
    __extends(SubstringExpression, _super);
    function SubstringExpression() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SubstringExpression.prototype.evaluate = function (visitor, localVariables) {
        var source = this.getSource().evaluate(visitor, localVariables);
        if (!this.getBody()) {
            return source;
        }
        var start;
        var end;
        if (Array.isArray(this.getBody())) {
            start = this.getBody()[0];
            end = this.getBody()[1];
        }
        else {
            start = this.getBody();
        }
        var startIndex = start.evaluate(visitor, localVariables);
        var endIndex = end ? end.evaluate(visitor, localVariables) : source.length;
        return source.substring(startIndex, endIndex);
    };
    return SubstringExpression;
}(Expression_1.BodyBasedExpression));
exports.SubstringExpression = SubstringExpression;
//# sourceMappingURL=SubstringExpression.js.map