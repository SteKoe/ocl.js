import { LeftRightBasedExpression } from '../Expression';
import { IOclVisitor } from '../../IOclVisitor';

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
    visit(visitor: IOclVisitor): any {
        return visitor.visitImpliesExpression(this);
    }
}
