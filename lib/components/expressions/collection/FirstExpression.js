import { Expression } from "../Expression";

/**
 * Returns the first element of the collection.
 *
 * @oclExpression first() : T
 * @oclExample self.collection->first()
 */
export class FirstExpression extends Expression {
    constructor(source) {
        super();
        this.source = source;
    }

    visit(visitor) {
        return visitor.visitFirstExpression(this);
    }
}
