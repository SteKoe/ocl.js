import {OclExecutionContext} from '@/OclExecutionContext';
import {LocalVariables} from '@/types';

import {Expression} from './Expression';
import {LeftRightBasedExpression} from './LeftRightBasedExpression';

/**
 * Represents a comparison operation between two expressions.
 */
export class OperationCallExpression extends LeftRightBasedExpression {
    private readonly operator: Operator;

    constructor(operator: Operator, left: Expression, right: Expression) {
        super(left, right);
        this.operator = operator;
    }

    evaluate(visitor: OclExecutionContext, localVariables?: LocalVariables): boolean {
        const {left, right} = this._evaluateLeftRightExpression(visitor, localVariables);

        switch (this.operator) {
            case Operator.NOT_EQUAL:
                return visitor.setEvaluatedValue(this, left !== right) as boolean;
            case Operator.EQUAL:
                return visitor.setEvaluatedValue(this, left === right) as boolean;
            case Operator.LESS_EQUAL_THAN:
                return visitor.setEvaluatedValue(this, (left as number) <= (right as number)) as boolean;
            case Operator.GREATER_EQUAL_THAN:
                return visitor.setEvaluatedValue(this, (left as number) >= (right as number)) as boolean;
            case Operator.GREATER_THAN:
                return visitor.setEvaluatedValue(this, (left as number) > (right as number)) as boolean;
            case Operator.LESS_THAN:
                return visitor.setEvaluatedValue(this, (left as number) < (right as number)) as boolean;
            default:
                throw new Error(`Unknown operator: ${this.operator}`);
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
