import { OclExecutionContext } from '../OclExecutionContext';
import { LeftRightBasedExpression } from './LeftRightBasedExpression';
/**
 */
export declare class OperationCallExpression extends LeftRightBasedExpression {
    private readonly operator;
    constructor(operator: Operator, left: any, right: any);
    evaluate(visitor: OclExecutionContext, localVariables?: any): boolean;
    private isOperator;
}
export declare enum Operator {
    NOT_EQUAL = "<>",
    LESS_EQUAL_THAN = "<=",
    GREATER_EQUAL_THAN = ">=",
    GREATER_THAN = ">",
    LESS_THAN = "<",
    EQUAL = "="
}
