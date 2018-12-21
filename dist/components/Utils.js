"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var expressions_1 = require("./expressions");
var LeftRightBasedExpression_1 = require("./expressions/LeftRightBasedExpression");
var Utils = /** @class */ (function () {
    function Utils() {
    }
    Utils.getClassName = function (obj) {
        if (typeof Utils.typeDeterminerFn === 'function') {
            return Utils.typeDeterminerFn(obj);
        }
        if (obj && obj.typeName) {
            return obj.typeName;
        }
        else if (typeof obj === 'function') {
            return Utils._getFunctionName(obj);
        }
        else if (typeof obj === 'object') {
            return Utils._getFunctionName(obj.constructor.toString());
        }
    };
    Utils._getFunctionName = function (fn) {
        var name = (fn || {}).toString()
            .split(' ')[1];
        name = name.substring(0, name.indexOf('('));
        return name.length > 0 ? name : undefined;
    };
    Utils.intersect = function (array1, array2) {
        return (array1 || []).filter(function (value) { return (array2 || []).indexOf(value) !== -1; });
    };
    Utils.getVariableName = function (expr) {
        var body = expr.getBody();
        if (body) {
            return Utils._findVariableExpression(body);
        }
    };
    Utils._findVariableExpression = function (expr) {
        if (expr instanceof expressions_1.VariableExpression) {
            return expr;
        }
        else if (expr instanceof expressions_1.SourceBasedExpression) {
            return Utils._findVariableExpression(expr.getSource());
        }
        else if (expr instanceof LeftRightBasedExpression_1.LeftRightBasedExpression) {
            return Utils._findVariableExpression(expr.getLeft()) || Utils._findVariableExpression(expr.getRight());
        }
    };
    Utils.ucfirst = function (s) {
        return s.charAt(0)
            .toUpperCase() + s.substr(1);
    };
    Utils.hashCode = function (s) {
        var hash = 0;
        if (s.length === 0)
            return hash;
        for (var i = 0; i < s.length; i++) {
            hash = ((hash << 5) - hash) + s.charCodeAt(i);
            hash |= 0;
        }
        return hash;
    };
    return Utils;
}());
exports.Utils = Utils;
//# sourceMappingURL=Utils.js.map