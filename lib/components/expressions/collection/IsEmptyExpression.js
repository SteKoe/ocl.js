import { Expression } from "../Expression";

/**
 * Returns true if self is empty, false otherwise.
 *
 * @typicalname isEmpty
 * @oclExample self.cars->isEmpty()
 */
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
