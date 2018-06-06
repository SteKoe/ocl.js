import { Expression } from "./Expression";

export class OperationCallExpression extends Expression {
    constructor(operator, left, right) {
        super();
        this.operator = operator;
        this.left = left;
        this.right = right;
    }

    visit(visitor) {
        return visitor.visitOperationCallExpression(this);
    }
}

export const Operator = {
    NOT_EQUAL: '<>',
    LESS_EQUAL_THAN: '<=',
    GREATER_EQUAL_THAN: '>=',
    GREATER_THAN: '>',
    LESS_THAN: '<',
    EQUAL: '='
}