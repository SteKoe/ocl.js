import { Expression } from "../Expression";

export class MathExpression extends Expression {
    constructor(left, right) {
        super();
        this.left = left;
        this.right = right;
    }
}
