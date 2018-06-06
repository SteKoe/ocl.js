import { Expression } from "../Expression";

/**
 * Returns a collection with all elements except for those who the given oclExpression validates to true.
 *
 * @typicalname reject
 * @oclExample self.customer->reject(underage)
 */
export class RejectExpression extends Expression {
    constructor(source) {
        super();
        this.source = source;
    }

    evaluate(obj) {
        const filter = this.source.evaluate(obj).filter(entry => {
            let variables = {};
            if (this.iterators) {
                variables[this.iterators[0]] = entry;
            } else {
                variables[this.body.left.left.variable] = entry;
            }

            const result = this.body.evaluate(entry, variables);
            return !result;
        });
        return filter;
    }

    visit(visitor) {
        return visitor.visitRejectExpression(this);
    }
}
