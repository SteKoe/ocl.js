import { Expression } from "./Expression";

export class ExistsExpression extends Expression {
    constructor(source, iterators, body) {
        super();
        this.source = source;
        this.iterators = iterators;
        this.body = body;
    }

    evaluate(obj) {
        const collection = this.source.evaluate(obj);
        if (collection instanceof Array) {
            return collection.some(o => {
                let variables = {};

                if (this.iterators) {
                    variables[this.iterators[0]] = entry;
                } else {
                    variables = o;
                }

                return this.body.evaluate(o, variables);
            });
        } else {
            return false;
        }
    }

    toString() {
        return `[source=${this.source}, iterators=${this.iterators}, body=${this.body}]`;
    }
}
