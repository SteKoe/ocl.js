import { Expression } from '../Expression';

export abstract class LiteralExpression<T> extends Expression {
    private value: T;

    constructor(value) {
        super();
        this.value = this.parseValue(value);
    }

    getValue(): T {
        return this.value;
    }

    abstract parseValue(value): T;
}
