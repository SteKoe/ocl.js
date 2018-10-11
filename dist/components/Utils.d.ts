import { BodyBasedExpression, Expression, VariableExpression } from './expressions';
export declare class Utils {
    static typeDeterminerFn: Function;
    static getClassName(obj: any): string;
    static _getFunctionName(fn: any): string;
    static intersect(array1: any, array2: any): Array<any>;
    static getVariableName(expr: BodyBasedExpression): VariableExpression;
    static _findVariableExpression(expr: Expression): VariableExpression;
    static ucfirst(s: string): string;
    static hashCode(s: string): number;
}
