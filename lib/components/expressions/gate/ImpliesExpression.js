import { LeftRightBasedExpression } from "../Expression";

/**
 * =====    =====   ===========
 * A        B       A implies B
 * =====    =====   ===========
 * false    false   true
 * false    true    true
 * true     false   false
 * true     true    true
 * =====    =====   ===========
 *
 * @oclExample false implies true
 */
export class ImpliesExpression extends LeftRightBasedExpression {
    visit(visitor) {
        return visitor.visitImpliesExpression(this);
    }
}
