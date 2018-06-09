import { LeftRightBasedExpression } from './Expression';
import { OclVisitor } from '../OclVisitor';

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

    visit(visitor: OclVisitor): boolean {
        return visitor.visitOperationCallExpression(this);
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
