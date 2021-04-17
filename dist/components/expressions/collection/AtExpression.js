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
exports.AtExpression = void 0;
var Expression_1 = require("../Expression");
/**
 * Returns the element of the collection at index index.
 *
 * @oclExpression at(index : Number) : T
 * @oclExample self.collection->at(2)
 */
var AtExpression = /** @class */ (function (_super) {
    __extends(AtExpression, _super);
    function AtExpression() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AtExpression.prototype.evaluate = function (visitor, localVariables) {
        var source = this.getSource().evaluate(visitor, localVariables);
        var index = this.getBody().evaluate(visitor, localVariables);
        if (source instanceof Array && Number.isInteger(index) && index >= 1 && index < source.length) {
            return source[index - 1];
        }
    };
    return AtExpression;
}(Expression_1.BodyBasedExpression));
exports.AtExpression = AtExpression;
//# sourceMappingURL=AtExpression.js.map