import { Expression } from "../Expression";

/**
 * Returns the last element of the collection.
 *
 * @typicalname last
 * @oclExample self.collection->last()
 */
export class LastExpression extends Expression {
    constructor(source) {
        super();
        this.source = source;
    }

    evaluate(obj) {
        const source = this.source.evaluate(obj);
        if (source instanceof Array) {
            return source[source.length - 1];
        }
    }
}
