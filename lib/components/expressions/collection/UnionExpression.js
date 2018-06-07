import { SourceBasedExpression } from "../Expression";

/**
 * Returns a collection containing all elements of self and all elements of the passed in collection.
 *
 * @oclExpression union(c : Collection) : Collection
 * @oclExample self.collection->union(self.anotherCollection)
 */
export class UnionExpression extends SourceBasedExpression {
    visit(visitor) {
        return visitor.visitUnionExpression(this);
    }
}
