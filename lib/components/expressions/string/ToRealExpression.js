import { SourceBasedExpression } from "../Expression";

/**
 * Tries to convert a string to a number.
 *
 * @oclExpression toReal() : Number
 * @oclExample "3.414"->toReal()
 */
export class ToRealExpression extends SourceBasedExpression {
    visit(visitor) {
        return visitor.visitToRealExpression(this);
    }
}
