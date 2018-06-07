import { Expression } from "./Expression";

/**
 */
export class VariableExpression extends Expression {
    constructor(variable) {
        super();
        this.variable = variable;
    }

    visit(visitor) {
        return visitor.visitVariableExpression(this);
    }
}
