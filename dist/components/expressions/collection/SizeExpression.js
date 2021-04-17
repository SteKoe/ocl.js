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
exports.SizeExpression = void 0;
var Expression_1 = require("../Expression");
/**
 * Returns the size of the given collection.
 *
 * @oclExpression size() : Number
 * @oclExample self.collection->size()
 */
var SizeExpression = /** @class */ (function (_super) {
    __extends(SizeExpression, _super);
    function SizeExpression() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SizeExpression.prototype.evaluate = function (visitor, localVariables) {
        var source = this.getSource().evaluate(visitor, localVariables);
        if (source && (source instanceof Array || typeof source === 'string')) {
            return source.length;
        }
        else {
            return 0;
        }
    };
    return SizeExpression;
}(Expression_1.SourceBasedExpression));
exports.SizeExpression = SizeExpression;
//# sourceMappingURL=SizeExpression.js.map