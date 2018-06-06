import { Expression } from "./Expression";

export class OclIsUndefinedExpression extends Expression {
    constructor(source) {
        super();
        this.source = source;
    }

    visit(visitor) {
        return visitor.visitOclIsUndefinedExpression(this);
    }
}
