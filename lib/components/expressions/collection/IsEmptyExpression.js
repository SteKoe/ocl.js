import { SourceBasedExpression } from "../Expression";

/**
 * Returns true if self is empty, false otherwise.
 *
 * @oclExpression isEmpty() : Boolean
 * @oclExample self.cars->isEmpty()
 */
export class IsEmptyExpression extends SourceBasedExpression {
    visit(visitor) {
        return visitor.visitIsEmptyExpression(this);
    }
}
