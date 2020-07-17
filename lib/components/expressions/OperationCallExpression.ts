import { OclExecutionContext } from '../OclExecutionContext';

import { LeftRightBasedExpression } from './LeftRightBasedExpression';

/**
 */
export class OperationCallExpression extends LeftRightBasedExpression {
    private readonly operator: Operator;

    constructor(operator: Operator, left: any, right: any) {
        super(left, right);
        this.operator = operator;
    }

    evaluate(visitor: OclExecutionContext, localVariables?: any): boolean {
        const {left, right} = this._evaluateLeftRightExpression(visitor, localVariables);

        // tslint:disable-next-line:switch-default
        switch (this.operator) {
            case Operator.NOT_EQUAL: return  left !== right;
            case Operator.EQUAL: return  left === right;
            case Operator.LESS_EQUAL_THAN: return  left <= right;
            case Operator.GREATER_EQUAL_THAN: return  left >= right;
            case Operator.GREATER_THAN: return  left > right;
            case Operator.LESS_THAN: return  left < right;
        }
    }

    private isOperator(operator: Operator): boolean {
        return this.operator === operator;
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
