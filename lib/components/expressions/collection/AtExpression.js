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

    visit(visitor) {
        return visitor.visitAtExpression(this);
    }
}
