import {BodyBasedExpression, Expression, SourceBasedExpression, VariableExpression} from './expressions';
import {LeftRightBasedExpression} from './expressions/LeftRightBasedExpression';
import {ucfirst} from "../utils/ucfirst";
import {hashCode} from "../utils/hashcode";

export class Utils {
    static typeDeterminerFn: (obj: any) => string;

    static getClassName(obj: any): string | undefined {
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

        return undefined;
    }

    static _getFunctionName(fn: string): string | undefined {
        const tokens = fn.match(/[A-Za-z_$][A-Za-z0-9_$]*/g);
        if (!tokens || tokens.length === 0) {
            return undefined;
        }
        if (['class', 'function'].includes(tokens[0]) && tokens.length > 1) {
            return tokens[1];
        }

        return tokens[0];
    }

    static intersect(array1: Array<any>, array2: Array<any>): Array<any> {
        return (array1 ?? []).filter((value: any) => (array2 ?? []).indexOf(value) !== -1);
    }

    static getVariableName(expr: BodyBasedExpression): VariableExpression | undefined {
        const body = expr.getBody();
        if (body) {
            // Body can be a single expression or array; we only search single expressions
            if (Array.isArray(body)) {
                return body.length > 0 ? Utils._findVariableExpression(body[0]) : undefined;
            }
            return Utils._findVariableExpression(body);
        }
        return undefined;
    }

    static _findVariableExpression(expr: Expression): VariableExpression | undefined {
        if (expr instanceof VariableExpression) {
            return expr;
        } else if (expr instanceof SourceBasedExpression) {
            return Utils._findVariableExpression(expr.getSource());
        } else if (expr instanceof LeftRightBasedExpression) {
            return Utils._findVariableExpression(expr.getLeft()) || Utils._findVariableExpression(expr.getRight());
        }
        return undefined;
    }
    
    static ucfirst(s: string) {
        return ucfirst(s);
    }

    static hashCode(s: string) {
        return hashCode(s);
    }
}
