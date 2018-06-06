import { Expression } from "./Expression";

/**
 * Checks if *self* is not defined
 *
 * @oclExpression oclIsUndefined() : Boolean
 */
export class OclIsUndefinedExpression extends Expression {
    constructor(source) {
        super();
        this.source = source;
    }

    visit(visitor) {
        return visitor.visitOclIsUndefinedExpression(this);
    }
}
