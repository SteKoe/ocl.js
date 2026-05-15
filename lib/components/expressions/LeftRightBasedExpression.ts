import {OclExecutionContext} from '../OclExecutionContext';
import {LocalVariables, LeftRightResult} from '../types';
import {Expression} from './Expression';

export abstract class LeftRightBasedExpression extends Expression {
    private readonly left: Expression;
    private readonly right: Expression;

    constructor(left: Expression, right: Expression) {
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

    _evaluateLeftRightExpression(visitor: OclExecutionContext, localVariables?: LocalVariables): LeftRightResult {
        const left = this.getLeft()
            .evaluate(visitor, localVariables);

        const right = this.getRight()
            .evaluate(visitor, localVariables);

        return {left, right};
    }
}
