import {LeftRightBasedExpression} from '../Expression'
import {OclVisitor} from "../../OclVisitor";

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
    visit(visitor: OclVisitor) {
        return visitor.visitAndExpression(this);
    }
}
