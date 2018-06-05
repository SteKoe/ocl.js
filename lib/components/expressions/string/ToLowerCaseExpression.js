import { Expression } from "../Expression";

/**
 * Returns a string in lower case
 *
 * @typicalname toLowerCase
 * @oclExample self.name->toLowerCase()
 */
export class ToLowerCaseExpression extends Expression {
    constructor(source) {
        super();
        this.source = source;
    }

    evaluate(obj, variables) {
        let source = this.source.evaluate(obj, variables);

        return String(source).toLowerCase();
    }
}
