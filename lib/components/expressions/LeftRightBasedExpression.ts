import { OclExecutionContext } from '../OclExecutionContext';

import { Expression } from './Expression';

export abstract class LeftRightBasedExpression extends Expression {
    private readonly left: any;
    private readonly right: any;

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

    _evaluateLeftRightExpression(visitor: OclExecutionContext, localVariables?: any): { left: any, right: any } {
        const left = this.getLeft()
            .evaluate(visitor, localVariables);

        const right = this.getRight()
            .evaluate(visitor, localVariables);

        return {left, right};
    }
}
