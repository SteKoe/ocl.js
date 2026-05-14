import {Expression} from '../Expression';
import {OclExecutionContext} from "../../OclExecutionContext";

export abstract class LiteralExpression<T> extends Expression {
    private readonly value: T;

    constructor(value: any) {
        super();
        this.value = this.parseValue(value);
    }

    getValue(): T {
        return this.value;
    }

    protected abstract parseValue(value: any): T;

    evaluate(visitor: OclExecutionContext): T {
        return visitor.setEvaluatedValue(this, this.getValue());
    }
}
