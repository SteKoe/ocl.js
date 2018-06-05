import { Expression } from "../../expressions/Expression";

/**
 * Returns a string in upper case
 *
 * @typicalname toUpperCase
 * @oclExample self.name->toUpperCase()
 */
export class ToUpperCaseOperation extends Expression {
    constructor(source) {
        super();
        this.source = source;
    }

    evaluate(obj, variables) {
        let source = this.source.evaluate(obj, variables);

        return String(source).toUpperCase();
    }
}
