import { Expression } from "../Expression";

/**
 * Tries to convert a string to a number.
 *
 * @oclExpression toInteger() : Number
 * @oclExample "3.414"->toInteger()
 */
export class ToIntegerExpression extends Expression {
    constructor(source) {
        super();
        this.source = source;
    }

    visit(visitor) {
        return visitor.visitToIntegerExpression(this);
    }
}
