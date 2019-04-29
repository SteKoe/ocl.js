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
var NativeJsFunctionCallExpression = /** @class */ (function (_super) {
    __extends(NativeJsFunctionCallExpression, _super);
    function NativeJsFunctionCallExpression(source, fn, params) {
        var _this = _super.call(this, source) || this;
        _this.fn = fn;
        _this.params = (params || []).filter(function (param) { return !!param; });
        return _this;
    }
    NativeJsFunctionCallExpression.prototype.getFn = function () {
        return this.fn;
    };
    NativeJsFunctionCallExpression.prototype.getParams = function () {
        return this.params;
    };
    NativeJsFunctionCallExpression.prototype.evaluate = function (visitor, localVariables) {
        var source = this.getSource()
            .evaluate(visitor, localVariables);
        var params = this.getParams()
            .map(function (param) { return param.evaluate(visitor, localVariables); });
        if (!source) {
            return false;
        }
        var fn = source[this.getFn()];
        var isFunction = typeof fn === 'function';
        if (isFunction) {
            return fn.apply(source, params);
        }
        else {
            return false;
        }
    };
    return NativeJsFunctionCallExpression;
}(Expression_1.SourceBasedExpression));
exports.NativeJsFunctionCallExpression = NativeJsFunctionCallExpression;
//# sourceMappingURL=NativeJsFunctionCallExpression.js.map