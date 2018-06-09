import { LeftRightBasedExpression } from '../Expression';
import { OclVisitor } from '../../OclVisitor';

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
    visit(visitor: OclVisitor): any {
        return visitor.visitOrExpression(this);
    }
}
