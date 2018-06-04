import { Expression } from "../Expression";

/**
 * Returns a collection containing all elements of self and all elements of the passed in collection.
 *
 * @typicalname union
 * @oclExample self.collection->union(self.anotherCollection)
 */
export class UnionOperation extends Expression {
    constructor(source, body) {
        super();
        this.source = source;
        this.body = body;
    }

    evaluate(obj) {
        const source = this.source.evaluate(obj);
        const body = this.body.evaluate(obj);

        if (source instanceof Array && body instanceof Array) {
            return source.concat(body);
        }
        return [];
    }
}
