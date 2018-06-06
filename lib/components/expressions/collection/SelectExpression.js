import { Expression } from "../Expression";

/**
 * Selects all elements from collection which fit the expr.
 *
 * @oclExpression select(expr : oclExpression) : Collection
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
