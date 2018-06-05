import { Expression } from "../Expression";

/**
 * Returns a collection having the same size as the original one.
 * The given oclExpression is applied on all elements of the collection.
 *
 * @typicalname collect
 * @oclExample self.children->collect(age)
 */
export class CollectExpression extends Expression {
    constructor(source, iterators, body) {
        super();
        this.source = source;
        this.body = body;
        this.iterators = Array.isArray(iterators) ? iterators : [iterators];
    }

    evaluate(obj) {
        const source = this.source.evaluate(obj);

        return source.map(entry => {
            let variables = {};

            if (this.iterators) {
                variables[this.iterators[0]] = entry;
            } else {
                variables = entry;
            }

            return this.body.evaluate(entry, variables);
        });
    }
}
