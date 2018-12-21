import { LeftRightBasedExpression } from './LeftRightBasedExpression';
import { OclExecutionContext } from '../OclExecutionContext';
/**
 */
export declare class OperationCallExpression extends LeftRightBasedExpression {
    private operator;
    constructor(operator: any, left: any, right: any);
    getOperator(): Operator;
    evaluate(visitor: OclExecutionContext): boolean;
}
export declare enum Operator {
    NOT_EQUAL = "<>",
    LESS_EQUAL_THAN = "<=",
    GREATER_EQUAL_THAN = ">=",
    GREATER_THAN = ">",
    LESS_THAN = "<",
    EQUAL = "="
}
