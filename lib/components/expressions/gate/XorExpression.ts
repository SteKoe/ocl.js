import { LeftRightBasedExpression } from '../Expression';
import { IOclVisitor } from '../../IOclVisitor';

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
    visit(visitor: IOclVisitor): any {
        return visitor.visitXorExpression(this);
    }
}
