import { Expression } from "../Expression";

/**
 * @typicalname not
 */
export class NotExpression extends Expression {
    constructor(source) {
        super();
        this.source = source;
    }

    evaluate(obj, variables) {
        let source = this.source.evaluate(obj, variables);
        return source !== true;
    }
}
