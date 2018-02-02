import { Expression } from "./expression";

export class IsEmptyExpression extends Expression {
    constructor(source) {
        super();
        this.source = source;
    }

    evaluate(obj, variables) {
        let source = this.source.evaluate(obj, variables);
        return Array.isArray(source) ? source.length === 0 : true;
    }
}
