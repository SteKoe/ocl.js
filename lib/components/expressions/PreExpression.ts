import { OclExecutionContext } from '@/OclExecutionContext';
import { LocalVariables } from '@/types';

import { Expression } from './Expression';

/**
 * A condition that has to be fulfilled before executing the operation addressed by the parent OperationCallExpression.
 */
export class PreExpression extends Expression {
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
