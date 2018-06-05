import { Expression } from "../Expression";

/**
 * Returns a string that is concatenated using source and body
 *
 * @typicalname concat
 * @oclExample self.name->concat("string")
 */
export class ConcatExpression extends Expression {
    constructor(source) {
        super();
        this.source = source;
    }

    evaluate(obj, variables) {
        let source = this.source.evaluate(obj, variables);
        let body = this.body.evaluate(obj, variables);

        return String(source).concat(String(body));
    }
}
