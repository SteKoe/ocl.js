import { GateExpression } from "./GateExpression";
import { OrExpression } from './OrExpression'

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
export class AndExpression extends GateExpression {
    visit(visitor) {
        return visitor.visitAndExpression(this);
    }
}
