import {LeftRightBasedExpression} from './Expression';
import {OclExecutionContext} from '../OclExecutionContext';
import * as Expr from './index';

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

    evaluate(visitor: OclExecutionContext): boolean {
        const {left, right} = this._visitLeftRightExpression(visitor);

        if (this.getOperator() === Expr.Operator.NOT_EQUAL) {
            return left !== right;
        } else if (this.getOperator() === Expr.Operator.LESS_EQUAL_THAN) {
            return left <= right;
        } else if (this.getOperator() === Expr.Operator.GREATER_EQUAL_THAN) {
            return left >= right;
        } else if (this.getOperator() === Expr.Operator.GREATER_THAN) {
            return left > right;
        } else if (this.getOperator() === Expr.Operator.LESS_THAN) {
            return left < right;
        } else if (this.getOperator() === Expr.Operator.EQUAL) {
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
