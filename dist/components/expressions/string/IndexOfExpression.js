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
/**
 * Returns the index of the given string in self or 0 if it is not condained.
 *
 * @oclExpression String::indexOf (s : String) : Number
 * @oclExample self.name.indexOf("string")
 */
var IndexOfExpression = /** @class */ (function (_super) {
    __extends(IndexOfExpression, _super);
    function IndexOfExpression() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IndexOfExpression.prototype.evaluate = function (visitor) {
        var source = this.getSource()
            .evaluate(visitor);
        var indexOfString = this.getBody()
            .evaluate(visitor);
        return indexOfString.length === 0 ? 0 : source.indexOf(indexOfString) + 1;
    };
    return IndexOfExpression;
}(Expression_1.BodyBasedExpression));
exports.IndexOfExpression = IndexOfExpression;
//# sourceMappingURL=IndexOfExpression.js.map