import { Expression } from "../Expression";

export class LiteralExpression extends Expression {
    constructor(value) {
        super();
        this.value = this.parseValue(value);
    }

    parseValue(value) {
        throw new Error('parseValue() function not implemented!')
    }

    evaluate() {
        return this.value;
    }
}
