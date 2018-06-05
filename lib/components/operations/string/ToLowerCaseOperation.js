import { Expression } from "../../expressions/Expression";

/**
 * Returns a string in lower case
 *
 * @typicalname toLowerCase
 * @oclExample self.name->toLowerCase()
 */
export class ToLowerCaseOperation extends Expression {
    constructor(source) {
        super();
        this.source = source;
    }

    evaluate(obj, variables) {
        let source = this.source.evaluate(obj, variables);

        return String(source).toLowerCase();
    }
}
