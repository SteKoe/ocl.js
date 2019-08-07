import { OclExecutionContext } from '../OclExecutionContext';

import { Expression } from './Expression';

/**
 * A condition that has to be fulfilled after the operation addressed by the parent OperationCallExpression has been executed.
 */
export class PostExpression extends Expression {
    private value: any;

    constructor(value) {
        super();
        this.value = value;
    }

    getValue(): Expression {
        return this.value;
    }

    evaluate(visitor: OclExecutionContext, localVariables?: any): any {
        return this.getValue().evaluate(visitor, localVariables);
    }
}
