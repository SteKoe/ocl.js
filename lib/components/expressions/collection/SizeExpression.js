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

    visit(visitor) {
        return visitor.visitSizeExpression(this);
    }
}
