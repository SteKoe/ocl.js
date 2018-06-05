import { Expression } from "../Expression";

/**
 * Returns the element of the collection at index index.
 *
 * @typicalname at
 * @oclExample self.collection->at(2)
 */
export class AtExpression extends Expression {
    constructor(source) {
        super();
        this.source = source;
    }

    evaluate(obj) {
        const source = this.source.evaluate(obj);
        const index = this.body.evaluate(obj);

        if (source instanceof Array && Number.isInteger(index) && index >= 1 && index < source.length) {
            return source[index - 1];
        }
    }
}
