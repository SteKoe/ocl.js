import { OclExecutionContext } from '@/OclExecutionContext';
import { LocalVariables } from '@/types';

import { Expression } from './Expression';

/**
 * A condition that has to be fulfilled after the operation addressed by the parent OperationCallExpression has been executed.
 */
export class PostExpression extends Expression {
    private readonly value: Expression;

    constructor(value: Expression) {
        super();
        this.value = value;
    }

    getValue(): Expression {
        return this.value;
    }

    evaluate(visitor: OclExecutionContext, localVariables?: LocalVariables): unknown {
        return this.getValue().evaluate(visitor, localVariables);
    }
}
