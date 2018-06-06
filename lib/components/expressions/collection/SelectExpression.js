import { Expression } from "../Expression";

/**
 * Selects all elements from collection which fit the expr.
 *
 * @typicalname select
 * @oclExample self.collection->select(item | item.name = "random")
 */
export class SelectExpression extends Expression {
    constructor(source) {
        super();
        this.source = source;
    }

    visit(visitor) {
        return visitor.visitSelectExpression(this);
    }
}
