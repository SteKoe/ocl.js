import { SourceBasedExpression } from "./Expression";

/**
 * Checks if *self* is an instance of exact the class identified by the name
 *
 * @oclExpression oclIsTypeOf(s : String) : Boolean
 */
export class OclIsTypeOfExpression extends SourceBasedExpression {
    visit(visitor) {
        return visitor.visitOclIsTypeOfExpression(this);
    }
}
