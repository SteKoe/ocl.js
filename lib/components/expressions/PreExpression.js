import { Expression } from "./Expression";

export class PreExpression extends Expression {
    constructor(name, source) {
        super();
        this.name = name;
        this.source = source;
    }

    evaluate(obj, variables) {
        return this.source.evaluate(obj, variables);
    }

    visit(visitor) {
        visitor.visitPreCondition(this);
    }
}