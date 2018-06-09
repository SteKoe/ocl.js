import { LeftRightBasedExpression } from '../Expression';
import { OclVisitor } from '../../OclVisitor';

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
    visit(visitor: OclVisitor): any {
        return visitor.visitImpliesExpression(this);
    }
}
