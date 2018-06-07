import { LeftRightBasedExpression } from '../Expression'

/**
 * =====    =====   ===========
 * A        B       A or B
 * =====    =====   ===========
 * false    false   false
 * false    true    true
 * true     false   true
 * true     true    true
 * =====    =====   ===========
 *
 * @oclExample false or true
 */
export class OrExpression extends LeftRightBasedExpression {
    visit(visitor) {
        return visitor.visitOrExpression(this);
    }
}
