import { Expression } from "../Expression";

/**
 * Returns a collection with all elements except for those who the given oclExpression validates to true.
 *
 * @typicalname reject
 * @oclExample self.customer->reject(underage)
 */
export class RejectOperation extends Expression {
    constructor(source, iterator, body) {
        super();
        this.source = source;
        this.iterators = iterator;
        this.body = body;
    }

    evaluate(obj) {
        const source = this.source.evaluate(obj);

        return source.filter(entry => {
            let variables = {};
            if (this.iterators) {
                variables[this.iterators[0]] = entry;
            } else {
                variables = entry;
            }

            return !this.body.evaluate(entry, variables);
        });
    }
}
