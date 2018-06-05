import { Expression } from "../Expression";

/**
 * Returns a string in lower case
 *
 * @typicalname substring
 * @oclExample self.name->substring(0,2)
 */
export class SubstringExpression extends Expression {
    constructor(source) {
        super();
        this.source = source;
    }

    evaluate(obj, variables) {
        let source = this.source.evaluate(obj, variables);

        if (!this.body) {
            return source;
        }

        let start, end;
        if (Array.isArray(this.body)) {
            start = this.body[0];
            end = this.body[1];
        } else {
            start = this.body;
        }

        let startIndex = start.evaluate(obj, variables);
        let endIndex = end ? end.evaluate(obj, variables) : source.length;
        return source.substring(startIndex, endIndex);
    }
}
