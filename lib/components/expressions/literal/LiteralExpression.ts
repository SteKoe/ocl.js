import { Expression } from '../Expression';

export class LiteralExpression<T> extends Expression {
    private value: T;

    constructor(value) {
        super();
        this.value = this.parseValue(value);
    }

    getValue(): T {
        return this.value;
    }

    parseValue(value): T {
        throw new Error('parseValue() function not implemented!');
    }
}
