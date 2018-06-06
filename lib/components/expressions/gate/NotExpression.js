import { Expression } from "../Expression";

/**
 * =====    =====
 * A        NOT A
 * =====    =====
 * true     false
 * false    true
 * =====    =====
 *
 * @oclExample not false
 */
export class NotExpression extends Expression {
    constructor(source) {
        super();
        this.source = source;
    }

    visit(visitor) {
        return visitor.visitNotExpression(this);
    }
}
