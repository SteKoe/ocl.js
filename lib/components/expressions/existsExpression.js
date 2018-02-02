import { Expression } from "./expression";

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
                const variables = {};
                variables[this.iterators] = o;
                return this.body.evaluate(o, variables);
            });
        } else {
            return false;
        }
    }
}
