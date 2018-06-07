import { Expression, SourceBasedExpression } from "./Expression";

/**
 * Checks if *self* is not defined
 *
 * @oclExpression oclIsUndefined() : Boolean
 */
export class OclIsUndefinedExpression extends SourceBasedExpression {
    visit(visitor) {
        return visitor.visitOclIsUndefinedExpression(this);
    }
}
