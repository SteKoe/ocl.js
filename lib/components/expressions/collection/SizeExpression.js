import { SourceBasedExpression } from "../Expression";

/**
 * Returns the size of the given collection.
 *
 * @oclExpression size() : Number
 * @oclExample self.collection->size()
 */
export class SizeExpression extends SourceBasedExpression {
    visit(visitor) {
        return visitor.visitSizeExpression(this);
    }
}
