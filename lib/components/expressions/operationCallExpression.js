import {Expression} from "./expression";

export class OperationCallExpression extends Expression {
    constructor(operator, left, right) {
        super();
        this.operator = operator;
        this.left = left;
        this.right = right;
    }

    evaluate(obj, variables) {
        const left = this.left.evaluate(obj, variables);
        const right = this.right.evaluate(obj, variables);

        if (this.operator === Operator.NOT_EQUAL) {
            return left !== right;
        } else if (this.operator === Operator.LESS_EQUAL_THAN) {
            return left <= right;
        } else if (this.operator === Operator.GREATER_EQUAL_THAN) {
            return left >= right;
        } else if (this.operator === Operator.GREATER_THAN) {
            return left > right;
        } else if (this.operator === Operator.LESS_THAN) {
            return left < right;
        } else if (this.operator === Operator.EQUAL) {
            return left === right;
        }

        throw new SyntaxError(`Unhandled operator found: '${this.operator}'`)
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