import { Expression } from "./expression";

export class LetExpression extends Expression {
    constructor(key, value) {
        super();
        this.key = key;
        this.value = value;
    }

    evaluate(obj) {
        return obj[this.key] = this.value.evaluate(obj);
    }
}