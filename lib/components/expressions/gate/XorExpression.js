import { GateExpression } from "./GateExpression";

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
export class XorExpression extends GateExpression {
    evaluate(obj, variables) {
        let left = this.left.evaluate(obj, variables);
        let right = this.right.evaluate(obj, variables);

        return !!(left ^ right);
    }
}