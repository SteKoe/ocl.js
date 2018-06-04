import { Expression } from "../Expression";

/**
 * Returns the sum of all elements contained in self if they support the '+' operation.
 *
 * @typicalname sum
 * @oclExample self.jobs.salary->sum()
 */
export class SumOperation extends Expression {
    constructor(source) {
        super();
        this.source = source;
    }

    evaluate(obj) {
        const source = this.source.evaluate(obj);

        if (source instanceof Array && source instanceof Array) {
            return source.reduce((prev, cur) => prev + cur, 0);
        }

        return 0;
    }
}
