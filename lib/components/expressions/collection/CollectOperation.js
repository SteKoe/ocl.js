import { Expression } from "../Expression";

export class CollectOperation extends Expression {
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
