import Expression from './expression';

class OrExpression extends Expression {
    constructor(left, right) {
        super();
        this.left = left;
        this.right = right;
    }

    evaluate(obj, variables) {
        const left = this.left.evaluate(obj, variables);
        const right = this.right.evaluate(obj, variables);

        return left || right;
    }
}

export default OrExpression;
