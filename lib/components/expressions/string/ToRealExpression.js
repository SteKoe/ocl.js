import { Expression } from "../Expression";

/**
 * Tries to convert a string to a number.
 *
 * @oclExpression toReal() : Number
 * @oclExample "3.414"->toReal()
 */
export class ToRealExpression extends Expression {
    constructor(source) {
        super();
        this.source = source;
    }

    visit(visitor) {
        return visitor.visitToRealExpression(this);
    }
}
