import { Expression } from "../Expression";

/**
 * Returns the first element of the collection.
 *
 * @typicalname first
 * @oclExample self.collection->first()
 */
export class FirstExpression extends Expression {
    constructor(source) {
        super();
        this.source = source;
    }

    evaluate(obj) {
        const source = this.source.evaluate(obj);
        if (source instanceof Array) {
            return source[0];
        }
    }
}
