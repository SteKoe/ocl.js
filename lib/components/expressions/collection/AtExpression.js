import { SourceBasedExpression } from "../Expression";

/**
 * Returns the element of the collection at index index.
 *
 * @oclExpression at(index : Number) : T
 * @oclExample self.collection->at(2)
 */
export class AtExpression extends SourceBasedExpression {
    visit(visitor) {
        return visitor.visitAtExpression(this);
    }
}
