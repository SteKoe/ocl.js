import { Expression } from "../Expression";

/**
 * Operation which checks whether a collection contains an element specified by expr.
 *
 * @typicalname exists
 * @oclExample self.collection->exists(i | i < 2)
 */
export class ExistsExpression extends Expression {
    constructor(source, iterators, body) {
        super();
        this.source = source;
        this.iterators = iterators;
        this.body = body;
    }

    visit(visitor) {
        return visitor.visitExistsExpression(this);
    }
}
