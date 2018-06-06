import { Expression } from "../Expression";

/**
 * Returns the sum of all elements contained in self if they support the '+' operation.
 *
 * @typicalname sum
 * @oclExample self.jobs.salary->sum()
 */
export class SumExpression extends Expression {
    constructor(source) {
        super();
        this.source = source;
    }

    visit(visitor) {
        return visitor.visitSumExpression(this);
    }
}
