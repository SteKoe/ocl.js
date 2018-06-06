import { Expression } from "./Expression";

/**
 * Checks if *self* is an instance of the class identified by the name
 *
 * @oclExpression oclIsTypeOf(s : String) : Boolean
 */
export class OclIsTypeOfExpression extends Expression {
    constructor(source) {
        super();
        this.source = source;
    }

    visit(visitor) {
        return visitor.visitOclIsTypeOfExpression(this);
    }
}
