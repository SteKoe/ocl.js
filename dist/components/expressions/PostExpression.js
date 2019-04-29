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
var Expression_1 = require("./Expression");
/**
 * A condition that has to be fulfilled after the operation addressed by the parent OperationCallExpression has been executed.
 */
var PostExpression = /** @class */ (function (_super) {
    __extends(PostExpression, _super);
    function PostExpression(value) {
        var _this = _super.call(this) || this;
        _this.value = value;
        return _this;
    }
    PostExpression.prototype.getValue = function () {
        return this.value;
    };
    PostExpression.prototype.evaluate = function (visitor, localVariables) {
        return this.getValue().evaluate(visitor, localVariables);
    };
    return PostExpression;
}(Expression_1.Expression));
exports.PostExpression = PostExpression;
//# sourceMappingURL=PostExpression.js.map