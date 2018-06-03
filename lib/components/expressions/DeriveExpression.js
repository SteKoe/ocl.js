import { Expression } from "./Expression";

export class DeriveExpression extends Expression {
    constructor(value) {
        super();
        this.value = value;
    }

    evaluate(obj) {
        return this.value.evaluate(obj);
    }
}