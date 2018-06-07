import { LeftRightBasedExpression } from '../Expression'

/**
 * =====    =====   ===========
 * A        B       A xor B
 * =====    =====   ===========
 * false    false   false
 * false    true    true
 * true     false   true
 * true     true    false
 * =====    =====   ===========
 *
 * @oclExample false xor true
 */
export class XorExpression extends LeftRightBasedExpression {
    visit(visitor) {
        return visitor.visitXorExpression(this);
    }
}