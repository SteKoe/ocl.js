import {BodyBasedExpression, Expression, SourceBasedExpression, VariableExpression} from './expressions';
import {LeftRightBasedExpression} from './expressions/LeftRightBasedExpression';
import {ucfirst} from "../utils/ucfirst";
import {hashCode} from "../utils/hashcode";

export class Utils {
    static typeDeterminerFn: (obj: any) => string;

    static getClassName(obj: any): string {
        if (typeof Utils.typeDeterminerFn === 'function') {
            return Utils.typeDeterminerFn(obj);
        }

        if (obj?.typeName) {
            return obj.typeName;
        } else if (typeof obj === 'function') {
            return Utils._getFunctionName(obj.toString());
        } else if (typeof obj === 'object') {
            return Utils._getFunctionName(obj.constructor.toString());
        }
    }

    static _getFunctionName(fn): string {
        const tokens = fn.match(/[A-Za-z_$][A-Za-z0-9_$]*/g);
        if (!tokens || tokens.length === 0) {
            return undefined;
        }
        if (['class', 'function'].includes(tokens[0]) && tokens.length > 1) {
            return tokens[1];
        }

        return tokens[0];
    }

    static intersect(array1, array2): Array<any> {
        return (array1 ?? []).filter(value => (array2 ?? []).indexOf(value) !== -1);
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
    
    static ucfirst(s: string) {
        return ucfirst(s);
    }

    static hashCode(s: string) {
        return hashCode(s);
    }
}
