import { Expression } from "../Expression";

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
export class ImpliesExpression extends Expression {
    constructor(left, right) {
        super();
        this.left = left;
        this.right = right;
    }

    visit(visitor) {
        return visitor.visitImpliesExpression(this);
    }
}
