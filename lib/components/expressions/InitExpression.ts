import { OclExecutionContext } from '../OclExecutionContext';
import { LocalVariables } from '../types';

import { Expression } from './Expression';

/**
 * An init expression specifies the initial value for a property.
 */
export class InitExpression extends Expression {
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
