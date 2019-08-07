import { OclExecutionContext } from '../OclExecutionContext';

import { Expression } from './Expression';

/**
 * A condition that has to be fulfilled before executing the operation addressed by the parent OperationCallExpression.
 */
export class PreExpression extends Expression {
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
