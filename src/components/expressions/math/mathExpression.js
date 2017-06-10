import {Expression} from '../expression';

export class MathExpression extends Expression {
    constructor(left, right) {
        super();
        this.left = left;
        this.right = right;
    }

    evaluate(obj, variables) {
        let left = this.left.evaluate(obj, variables);
        let right = this.right.evaluate(obj, variables);
        right = this.right.left ? this.right.left.evaluate(obj) : right;
        return {left, right}
    }
}
