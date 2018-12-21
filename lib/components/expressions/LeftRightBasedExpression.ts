import { OclExecutionContext } from '../OclExecutionContext';
import { Expression } from './Expression';

export abstract class LeftRightBasedExpression extends Expression {
    private left: any;
    private right: any;

    constructor(left, right) {
        super();
        this.left = left;
        this.right = right;
    }

    getLeft(): Expression {
        return this.left;
    }

    getRight(): Expression {
        return this.right;
    }

    _visitLeftRightExpression(visitor: OclExecutionContext): { left: any, right: any } {
        this.getLeft().variables = this.variables;
        const left = this.getLeft()
            .evaluate(visitor);

        this.getRight().variables = this.variables;
        const right = this.getRight()
            .evaluate(visitor);

        return {left, right};
    }
}
