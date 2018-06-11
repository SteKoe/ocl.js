import { Expression } from './Expression';
import { OclExecutionContext } from '../OclExecutionContext';

/**
 * A derived value expression is an expression that may be linked to a property
 */
export class DeriveExpression extends Expression {
    private value: any;

    constructor(value) {
        super();
        this.value = value;
    }

    getValue(): Expression {
        return this.value;
    }

    evaluate(visitor: OclExecutionContext): any {
        return this.getValue()
            .evaluate(visitor);
    }
}
