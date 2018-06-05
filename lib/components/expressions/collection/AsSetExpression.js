import { Expression } from "../Expression";

/**
 * Returns the given collection as set, containing unique entries.
 *
 * @typicalname asSet
 * @oclExample self.collection->asSet()
 */
export class AsSetExpression extends Expression {
    constructor(source) {
        super();
        this.source = source;
    }

    evaluate(obj) {
        const source = this.source.evaluate(obj);
        if (source instanceof Array) {
            return new Set(source);
        }
    }
}