import {
    BodyBasedExpression,
    Expression,
    SourceBasedExpression,
    VariableExpression
} from './expressions';
import { LeftRightBasedExpression } from './expressions/LeftRightBasedExpression';

export class Utils {
    static typeDeterminerFn: (obj: any) => string;

    static getClassName(obj: any): string {
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

    static _getFunctionName(fn): string {
        let name = (fn || {}).toString()
            .split(' ')[1];
        name = name.substring(0, name.indexOf('('));

        return name.length > 0 ? name : undefined;
    }

    static intersect(array1, array2): Array<any> {
        return (array1 || []).filter(value => (array2 || []).indexOf(value) !== -1);
    }

    static getVariableName(expr: BodyBasedExpression): VariableExpression {
        const body = expr.getBody();
        if (body) {
            return Utils._findVariableExpression(body);
        }
    }

    static _findVariableExpression(expr: Expression): VariableExpression {
        if (expr instanceof VariableExpression) {
            return expr;
        } else if (expr instanceof SourceBasedExpression) {
            return Utils._findVariableExpression(expr.getSource());
        } else if (expr instanceof LeftRightBasedExpression) {
            return Utils._findVariableExpression(expr.getLeft()) || Utils._findVariableExpression(expr.getRight());
        }
    }

    static ucfirst(s: string): string {
        return s.charAt(0)
            .toUpperCase() + s.substr(1);
    }

    static hashCode(s: string): number {
        let hash = 0;
        if (s.length === 0) return hash;
        for (let i = 0; i < s.length; i++) {
            hash  = ((hash << 5) - hash) + s.charCodeAt(i);
            hash |= 0;
        }

        return hash;
    }
}
