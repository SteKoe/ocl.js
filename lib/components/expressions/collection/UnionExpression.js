import { Expression } from "../Expression";

/**
 * Returns a collection containing all elements of self and all elements of the passed in collection.
 *
 * @typicalname union
 * @oclExample self.collection->union(self.anotherCollection)
 */
export class UnionExpression extends Expression {
    constructor(source) {
        super();
        this.source = source;
    }

    visit(visitor) {
        return visitor.visitUnionExpression(this);
    }
}
