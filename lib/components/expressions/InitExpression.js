import { Expression } from "./Expression";

export class InitExpression extends Expression {
    constructor(value) {
        super();
        this.value = value;
    }

    evaluate(obj) {
        return this.value.evaluate(obj);
    }
}