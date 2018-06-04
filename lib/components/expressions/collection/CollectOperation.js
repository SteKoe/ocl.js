import { Expression } from "../Expression";

export class CollectOperation extends Expression {
    constructor(source, iterator, body) {
        super();
        this.source = source;
        this.body = body;
        this.iterator = iterator;
    }

    evaluate(obj) {
        const source = this.source.evaluate(obj);

        return source.map(entry => {
            let variables = {};

            if (this.iterator) {
                variables[this.iterator] = entry;
            } else {
                variables = entry;
            }

            return this.body.evaluate(entry, variables);
        });
    }
}
