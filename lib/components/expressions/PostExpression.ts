import { Expression } from './Expression';
import { OclExecutionContext } from '../OclExecutionContext';

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

    evaluate(visitor: OclExecutionContext): any {
        const value = this.getValue();
        value.variables = this.variables;

        return value
            .evaluate(visitor);
    }
}
