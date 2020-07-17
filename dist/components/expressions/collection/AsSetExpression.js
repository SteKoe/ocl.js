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
exports.AsSetExpression = void 0;
var Expression_1 = require("../Expression");
/**
 * Returns the given collection as set, containing unique entries.
 *
 * @oclExpression asSet() : Collection
 * @oclExample self.collection->asSet()
 */
var AsSetExpression = /** @class */ (function (_super) {
    __extends(AsSetExpression, _super);
    function AsSetExpression() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AsSetExpression.prototype.evaluate = function (visitor, localVariables) {
        var source = this.getSource()
            .evaluate(visitor, localVariables);
        if (source instanceof Array) {
            return Array.from(new Set(source));
        }
    };
    return AsSetExpression;
}(Expression_1.SourceBasedExpression));
exports.AsSetExpression = AsSetExpression;
//# sourceMappingURL=AsSetExpression.js.map