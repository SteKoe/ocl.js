import { Expression } from "../Expression";

/**
 * @typicalname implies
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
