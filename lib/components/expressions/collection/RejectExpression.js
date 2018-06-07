import { SourceBasedExpression } from "../Expression";

/**
 * Returns a collection with all elements except for those who the given oclExpression validates to true.
 *
 * @oclExpression reject(expr : oclExpression) : Collection
 * @oclExample self.customer->reject(underage)
 */
export class RejectExpression extends SourceBasedExpression {
    visit(visitor) {
        return visitor.visitRejectExpression(this);
    }
}
