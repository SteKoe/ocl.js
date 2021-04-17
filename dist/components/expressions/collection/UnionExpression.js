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
exports.UnionExpression = void 0;
var Expression_1 = require("../Expression");
/**
 * Returns a collection containing all elements of self and all elements of the passed in collection.
 *
 * @oclExpression union(c : Collection) : Collection
 * @oclExample self.collection->union(self.anotherCollection)
 */
var UnionExpression = /** @class */ (function (_super) {
    __extends(UnionExpression, _super);
    function UnionExpression() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UnionExpression.prototype.evaluate = function (visitor, localVariables) {
        var source = this.getSource()
            .evaluate(visitor, localVariables);
        var body = this.getBody()
            .evaluate(visitor, localVariables);
        if (source instanceof Array && body instanceof Array) {
            return source.concat(body);
        }
        return [];
    };
    return UnionExpression;
}(Expression_1.BodyBasedExpression));
exports.UnionExpression = UnionExpression;
//# sourceMappingURL=UnionExpression.js.map