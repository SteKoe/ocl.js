import { Expression } from "../Expression";

export class GateExpression extends Expression {
    constructor(left, right) {
        super();
        this.left = left;
        this.right = right;
    }
}
