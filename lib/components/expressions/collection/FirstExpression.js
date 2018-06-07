import { SourceBasedExpression } from "../Expression";

/**
 * Returns the first element of the collection.
 *
 * @oclExpression first() : T
 * @oclExample self.collection->first()
 */
export class FirstExpression extends SourceBasedExpression {
    visit(visitor) {
        return visitor.visitFirstExpression(this);
    }
}
