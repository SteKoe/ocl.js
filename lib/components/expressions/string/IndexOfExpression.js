import { Expression } from "../Expression";

/**
 * Returns the index of the given string in self or 0 if it is not condained.
 *
 * @typicalname indexOf
 * @oclExample self.name->indexOf("string")
 */
export class IndexOfExpression extends Expression {
    constructor(source) {
        super();
        this.source = source;
    }

    visit(visitor) {
        return visitor.visitIndexOfExpression(this);
    }
}
