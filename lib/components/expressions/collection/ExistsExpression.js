import { SourceBasedExpression } from "../Expression";

/**
 * Operation which checks whether a collection contains an element specified by expr.
 *
 * @oclExpression exists(expr : OclExpression) : Boolean
 * @oclExample self.collection->exists(i | i < 2)
 */
export class ExistsExpression extends SourceBasedExpression {
    visit(visitor) {
        return visitor.visitExistsExpression(this);
    }
}
