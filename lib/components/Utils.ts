import {BodyBasedExpression, Expression, SourceBasedExpression, VariableExpression} from './expressions';
import {LeftRightBasedExpression} from './expressions/LeftRightBasedExpression';
import {ucfirst} from "../utils/ucfirst";
import {hashCode} from "../utils/hashcode";

/**
 * Type for a function that determines the type name of an object.
 */
export type TypeDeterminerFn = (obj: unknown) => string;

export class Utils {
    /**
     * @deprecated This static field is deprecated and will be removed in a future version.
     * Use OclEngine.setTypeDeterminer() or OclEngine.setMetamodelProvider() instead.
     */
    static typeDeterminerFn: TypeDeterminerFn | undefined;

    /**
     * Determines the class/type name of a given object.
     *
     * Resolution order:
     * 1. If a typeDeterminerFn is provided, use it
     * 2. If the object has a `typeName` property, return it
     * 3. If the object is a function, parse its name from toString()
     * 4. If the object is an object, parse its constructor name
     * 5. Otherwise return undefined
     *
     * @param obj The object to determine the type of
     * @param typeDeterminerFn Optional custom type determiner function
     * @returns The type name as a string, or undefined if it cannot be determined
     */
    static getClassName(obj: unknown, typeDeterminerFn?: TypeDeterminerFn): string | undefined {
        // Use provided function first, then fall back to deprecated static field for backward compat
        const determiner = typeDeterminerFn ?? Utils.typeDeterminerFn;
        if (typeof determiner === 'function') {
            return determiner(obj);
        }

        if (obj && typeof obj === 'object' && 'typeName' in obj && typeof obj.typeName === 'string') {
            return obj.typeName;
        } else if (typeof obj === 'function') {
            return Utils._getFunctionName(obj.toString());
        } else if (obj && typeof obj === 'object') {
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
