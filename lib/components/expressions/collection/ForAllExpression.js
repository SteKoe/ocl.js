import { Expression } from "../Expression";

/**
 */
export class ForAllExpression extends Expression {
    constructor(source) {
        super();
        this.source = source;
    }

    visit(visitor) {
        return visitor.visitIteratorExpression(this);
    }
}
