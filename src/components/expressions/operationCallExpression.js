import {Expression} from './abstractExpression'; 

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
        if (this.operator === '<>') {
            return left !== right;
        } else if (this.operator === '<=') {
            return left <= right;
        } else if (this.operator === '>=') {
            return left >= right;
        } else if (this.operator === '>') {
            return left > right;
        } else if (this.operator === '<') {
            return left < right;
        } else if (this.operator === '=') {
            return left === right;
        }

        throw new SyntaxError(`Unhandled operator found: '${this.operator}'`)
    }
}
