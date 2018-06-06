import { Expression } from "./Expression";

/**
 */
export class InvariantExpression extends Expression {
    constructor(oclExpression, name) {
        super();
        this.definition = oclExpression;
        this.name = name || 'anonymous';
    }

    visit(visitor) {
        return visitor.visitInvariantExpression(this);
    }
}
