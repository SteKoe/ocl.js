import { Expression } from "./Expression";

/**
 * A derived value expression is an expression that may be linked to a property
 */
export class DeriveExpression extends Expression {
    constructor(value) {
        super();
        this.value = value;
    }

    visit(visitor) {
        return visitor.visitDeriveExpression(this);
    }
}