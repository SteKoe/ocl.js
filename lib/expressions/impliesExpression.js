import Expression from './expression';

class ImpliesExpression extends Expression {
    constructor(left, right) {
        super();
        this.left = left;
        this.right = right;
    }

    evaluate(obj, variables) {
        let left = this.left.evaluate(obj, variables);
        let right = this.right.evaluate(obj, variables);

        if(left) {
            return right;
        } else {
            return true;
        }
    }
}

export default ImpliesExpression;
