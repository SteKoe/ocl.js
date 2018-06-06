import { Expression } from "./Expression";

/**
 */
export class InitExpression extends Expression {
    constructor(value) {
        super();
        this.value = value;
    }

    visit(visitor) {
        return visitor.visitInitExpression(this);
    }
}