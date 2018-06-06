import { Expression } from "./Expression";

/**
 */
export class LetExpression extends Expression {
    constructor(key, value) {
        super();
        this.key = key;
        this.value = value;
    }

    visit(visitor) {
        return visitor.visitLetExpression(this);
    }
}