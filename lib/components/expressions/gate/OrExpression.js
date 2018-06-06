import { GateExpression } from "./GateExpression";

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
export class OrExpression extends GateExpression {
    visit(visitor) {
        return visitor.visitOrExpression(this);
    }
}
