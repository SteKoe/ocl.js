import { Expression } from "../Expression";

/**
 * Returns the index of the given string in self or 0 if it is not condained.
 *
 * @typicalname indexOf
 * @oclExample self.name->indexOf("string")
 */
export class IndexOfExpression extends Expression {
    constructor(source) {
        super();
        this.source = source;
    }

    evaluate(obj, variables) {
        let source = this.source.evaluate(obj, variables);
        let indexOfString = this.body.evaluate(obj, variables);

        return indexOfString.length === 0 ? 0 : source.indexOf(indexOfString) + 1;
    }
}
