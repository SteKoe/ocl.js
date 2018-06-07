import { Expression } from "./Expression";

/**
 */
export class PreExpression extends Expression {
    constructor(name, source) {
        super();
        this.name = name;
        this.source = source;
    }

    visit(visitor) {
        return visitor.visitPreCondition(this);
    }
}