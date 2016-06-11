import {Expression} from './abstractExpression'; 

class MathExpression extends Expression {
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

export class AdditionExpression extends MathExpression {
    evaluate(obj, variables) {
        var e = super.evaluate(obj, variables);
        return e.left + e.right;
    }
}

export class SubstractionExpression extends MathExpression {
    evaluate(obj, variables) {
        var e = super.evaluate(obj, variables);
        return e.left - e.right;
    }
}

export class MultiplyExpression extends MathExpression {
    evaluate(obj, variables) {
        var e = super.evaluate(obj, variables);
        return e.left * e.right;
    }
}

export class DivideExpression extends MathExpression {
    evaluate(obj, variables) {
        var e = super.evaluate(obj, variables);
        return e.left / e.right;
    }
}

export class ModuloExpression extends MathExpression {
    evaluate(obj, variables) {
        var e = super.evaluate(obj, variables);
        return e.left % e.right;
    }
}