import {Expression} from '../Expression';
import {OclExecutionContext} from "../../OclExecutionContext";
import {LocalVariables} from "../../types";

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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    evaluate(visitor: OclExecutionContext, localVariables?: LocalVariables): unknown {
        return visitor.setEvaluatedValue(this, this.getValue());
    }
}
