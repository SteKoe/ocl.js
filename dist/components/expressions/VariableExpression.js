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
exports.VariableExpression = void 0;
var Expression_1 = require("./Expression");
/**
 * Resolve variables. Simple values are returned as is (e.g. self.age: number), collections are aggregated.
 */
var VariableExpression = /** @class */ (function (_super) {
    __extends(VariableExpression, _super);
    function VariableExpression(source) {
        var _this = _super.call(this, source) || this;
        _this.variable = source;
        return _this;
    }
    VariableExpression.prototype.getVariable = function () {
        return this.variable;
    };
    VariableExpression.prototype.evaluate = function (visitor, localVariables) {
        var obj;
        var _variables = localVariables;
        var source = this.getVariable();
        var parts = source.split('.');
        if (parts[0] === 'self') {
            parts.shift();
            obj = (_variables && _variables['self']) || visitor.getObjectToEvaluate();
        }
        else if (_variables === undefined) {
            var type = visitor.getRegisteredType(source);
            if (type) {
                return type;
            }
            else {
                obj = visitor.getObjectToEvaluate();
            }
        }
        else {
            obj = _variables;
        }
        return visitor.getRegisteredType(obj) || _resolvePath(obj, parts.join('.'));
        function _resolvePath(object, reference) {
            return reference.split('.')
                .reduce(dot_deref, object);
            function dot_deref(o, ref) {
                if (!o)
                    return;
                o = isIterable(o) ? Array.from(o) : o;
                return !ref ? o : ref.split('[')
                    .reduce(arr_deref, o);
            }
            function arr_deref(o, ref, i) {
                if (!o)
                    return;
                if (!ref) {
                    return o;
                }
                else {
                    var prop_1 = ref.slice(0, i ? -1 : ref.length);
                    if (Array.isArray(o)) {
                        return o
                            .map(function (c) { return c[prop_1]; })
                            .reduce(function (prev, cur) {
                            if (Array.isArray(cur)) {
                                prev.push.apply(prev, cur);
                            }
                            else {
                                prev.push(cur);
                            }
                            return prev;
                        }, []);
                    }
                    else {
                        return o[prop_1];
                    }
                }
            }
        }
        function isIterable(iterableObject) {
            if (!iterableObject) {
                return false;
            }
            return iterableObject instanceof Array || iterableObject instanceof Set;
        }
    };
    return VariableExpression;
}(Expression_1.SourceBasedExpression));
exports.VariableExpression = VariableExpression;
//# sourceMappingURL=VariableExpression.js.map