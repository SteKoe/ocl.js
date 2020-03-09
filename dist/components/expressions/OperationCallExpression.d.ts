import { OclExecutionContext } from '../OclExecutionContext';
import { LeftRightBasedExpression } from './LeftRightBasedExpression';
/**
 */
export declare class OperationCallExpression extends LeftRightBasedExpression {
    private operator;
    constructor(operator: any, left: any, right: any);
    getOperator(): Operator;
    evaluate(visitor: OclExecutionContext, localVariables?: any): boolean;
}
export declare enum Operator {
    NOT_EQUAL = "<>",
    LESS_EQUAL_THAN = "<=",
    GREATER_EQUAL_THAN = ">=",
    GREATER_THAN = ">",
    LESS_THAN = "<",
    EQUAL = "="
}
