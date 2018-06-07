import { SourceBasedExpression } from "../Expression";

/**
 * Returns the last element of the collection.
 *
 * @oclExpression last() : T
 * @oclExample self.collection->last()
 */
export class LastExpression extends SourceBasedExpression {
    visit(visitor) {
        return visitor.visitLastExpression(this);
    }
}
