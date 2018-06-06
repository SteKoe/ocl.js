import { Expression } from "../Expression";

/**
 * Returns true if self is empty, false otherwise.
 *
 * @oclExpression isEmpty() : Boolean
 * @oclExample self.cars->isEmpty()
 */
export class IsEmptyExpression extends Expression {
    constructor(source) {
        super();
        this.source = source;
    }

    visit(visitor) {
        return visitor.visitIsEmptyExpression(this);
    }
}
