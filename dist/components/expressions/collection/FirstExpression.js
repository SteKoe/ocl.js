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
exports.FirstExpression = void 0;
var Expression_1 = require("../Expression");
/**
 * Returns the first element of the collection.
 *
 * @oclExpression collection->first() : T
 * @oclExample self.collection->first()
 */
var FirstExpression = /** @class */ (function (_super) {
    __extends(FirstExpression, _super);
    function FirstExpression() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FirstExpression.prototype.evaluate = function (visitor, localVariables) {
        var source = this.getSource().evaluate(visitor, localVariables);
        if (source instanceof Array) {
            return source[0];
        }
    };
    return FirstExpression;
}(Expression_1.SourceBasedExpression));
exports.FirstExpression = FirstExpression;
//# sourceMappingURL=FirstExpression.js.map