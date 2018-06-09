import {LeftRightBasedExpression} from '../Expression'
import {OclVisitor} from "../../OclVisitor";

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
    visit(visitor: OclVisitor) {
        return visitor.visitXorExpression(this);
    }
}