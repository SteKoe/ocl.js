import { SourceBasedExpression } from "./Expression";

/**
 * Checks if *self* is an instance of the class identified by the name
 *
 * @oclExpression oclIsKindOf(type : T) : Boolean
 */
export class OclIsKindOfExpression extends SourceBasedExpression {
    visit(visitor) {
        return visitor.visitOclIsKindOfExpression(this);
    }
}
