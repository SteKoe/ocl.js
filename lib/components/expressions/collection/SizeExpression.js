import { Expression } from "../Expression";

/**
 * Returns the size of the given collection.
 *
 * @typicalname size
 * @oclExample self.collection->size()
 */
export class SizeExpression extends Expression {
    constructor(source) {
        super();
        this.source = source;
    }

    evaluate(obj, variables) {
        let source = this.source.evaluate(obj, variables);
        if (source && (source instanceof Array || source instanceof Map || source instanceof Set || typeof source === 'string')) {
            return source.length;
        } else {
            return 0;
        }
    }
}
