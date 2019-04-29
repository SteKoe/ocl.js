import { LeftRightBasedExpression } from './LeftRightBasedExpression';
import { OclExecutionContext } from '../OclExecutionContext';

/**
 */
export class OperationCallExpression extends LeftRightBasedExpression {
    private operator: Operator;

    constructor(operator, left, right) {
        super(left, right);
        this.operator = operator;
    }

    getOperator(): Operator {
        return this.operator;
    }

    evaluate(visitor: OclExecutionContext, localVariables?: any): boolean {
        const {left, right} = this._evaluateLeftRightExpression(visitor, localVariables);

        if (this.getOperator() === Operator.NOT_EQUAL) {
            return left !== right;
        } else if (this.getOperator() === Operator.LESS_EQUAL_THAN) {
            return left <= right;
        } else if (this.getOperator() === Operator.GREATER_EQUAL_THAN) {
            return left >= right;
        } else if (this.getOperator() === Operator.GREATER_THAN) {
            return left > right;
        } else if (this.getOperator() === Operator.LESS_THAN) {
            return left < right;
        } else if (this.getOperator() === Operator.EQUAL) {
            return left === right;
        }
    }
}

export enum Operator {
    NOT_EQUAL = '<>',
    LESS_EQUAL_THAN = '<=',
    GREATER_EQUAL_THAN = '>=',
    GREATER_THAN = '>',
    LESS_THAN = '<',
    EQUAL = '='
}
