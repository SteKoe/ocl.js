import { LeftRightBasedExpression } from '../Expression';
import { IOclVisitor } from '../../IOclVisitor';

/**
 * =====    =====   ===========
 * A        B       A and B
 * =====    =====   ===========
 * false    false   false
 * false    true    false
 * true     false   false
 * true     true    true
 * =====    =====   ===========
 *
 * @oclExample false and true
 */
export class AndExpression extends LeftRightBasedExpression {
    visit(visitor: IOclVisitor): any {
        return visitor.visitAndExpression(this);
    }
}
