import {Expression} from "../expression";

export class GateExpression extends Expression {
    constructor(left, right) {
        super();
        this.left = left;
        this.right = right;
    }
}
