import { Expression } from "../Expression";

/**
 * Returns the last element of the collection.
 *
 * @oclExpression last() : T
 * @oclExample self.collection->last()
 */
export class LastExpression extends Expression {
    constructor(source) {
        super();
        this.source = source;
    }

    visit(visitor) {
        return visitor.visitLastExpression(this);
    }
}
