import { SourceBasedExpression } from "../Expression";

/**
 * Returns a collection having the same size as the original one.
 * The given oclExpression is applied on all elements of the collection.
 *
 * @oclExpression collect(expr : OclExpression) : Collection
 * @oclExample self.children->collect(age)
 */
export class CollectExpression extends SourceBasedExpression {
    visit(visitor) {
        return visitor.visitCollectExpression(this);
    }
}
