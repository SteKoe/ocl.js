import { Expression } from './Expression';
import { OclExecutionContext } from '../OclExecutionContext';

/**
 */
export class InitExpression extends Expression {
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
