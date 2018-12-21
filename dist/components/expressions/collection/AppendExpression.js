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
 * Appends the given element to the given collection and returns the extended collection.
 *
 * @oclExpression append(elem : T) : Collection<T>
 * @oclExample self.collection->append("string")
 */
var AppendExpression = /** @class */ (function (_super) {
    __extends(AppendExpression, _super);
    function AppendExpression() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AppendExpression.prototype.evaluate = function (visitor) {
        var source = this.getSource()
            .evaluate(visitor);
        var body = this.getBody() ? this.getBody()
            .evaluate(visitor) : undefined;
        if (Array.isArray(source) && !!body) {
            source.push(body);
        }
        return source;
    };
    return AppendExpression;
}(Expression_1.BodyBasedExpression));
exports.AppendExpression = AppendExpression;
//# sourceMappingURL=AppendExpression.js.map