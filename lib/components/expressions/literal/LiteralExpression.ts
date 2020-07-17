import { Expression } from '../Expression';
import { OclExecutionContext } from '../../OclExecutionContext';

export abstract class LiteralExpression<T> extends Expression {
    private readonly value: T;

    constructor(value) {
        super();
        this.value = this.parseValue(value);
    }

    getValue(): T {
        return this.value;
    }

    protected abstract parseValue(value): T;

    evaluate(visitor: OclExecutionContext): T {
        return this.getValue();
    }
}
