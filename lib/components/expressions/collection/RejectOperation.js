import { Expression } from "../Expression";

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
