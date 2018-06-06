import { Expression } from "../Expression";

/**
 * Returns the given collection as set, containing unique entries.
 *
 * @oclExpression asSet() : Collection
 * @oclExample self.collection->asSet()
 */
export class AsSetExpression extends Expression {
    constructor(source) {
        super();
        this.source = source;
    }

    visit(visitor) {
        return visitor.visitAsSetExpression(this);
    }
}