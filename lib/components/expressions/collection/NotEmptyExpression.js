import { SourceBasedExpression } from "../Expression";

/**
 * Returns true if self is not empty, false otherwise.
 *
 * @oclExpression notEmpty() : Boolean
 * @oclExample self.cars->notEmpty()
 */
export class NotEmptyExpression extends SourceBasedExpression {
    visit(visitor) {
        return visitor.visitNotEmptyExpression(this);
    }
}
