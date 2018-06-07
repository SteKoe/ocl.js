import { VariableExpression } from './expressions'

export class Utils {
    static getClassName(obj) {
        if (typeof Utils.typeDeterminerFn === 'function') {
            return Utils.typeDeterminerFn(obj);
        }

        if (obj && obj.typeName) {
            return obj.typeName;
        } else if (typeof obj === 'function') {
            return Utils._getFunctionName(obj);
        } else if (typeof obj === 'object') {
            return Utils._getFunctionName(obj.constructor.toString());
        }
    }

    static _getFunctionName(fn) {
        let name = (fn || {}).toString().split(' ')[1];
        name = name.substring(0, name.indexOf('('));
        return name.length > 0 ? name : undefined;
    }

    static intersect(array1, array2) {
        return (array1 || []).filter(value => -1 !== (array2 || []).indexOf(value));
    }

    static getVariableName(expr) {
        let body = expr.body
        if (body) {
            return Utils._findVariableExpression(body);
        }
    }

    static _findVariableExpression(expr) {
        let variableExpression;

        if(!expr) {
            return variableExpression;
        } else if (expr instanceof VariableExpression) {
            variableExpression = expr;
        } else {
            variableExpression = Utils._findVariableExpression(expr.source) || Utils._findVariableExpression(expr.left) || Utils._findVariableExpression(expr.right);
        }

        return variableExpression;
    }

    static ucfirst(s) {
        return s.charAt(0).toUpperCase() + s.substr(1);
    }
}
