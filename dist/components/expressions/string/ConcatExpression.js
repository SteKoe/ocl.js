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
/**
 * Returns a string that is concatenated using source and body
 *
 * @oclExpression String::concat (s : String) : String
 * @oclExample self.name.concat("string")
 */
var ConcatExpression = /** @class */ (function (_super) {
    __extends(ConcatExpression, _super);
    function ConcatExpression() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ConcatExpression.prototype.evaluate = function (visitor, localVariables) {
        var source = this.getSource().evaluate(visitor, localVariables);
        var body = this.getBody().evaluate(visitor, localVariables);
        return String(source).concat(String(body));
    };
    return ConcatExpression;
}(Expression_1.BodyBasedExpression));
exports.ConcatExpression = ConcatExpression;
//# sourceMappingURL=ConcatExpression.js.map