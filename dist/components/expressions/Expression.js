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
exports.IteratorExpression = exports.BodyBasedExpression = exports.SourceBasedExpression = exports.Expression = void 0;
var Expression = /** @class */ (function () {
    function Expression() {
        this.type = this.constructor.name;
    }
    Expression.prototype.accept = function (obj) {
        return true;
    };
    Expression.prototype.evaluate = function (visitor, localVariables) {
        throw new Error("Visitor for '" + this.type + "' not yet implemented!");
    };
    return Expression;
}());
exports.Expression = Expression;
var SourceBasedExpression = /** @class */ (function (_super) {
    __extends(SourceBasedExpression, _super);
    function SourceBasedExpression(source) {
        var _this = _super.call(this) || this;
        _this.source = source;
        return _this;
    }
    SourceBasedExpression.prototype.getSource = function () {
        return this.source;
    };
    return SourceBasedExpression;
}(Expression));
exports.SourceBasedExpression = SourceBasedExpression;
var BodyBasedExpression = /** @class */ (function (_super) {
    __extends(BodyBasedExpression, _super);
    function BodyBasedExpression() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BodyBasedExpression.prototype.setBody = function (body) {
        this.body = body;
    };
    BodyBasedExpression.prototype.getBody = function () {
        return this.body;
    };
    BodyBasedExpression.prototype._evaluateBodyAndSource = function (visitor, localVariables) {
        var body = this.getSource()
            .evaluate(visitor, localVariables);
        var source = this.getBody()
            .evaluate(visitor, localVariables);
        return { source: source, body: body };
    };
    return BodyBasedExpression;
}(SourceBasedExpression));
exports.BodyBasedExpression = BodyBasedExpression;
var IteratorExpression = /** @class */ (function (_super) {
    __extends(IteratorExpression, _super);
    function IteratorExpression() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IteratorExpression.prototype.setIterators = function (iterators) {
        this.iterators = iterators;
    };
    IteratorExpression.prototype.getIterators = function () {
        return this.iterators;
    };
    return IteratorExpression;
}(BodyBasedExpression));
exports.IteratorExpression = IteratorExpression;
//# sourceMappingURL=Expression.js.map