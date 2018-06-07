import { SourceBasedExpression } from "../Expression";

/**
 * Returns the given collection as set, containing unique entries.
 *
 * @oclExpression asSet() : Collection
 * @oclExample self.collection->asSet()
 */
export class AsSetExpression extends SourceBasedExpression {
    visit(visitor) {
        return visitor.visitAsSetExpression(this);
    }
}